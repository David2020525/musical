/**
 * Search Routes
 * Handles search across tracks and forum
 */

import { Hono } from 'hono';
import { Bindings } from '../types';

const search = new Hono<{ Bindings: Bindings }>();

/**
 * Global search across tracks and forum
 * GET /api/search?q=query&type=all|tracks|forum
 */
search.get('/', async (c) => {
  try {
    const query = c.req.query('q')
    const type = c.req.query('type') || 'all'
    const limit = parseInt(c.req.query('limit') || '20')

    if (!query || query.trim().length < 2) {
      return c.json({
        success: false,
        error: 'Search query must be at least 2 characters',
      }, 400)
    }

    const searchTerm = `%${query}%`
    const results: any = {}

    // Search tracks
    if (type === 'all' || type === 'tracks') {
      const tracks = await c.env.DB.prepare(
        `SELECT 
          id, title, artist, genre, cover_url, audio_url, price,
          plays_count, likes_count
         FROM tracks
         WHERE title LIKE ? 
            OR artist LIKE ?
            OR description LIKE ?
            OR tags LIKE ?
         ORDER BY plays_count DESC, likes_count DESC
         LIMIT ?`
      ).bind(searchTerm, searchTerm, searchTerm, searchTerm, limit).all()

      results.tracks = tracks.results || []
    }

    // Search forum topics
    if (type === 'all' || type === 'forum') {
      const topics = await c.env.DB.prepare(
        `SELECT 
          t.id, t.slug, t.title, t.content, t.created_at,
          t.views_count, t.replies_count, t.likes_count,
          u.username as author_username,
          u.name as author_name,
          c.name as category_name
         FROM forum_topics t
         LEFT JOIN users u ON t.author_id = u.id
         LEFT JOIN forum_categories c ON t.category_id = c.id
         WHERE t.title LIKE ? OR t.content LIKE ?
         ORDER BY t.views_count DESC, t.replies_count DESC
         LIMIT ?`
      ).bind(searchTerm, searchTerm, limit).all()

      results.topics = topics.results || []
    }

    // Search forum replies (if specifically requested or in 'all' mode with small limit)
    if (type === 'forum' || (type === 'all' && limit <= 10)) {
      const replies = await c.env.DB.prepare(
        `SELECT 
          r.id, r.content, r.created_at,
          t.slug as topic_slug, t.title as topic_title,
          u.username as author_username,
          u.name as author_name
         FROM forum_replies r
         JOIN forum_topics t ON r.topic_id = t.id
         LEFT JOIN users u ON r.author_id = u.id
         WHERE r.content LIKE ?
         ORDER BY r.created_at DESC
         LIMIT ?`
      ).bind(searchTerm, Math.min(limit, 10)).all()

      results.replies = replies.results || []
    }

    // Count total results
    const totalResults = 
      (results.tracks?.length || 0) + 
      (results.topics?.length || 0) + 
      (results.replies?.length || 0)

    return c.json({
      success: true,
      query,
      type,
      totalResults,
      results,
    })
  } catch (error) {
    console.error('Search error:', error)
    return c.json({ success: false, error: 'Search failed' }, 500)
  }
})

/**
 * Search tracks only
 * GET /api/search/tracks?q=query
 */
search.get('/tracks', async (c) => {
  try {
    const query = c.req.query('q')
    const genre = c.req.query('genre')
    const producer = c.req.query('producer')
    const limit = parseInt(c.req.query('limit') || '50')

    if (!query || query.trim().length < 2) {
      return c.json({
        success: false,
        error: 'Search query must be at least 2 characters',
      }, 400)
    }

    const searchTerm = `%${query}%`
    let sql = `
      SELECT 
        t.*,
        u.username as producer_name,
        u.name as producer_display_name
      FROM tracks t
      LEFT JOIN users u ON t.user_id = u.id
      WHERE (t.title LIKE ? OR t.artist LIKE ? OR t.description LIKE ? OR t.tags LIKE ?)
    `
    const params: any[] = [searchTerm, searchTerm, searchTerm, searchTerm]

    if (genre && genre !== 'all') {
      sql += ' AND t.genre = ?'
      params.push(genre)
    }

    if (producer) {
      sql += ' AND u.username LIKE ?'
      params.push(`%${producer}%`)
    }

    sql += ' ORDER BY t.plays_count DESC, t.likes_count DESC LIMIT ?'
    params.push(limit)

    const tracks = await c.env.DB.prepare(sql).bind(...params).all()

    return c.json({
      success: true,
      query,
      totalResults: tracks.results?.length || 0,
      tracks: tracks.results || [],
    })
  } catch (error) {
    console.error('Track search error:', error)
    return c.json({ success: false, error: 'Track search failed' }, 500)
  }
})

