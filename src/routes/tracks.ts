import { Hono } from 'hono'
import type { Bindings } from '../types'
import type { Track } from '../types/database'
import { verifyToken, extractTokenFromHeader } from '../lib/auth'
import { requireAuth, requireProducer, getCurrentUser } from '../lib/middleware'
import {
  validateAudioFile,
  validateImageFile,
  generateFileKey,
  uploadToR2,
  deleteFromR2,
  parseMultipartFormData,
  getContentType,
} from '../lib/upload'

const tracks = new Hono<{ Bindings: Bindings }>()

// ============================================================================
// PUBLIC ENDPOINTS
// ============================================================================

/**
 * GET /api/tracks
 * List all tracks with filtering and sorting
 */
tracks.get('/', async (c) => {
  try {
    const genre = c.req.query('genre')
    const search = c.req.query('search')
    const sort = c.req.query('sort') || 'newest'
    const featured = c.req.query('featured')
    const limit = parseInt(c.req.query('limit') || '12')
    const offset = parseInt(c.req.query('offset') || '0')
    const priceMin = c.req.query('price_min')
    const priceMax = c.req.query('price_max')
    const freeOnly = c.req.query('free_only')
    const producer = c.req.query('producer')
    const dateFilter = c.req.query('date')

    // Check if user is authenticated
    const authHeader = c.req.header('Authorization')
    let userId: number | null = null
    
    if (authHeader) {
      try {
        const token = authHeader.replace('Bearer ', '')
        const decoded = verifyToken(token, c.env)
        if (decoded && decoded.userId) {
          userId = decoded.userId
        }
      } catch (e) {
        // Invalid token, continue as guest
      }
    }

    let query = `
      SELECT 
        t.*,
        u.username as producer_username,
        u.name as producer_name
    `
    
    // Add purchase status if user is authenticated
    if (userId) {
      query += `,
        CASE 
          WHEN EXISTS (
            SELECT 1 FROM purchases p 
            WHERE p.track_id = t.id 
            AND p.user_id = ? 
            AND (p.payment_status = 'COMPLETED' OR p.payment_status = 'completed')
          ) THEN 1
          ELSE 0
        END as is_purchased
      `
    } else {
      query += `, 0 as is_purchased`
    }
    
    query += `
      FROM tracks t
      LEFT JOIN users u ON t.user_id = u.id
      WHERE 1=1
    `
    const params: any[] = []
    
    // Add userId to params if authenticated (for purchase check)
    if (userId) {
      params.push(userId)
    }

    // Filters
    if (genre && genre !== 'all') {
      query += ' AND t.genre = ?'
      params.push(genre)
    }

    if (search) {
      query += ' AND (t.title LIKE ? OR t.artist LIKE ? OR t.tags LIKE ?)'
      params.push(`%${search}%`, `%${search}%`, `%${search}%`)
    }

    if (featured === 'true') {
      query += ' AND t.is_featured = 1'
    }

    if (freeOnly === 'true') {
      query += ' AND (t.price IS NULL OR t.price = 0)'
    } else {
      if (priceMin) {
        query += ' AND t.price >= ?'
        params.push(parseFloat(priceMin))
      }
      if (priceMax) {
        query += ' AND t.price <= ?'
        params.push(parseFloat(priceMax))
      }
    }

    if (producer) {
      query += ' AND u.username = ?'
      params.push(producer)
    }

    // Date filter
    if (dateFilter) {
      const now = new Date()
      switch (dateFilter) {
        case 'today':
          query += ' AND DATE(t.created_at) = DATE(?)'
          params.push(now.toISOString())
          break
        case 'week':
          query += ' AND t.created_at >= datetime(?, "-7 days")'
          params.push(now.toISOString())
          break
        case 'month':
          query += ' AND t.created_at >= datetime(?, "-30 days")'
          params.push(now.toISOString())
          break
        case 'year':
          query += ' AND t.created_at >= datetime(?, "-365 days")'
          params.push(now.toISOString())
          break
      }
    }

    // Sorting
    switch (sort) {
      case 'popular':
        query += ' ORDER BY t.plays_count DESC, t.likes_count DESC'
        break
      case 'trending':
        query += ' ORDER BY t.likes_count DESC, t.plays_count DESC'
        break
      case 'price_low':
        query += ' ORDER BY t.price ASC'
        break
      case 'price_high':
        query += ' ORDER BY t.price DESC'
        break
      case 'oldest':
        query += ' ORDER BY t.created_at ASC'
        break
      case 'newest':
      default:
        query += ' ORDER BY t.created_at DESC'
        break
    }

    // Pagination
    query += ' LIMIT ? OFFSET ?'
    params.push(limit, offset)

    const result = await c.env.DB.prepare(query).bind(...params).all()

    return c.json({
      success: true,
      data: result.results,
      meta: {
        limit,
        offset,
        count: result.results.length,
      },
    })
  } catch (error: any) {
    console.error('Fetch tracks error:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to fetch tracks' 
    }, 500)
  }
})

