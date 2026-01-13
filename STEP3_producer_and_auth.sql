-- Step 3: Producer applications and authentication tokens
CREATE TABLE IF NOT EXISTS producer_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL UNIQUE,
  real_name TEXT NOT NULL,
  turkish_id TEXT NOT NULL,
  phone TEXT NOT NULL,
  instagram_url TEXT,
  twitter_url TEXT,
  youtube_url TEXT,
  spotify_url TEXT,
  soundcloud_url TEXT,
  portfolio_url TEXT,
  sample_track_1 TEXT,
  sample_track_2 TEXT,
  sample_track_3 TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  reviewed_by INTEGER,
  reviewed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS email_verification_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  verified INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  used INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
