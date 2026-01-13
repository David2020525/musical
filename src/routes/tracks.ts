import { Hono } from 'hono'
import { Bindings } from '../types'
import { verifyToken } from '../lib/auth'
import { createR2Client, validateAudioFile, validateImageFile, generateFileKey } from '../lib/r2'
import { z } from 'zod'

const tracks = new Hono<{ Bindings: Bindings }>()

// Validation schema for track upload
const uploadTrackSchema = z.object({
  title: z.string().min(1).max(200),
  artist: z.string().min(1).max(200),
  album: z.string().optional(),
  genre: z.string().optional(),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  bpm: z.number().min(1).max(300).optional(),
  mood: z.string().optional(),
  tags: z.string().optional(),
  cover_url: z.string().optional(),
  audio_url: z.string().min(1), // Required
  duration: z.number().optional(),
  release_year: z.number().optional(),
})

// Get all tracks
tracks.get('/', async c => {
  try {
    const genre = c.req.query('genre')
    const search = c.req.query('search')
    const sort = c.req.query('sort') || 'newest'
    const featured = c.req.query('featured')
    const limit = parseInt(c.req.query('limit') || '100')
    const priceMin = c.req.query('price_min')
    const priceMax = c.req.query('price_max')
    const freeOnly = c.req.query('free_only')
    const dateFilter = c.req.query('date')
    const producer = c.req.query('producer')

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

    if (featured === 'true') {
      query += ' AND is_featured = 1'
    }

    // Price filters
    if (freeOnly === 'true') {
      query += ' AND (price IS NULL OR price = 0)'
    } else {
      if (priceMin) {
        query += ' AND price >= ?'
        params.push(parseFloat(priceMin))
      }
      if (priceMax) {
        query += ' AND price <= ?'
        params.push(parseFloat(priceMax))
      }
    }

    // Date filter
    if (dateFilter) {
      const now = new Date()
      let dateCondition = ''
      
      switch (dateFilter) {
        case 'today':
          dateCondition = "DATE(created_at) = DATE('now')"
          break
        case 'week':
          dateCondition = "created_at >= DATE('now', '-7 days')"
          break
        case 'month':
          dateCondition = "created_at >= DATE('now', '-1 month')"
          break
        case 'year':
          dateCondition = "created_at >= DATE('now', '-1 year')"
          break
      }
      
      if (dateCondition) {
        query += ` AND ${dateCondition}`
      }
    }

    // Producer filter
    if (producer) {
      query += ' AND artist LIKE ?'
      params.push(`%${producer}%`)
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

    // Add limit
    query += ' LIMIT ?'
    params.push(limit)

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

/**
 * Upload audio file to R2
 * POST /api/tracks/upload/audio
 */
tracks.post('/upload/audio', async c => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.json({ success: false, error: 'Authentication required' }, 401)
  }

  try {
    const token = authHeader.replace('Bearer ', '')
    const payload = await verifyToken(token, c.env)

    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    // Check if user is a producer
    const user = await c.env.DB.prepare(
      'SELECT is_producer, role FROM users WHERE id = ?'
    ).bind(payload.id).first<{ is_producer: number; role: string }>()

    if (!user || (user.is_producer !== 1 && user.role !== 'admin')) {
      return c.json({ success: false, error: 'Producer access required' }, 403)
    }

    // Get file from form data
    const formData = await c.req.formData()
    const file = formData.get('audio') as File

    if (!file) {
      return c.json({ success: false, error: 'No audio file provided' }, 400)
    }

    // Validate audio file
    const validation = validateAudioFile(file)
    if (!validation.valid) {
      return c.json({ success: false, error: validation.error }, 400)
    }

    // Generate unique key
    const key = generateFileKey(file.name, payload.id, 'audio')

    // Upload to R2
    const r2Client = createR2Client(c.env)
    const arrayBuffer = await file.arrayBuffer()
    
    const result = await r2Client.upload({
      key,
      body: arrayBuffer,
      contentType: file.type,
      metadata: {
        userId: payload.id.toString(),
        originalName: file.name,
        size: file.size.toString(),
      },
    })

    if (!result.success) {
      return c.json({ success: false, error: result.error || 'Upload failed' }, 500)
    }

    return c.json({
      success: true,
      url: result.url,
      key,
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    console.error('Audio upload error:', error)
    return c.json({ success: false, error: 'Failed to upload audio file' }, 500)
  }
})

/**
 * Upload cover image to R2
 * POST /api/tracks/upload/cover
 */
tracks.post('/upload/cover', async c => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.json({ success: false, error: 'Authentication required' }, 401)
  }

  try {
    const token = authHeader.replace('Bearer ', '')
    const payload = await verifyToken(token, c.env)

    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    // Check if user is a producer
    const user = await c.env.DB.prepare(
      'SELECT is_producer, role FROM users WHERE id = ?'
    ).bind(payload.id).first<{ is_producer: number; role: string }>()

    if (!user || (user.is_producer !== 1 && user.role !== 'admin')) {
      return c.json({ success: false, error: 'Producer access required' }, 403)
    }

    // Get file from form data
    const formData = await c.req.formData()
    const file = formData.get('cover') as File

    if (!file) {
      return c.json({ success: false, error: 'No cover image provided' }, 400)
    }

    // Validate image file
    const validation = validateImageFile(file)
    if (!validation.valid) {
      return c.json({ success: false, error: validation.error }, 400)
    }

    // Generate unique key
    const key = generateFileKey(file.name, payload.id, 'cover')

    // Upload to R2
    const r2Client = createR2Client(c.env)
    const arrayBuffer = await file.arrayBuffer()
    
    const result = await r2Client.upload({
      key,
      body: arrayBuffer,
      contentType: file.type,
      metadata: {
        userId: payload.id.toString(),
        originalName: file.name,
        size: file.size.toString(),
      },
    })

    if (!result.success) {
      return c.json({ success: false, error: result.error || 'Upload failed' }, 500)
    }

    return c.json({
      success: true,
      url: result.url,
      key,
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    console.error('Cover upload error:', error)
    return c.json({ success: false, error: 'Failed to upload cover image' }, 500)
  }
})

// Upload new track (producers only)
tracks.post('/', async c => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.json({ success: false, error: 'Authentication required' }, 401)
  }

  try {
    const token = authHeader.replace('Bearer ', '')
    const payload = await verifyToken(token)

    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    // Check if user is a producer
    const user = await c.env.DB.prepare(
      'SELECT is_producer FROM users WHERE id = ?'
    ).bind(payload.id).first<{ is_producer: number }>()

    if (!user || user.is_producer !== 1) {
      return c.json({ success: false, error: 'Producer access required' }, 403)
    }

    const body = await c.req.json()
    const validation = uploadTrackSchema.safeParse(body)

    if (!validation.success) {
      return c.json({
        success: false,
        error: 'Validation failed',
        details: validation.error.errors,
      }, 400)
    }

    const data = validation.data

    // Insert track
    const result = await c.env.DB.prepare(
      `INSERT INTO tracks (
        user_id, title, artist, album, genre, description,
        price, bpm, mood, tags, cover_url, audio_url,
        duration, release_year, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
    ).bind(
      payload.id,
      data.title,
      data.artist,
      data.album || null,
      data.genre || null,
      data.description || null,
      data.price || 0,
      data.bpm || null,
      data.mood || null,
      data.tags || null,
      data.cover_url || null,
      data.audio_url,
      data.duration || null,
      data.release_year || null
    ).run()

    // Get the created track
    const track = await c.env.DB.prepare(
      'SELECT * FROM tracks WHERE id = ?'
    ).bind(result.meta.last_row_id).first()

    return c.json({
      success: true,
      message: 'Track uploaded successfully',
      data: track,
    }, 201)
  } catch (error) {
    console.error('Upload track error:', error)
    return c.json({ success: false, error: 'Failed to upload track' }, 500)
  }
})

// Update track (owner only)
tracks.put('/:id', async c => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.json({ success: false, error: 'Authentication required' }, 401)
  }

  try {
    const token = authHeader.replace('Bearer ', '')
    const payload = await verifyToken(token)

    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    const trackId = c.req.param('id')

    // Get track and check ownership
    const track = await c.env.DB.prepare(
      'SELECT user_id FROM tracks WHERE id = ?'
    ).bind(trackId).first<{ user_id: number }>()

    if (!track) {
      return c.json({ success: false, error: 'Track not found' }, 404)
    }

    if (track.user_id !== payload.id) {
      return c.json({ success: false, error: 'Permission denied' }, 403)
    }

    const body = await c.req.json()
    const updates: string[] = []
    const params: any[] = []

    // Build dynamic update query
    const allowedFields = ['title', 'artist', 'album', 'genre', 'description', 'price', 'bpm', 'mood', 'tags', 'cover_url']
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates.push(`${field} = ?`)
        params.push(body[field])
      }
    }

    if (updates.length === 0) {
      return c.json({ success: false, error: 'No fields to update' }, 400)
    }

    updates.push('updated_at = CURRENT_TIMESTAMP')
    params.push(trackId)

    await c.env.DB.prepare(
      `UPDATE tracks SET ${updates.join(', ')} WHERE id = ?`
    ).bind(...params).run()

    // Get updated track
    const updatedTrack = await c.env.DB.prepare(
      'SELECT * FROM tracks WHERE id = ?'
    ).bind(trackId).first()

    return c.json({
      success: true,
      message: 'Track updated successfully',
      data: updatedTrack,
    })
  } catch (error) {
    console.error('Update track error:', error)
    return c.json({ success: false, error: 'Failed to update track' }, 500)
  }
})

// Delete track (owner only)
tracks.delete('/:id', async c => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.json({ success: false, error: 'Authentication required' }, 401)
  }

  try {
    const token = authHeader.replace('Bearer ', '')
    const payload = await verifyToken(token)

    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    const trackId = c.req.param('id')

    // Get track and check ownership
    const track = await c.env.DB.prepare(
      'SELECT user_id FROM tracks WHERE id = ?'
    ).bind(trackId).first<{ user_id: number }>()

    if (!track) {
      return c.json({ success: false, error: 'Track not found' }, 404)
    }

    if (track.user_id !== payload.id) {
      // Check if user is admin
      const user = await c.env.DB.prepare(
        'SELECT role FROM users WHERE id = ?'
      ).bind(payload.id).first<{ role: string }>()

      if (!user || (user.role !== 'admin' && user.role !== 'moderator')) {
        return c.json({ success: false, error: 'Permission denied' }, 403)
      }
    }

    // Delete track
    await c.env.DB.prepare(
      'DELETE FROM tracks WHERE id = ?'
    ).bind(trackId).run()

    return c.json({
      success: true,
      message: 'Track deleted successfully',
    })
  } catch (error) {
    console.error('Delete track error:', error)
    return c.json({ success: false, error: 'Failed to delete track' }, 500)
  }
})

export default tracks
