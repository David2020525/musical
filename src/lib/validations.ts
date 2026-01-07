import { z } from 'zod'

// Auth validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
})

// Blog validation schemas
export const blogPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  excerpt: z.string().max(300).optional(),
  cover_image: z.string().url().optional().or(z.literal('')),
  published: z.boolean().default(false),
})

// Forum validation schemas
export const forumTopicSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  category_id: z.number().positive(),
})

export const forumReplySchema = z.object({
  content: z.string().min(1, 'Reply cannot be empty').max(5000),
})

// Track validation schemas
export const trackSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  artist: z.string().min(1, 'Artist is required').max(100),
  album: z.string().max(200).optional(),
  genre: z.string().max(50).optional(),
  duration: z.number().positive().optional(),
  release_year: z.number().min(1900).max(2100).optional(),
  cover_url: z.string().url().optional().or(z.literal('')),
  audio_url: z.string().url().optional().or(z.literal('')),
  description: z.string().max(1000).optional(),
})

// User profile validation schemas
export const profileUpdateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  bio: z.string().max(500).optional(),
  avatar_url: z.string().url().optional().or(z.literal('')),
})

// Export types
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type BlogPostInput = z.infer<typeof blogPostSchema>
export type ForumTopicInput = z.infer<typeof forumTopicSchema>
export type ForumReplyInput = z.infer<typeof forumReplySchema>
export type TrackInput = z.infer<typeof trackSchema>
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>
