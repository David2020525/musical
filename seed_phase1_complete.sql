-- Phase 1 Complete Seed Data
-- Comprehensive test data for all M2 features
-- Run this after migration 0003 to populate all tables

-- ============================================================================
-- PART 1: Update existing tracks with new fields
-- ============================================================================

-- Update tracks with pricing and metadata (keeping existing user_id)
UPDATE tracks SET price = 24.99, bpm = 128, mood = 'Energetic', tags = 'Electronic,Dance,EDM' WHERE id = 1;
UPDATE tracks SET price = 19.99, bpm = 95, mood = 'Chill', tags = 'Lo-Fi,Hip-Hop,Relaxing' WHERE id = 2;
UPDATE tracks SET price = 29.99, bpm = 140, mood = 'Dark', tags = 'Trap,Bass,Urban' WHERE id = 3;
UPDATE tracks SET price = 34.99, bpm = 85, mood = 'Emotional', tags = 'R&B,Soul,Smooth' WHERE id = 4;
UPDATE tracks SET price = 27.99, bpm = 174, mood = 'Aggressive', tags = 'Drum and Bass,Jungle,Fast' WHERE id = 5;
UPDATE tracks SET price = 22.99, bpm = 132, mood = 'Uplifting', tags = 'House,Electronic,Dance' WHERE id = 6;
UPDATE tracks SET price = 26.99, bpm = 118, mood = 'Melodic', tags = 'Trance,Progressive,Electronic' WHERE id = 7;

-- Set featured tracks
UPDATE tracks SET is_featured = 1 WHERE id IN (1, 3, 4, 6);

-- ============================================================================
-- PART 2: Add social media links to users
-- ============================================================================

UPDATE users SET 
  instagram_url = 'https://instagram.com/johndoe',
  twitter_url = 'https://twitter.com/johndoe',
  soundcloud_url = 'https://soundcloud.com/johndoe',
  spotify_url = 'https://open.spotify.com/artist/johndoe',
  banner_url = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=300&fit=crop'
WHERE username = 'johndoe';

UPDATE users SET 
  instagram_url = 'https://instagram.com/janesmith',
  twitter_url = 'https://twitter.com/janesmith',
  youtube_url = 'https://youtube.com/@janesmith',
  spotify_url = 'https://open.spotify.com/artist/janesmith',
  banner_url = 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=300&fit=crop'
WHERE username = 'janesmith';

UPDATE users SET
  banner_url = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=300&fit=crop'
WHERE username = 'admin';

-- ============================================================================
-- PART 3: Create test purchases (admin bought some tracks)
-- ============================================================================

INSERT OR IGNORE INTO purchases (user_id, track_id, price, transaction_id, payment_method, payment_status, created_at) VALUES
  (1, 2, 19.99, 'txn_test_001', 'test', 'completed', datetime('now', '-15 days')),
  (1, 3, 29.99, 'txn_test_002', 'test', 'completed', datetime('now', '-10 days')),
  (1, 4, 34.99, 'txn_test_003', 'test', 'completed', datetime('now', '-5 days'));

-- More purchases from other users
INSERT OR IGNORE INTO purchases (user_id, track_id, price, transaction_id, payment_method, payment_status, created_at) VALUES
  (2, 3, 29.99, 'txn_test_004', 'test', 'completed', datetime('now', '-12 days')),
  (2, 5, 27.99, 'txn_test_005', 'test', 'completed', datetime('now', '-8 days')),
  (3, 1, 24.99, 'txn_test_006', 'test', 'completed', datetime('now', '-14 days')),
  (3, 4, 34.99, 'txn_test_007', 'test', 'completed', datetime('now', '-6 days'));

-- ============================================================================
-- PART 4: Create play history (simulate user listening)
-- ============================================================================

INSERT OR IGNORE INTO play_history (user_id, track_id, played_at) VALUES
  -- Admin play history
  (1, 1, datetime('now', '-2 hours')),
  (1, 2, datetime('now', '-1 hour')),
  (1, 3, datetime('now', '-30 minutes')),
  (1, 4, datetime('now', '-15 minutes')),
  (1, 1, datetime('now', '-5 minutes')),
  
  -- John play history
  (2, 5, datetime('now', '-3 hours')),
  (2, 4, datetime('now', '-2 hours')),
  (2, 3, datetime('now', '-1 hour')),
  (2, 6, datetime('now', '-45 minutes')),
  (2, 7, datetime('now', '-20 minutes')),
  
  -- Jane play history
  (3, 1, datetime('now', '-4 hours')),
  (3, 2, datetime('now', '-3 hours')),
  (3, 5, datetime('now', '-1 hour')),
  (3, 6, datetime('now', '-30 minutes'));

-- ============================================================================
-- PART 5: Create wallets for producers
-- ============================================================================

-- Create wallets for all users who have uploaded tracks
INSERT OR IGNORE INTO wallets (user_id, balance, total_earned, total_withdrawn, currency, updated_at) VALUES
  (1, 479.94, 599.94, 120.00, 'USD', datetime('now')),  -- Admin (has 5 tracks)
  (7, 68.97, 68.97, 0.00, 'USD', datetime('now')),     -- Producer test (has 1 track)
  (9, 53.98, 53.98, 0.00, 'USD', datetime('now'));     -- Review test (has 1 track)

-- ============================================================================
-- PART 6: Create wallet transactions (earnings history)
-- ============================================================================

