import { Hono } from 'hono'
import { Bindings } from '../types'

const forum = new Hono<{ Bindings: Bindings }>()

// Get all categories
forum.get('/categories', async c => {
  try {
    const result = await c.env.DB.prepare(
      'SELECT * FROM forum_categories ORDER BY name ASC'
    ).all()

    return c.json({
      success: true,
      data: result.results,
    })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch categories' }, 500)
  }
})

// Get topics by category
forum.get('/topics', async c => {
  try {
    const categoryId = c.req.query('category_id')

    let query = `
      SELECT 
        t.*,
        u.name as author_name,
        u.username as author_username,
        u.avatar_url as author_avatar,
        c.name as category_name
      FROM forum_topics t
      LEFT JOIN users u ON t.author_id = u.id
      LEFT JOIN forum_categories c ON t.category_id = c.id
      WHERE 1=1
    `

    const params: any[] = []

    if (categoryId) {
      query += ' AND t.category_id = ?'
      params.push(categoryId)
    }

    query += ' ORDER BY t.pinned DESC, t.created_at DESC'

    const stmt = c.env.DB.prepare(query)
    const result = await stmt.bind(...params).all()

    return c.json({
      success: true,
      data: result.results,
    })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch topics' }, 500)
  }
})

// Get topic by slug with replies
forum.get('/topics/:slug', async c => {
  try {
    const slug = c.req.param('slug')

    // Get topic
    const topic = await c.env.DB.prepare(
      `
      SELECT 
        t.*,
        u.name as author_name,
        u.username as author_username,
        u.avatar_url as author_avatar,
        c.name as category_name
      FROM forum_topics t
      LEFT JOIN users u ON t.author_id = u.id
      LEFT JOIN forum_categories c ON t.category_id = c.id
      WHERE t.slug = ?
    `
    )
      .bind(slug)
      .first()

    if (!topic) {
      return c.json({ success: false, error: 'Topic not found' }, 404)
    }

    // Get replies
    const replies = await c.env.DB.prepare(
      `
      SELECT 
        r.*,
        u.name as author_name,
        u.username as author_username,
        u.avatar_url as author_avatar
      FROM forum_replies r
      LEFT JOIN users u ON r.author_id = u.id
      WHERE r.topic_id = ?
      ORDER BY r.created_at ASC
    `
    )
      .bind((topic as any).id)
      .all()

    // Increment view count
    await c.env.DB.prepare(
      'UPDATE forum_topics SET views_count = views_count + 1 WHERE slug = ?'
    )
      .bind(slug)
      .run()

    return c.json({
      success: true,
      data: {
        topic,
        replies: replies.results,
      },
    })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch topic' }, 500)
  }
})

export default forum