/**
 * Search forum topics and replies
 * GET /api/search/forum?q=query&category=id
 */
search.get('/forum', async (c) => {
  try {
    const query = c.req.query('q')
    const category = c.req.query('category')
    const limit = parseInt(c.req.query('limit') || '50')

    if (!query || query.trim().length < 2) {
      return c.json({
        success: false,
        error: 'Search query must be at least 2 characters',
      }, 400)
    }

    const searchTerm = `%${query}%`
    
    // Search topics
    let topicSql = `
      SELECT 
        t.*,
        u.username as author_username,
        u.name as author_name,
        c.name as category_name
      FROM forum_topics t
      LEFT JOIN users u ON t.author_id = u.id
      LEFT JOIN forum_categories c ON t.category_id = c.id
      WHERE (t.title LIKE ? OR t.content LIKE ?)
    `
    const topicParams: any[] = [searchTerm, searchTerm]

    if (category) {
      topicSql += ' AND t.category_id = ?'
      topicParams.push(category)
    }

    topicSql += ' ORDER BY t.views_count DESC, t.replies_count DESC LIMIT ?'
    topicParams.push(limit)

    const topics = await c.env.DB.prepare(topicSql).bind(...topicParams).all()

    // Search replies
    let replySql = `
      SELECT 
        r.*,
        t.slug as topic_slug,
        t.title as topic_title,
        u.username as author_username,
        u.name as author_name
      FROM forum_replies r
      JOIN forum_topics t ON r.topic_id = t.id
      LEFT JOIN users u ON r.author_id = u.id
      WHERE r.content LIKE ?
    `
    const replyParams: any[] = [searchTerm]

    if (category) {
      replySql += ' AND t.category_id = ?'
      replyParams.push(category)
    }

    replySql += ' ORDER BY r.created_at DESC LIMIT ?'
    replyParams.push(Math.min(limit, 20))

    const replies = await c.env.DB.prepare(replySql).bind(...replyParams).all()

    return c.json({
      success: true,
      query,
      totalResults: (topics.results?.length || 0) + (replies.results?.length || 0),
      topics: topics.results || [],
      replies: replies.results || [],
    })
  } catch (error) {
    console.error('Forum search error:', error)
    return c.json({ success: false, error: 'Forum search failed' }, 500)
  }
})

/**
 * Get search suggestions (autocomplete)
 * GET /api/search/suggestions?q=query&type=tracks|forum
 */
search.get('/suggestions', async (c) => {
  try {
    const query = c.req.query('q')
    const type = c.req.query('type') || 'tracks'

    if (!query || query.trim().length < 2) {
      return c.json({ success: true, suggestions: [] })
    }

    const searchTerm = `${query}%`
    let suggestions: any[] = []

    if (type === 'tracks') {
      // Get top 5 matching track titles
      const tracks = await c.env.DB.prepare(
        `SELECT DISTINCT title, artist
         FROM tracks
         WHERE title LIKE ? OR artist LIKE ?
         ORDER BY plays_count DESC
         LIMIT 5`
      ).bind(searchTerm, searchTerm).all()

      suggestions = (tracks.results || []).map((t: any) => ({
        type: 'track',
        text: `${t.title} - ${t.artist}`,
        title: t.title,
        artist: t.artist,
      }))
    } else if (type === 'forum') {
      // Get top 5 matching topic titles
      const topics = await c.env.DB.prepare(
        `SELECT title, slug
         FROM forum_topics
         WHERE title LIKE ?
         ORDER BY views_count DESC
         LIMIT 5`
      ).bind(searchTerm).all()

      suggestions = (topics.results || []).map((t: any) => ({
        type: 'topic',
        text: t.title,
        slug: t.slug,
      }))
    }

    return c.json({
      success: true,
      suggestions,
    })
  } catch (error) {
    console.error('Suggestions error:', error)
    return c.json({ success: false, error: 'Failed to get suggestions' }, 500)
  }
})

export default search;
