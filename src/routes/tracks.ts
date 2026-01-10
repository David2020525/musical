import { Hono } from 'hono'
import { Bindings } from '../types'

const tracks = new Hono<{ Bindings: Bindings }>()

// Get all tracks
tracks.get('/', async c => {
  try {
    const genre = c.req.query('genre')
    const search = c.req.query('search')
    const sort = c.req.query('sort') || 'newest'

    let query = 'SELECT * FROM tracks WHERE 1=1'
    const params: any[] = []

    if (genre && genre !== 'all') {
      query += ' AND genre = ?'
      params.push(genre)
    }

    if (search) {
      query += ' AND (title LIKE ? OR artist LIKE ?)'
      params.push(`%${search}%`, `%${search}%`)
    }

    // Add sorting
    switch (sort) {
      case 'popular':
        query += ' ORDER BY plays_count DESC, likes_count DESC'
        break
      case 'trending':
        query += ' ORDER BY likes_count DESC, plays_count DESC'
        break
      case 'oldest':
        query += ' ORDER BY created_at ASC'
        break
      case 'newest':
      default:
        query += ' ORDER BY created_at DESC'
        break
    }

    const stmt = c.env.DB.prepare(query)
    const result = await stmt.bind(...params).all()

    return c.json({
      success: true,
      data: result.results,
    })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch tracks' }, 500)
  }
})

// Get track by ID
tracks.get('/:id', async c => {
  try {
    const id = c.req.param('id')

    const track = await c.env.DB.prepare('SELECT * FROM tracks WHERE id = ?').bind(id).first()

    if (!track) {
      return c.json({ success: false, error: 'Track not found' }, 404)
    }

    // Increment play count
    await c.env.DB.prepare('UPDATE tracks SET plays_count = plays_count + 1 WHERE id = ?')
      .bind(id)
      .run()

    return c.json({
      success: true,
      data: track,
    })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch track' }, 500)
  }
})

// Get genres
tracks.get('/genres/list', async c => {
  try {
    const result = await c.env.DB.prepare(
      'SELECT DISTINCT genre FROM tracks WHERE genre IS NOT NULL ORDER BY genre'
    ).all()

    return c.json({
      success: true,
      data: result.results,
    })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch genres' }, 500)
  }
})

export default tracks
