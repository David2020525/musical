// User types
export type UserRole = 'user' | 'moderator' | 'admin'

export interface User {
  id: number
  email: string
  username: string
  name: string
  role: UserRole
  avatar_url?: string
  bio?: string
  email_verified: boolean
  created_at: string
  updated_at: string
}

export interface Session {
  user: User
  token: string
  expires_at: string
}

// Track types
export interface Track {
  id: number
  title: string
  artist: string
  album?: string
  genre?: string
  duration?: number
  release_year?: number
  cover_url?: string
  audio_url?: string
  description?: string
  plays_count: number
  likes_count: number
  created_at: string
  updated_at: string
}

// Blog types
export interface BlogPost {
  id: number
  author_id: number
  author?: User
  title: string
  slug: string
  content: string
  excerpt?: string
  cover_image?: string
  published: boolean
  views_count: number
  created_at: string
  updated_at: string
}

// Forum types
export interface ForumCategory {
  id: number
  name: string
  slug: string
  description?: string
  icon?: string
  posts_count: number
  created_at: string
}

export interface ForumTopic {
  id: number
  category_id: number
  category?: ForumCategory
  author_id: number
  author?: User
  title: string
  slug: string
  content: string
  pinned: boolean
  locked: boolean
  views_count: number
  replies_count: number
  created_at: string
  updated_at: string
}

export interface ForumReply {
  id: number
  topic_id: number
  author_id: number
  author?: User
  content: string
  created_at: string
  updated_at: string
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Cloudflare bindings
export interface Bindings {
  DB: D1Database
}