/**
 * GET /api/tracks/:id
 * Get track by ID and increment play count
 */
tracks.get('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    // Check if user is authenticated
    const authHeader = c.req.header('Authorization')
    let userId: number | null = null
    
    if (authHeader) {
      try {
        const token = authHeader.replace('Bearer ', '')
        const decoded = verifyToken(token, c.env)
        if (decoded && decoded.userId) {
          userId = decoded.userId
        }
      } catch (e) {
        // Invalid token, continue as guest
      }
    }

    let query = `
      SELECT 
        t.*,
        u.username as producer_username,
        u.name as producer_name,
        u.avatar_url as producer_avatar,
        u.bio as producer_bio
    `
    
    // Add purchase status if user is authenticated
    if (userId) {
      query += `,
        CASE 
          WHEN EXISTS (
            SELECT 1 FROM purchases p 
            WHERE p.track_id = t.id 
            AND p.user_id = ? 
            AND (p.payment_status = 'COMPLETED' OR p.payment_status = 'completed')
          ) THEN 1
          ELSE 0
        END as is_purchased
      `
    } else {
      query += `, 0 as is_purchased`
    }
    
    query += `
      FROM tracks t
      LEFT JOIN users u ON t.user_id = u.id
      WHERE t.id = ?
    `
    
    const params: any[] = []
    if (userId) {
      params.push(userId)
    }
    params.push(id)

    const track = await c.env.DB.prepare(query).bind(...params).first()

    if (!track) {
      return c.json({ 
        success: false, 
        error: 'Track not found' 
      }, 404)
    }

    // Increment play count
    await c.env.DB.prepare(
      'UPDATE tracks SET plays_count = plays_count + 1 WHERE id = ?'
    ).bind(id).run()

    return c.json({
      success: true,
      data: track,
    })
  } catch (error: any) {
    console.error('Fetch track error:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to fetch track' 
    }, 500)
  }
})

/**
 * GET /api/tracks/genres/list
 * Get all unique genres
 */
tracks.get('/genres/list', async (c) => {
  try {
    const result = await c.env.DB.prepare(`
      SELECT DISTINCT genre, COUNT(*) as count
      FROM tracks 
      WHERE genre IS NOT NULL 
      GROUP BY genre 
      ORDER BY count DESC, genre ASC
    `).all()

    return c.json({
      success: true,
      data: result.results,
    })
  } catch (error: any) {
    console.error('Fetch genres error:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to fetch genres' 
    }, 500)
  }
})

// ============================================================================
// PROTECTED ENDPOINTS (Require Authentication)
// ============================================================================

/**
 * POST /api/tracks
 * Create new track (producers only)
 */