INSERT OR IGNORE INTO wallet_transactions (wallet_id, transaction_type, amount, description, reference_type, reference_id, created_at) VALUES
  -- Admin's wallet transactions (wallet_id = 1)
  (1, 'earning', 19.99, 'Track sale: Midnight Drive', 'purchase', 1, datetime('now', '-15 days')),
  (1, 'earning', 29.99, 'Track sale: Mountain Peak', 'purchase', 2, datetime('now', '-12 days')),
  (1, 'earning', 34.99, 'Track sale: Urban Groove', 'purchase', 3, datetime('now', '-10 days')),
  (1, 'earning', 29.99, 'Track sale: Mountain Peak', 'purchase', 4, datetime('now', '-8 days')),
  (1, 'withdrawal', -120.00, 'PayPal withdrawal', 'withdrawal', 1, datetime('now', '-5 days')),
  (1, 'earning', 24.99, 'Track sale: Summer Vibes', 'purchase', 6, datetime('now', '-3 days')),
  (1, 'earning', 34.99, 'Track sale: Urban Groove', 'purchase', 7, datetime('now', '-2 days')),
  
  -- Producer test wallet transactions (wallet_id = 2)
  (2, 'earning', 22.99, 'Track sale: Electronic Dreams', 'purchase', NULL, datetime('now', '-10 days')),
  (2, 'earning', 22.99, 'Track sale: Electronic Dreams', 'purchase', NULL, datetime('now', '-7 days')),
  (2, 'earning', 22.99, 'Track sale: Electronic Dreams', 'purchase', NULL, datetime('now', '-3 days')),
  
  -- Review test wallet transactions (wallet_id = 3)
  (3, 'earning', 26.99, 'Track sale: Review Test Track', 'purchase', NULL, datetime('now', '-8 days')),
  (3, 'earning', 26.99, 'Track sale: Review Test Track', 'purchase', NULL, datetime('now', '-4 days'));

-- ============================================================================
-- PART 7: Create withdrawal requests
-- ============================================================================

INSERT OR IGNORE INTO withdrawals (user_id, amount, status, payment_method, payment_details, admin_notes, requested_at, processed_at, processed_by) VALUES
  -- Completed withdrawal for Admin
  (1, 120.00, 'paid', 'paypal', '{"email":"admin@paypal.com","verified":true}', 'Processed via PayPal', datetime('now', '-5 days'), datetime('now', '-5 days'), 1),
  
  -- Pending withdrawal for Producer test
  (7, 50.00, 'pending', 'bank_transfer', '{"bank":"Chase","account":"****5678","name":"Producer Test"}', NULL, datetime('now', '-1 day'), NULL, NULL);

-- ============================================================================
-- PART 8: Create user activities (activity feed)
-- ============================================================================

INSERT OR IGNORE INTO user_activities (user_id, activity_type, entity_type, entity_id, description, metadata, created_at) VALUES
  -- Admin's activities
  (1, 'purchase', 'track', 2, 'Purchased track: Midnight Drive', '{"price":19.99}', datetime('now', '-15 days')),
  (1, 'purchase', 'track', 3, 'Purchased track: Mountain Peak', '{"price":29.99}', datetime('now', '-10 days')),
  (1, 'purchase', 'track', 4, 'Purchased track: Urban Groove', '{"price":34.99}', datetime('now', '-5 days')),
  (1, 'like', 'track', 1, 'Liked track: Summer Vibes', NULL, datetime('now', '-3 days')),
  (1, 'like', 'track', 5, 'Liked track: Starlight Symphony', NULL, datetime('now', '-1 day')),
  
  -- John's activities
  (2, 'purchase', 'track', 3, 'Purchased track: Mountain Peak', '{"price":29.99}', datetime('now', '-12 days')),
  (2, 'purchase', 'track', 5, 'Purchased track: Starlight Symphony', '{"price":27.99}', datetime('now', '-8 days')),
  (2, 'like', 'track', 4, 'Liked track: Urban Groove', NULL, datetime('now', '-6 days')),
  (2, 'like', 'track', 6, 'Liked track: Electronic Dreams', NULL, datetime('now', '-4 days')),
  
  -- Jane's activities
  (3, 'purchase', 'track', 1, 'Purchased track: Summer Vibes', '{"price":24.99}', datetime('now', '-14 days')),
  (3, 'purchase', 'track', 4, 'Purchased track: Urban Groove', '{"price":34.99}', datetime('now', '-6 days')),
  (3, 'like', 'track', 2, 'Liked track: Midnight Drive', NULL, datetime('now', '-5 days')),
  (3, 'like', 'track', 7, 'Liked track: Review Test Track', NULL, datetime('now', '-2 days')),
  
  -- Producer test activities
  (7, 'upload', 'track', 6, 'Uploaded new track: Electronic Dreams (Remastered)', '{"genre":"Electronic","price":22.99}', datetime('now', '-20 days')),
  
  -- Review test activities
  (9, 'upload', 'track', 7, 'Uploaded new track: Review Test Track (Updated)', '{"genre":"Electronic","price":26.99}', datetime('now', '-18 days'));

-- ============================================================================
-- PART 9: Newsletter subscribers (test data)
-- ============================================================================

INSERT OR IGNORE INTO newsletter_subscribers (email, status, subscribed_at) VALUES
  ('subscriber1@example.com', 'subscribed', datetime('now', '-30 days')),
  ('subscriber2@example.com', 'subscribed', datetime('now', '-25 days')),
  ('subscriber3@example.com', 'subscribed', datetime('now', '-20 days')),
  ('subscriber4@example.com', 'subscribed', datetime('now', '-15 days')),
  ('music.lover@example.com', 'subscribed', datetime('now', '-10 days')),
  ('unsubscribed@example.com', 'unsubscribed', datetime('now', '-5 days'));
