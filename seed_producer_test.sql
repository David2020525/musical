-- Test data for producer application system
-- This creates a test producer application

-- Insert a test pending application for user john@example.com (user_id = 2)
INSERT OR IGNORE INTO producer_applications (
  user_id, 
  real_name, 
  turkish_id, 
  phone,
  instagram_url,
  twitter_url,
  youtube_url,
  spotify_url,
  soundcloud_url,
  portfolio_url,
  sample_track_1,
  sample_track_2,
  sample_track_3,
  status,
  created_at,
  updated_at
) VALUES (
  2,
  'John Smith',
  '12345678901',
  '05551234567',
  'https://instagram.com/johnsmith',
  'https://twitter.com/johnsmith',
  'https://youtube.com/@johnsmith',
  'https://open.spotify.com/artist/johnsmith',
  'https://soundcloud.com/johnsmith',
  'https://johnsmith.com',
  'https://soundcloud.com/johnsmith/track1',
  'https://soundcloud.com/johnsmith/track2',
  'https://soundcloud.com/johnsmith/track3',
  'pending',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- Update user with producer_application_id
UPDATE users 
SET producer_application_id = (
  SELECT id FROM producer_applications WHERE user_id = 2
)
WHERE id = 2;

-- For testing: Create an approved producer application for jane@example.com (user_id = 3)
INSERT OR IGNORE INTO producer_applications (
  user_id, 
  real_name, 
  turkish_id, 
  phone,
  instagram_url,
  portfolio_url,
  sample_track_1,
  status,
  admin_notes,
  reviewed_by,
  reviewed_at,
  created_at,
  updated_at
) VALUES (
  3,
  'Jane Doe',
  '98765432109',
  '05559876543',
  'https://instagram.com/janedoe',
  'https://janedoe.com',
  'https://soundcloud.com/janedoe/amazing-track',
  'approved',
  'Excellent portfolio and great sample tracks!',
  1,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- Update jane to be a producer
UPDATE users 
SET is_producer = 1,
    producer_application_id = (
      SELECT id FROM producer_applications WHERE user_id = 3
    )
WHERE id = 3;
