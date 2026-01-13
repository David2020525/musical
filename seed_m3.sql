-- M3 Seed Data
-- Creates admin user, test users, wallets, and sample data

-- ============================================================================
-- Admin User
-- Password: password123 (hashed with bcrypt)
-- ============================================================================

INSERT OR REPLACE INTO users (id, email, username, name, password_hash, role, is_producer, email_verified, created_at)
VALUES (
  1,
  'david2020524@gmail.com',
  'admin',
  'Admin User',
  '$2a$10$rN8YvM.9vx8PqX5X6I8ZPe4K4jh7kqK5nHZ.rXqK9K7C4K5h7kqK5', -- password123
  'admin',
  1,
  1,
  CURRENT_TIMESTAMP
);

-- Create wallet for admin
INSERT OR IGNORE INTO wallets (user_id, available_balance, pending_balance, lifetime_earnings)
VALUES (1, 0.00, 0.00, 0.00);

-- ============================================================================
-- Test Producer User
-- ============================================================================

INSERT OR REPLACE INTO users (id, email, username, name, password_hash, role, is_producer, email_verified, created_at)
VALUES (
  2,
  'producer@musichub.com',
  'testproducer',
  'Test Producer',
  '$2a$10$rN8YvM.9vx8PqX5X6I8ZPe4K4jh7kqK5nHZ.rXqK9K7C4K5h7kqK5', -- password123
  'user',
  1,
  1,
  CURRENT_TIMESTAMP
);

-- Create wallet for producer
INSERT OR IGNORE INTO wallets (user_id, available_balance, pending_balance, lifetime_earnings)
VALUES (2, 150.00, 50.00, 200.00); -- Has some earnings

-- ============================================================================
-- Test Listener User
-- ============================================================================

INSERT OR REPLACE INTO users (id, email, username, name, password_hash, role, is_producer, email_verified, created_at)
VALUES (
  3,
  'user@musichub.com',
  'testuser',
  'Test User',
  '$2a$10$rN8YvM.9vx8PqX5X6I8ZPe4K4jh7kqK5nHZ.rXqK9K7C4K5h7kqK5', -- password123
  'user',
  0,
  1,
  CURRENT_TIMESTAMP
);

-- ============================================================================
-- Sample Purchases (test user bought tracks)
-- ============================================================================

INSERT OR IGNORE INTO purchases (
  user_id, track_id, amount, platform_commission, artist_earning,
  payment_id, payment_status, paid_at, created_at
)
VALUES 
  (3, 1, 24.99, 3.75, 21.24, 'payment_test_001', 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (3, 2, 29.99, 4.50, 25.49, 'payment_test_002', 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================================================
-- Sample Withdrawal Requests
-- ============================================================================

INSERT OR IGNORE INTO withdrawal_requests (
  user_id, amount, bank_name, iban, account_holder, status, created_at
)
VALUES 
  (2, 100.00, 'Ziraat Bankası', 'TR330006100519786457841326', 'Test Producer', 'PENDING', CURRENT_TIMESTAMP),
  (1, 50.00, 'İş Bankası', 'TR640001301234567890123456', 'Admin User', 'PAID', CURRENT_TIMESTAMP);

-- ============================================================================
-- Sample Announcements
-- ============================================================================

INSERT OR IGNORE INTO announcements (title, content, type, is_active, created_at)
VALUES 
  ('Welcome to MusicHub!', 'Start exploring and discovering amazing music tracks from talented producers.', 'INFO', 1, CURRENT_TIMESTAMP),
  ('Special Offer', 'Get 20% off on all tracks this week! Use code: MUSIC20', 'SUCCESS', 1, CURRENT_TIMESTAMP);

-- ============================================================================
-- Sample Hero Slides
-- ============================================================================

INSERT OR IGNORE INTO hero_slides (title, subtitle, image_url, link_url, button_text, order_num, is_active)
VALUES 
  ('Discover Amazing Music', 'Browse thousands of high-quality tracks from talented producers', 'https://via.placeholder.com/1920x600/9333EA/ffffff?text=Discover+Music', '/en/browse', 'Browse Tracks', 1, 1),
  ('Become a Producer', 'Upload and sell your music to thousands of listeners', 'https://via.placeholder.com/1920x600/EC4899/ffffff?text=Become+Producer', '/en/producer/apply', 'Apply Now', 2, 1),
  ('Join Our Community', 'Connect with other music lovers in our forum', 'https://via.placeholder.com/1920x600/3B82F6/ffffff?text=Community', '/en/forum', 'Join Forum', 3, 1);

-- ============================================================================
-- Sample Track Plays
-- ============================================================================

INSERT OR IGNORE INTO track_plays (user_id, track_id, created_at)
SELECT 3, 1, datetime('now', '-' || (ABS(RANDOM()) % 30) || ' days')
FROM (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5);

INSERT OR IGNORE INTO track_plays (user_id, track_id, created_at)
SELECT 3, 2, datetime('now', '-' || (ABS(RANDOM()) % 30) || ' days')
FROM (SELECT 1 UNION SELECT 2 UNION SELECT 3);

-- ============================================================================
-- Sample Track Likes
-- ============================================================================

INSERT OR IGNORE INTO track_likes (user_id, track_id, created_at)
VALUES 
  (3, 1, CURRENT_TIMESTAMP),
  (3, 2, CURRENT_TIMESTAMP),
  (1, 1, CURRENT_TIMESTAMP);

-- ============================================================================
-- Sample Notifications
-- ============================================================================

INSERT OR IGNORE INTO notifications (user_id, type, title, message, link, is_read, created_at)
VALUES 
  (3, 'PURCHASE', 'Purchase Successful', 'You purchased "Summer Vibes" for 24.99 TL', '/en/dashboard', 1, datetime('now', '-2 days')),
  (2, 'SALE', 'Track Sold!', 'Your track "Summer Vibes" was purchased. You earned 21.24 TL', '/en/dashboard', 0, datetime('now', '-2 days')),
  (2, 'WITHDRAWAL', 'Withdrawal Pending', 'Your withdrawal request for 100.00 TL is being processed', '/en/dashboard', 0, datetime('now', '-1 day'));

-- ============================================================================
-- Update track statistics
-- ============================================================================

UPDATE tracks SET plays_count = 5, likes_count = 2, sales_count = 1 WHERE id = 1;
UPDATE tracks SET plays_count = 3, likes_count = 1, sales_count = 1 WHERE id = 2;

-- ============================================================================
-- Seed Complete
-- ============================================================================

SELECT 'M3 Seed Data Inserted Successfully!' as result;
SELECT 'Admin: david2020524@gmail.com / password123' as login_info;
SELECT 'Producer: producer@musichub.com / password123' as login_info;
SELECT 'User: user@musichub.com / password123' as login_info;
