/**
 * Database Types for MusicHub
 * Auto-generated from Cloudflare D1 schema
 * 
 * These types match the actual database schema and are used across the application
 * for type-safe database operations.
 */

// ============================================================================
// USER & AUTHENTICATION
// ============================================================================

export interface User {
  id: number;
  email: string;
  username: string;
  password_hash: string;
  name: string;
  role: 'user' | 'moderator' | 'admin';
  avatar_url: string | null;
  bio: string | null;
  email_verified: number; // 0 or 1 (SQLite boolean)
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
  producer_application_id: number | null;
  is_producer: number; // 0 or 1 (SQLite boolean)
  banner_url: string | null;
  instagram_url: string | null;
  twitter_url: string | null;
  spotify_url: string | null;
  soundcloud_url: string | null;
  youtube_url: string | null;
}

export interface Session {
  id: number;
  user_id: number;
  token: string;
  expires_at: string; // ISO datetime
  created_at: string; // ISO datetime
}

export interface EmailVerificationToken {
  id: number;
  user_id: number;
  token: string;
  expires_at: string; // ISO datetime
  verified: number; // 0 or 1
  created_at: string; // ISO datetime
}

export interface PasswordResetToken {
  id: number;
  user_id: number;
  token: string;
  expires_at: string; // ISO datetime
  used: number; // 0 or 1
  created_at: string; // ISO datetime
}

// ============================================================================
// PRODUCER APPLICATION
// ============================================================================

export interface ProducerApplication {
  id: number;
  user_id: number;
  real_name: string;
  turkish_id: string; // TC Kimlik No
  phone: string;
  instagram_url: string | null;
  twitter_url: string | null;
  youtube_url: string | null;
  spotify_url: string | null;
  soundcloud_url: string | null;
  portfolio_url: string | null;
  sample_track_1: string | null;
  sample_track_2: string | null;
  sample_track_3: string | null;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes: string | null;
  reviewed_by: number | null; // admin user_id
  reviewed_at: string | null; // ISO datetime
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}

// ============================================================================
// TRACKS & MEDIA
// ============================================================================

export interface Track {
  id: number;
  user_id: number; // Producer who uploaded
  title: string;
  artist: string;
  album: string | null;
  genre: string | null;
  duration: number; // in seconds
  bpm: number | null;
  mood: string | null;
  tags: string | null; // comma-separated
  price: number; // DECIMAL(10,2)
  release_year: number | null;
  cover_url: string | null;
  audio_url: string | null;
  description: string | null;
  plays_count: number;
  likes_count: number;
  is_featured: number; // 0 or 1
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}

// ============================================================================
// TRANSACTIONS & PAYMENTS
// ============================================================================

export interface Purchase {
  id: number;
  user_id: number;
  track_id: number;
  price: number; // DECIMAL(10,2)
  transaction_id: string | null;
  payment_method: string | null; // 'credit_card', 'paypal', 'iyzico', etc.
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: string; // ISO datetime
}

export interface Wallet {
  id: number;
  user_id: number;
  balance: number; // DECIMAL(10,2)
  total_earned: number; // DECIMAL(10,2)
  total_withdrawn: number; // DECIMAL(10,2)
  currency: string; // 'TRY', 'USD', etc.
  updated_at: string; // ISO datetime
}

export interface WalletTransaction {
  id: number;
  wallet_id: number;
  transaction_type: 'earning' | 'withdrawal' | 'refund' | 'adjustment';
  amount: number; // DECIMAL(10,2)
  description: string | null;
  reference_type: string | null; // 'purchase', 'withdrawal', 'admin_adjustment'
  reference_id: number | null;
  created_at: string; // ISO datetime
}

export interface Withdrawal {
  id: number;
  user_id: number;
  amount: number; // DECIMAL(10,2)
  status: 'pending' | 'approved' | 'paid' | 'rejected' | 'cancelled';
  payment_method: string | null; // 'bank_transfer', 'paypal', etc.
  payment_details: string | null; // JSON string
  admin_notes: string | null;
  requested_at: string; // ISO datetime
  processed_at: string | null; // ISO datetime
  processed_by: number | null; // admin user_id
}

// ============================================================================
// SOCIAL FEATURES
// ============================================================================

export interface PlayHistory {
  id: number;
  user_id: number | null;
  track_id: number;
  played_at: string; // ISO datetime
}

export interface UserTrackLike {
  user_id: number;
  track_id: number;
  created_at: string; // ISO datetime
}

export interface TrackLike {
  id: number;
  user_id: number;
  track_id: number;
  created_at: string; // ISO datetime
}

