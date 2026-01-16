import { Hono } from 'hono'
import type { Bindings } from '../types'
import { verifyToken } from '../lib/auth'
import { producerApplicationSchema } from '../lib/validations/producerApplication'

const app = new Hono<{ Bindings: Bindings }>()

// Get current user's producer application
app.get('/application', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
      return c.json({ success: false, error: 'Unauthorized' }, 401)
    }

    const token = authHeader.replace('Bearer ', '')
    const decoded = verifyToken(token, c.env)
    if (!decoded) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    const application = await c.env.DB.prepare(
      `SELECT * FROM producer_applications WHERE user_id = ?`
    )
      .bind(decoded.userId)
      .first()

    return c.json({
      success: true,
      data: application || null,
    })
  } catch (error) {
    console.error('Get application error:', error)
    return c.json({ success: false, error: 'Failed to fetch application' }, 500)
  }
})

// Submit producer application
app.post('/application', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
      return c.json({ success: false, error: 'Unauthorized' }, 401)
    }

    const token = authHeader.replace('Bearer ', '')
    const decoded = verifyToken(token, c.env)
    if (!decoded) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    // Parse and validate request body
    const body = await c.req.json()
    const validation = producerApplicationSchema.safeParse(body)

    if (!validation.success) {
      return c.json({
        success: false,
        error: 'Validation failed',
        details: validation.error.errors,
      }, 400)
    }

    const data = validation.data

    // Ensure optional fields are null instead of undefined for D1
    const cleanedData = {
      ...data,
      instagram_url: data.instagram_url || null,
      twitter_url: data.twitter_url || null,
      youtube_url: data.youtube_url || null,
      spotify_url: data.spotify_url || null,
      soundcloud_url: data.soundcloud_url || null,
      portfolio_url: data.portfolio_url || null,
      sample_track_1: data.sample_track_1 || null,
      sample_track_2: data.sample_track_2 || null,
      sample_track_3: data.sample_track_3 || null,
    }

    // Check if user already has an application
    const existingApplication = await c.env.DB.prepare(
      `SELECT id, status FROM producer_applications WHERE user_id = ?`
    )
      .bind(decoded.userId)
      .first()

    if (existingApplication) {
      return c.json({
        success: false,
        error: 'You have already submitted a producer application',
        data: existingApplication,
      }, 400)
    }

    // Insert new application
    // Convert undefined to null for SQL
    const result = await c.env.DB.prepare(
      `INSERT INTO producer_applications (
        user_id, real_name, turkish_id, phone,
        instagram_url, twitter_url, youtube_url, spotify_url, soundcloud_url,
        portfolio_url, sample_track_1, sample_track_2, sample_track_3,
        status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
    )
      .bind(
        decoded.userId,
        cleanedData.real_name,
        cleanedData.turkish_id,
        cleanedData.phone,
        cleanedData.instagram_url,
        cleanedData.twitter_url,
        cleanedData.youtube_url,
        cleanedData.spotify_url,
        cleanedData.soundcloud_url,
        cleanedData.portfolio_url,
        cleanedData.sample_track_1,
        cleanedData.sample_track_2,
        cleanedData.sample_track_3
      )
      .run()

    // Update user's producer_application_id
    await c.env.DB.prepare(
      `UPDATE users SET producer_application_id = ? WHERE id = ?`
    )
      .bind(result.meta.last_row_id, decoded.userId)
      .run()

    return c.json({
      success: true,
      message: 'Producer application submitted successfully',
      data: {
        id: result.meta.last_row_id,
        status: 'pending',
      },
    }, 201)
  } catch (error) {
    console.error('Submit application error:', error)
    return c.json({ success: false, error: 'Failed to submit application' }, 500)
  }
})

// Admin: Get all producer applications with filters
app.get('/admin/applications', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
      return c.json({ success: false, error: 'Unauthorized' }, 401)
    }

    const token = authHeader.replace('Bearer ', '')
    const decoded = verifyToken(token, c.env)
    if (!decoded) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    // Check if user is admin
    const user = await c.env.DB.prepare(
      `SELECT role FROM users WHERE id = ?`
    )
      .bind(decoded.userId)
      .first<{ role: string }>()

    if (!user || user.role !== 'admin') {
      return c.json({ success: false, error: 'Admin access required' }, 403)
    }

    // Get query parameters
    const status = c.req.query('status') // pending, approved, rejected
    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '20')
    const offset = (page - 1) * limit

    // Build query
    let query = `
      SELECT 
        pa.*,
        u.email,
        u.username,
        u.name as user_name,
        reviewer.name as reviewer_name
      FROM producer_applications pa
      LEFT JOIN users u ON pa.user_id = u.id
      LEFT JOIN users reviewer ON pa.reviewed_by = reviewer.id
    `
    const params: any[] = []

    if (status) {
      query += ` WHERE pa.status = ?`
      params.push(status)
    }

    query += ` ORDER BY pa.created_at DESC LIMIT ? OFFSET ?`
    params.push(limit, offset)

    const applications = await c.env.DB.prepare(query)
      .bind(...params)
      .all()

    // Get total count
    let countQuery = `SELECT COUNT(*) as count FROM producer_applications`
    if (status) {
      countQuery += ` WHERE status = ?`
    }

    const countResult = await c.env.DB.prepare(countQuery)
      .bind(...(status ? [status] : []))
      .first<{ count: number }>()

    return c.json({
      success: true,
      data: applications.results,
      pagination: {
        page,
        limit,
        total: countResult?.count || 0,
        totalPages: Math.ceil((countResult?.count || 0) / limit),
      },
    })
  } catch (error) {
    console.error('Get applications error:', error)
    return c.json({ success: false, error: 'Failed to fetch applications' }, 500)
  }
})

// Admin: Review producer application
app.post('/admin/applications/:id/review', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
      return c.json({ success: false, error: 'Unauthorized' }, 401)
    }

    const token = authHeader.replace('Bearer ', '')
    const decoded = verifyToken(token, c.env)
    if (!decoded) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    // Check if user is admin
    const user = await c.env.DB.prepare(
      `SELECT role FROM users WHERE id = ?`
    )
      .bind(decoded.userId)
      .first<{ role: string }>()

    if (!user || user.role !== 'admin') {
      return c.json({ success: false, error: 'Admin access required' }, 403)
    }

    const applicationId = c.req.param('id')
    const { status, admin_notes } = await c.req.json()

    if (!['approved', 'rejected'].includes(status)) {
      return c.json({ success: false, error: 'Invalid status' }, 400)
    }

    // Get application
    const application = await c.env.DB.prepare(
      `SELECT * FROM producer_applications WHERE id = ?`
    )
      .bind(applicationId)
      .first<{ user_id: number; status: string }>()

    if (!application) {
      return c.json({ success: false, error: 'Application not found' }, 404)
    }

    if (application.status !== 'pending') {
      return c.json({ success: false, error: 'Application already reviewed' }, 400)
    }

    // Update application status
    await c.env.DB.prepare(
      `UPDATE producer_applications 
       SET status = ?, admin_notes = ?, reviewed_by = ?, reviewed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    )
      .bind(status, admin_notes || null, decoded.userId, applicationId)
      .run()

    // If approved, update user's is_producer flag
    if (status === 'approved') {
      await c.env.DB.prepare(
        `UPDATE users SET is_producer = 1 WHERE id = ?`
      )
        .bind(application.user_id)
        .run()
    }

    return c.json({
      success: true,
      message: `Application ${status} successfully`,
      data: { status },
    })
  } catch (error) {
    console.error('Review application error:', error)
    return c.json({ success: false, error: 'Failed to review application' }, 500)
  }
})

export default app