tracks.post('/', requireAuth, requireProducer, async (c) => {
  try {
    const user = getCurrentUser(c)
    if (!user) {
      return c.json({ 
        success: false, 
        error: 'Authentication required' 
      }, 401)
    }

    const body = await c.req.json()
    const {
      title,
      artist,
      album,
      genre,
      description,
      price,
      bpm,
      mood,
      tags,
      cover_url,
      audio_url,
      duration,
      release_year,
    } = body

    // Validation
    if (!title || !artist || !audio_url) {
      return c.json({ 
        success: false, 
        error: 'Title, artist, and audio_url are required' 
      }, 400)
    }

    // Insert track
    const result = await c.env.DB.prepare(`
      INSERT INTO tracks (
        user_id, title, artist, album, genre, description,
        price, bpm, mood, tags, cover_url, audio_url,
        duration, release_year, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `).bind(
      user.id,
      title,
      artist,
      album || null,
      genre || null,
      description || null,
      price || 0,
      bpm || null,
      mood || null,
      tags || null,
      cover_url || null,
      audio_url,
      duration || null,
      release_year || new Date().getFullYear()
    ).run()

    // Get the created track
    const track = await c.env.DB.prepare(
      'SELECT * FROM tracks WHERE id = ?'
    ).bind(result.meta.last_row_id).first()

    return c.json({
      success: true,
      message: 'Track created successfully',
      data: track,
    }, 201)

  } catch (error: any) {
    console.error('Create track error:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to create track' 
    }, 500)
  }
})

/**
 * PUT /api/tracks/:id
 * Update track (owner/admin only)
 */
tracks.put('/:id', requireAuth, async (c) => {
  try {
    const user = getCurrentUser(c)
    if (!user) {
      return c.json({ 
        success: false, 
        error: 'Authentication required' 
      }, 401)
    }

    const trackId = c.req.param('id')

    // Get track and check ownership
    const track = await c.env.DB.prepare(
      'SELECT user_id FROM tracks WHERE id = ?'
    ).bind(trackId).first() as { user_id: number } | null

    if (!track) {
      return c.json({ 
        success: false, 
        error: 'Track not found' 
      }, 404)
    }

    // Check permission
    if (track.user_id !== user.id && user.role !== 'admin') {
      return c.json({ 
        success: false, 
        error: 'Permission denied' 
      }, 403)
    }

    const body = await c.req.json()
    const updates: string[] = []
    const params: any[] = []

    // Build dynamic update query
    const allowedFields = [
      'title', 'artist', 'album', 'genre', 'description', 
      'price', 'bpm', 'mood', 'tags', 'cover_url'
    ]
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates.push(`${field} = ?`)
        params.push(body[field])
      }
    }

    if (updates.length === 0) {
      return c.json({ 
        success: false, 
        error: 'No fields to update' 
      }, 400)
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

  } catch (error: any) {
    console.error('Update track error:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to update track' 
    }, 500)
  }
})

/**
 * DELETE /api/tracks/:id
 * Delete track (owner/admin only)
 */
tracks.delete('/:id', requireAuth, async (c) => {
  try {
    const user = getCurrentUser(c)
    if (!user) {
      return c.json({ 
        success: false, 
        error: 'Authentication required' 
      }, 401)
    }

    const trackId = c.req.param('id')

    // Get track and check ownership
    const track = await c.env.DB.prepare(
      'SELECT user_id, audio_url, cover_url FROM tracks WHERE id = ?'
    ).bind(trackId).first() as { user_id: number, audio_url: string | null, cover_url: string | null } | null

    if (!track) {
      return c.json({ 
        success: false, 
        error: 'Track not found' 
      }, 404)
    }

    // Check permission
    if (track.user_id !== user.id && user.role !== 'admin') {
      return c.json({ 
        success: false, 
        error: 'Permission denied' 
      }, 403)
    }

    // Delete files from R2 (if they exist and use our storage)
    // TODO: Extract key from URL and delete from R2

    // Delete track from database
    await c.env.DB.prepare(
      'DELETE FROM tracks WHERE id = ?'
    ).bind(trackId).run()

    return c.json({
      success: true,
      message: 'Track deleted successfully',
    })

  } catch (error: any) {
    console.error('Delete track error:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to delete track' 
    }, 500)
  }
})