export interface TrackPlay {
  id: number;
  track_id: number;
  user_id: number | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string; // ISO datetime
}

export interface UserActivity {
  id: number;
  user_id: number;
  activity_type: 'upload' | 'purchase' | 'like' | 'comment' | 'forum_post' | 'forum_reply';
  entity_type: 'track' | 'blog_post' | 'forum_topic' | 'forum_reply';
  entity_id: number;
  description: string | null;
  metadata: string | null; // JSON string
  created_at: string; // ISO datetime
}

// ============================================================================
// FORUM
// ============================================================================

export interface ForumCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  posts_count: number;
  created_at: string; // ISO datetime
}

export interface ForumTopic {
  id: number;
  category_id: number;
  author_id: number;
  title: string;
  slug: string;
  content: string;
  pinned: number; // 0 or 1
  locked: number; // 0 or 1
  views_count: number;
  replies_count: number;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}

export interface ForumReply {
  id: number;
  topic_id: number;
  author_id: number;
  content: string;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}

export interface ForumLike {
  id: number;
  user_id: number;
  topic_id: number | null;
  reply_id: number | null;
  created_at: string; // ISO datetime
}

// ============================================================================
// BLOG
// ============================================================================

export interface BlogPost {
  id: number;
  author_id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  published: number; // 0 or 1
  views_count: number;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}

// ============================================================================
// ADMIN & SYSTEM
// ============================================================================

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: number; // 0 or 1
  link: string | null;
  created_at: string; // ISO datetime
}

export interface Announcement {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'maintenance' | 'feature';
  active: number; // 0 or 1
  priority: number; // 1-10
  start_date: string | null; // ISO datetime
  end_date: string | null; // ISO datetime
  created_at: string; // ISO datetime
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
  link_url: string | null;
  link_text: string | null;
  order_index: number;
  active: number; // 0 or 1
  created_at: string; // ISO datetime
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  status: 'subscribed' | 'unsubscribed' | 'bounced';
  subscribed_at: string; // ISO datetime
  unsubscribed_at: string | null; // ISO datetime
}

export interface WithdrawalRequest {
  id: number;
  user_id: number;
  amount: number; // DECIMAL(10,2)
  status: 'pending' | 'approved' | 'paid' | 'rejected' | 'cancelled';
  payment_method: string; // 'bank_transfer', 'paypal', etc.
  payment_details: string; // JSON with IBAN/PayPal info
  admin_notes: string | null;
  requested_at: string; // ISO datetime
  processed_at: string | null; // ISO datetime
  processed_by: number | null; // admin user_id
}

// ============================================================================
// QUERY RESULT TYPES (with JOINs)
// ============================================================================

export interface TrackWithProducer extends Track {
  producer_name: string;
  producer_username: string;
  producer_avatar: string | null;
}

export interface PurchaseWithDetails extends Purchase {
  track_title: string;
  track_artist: string;
  track_cover_url: string | null;
  buyer_username: string;
  buyer_email: string;
}

export interface ForumTopicWithAuthor extends ForumTopic {
  author_username: string;
  author_avatar: string | null;
  category_name: string;
}

export interface ForumReplyWithAuthor extends ForumReply {
  author_username: string;
  author_avatar: string | null;
}

export interface ProducerApplicationWithUser extends ProducerApplication {
  user_email: string;
  user_username: string;
  user_name: string;
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  name: string;
  is_producer?: boolean;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: Omit<User, 'password_hash'>;
  error?: string;
}

export interface TrackUploadRequest {
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  bpm?: number;
  mood?: string;
  tags?: string;
  price: number;
  description?: string;
  audio_file: File;
  cover_image?: File;
}

export interface PurchaseRequest {
  track_id: number;
  payment_method: 'credit_card' | 'paypal' | 'iyzico';
  payment_token?: string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type UserRole = 'user' | 'moderator' | 'admin';
export type ProducerStatus = 'pending' | 'approved' | 'rejected';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type WithdrawalStatus = 'pending' | 'approved' | 'paid' | 'rejected' | 'cancelled';

// Helper type for database inserts (excluding auto-generated fields)
export type InsertUser = Omit<User, 'id' | 'created_at' | 'updated_at'>;
export type InsertTrack = Omit<Track, 'id' | 'plays_count' | 'likes_count' | 'created_at' | 'updated_at'>;
export type InsertPurchase = Omit<Purchase, 'id' | 'created_at'>;

// Helper type for database updates (partial)
export type UpdateUser = Partial<Omit<User, 'id' | 'email' | 'created_at'>>;
export type UpdateTrack = Partial<Omit<Track, 'id' | 'user_id' | 'created_at'>>;
