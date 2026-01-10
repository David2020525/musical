-- Migration 0003: M2 Complete Schema
-- Adds all missing tables and columns required for M2 features
-- Estimated migration time: ~5 seconds

-- ============================================================================
-- PART 1: Add missing columns to existing tables
-- ============================================================================

-- Tracks table enhancements
ALTER TABLE tracks ADD COLUMN price DECIMAL(10,2) DEFAULT 29.99;
ALTER TABLE tracks ADD COLUMN user_id INTEGER; -- Producer who uploaded
ALTER TABLE tracks ADD COLUMN bpm INTEGER;
ALTER TABLE tracks ADD COLUMN mood TEXT;
ALTER TABLE tracks ADD COLUMN tags TEXT;
ALTER TABLE tracks ADD COLUMN is_featured INTEGER DEFAULT 0;

-- Users table enhancements
ALTER TABLE users ADD COLUMN banner_url TEXT;
ALTER TABLE users ADD COLUMN instagram_url TEXT;
ALTER TABLE users ADD COLUMN twitter_url TEXT;
ALTER TABLE users ADD COLUMN spotify_url TEXT;
ALTER TABLE users ADD COLUMN soundcloud_url TEXT;
ALTER TABLE users ADD COLUMN youtube_url TEXT;

-- ============================================================================
-- PART 2: Create new tables for M2 features
-- ============================================================================

-- Email verification tokens
CREATE TABLE IF NOT EXISTS email_verification_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  verified INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_email_verification_tokens_token ON email_verification_tokens(token);
CREATE INDEX IF NOT EXISTS idx_email_verification_tokens_user_id ON email_verification_tokens(user_id);

-- Password reset tokens
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  used INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);

-- Purchases table (track purchases)
CREATE TABLE IF NOT EXISTS purchases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  track_id INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  transaction_id TEXT UNIQUE,
  payment_method TEXT, -- 'stripe', 'paypal', 'test'
  payment_status TEXT DEFAULT 'completed', -- 'pending', 'completed', 'failed', 'refunded'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_track_id ON purchases(track_id);
CREATE INDEX IF NOT EXISTS idx_purchases_transaction_id ON purchases(transaction_id);

-- Play history table
CREATE TABLE IF NOT EXISTS play_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  track_id INTEGER NOT NULL,
  played_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_play_history_user_id ON play_history(user_id);
CREATE INDEX IF NOT EXISTS idx_play_history_track_id ON play_history(track_id);
CREATE INDEX IF NOT EXISTS idx_play_history_played_at ON play_history(played_at);

-- Wallets table (for producers)
CREATE TABLE IF NOT EXISTS wallets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL UNIQUE,
  balance DECIMAL(10,2) DEFAULT 0.00,
  total_earned DECIMAL(10,2) DEFAULT 0.00,
  total_withdrawn DECIMAL(10,2) DEFAULT 0.00,
  currency TEXT DEFAULT 'USD',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets(user_id);

-- Wallet transactions (earnings and withdrawals log)
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  wallet_id INTEGER NOT NULL,
  transaction_type TEXT NOT NULL, -- 'earning', 'withdrawal', 'refund', 'adjustment'
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  reference_type TEXT, -- 'purchase', 'withdrawal', 'admin_adjustment'
  reference_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (wallet_id) REFERENCES wallets(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_wallet_transactions_wallet_id ON wallet_transactions(wallet_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_created_at ON wallet_transactions(created_at);

-- Withdrawal requests
CREATE TABLE IF NOT EXISTS withdrawals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'paid', 'rejected', 'cancelled'
  payment_method TEXT, -- 'bank_transfer', 'paypal', 'other'
  payment_details TEXT, -- JSON with bank/PayPal info
  admin_notes TEXT,
  requested_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  processed_at DATETIME,
  processed_by INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (processed_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_withdrawals_user_id ON withdrawals(user_id);
CREATE INDEX IF NOT EXISTS idx_withdrawals_status ON withdrawals(status);
CREATE INDEX IF NOT EXISTS idx_withdrawals_requested_at ON withdrawals(requested_at);

-- User activities (activity feed)
CREATE TABLE IF NOT EXISTS user_activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  activity_type TEXT NOT NULL, -- 'upload', 'purchase', 'like', 'comment', 'forum_post', 'forum_reply'
  entity_type TEXT NOT NULL, -- 'track', 'blog_post', 'forum_topic', 'forum_reply'
  entity_id INTEGER NOT NULL,
  description TEXT,
  metadata TEXT, -- JSON for additional data
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_user_activities_user_id ON user_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_created_at ON user_activities(created_at);

-- Newsletter subscribers (optional)
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'subscribed', -- 'subscribed', 'unsubscribed', 'bounced'
  subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at DATETIME
);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON newsletter_subscribers(status);

-- ============================================================================
-- PART 3: Add foreign key indexes for performance
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_tracks_user_id ON tracks(user_id);
CREATE INDEX IF NOT EXISTS idx_tracks_price ON tracks(price);
CREATE INDEX IF NOT EXISTS idx_tracks_is_featured ON tracks(is_featured);
CREATE INDEX IF NOT EXISTS idx_tracks_bpm ON tracks(bpm);

-- ============================================================================
-- PART 4: Update existing data (set default values where needed)
-- ============================================================================

-- Set default BPM for existing tracks
UPDATE tracks SET bpm = 120 WHERE bpm IS NULL;

-- Set default mood for existing tracks
UPDATE tracks SET mood = 'Energetic' WHERE mood IS NULL;

-- Set default price for existing tracks (already has DEFAULT in ALTER)
UPDATE tracks SET price = 29.99 WHERE price IS NULL;

-- Set default tags for existing tracks
UPDATE tracks SET tags = genre WHERE tags IS NULL AND genre IS NOT NULL;