// ============================================================================
// FILE UPLOAD ENDPOINTS
// ============================================================================

/**
 * POST /api/tracks/upload/audio
 * Upload audio file to R2 (producers only)
 */
tracks.post('/upload/audio', requireAuth, requireProducer, async (c) => {
  try {
    const user = getCurrentUser(c)
    if (!user) {
      return c.json({ 
        success: false, 
        error: 'Authentication required' 
      }, 401)
    }

    // Parse multipart form data
    const formData = await c.req.formData()
    const file = formData.get('audio') as File

    if (!file) {
      return c.json({ 
        success: false, 
        error: 'No audio file provided' 
      }, 400)
    }

    // Validate audio file
    const validation = validateAudioFile(file)
    if (!validation.isValid) {
      return c.json({ 
        success: false, 
        error: validation.error 
      }, 400)
    }

    // Generate unique key
    const key = generateFileKey(user.id, file.name, 'audio')

    // Upload to R2
    const result = await uploadToR2(
      c.env.TRACKS_BUCKET,
      file,
      key,
      file.type
    )

    if (!result.success) {
      return c.json({ 
        success: false, 
        error: result.error 
      }, 500)
    }

    return c.json({
      success: true,
      data: {
        url: result.url,
        key: result.key,
        size: file.size,
        type: file.type,
      },
    })

  } catch (error: any) {
    console.error('Audio upload error:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to upload audio file' 
    }, 500)
  }
})

/**
 * POST /api/tracks/upload/cover
 * Upload cover image to R2 (producers only)
 */
tracks.post('/upload/cover', requireAuth, requireProducer, async (c) => {
  try {
    const user = getCurrentUser(c)
    if (!user) {
      return c.json({ 
        success: false, 
        error: 'Authentication required' 
      }, 401)
    }

    // Parse multipart form data
    const formData = await c.req.formData()
    const file = formData.get('cover') as File

    if (!file) {
      return c.json({ 
        success: false, 
        error: 'No cover image provided' 
      }, 400)
    }

    // Validate image file
    const validation = validateImageFile(file)
    if (!validation.isValid) {
      return c.json({ 
        success: false, 
        error: validation.error 
      }, 400)
    }

    // Generate unique key
    const key = generateFileKey(user.id, file.name, 'cover')

    // Upload to R2
    const result = await uploadToR2(
      c.env.TRACKS_BUCKET,
      file,
      key,
      file.type
    )

    if (!result.success) {
      return c.json({ 
        success: false, 
        error: result.error 
      }, 500)
    }

    return c.json({
      success: true,
      data: {
        url: result.url,
        key: result.key,
        size: file.size,
        type: file.type,
      },
    })

  } catch (error: any) {
    console.error('Cover upload error:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to upload cover image' 
    }, 500)
  }
})

/**
 * GET /api/tracks/stats
 * Get public platform statistics (no auth required)
 */
tracks.get('/stats', async (c) => {
  try {
    const db = c.env.DB

    // Get all stats in parallel
    const [tracksResult, usersResult, playsResult, artistsResult] = await Promise.all([
      db.prepare('SELECT COUNT(*) as count FROM tracks').first(),
      db.prepare('SELECT COUNT(*) as count FROM users').first(),
      db.prepare('SELECT COALESCE(SUM(plays_count), 0) as total FROM tracks').first(),
      db.prepare('SELECT COUNT(DISTINCT user_id) as count FROM tracks WHERE user_id IS NOT NULL').first(),
    ])

    return c.json({
      success: true,
      data: {
        tracks: (tracksResult as any)?.count || 0,
        users: (usersResult as any)?.count || 0,
        plays: (playsResult as any)?.total || 0,
        artists: (artistsResult as any)?.count || 0,
      }
    })
  } catch (error) {
    console.error('Stats error:', error)
    return c.json({ success: false, error: 'Failed to fetch stats' }, 500)
  }
})

export default tracks
