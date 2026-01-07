-- Producer applications table
CREATE TABLE IF NOT EXISTS producer_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL UNIQUE,
  
  -- Personal Information
  real_name TEXT NOT NULL,
  turkish_id TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Social Links
  instagram_url TEXT,
  twitter_url TEXT,
  youtube_url TEXT,
  spotify_url TEXT,
  soundcloud_url TEXT,
  
  -- Portfolio Links
  portfolio_url TEXT,
  sample_track_1 TEXT,
  sample_track_2 TEXT,
  sample_track_3 TEXT,
  
  -- Application Status
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  admin_notes TEXT,
  reviewed_by INTEGER,
  reviewed_at DATETIME,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Add producer_application_id to users table for quick lookup
ALTER TABLE users ADD COLUMN producer_application_id INTEGER;
ALTER TABLE users ADD COLUMN is_producer INTEGER DEFAULT 0;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_producer_applications_user_id ON producer_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_producer_applications_status ON producer_applications(status);
CREATE INDEX IF NOT EXISTS idx_users_is_producer ON users(is_producer);
