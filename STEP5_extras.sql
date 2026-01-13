-- Step 5: Additional tables (likes, notifications, announcements)
CREATE TABLE IF NOT EXISTS forum_likes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  topic_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (topic_id) REFERENCES forum_topics(id) ON DELETE CASCADE,
  UNIQUE(user_id, topic_id)
);

CREATE TABLE IF NOT EXISTS track_likes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  track_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE,
  UNIQUE(user_id, track_id)
);

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

CREATE INDEX IF NOT EXISTS idx_forum_likes_topic_id ON forum_likes(topic_id);
CREATE INDEX IF NOT EXISTS idx_track_likes_track_id ON track_likes(track_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
