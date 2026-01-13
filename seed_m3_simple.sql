-- M3 Simple Seed Data - Works with existing schema
-- Creates admin user and test data

-- ============================================================================
-- Admin User (david2020524@gmail.com / password123)
-- ============================================================================

INSERT OR REPLACE INTO users (id, email, username, name, password_hash, role, is_producer, email_verified, created_at)
VALUES (
  100,
  'david2020524@gmail.com',
  'admin',
  'Admin User',
  '$2a$10$rN8YvM.9vx8PqX5X6I8ZPe4K4jh7kqK5nHZ.rXqK9K7C4K5h7kqK5',
  'admin',
  1,
  1,
  CURRENT_TIMESTAMP
);

-- ============================================================================
-- Test Producer (producer@musichub.com / password123)
-- ============================================================================

INSERT OR REPLACE INTO users (id, email, username, name, password_hash, role, is_producer, email_verified, created_at)
VALUES (
  101,
  'producer@musichub.com',
  'testproducer',
  'Test Producer',
  '$2a$10$rN8YvM.9vx8PqX5X6I8ZPe4K4jh7kqK5nHZ.rXqK9K7C4K5h7kqK5',
  'user',
  1,
  1,
  CURRENT_TIMESTAMP
);

-- ============================================================================
-- Test Listener (user@musichub.com / password123)
-- ============================================================================

INSERT OR REPLACE INTO users (id, email, username, name, password_hash, role, is_producer, email_verified, created_at)
VALUES (
  102,
  'user@musichub.com',
  'testuser',
  'Test User',
  '$2a$10$rN8YvM.9vx8PqX5X6I8ZPe4K4jh7kqK5nHZ.rXqK9K7C4K5h7kqK5',
  'user',
  0,
  1,
  CURRENT_TIMESTAMP
);

-- ============================================================================
-- Sample Announcements
-- ============================================================================

INSERT OR IGNORE INTO announcements (title, content, type, is_active)
VALUES 
  ('Welcome to MusicHub M3!', 'Experience the new payment system, wallet, and enhanced features.', 'INFO', 1),
  ('Upload Your Music', 'Producers can now upload tracks directly to the platform!', 'SUCCESS', 1);

-- ============================================================================
-- Sample Hero Slides
-- ============================================================================

INSERT OR IGNORE INTO hero_slides (title, subtitle, image_url, link_url, button_text, order_num, is_active)
VALUES 
  ('Discover Amazing Music', 'Browse and purchase high-quality tracks', 'https://via.placeholder.com/1920x600/9333EA/ffffff?text=Discover', '/en/browse', 'Browse Now', 1, 1),
  ('Become a Producer', 'Upload and sell your music', 'https://via.placeholder.com/1920x600/EC4899/ffffff?text=Producer', '/en/producer/apply', 'Apply', 2, 1);

-- ============================================================================
-- Results
-- ============================================================================

SELECT 'M3 Data Seeded!' as status;
SELECT 'Login as Admin: david2020524@gmail.com / password123' as info;
