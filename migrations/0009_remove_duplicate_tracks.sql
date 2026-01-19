-- Migration 0009: Remove Duplicate Tracks and Add Unique Constraint
-- Removes duplicate tracks based on title and artist, keeping the oldest one
-- Then adds a unique constraint to prevent future duplicates

-- Step 1: Delete duplicate tracks, keeping only the one with the lowest ID (oldest)
DELETE FROM tracks
WHERE id NOT IN (
    SELECT MIN(id)
    FROM tracks
    GROUP BY title, artist
);

-- Step 2: Add unique constraint on (title, artist) combination
-- Note: SQLite doesn't support ALTER TABLE ADD CONSTRAINT directly
-- So we'll create a new table with the constraint and copy data

-- Create new tracks table with unique constraint (includes all columns from migrations)
CREATE TABLE IF NOT EXISTS tracks_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  album TEXT,
  genre TEXT,
  duration INTEGER,
  release_year INTEGER,
  cover_url TEXT,
  audio_url TEXT,
  description TEXT,
  plays_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  price REAL DEFAULT 0.0,
  user_id INTEGER,
  bpm INTEGER,
  mood TEXT,
  tags TEXT,
  is_featured INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(title, artist),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Copy all data from old table to new table (handles missing columns gracefully)
INSERT INTO tracks_new (
    id, title, artist, album, genre, duration, release_year, cover_url, audio_url,
    description, plays_count, likes_count, price, user_id, bpm, mood, tags, is_featured,
    created_at, updated_at
)
SELECT 
    id, 
    title, 
    artist, 
    album, 
    genre, 
    duration, 
    release_year, 
    cover_url, 
    audio_url,
    description, 
    COALESCE(plays_count, 0) as plays_count, 
    COALESCE(likes_count, 0) as likes_count, 
    COALESCE(price, 0.0) as price,
    user_id, 
    bpm, 
    mood, 
    tags, 
    COALESCE(is_featured, 0) as is_featured,
    COALESCE(created_at, CURRENT_TIMESTAMP) as created_at,
    COALESCE(updated_at, CURRENT_TIMESTAMP) as updated_at
FROM tracks
ORDER BY id;

-- Drop old table
DROP TABLE tracks;

-- Rename new table to tracks
ALTER TABLE tracks_new RENAME TO tracks;

-- Recreate indexes
CREATE INDEX IF NOT EXISTS idx_tracks_genre ON tracks(genre);
CREATE INDEX IF NOT EXISTS idx_tracks_artist ON tracks(artist);
CREATE INDEX IF NOT EXISTS idx_tracks_user_id ON tracks(user_id);
CREATE INDEX IF NOT EXISTS idx_tracks_is_featured ON tracks(is_featured);
CREATE INDEX IF NOT EXISTS idx_tracks_created_at ON tracks(created_at);
