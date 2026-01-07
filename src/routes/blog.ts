import { Hono } from 'hono'
import { Bindings } from '../types'

const blog = new Hono<{ Bindings: Bindings }>()

// Get all blog posts
blog.get('/', async c => {
  try {
    const published = c.req.query('published')

    let query = `
      SELECT 
        p.*,
        u.name as author_name,
        u.username as author_username,
        u.avatar_url as author_avatar
      FROM blog_posts p
      LEFT JOIN users u ON p.author_id = u.id
      WHERE 1=1
    `

    if (published !== 'false') {
      query += ' AND p.published = 1'
    }

    query += ' ORDER BY p.created_at DESC'

    const result = await c.env.DB.prepare(query).all()

    return c.json({
      success: true,
      data: result.results,
    })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch blog posts' }, 500)
  }
})

// Get blog post by slug
blog.get('/:slug', async c => {
  try {
    const slug = c.req.param('slug')

    const post = await c.env.DB.prepare(
      `
      SELECT 
        p.*,
        u.name as author_name,
        u.username as author_username,
        u.avatar_url as author_avatar
      FROM blog_posts p
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.slug = ?
    `
    )
      .bind(slug)
      .first()

    if (!post) {
      return c.json({ success: false, error: 'Blog post not found' }, 404)
    }

    // Increment view count
    await c.env.DB.prepare('UPDATE blog_posts SET views_count = views_count + 1 WHERE slug = ?')
      .bind(slug)
      .run()

    return c.json({
      success: true,
      data: post,
    })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch blog post' }, 500)
  }
})

export default blog
