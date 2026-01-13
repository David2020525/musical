-- Migration 0005: M3 Safe Additions (skips existing columns)
-- Adds M3 features: Purchases, Wallet, Withdrawals, Enhanced tables
-- Safe migration that only adds what's missing

-- ============================================================================
-- PART 1: Add NEW columns to existing tables (skip if exists)
-- ============================================================================

-- Tracks table enhancements
-- ALTER TABLE tracks ADD COLUMN preview_url TEXT; -- Will fail if exists, that's ok
-- ALTER TABLE tracks ADD COLUMN license_type TEXT DEFAULT 'PERSONAL';
-- ALTER TABLE tracks ADD COLUMN bitrate INTEGER;
-- ALTER TABLE tracks ADD COLUMN sample_rate INTEGER;
-- ALTER TABLE tracks ADD COLUMN file_size INTEGER;
-- ALTER TABLE tracks ADD COLUMN sales_count INTEGER DEFAULT 0;
-- ALTER TABLE tracks ADD COLUMN status TEXT DEFAULT 'PUBLISHED';

-- Users enhancements - skip avatar_url, bio (already exist)
-- Note: SQLite doesn't have IF NOT EXISTS for ALTER COLUMN, so we comment out existing ones

-- Forum topics enhancements
-- ALTER TABLE forum_topics ADD COLUMN is_pinned INTEGER DEFAULT 0;
-- ALTER TABLE forum_topics ADD COLUMN is_locked INTEGER DEFAULT 0;
-- ALTER TABLE forum_topics ADD COLUMN last_reply_at DATETIME;
-- ALTER TABLE forum_topics ADD COLUMN last_reply_by INTEGER;

-- Blog posts enhancements
-- ALTER TABLE blog_posts ADD COLUMN excerpt TEXT;
-- ALTER TABLE blog_posts ADD COLUMN meta_title TEXT;
-- ALTER TABLE blog_posts ADD COLUMN meta_description TEXT;
-- ALTER TABLE blog_posts ADD COLUMN scheduled_for DATETIME;

-- ============================================================================
-- PART 2: Create NEW tables (safe with IF NOT EXISTS)
-- ============================================================================

CREATE TABLE IF NOT EXISTS purchases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  track_id INTEGER NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  platform_commission DECIMAL(10,2) NOT NULL,
  artist_earning DECIMAL(10,2) NOT NULL,
  payment_id TEXT UNIQUE NOT NULL,
  payment_token TEXT,
  conversation_id TEXT,
  payment_status TEXT DEFAULT 'PENDING',
  paid_at DATETIME,
  download_count INTEGER DEFAULT 0,
  last_downloaded_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE RESTRICT
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_purchases_user_track ON purchases(user_id, track_id);
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_track_id ON purchases(track_id);

CREATE TABLE IF NOT EXISTS wallets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER UNIQUE NOT NULL,
  available_balance DECIMAL(10,2) DEFAULT 0.00,
  pending_balance DECIMAL(10,2) DEFAULT 0.00,
  lifetime_earnings DECIMAL(10,2) DEFAULT 0.00,
  bank_name TEXT,
  iban TEXT,
  account_holder TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets(user_id);

CREATE TABLE IF NOT EXISTS withdrawal_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  bank_name TEXT NOT NULL,
  iban TEXT NOT NULL,
  account_holder TEXT NOT NULL,
  note TEXT,
  status TEXT DEFAULT 'PENDING',
  admin_notes TEXT,
  processed_by INTEGER,
  processed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_withdrawal_requests_user_id ON withdrawal_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_withdrawal_requests_status ON withdrawal_requests(status);

CREATE TABLE IF NOT EXISTS forum_likes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  topic_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (topic_id) REFERENCES forum_topics(id) ON DELETE CASCADE,
  UNIQUE(user_id, topic_id)
);

CREATE INDEX IF NOT EXISTS idx_forum_likes_topic_id ON forum_likes(topic_id);

CREATE TABLE IF NOT EXISTS track_likes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  track_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE,
  UNIQUE(user_id, track_id)
);

CREATE INDEX IF NOT EXISTS idx_track_likes_track_id ON track_likes(track_id);

CREATE TABLE IF NOT EXISTS track_plays (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  track_id INTEGER NOT NULL,
  ip_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_track_plays_track_id ON track_plays(track_id);
CREATE INDEX IF NOT EXISTS idx_track_plays_created_at ON track_plays(created_at);

CREATE TABLE IF NOT EXISTS announcements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'INFO',
  is_active INTEGER DEFAULT 1,
  starts_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_announcements_is_active ON announcements(is_active);

CREATE TABLE IF NOT EXISTS hero_slides (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  link_url TEXT,
  button_text TEXT,
  order_num INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_hero_slides_order ON hero_slides(order_num);

CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read INTEGER DEFAULT 0,
  read_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);

-- ============================================================================
-- SUCCESS: M3 core tables created
-- Next: Apply column additions manually if needed
-- ============================================================================
