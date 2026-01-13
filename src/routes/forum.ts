import { Hono } from 'hono'
import { Bindings } from '../types'
import { verifyToken } from '../lib/auth'
import { z } from 'zod'

const forum = new Hono<{ Bindings: Bindings }>()

// Validation schemas
const createTopicSchema = z.object({
  category_id: z.number().positive(),
  title: z.string().min(5).max(200),
  content: z.string().min(10).max(10000),
})

const createReplySchema = z.object({
  content: z.string().min(1).max(10000),
})

const moderateTopicSchema = z.object({
  pinned: z.boolean().optional(),
  locked: z.boolean().optional(),
})

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 100)
}

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

// Create new topic (requires authentication)
forum.post('/topics', async c => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
      return c.json({ success: false, error: 'Authentication required' }, 401)
    }

    const token = authHeader.replace('Bearer ', '')
    const payload = await verifyToken(token)
    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    const body = await c.req.json()
    const validation = createTopicSchema.safeParse(body)
    
    if (!validation.success) {
      return c.json({
        success: false,
        error: 'Validation failed',
        details: validation.error.errors,
      }, 400)
    }

    const data = validation.data

    // Generate unique slug
    let slug = generateSlug(data.title)
    let slugSuffix = 1
    
    // Check if slug exists and append number if needed
    while (true) {
      const existing = await c.env.DB.prepare(
        'SELECT id FROM forum_topics WHERE slug = ?'
      ).bind(slug).first()
      
      if (!existing) break
      
      slug = `${generateSlug(data.title)}-${slugSuffix}`
      slugSuffix++
    }

    // Insert topic
    const result = await c.env.DB.prepare(
      `INSERT INTO forum_topics (
        category_id, author_id, title, slug, content,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
    ).bind(
      data.category_id,
      payload.id,
      data.title,
      slug,
      data.content
    ).run()

    // Update category post count
    await c.env.DB.prepare(
      'UPDATE forum_categories SET posts_count = posts_count + 1 WHERE id = ?'
    ).bind(data.category_id).run()

    // Get the created topic
    const topic = await c.env.DB.prepare(
      `SELECT 
        t.*,
        u.name as author_name,
        u.username as author_username,
        c.name as category_name
      FROM forum_topics t
      LEFT JOIN users u ON t.author_id = u.id
      LEFT JOIN forum_categories c ON t.category_id = c.id
      WHERE t.id = ?`
    ).bind(result.meta.last_row_id).first()

    return c.json({
      success: true,
      message: 'Topic created successfully',
      data: topic,
    }, 201)
  } catch (error) {
    console.error('Create topic error:', error)
    return c.json({ success: false, error: 'Failed to create topic' }, 500)
  }
})

// Create reply to topic (requires authentication)
forum.post('/topics/:slug/replies', async c => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
      return c.json({ success: false, error: 'Authentication required' }, 401)
    }

    const token = authHeader.replace('Bearer ', '')
    const payload = await verifyToken(token)
    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    const slug = c.req.param('slug')

    // Get topic
    const topic = await c.env.DB.prepare(
      'SELECT id, locked FROM forum_topics WHERE slug = ?'
    ).bind(slug).first<{ id: number; locked: number }>()

    if (!topic) {
      return c.json({ success: false, error: 'Topic not found' }, 404)
    }

    if (topic.locked === 1) {
      return c.json({ success: false, error: 'Topic is locked' }, 403)
    }

    const body = await c.req.json()
    const validation = createReplySchema.safeParse(body)
    
    if (!validation.success) {
      return c.json({
        success: false,
        error: 'Validation failed',
        details: validation.error.errors,
      }, 400)
    }

    const data = validation.data

    // Insert reply
    const result = await c.env.DB.prepare(
      `INSERT INTO forum_replies (
        topic_id, author_id, content, created_at, updated_at
      ) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
    ).bind(topic.id, payload.id, data.content).run()

    // Update topic reply count and updated_at
    await c.env.DB.prepare(
      `UPDATE forum_topics 
       SET replies_count = replies_count + 1, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    ).bind(topic.id).run()

    // Get the created reply
    const reply = await c.env.DB.prepare(
      `SELECT 
        r.*,
        u.name as author_name,
        u.username as author_username,
        u.avatar_url as author_avatar
      FROM forum_replies r
      LEFT JOIN users u ON r.author_id = u.id
      WHERE r.id = ?`
    ).bind(result.meta.last_row_id).first()

    return c.json({
      success: true,
      message: 'Reply posted successfully',
      data: reply,
    }, 201)
  } catch (error) {
    console.error('Create reply error:', error)
    return c.json({ success: false, error: 'Failed to post reply' }, 500)
  }
})

// Update topic (author or moderator)
forum.put('/topics/:slug', async c => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
      return c.json({ success: false, error: 'Authentication required' }, 401)
    }

    const token = authHeader.replace('Bearer ', '')
    const payload = await verifyToken(token)
    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    const slug = c.req.param('slug')

    // Get topic and check ownership
    const topic = await c.env.DB.prepare(
      'SELECT id, author_id, locked FROM forum_topics WHERE slug = ?'
    ).bind(slug).first<{ id: number; author_id: number; locked: number }>()

    if (!topic) {
      return c.json({ success: false, error: 'Topic not found' }, 404)
    }

    // Check if user is author or moderator
    const user = await c.env.DB.prepare(
      'SELECT role FROM users WHERE id = ?'
    ).bind(payload.id).first<{ role: string }>()

    const isModerator = user?.role === 'moderator' || user?.role === 'admin'
    const isAuthor = topic.author_id === payload.id

    if (!isAuthor && !isModerator) {
      return c.json({ success: false, error: 'Permission denied' }, 403)
    }

    if (topic.locked === 1 && !isModerator) {
      return c.json({ success: false, error: 'Topic is locked' }, 403)
    }

    const body = await c.req.json()
    const { title, content } = body

    if (!title && !content) {
      return c.json({ success: false, error: 'No fields to update' }, 400)
    }

    // Build update query
    const updates: string[] = []
    const params: any[] = []

    if (title) {
      updates.push('title = ?')
      params.push(title)
    }
    if (content) {
      updates.push('content = ?')
      params.push(content)
    }

    updates.push('updated_at = CURRENT_TIMESTAMP')
    params.push(topic.id)

    await c.env.DB.prepare(
      `UPDATE forum_topics SET ${updates.join(', ')} WHERE id = ?`
    ).bind(...params).run()

    return c.json({
      success: true,
      message: 'Topic updated successfully',
    })
  } catch (error) {
    console.error('Update topic error:', error)
    return c.json({ success: false, error: 'Failed to update topic' }, 500)
  }
})

// Delete topic (author or moderator)
forum.delete('/topics/:slug', async c => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
      return c.json({ success: false, error: 'Authentication required' }, 401)
    }

    const token = authHeader.replace('Bearer ', '')
    const payload = await verifyToken(token)
    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    const slug = c.req.param('slug')

    // Get topic
    const topic = await c.env.DB.prepare(
      'SELECT id, author_id, category_id FROM forum_topics WHERE slug = ?'
    ).bind(slug).first<{ id: number; author_id: number; category_id: number }>()

    if (!topic) {
      return c.json({ success: false, error: 'Topic not found' }, 404)
    }

    // Check if user is author or moderator
    const user = await c.env.DB.prepare(
      'SELECT role FROM users WHERE id = ?'
    ).bind(payload.id).first<{ role: string }>()

    const isModerator = user?.role === 'moderator' || user?.role === 'admin'
    const isAuthor = topic.author_id === payload.id

    if (!isAuthor && !isModerator) {
      return c.json({ success: false, error: 'Permission denied' }, 403)
    }

    // Delete topic (CASCADE will delete replies)
    await c.env.DB.prepare(
      'DELETE FROM forum_topics WHERE id = ?'
    ).bind(topic.id).run()

    // Update category post count
    await c.env.DB.prepare(
      'UPDATE forum_categories SET posts_count = posts_count - 1 WHERE id = ?'
    ).bind(topic.category_id).run()

    return c.json({
      success: true,
      message: 'Topic deleted successfully',
    })
  } catch (error) {
    console.error('Delete topic error:', error)
    return c.json({ success: false, error: 'Failed to delete topic' }, 500)
  }
})

// Moderate topic (moderator/admin only)
forum.patch('/topics/:slug/moderate', async c => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
      return c.json({ success: false, error: 'Authentication required' }, 401)
    }

    const token = authHeader.replace('Bearer ', '')
    const payload = await verifyToken(token)
    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    // Check if user is moderator or admin
    const user = await c.env.DB.prepare(
      'SELECT role FROM users WHERE id = ?'
    ).bind(payload.id).first<{ role: string }>()

    if (!user || (user.role !== 'moderator' && user.role !== 'admin')) {
      return c.json({ success: false, error: 'Moderator access required' }, 403)
    }

    const slug = c.req.param('slug')

    // Get topic
    const topic = await c.env.DB.prepare(
      'SELECT id FROM forum_topics WHERE slug = ?'
    ).bind(slug).first<{ id: number }>()

    if (!topic) {
      return c.json({ success: false, error: 'Topic not found' }, 404)
    }

    const body = await c.req.json()
    const validation = moderateTopicSchema.safeParse(body)
    
    if (!validation.success) {
      return c.json({
        success: false,
        error: 'Validation failed',
        details: validation.error.errors,
      }, 400)
    }

    const data = validation.data

    // Build update query
    const updates: string[] = []
    const params: any[] = []

    if (data.pinned !== undefined) {
      updates.push('pinned = ?')
      params.push(data.pinned ? 1 : 0)
    }
    if (data.locked !== undefined) {
      updates.push('locked = ?')
      params.push(data.locked ? 1 : 0)
    }

    if (updates.length === 0) {
      return c.json({ success: false, error: 'No moderation actions specified' }, 400)
    }

    updates.push('updated_at = CURRENT_TIMESTAMP')
    params.push(topic.id)

    await c.env.DB.prepare(
      `UPDATE forum_topics SET ${updates.join(', ')} WHERE id = ?`
    ).bind(...params).run()

    return c.json({
      success: true,
      message: 'Topic moderated successfully',
    })
  } catch (error) {
    console.error('Moderate topic error:', error)
    return c.json({ success: false, error: 'Failed to moderate topic' }, 500)
  }
})

// Delete reply (author or moderator)
forum.delete('/replies/:id', async c => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
      return c.json({ success: false, error: 'Authentication required' }, 401)
    }

    const token = authHeader.replace('Bearer ', '')
    const payload = await verifyToken(token)
    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    const replyId = c.req.param('id')

    // Get reply
    const reply = await c.env.DB.prepare(
      'SELECT id, author_id, topic_id FROM forum_replies WHERE id = ?'
    ).bind(replyId).first<{ id: number; author_id: number; topic_id: number }>()

    if (!reply) {
      return c.json({ success: false, error: 'Reply not found' }, 404)
    }

    // Check if user is author or moderator
    const user = await c.env.DB.prepare(
      'SELECT role FROM users WHERE id = ?'
    ).bind(payload.id).first<{ role: string }>()

    const isModerator = user?.role === 'moderator' || user?.role === 'admin'
    const isAuthor = reply.author_id === payload.id

    if (!isAuthor && !isModerator) {
      return c.json({ success: false, error: 'Permission denied' }, 403)
    }

    // Delete reply
    await c.env.DB.prepare(
      'DELETE FROM forum_replies WHERE id = ?'
    ).bind(reply.id).run()

    // Update topic reply count
    await c.env.DB.prepare(
      'UPDATE forum_topics SET replies_count = replies_count - 1 WHERE id = ?'
    ).bind(reply.topic_id).run()

    return c.json({
      success: true,
      message: 'Reply deleted successfully',
    })
  } catch (error) {
    console.error('Delete reply error:', error)
    return c.json({ success: false, error: 'Failed to delete reply' }, 500)
  }
})

/**
 * Like/Unlike a topic
 * POST /api/forum/topics/:slug/like
 */
forum.post('/topics/:slug/like', async c => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
      return c.json({ success: false, error: 'Authentication required' }, 401)
    }

    const token = authHeader.replace('Bearer ', '')
    const payload = await verifyToken(token, c.env)
    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    const slug = c.req.param('slug')

    // Get topic
    const topic = await c.env.DB.prepare(
      'SELECT id FROM forum_topics WHERE slug = ?'
    ).bind(slug).first<{ id: number }>()

    if (!topic) {
      return c.json({ success: false, error: 'Topic not found' }, 404)
    }

    // Check if already liked
    const existingLike = await c.env.DB.prepare(
      'SELECT id FROM forum_likes WHERE topic_id = ? AND user_id = ?'
    ).bind(topic.id, payload.id).first()

    if (existingLike) {
      // Unlike
      await c.env.DB.prepare(
        'DELETE FROM forum_likes WHERE id = ?'
      ).bind(existingLike.id).run()

      // Decrement likes count
      await c.env.DB.prepare(
        'UPDATE forum_topics SET likes_count = likes_count - 1 WHERE id = ?'
      ).bind(topic.id).run()

      return c.json({
        success: true,
        action: 'unliked',
        message: 'Topic unliked',
      })
    } else {
      // Like
      await c.env.DB.prepare(
        'INSERT INTO forum_likes (topic_id, user_id, created_at) VALUES (?, ?, datetime(\'now\'))'
      ).bind(topic.id, payload.id).run()

      // Increment likes count
      await c.env.DB.prepare(
        'UPDATE forum_topics SET likes_count = likes_count + 1 WHERE id = ?'
      ).bind(topic.id).run()

      return c.json({
        success: true,
        action: 'liked',
        message: 'Topic liked',
      })
    }
  } catch (error) {
    console.error('Like topic error:', error)
    return c.json({ success: false, error: 'Failed to like topic' }, 500)
  }
})

export default forum
