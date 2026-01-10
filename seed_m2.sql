-- Enhanced Seed Data for M2 Complete Schema
-- Includes new fields: price, user_id, bpm, mood, tags, social links, etc.

-- Insert sample users (password: "password123" hashed with bcrypt)
-- Hash generated with: bcrypt.hashSync('password123', 10)
INSERT OR REPLACE INTO users (id, email, username, password_hash, name, role, bio, email_verified, instagram_url, twitter_url, spotify_url) VALUES 
  (1, 'admin@webapp.com', 'admin', '$2b$10$9WtizPNoGT75mmzZiDvFd.hmRYLe2h8SyObRk5nHcjEc1rTlbCK5m', 'Admin User', 'admin', 'System administrator', 1, NULL, NULL, NULL),
  (2, 'john@example.com', 'johndoe', '$2b$10$9WtizPNoGT75mmzZiDvFd.hmRYLe2h8SyObRk5nHcjEc1rTlbCK5m', 'John Doe', 'user', 'Music enthusiast and vinyl collector', 1, 'https://instagram.com/johndoe', 'https://twitter.com/johndoe', 'https://open.spotify.com/user/johndoe'),
  (3, 'jane@example.com', 'janesmith', '$2b$10$9WtizPNoGT75mmzZiDvFd.hmRYLe2h8SyObRk5nHcjEc1rTlbCK5m', 'Jane Smith', 'moderator', 'Community moderator and music producer', 1, 'https://instagram.com/janesmith', NULL, 'https://open.spotify.com/artist/janesmith'),
  (4, 'producer1@example.com', 'beatmaker', '$2b$10$9WtizPNoGT75mmzZiDvFd.hmRYLe2h8SyObRk5nHcjEc1rTlbCK5m', 'Beat Maker Pro', 'user', 'Professional music producer specializing in hip-hop and electronic beats', 1, 'https://instagram.com/beatmaker', 'https://twitter.com/beatmaker', 'https://open.spotify.com/artist/beatmaker'),
  (5, 'producer2@example.com', 'synthwave_hero', '$2b$10$9WtizPNoGT75mmzZiDvFd.hmRYLe2h8SyObRk5nHcjEc1rTlbCK5m', 'Synthwave Hero', 'user', 'Synthwave and retrowave music producer', 1, 'https://instagram.com/synthwave', NULL, NULL);

-- Mark users 4 and 5 as producers
UPDATE users SET is_producer = 1 WHERE id IN (4, 5);

-- Insert sample tracks with all new fields (price, user_id, bpm, mood, tags)
INSERT OR REPLACE INTO tracks (id, title, artist, album, genre, duration, release_year, audio_url, description, plays_count, likes_count, price, user_id, bpm, mood, tags, is_featured, cover_url) VALUES 
  (1, 'Summer Vibes', 'The Wavelengths', 'Endless Summer', 'Pop', 215, 2023, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 'An upbeat summer anthem perfect for beach days', 1234, 89, 29.99, 4, 128, 'Happy', 'pop,summer,upbeat,party', 1, '/static/default-artwork.jpg'),
  (2, 'Midnight Drive', 'Echo Dreams', 'Night Rider', 'Electronic', 245, 2023, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', 'Synthwave journey through neon-lit streets', 987, 67, 34.99, 5, 110, 'Dark', 'electronic,synthwave,dark,night', 1, '/static/default-artwork.jpg'),
  (3, 'Mountain Peak', 'Acoustic Souls', 'Nature Sounds', 'Folk', 198, 2022, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', 'Peaceful acoustic guitar with nature ambience', 2341, 134, 24.99, 4, 95, 'Peaceful', 'folk,acoustic,peaceful,nature', 0, '/static/default-artwork.jpg'),
  (4, 'Urban Groove', 'Beat Masters', 'City Life', 'Hip Hop', 203, 2024, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', 'Fresh beats from the streets', 3456, 201, 39.99, 4, 140, 'Energetic', 'hiphop,beats,urban,energetic', 1, '/static/default-artwork.jpg'),
  (5, 'Starlight Symphony', 'Classical Ensemble', 'Cosmos', 'Classical', 312, 2023, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', 'Orchestral masterpiece inspired by the cosmos', 876, 92, 49.99, 5, 80, 'Emotional', 'classical,orchestral,emotional,cinematic', 0, '/static/default-artwork.jpg');

-- Create wallets for producers
INSERT OR REPLACE INTO wallets (user_id, balance, total_earned, total_withdrawn) VALUES 
  (4, 285.50, 845.50, 560.00),
  (5, 412.75, 1236.75, 824.00);

-- Insert sample purchases (user 2 bought tracks from producers)
INSERT OR REPLACE INTO purchases (user_id, track_id, price, transaction_id, payment_method, payment_status) VALUES 
  (2, 1, 29.99, 'txn_001_summer_vibes', 'test', 'completed'),
  (2, 2, 34.99, 'txn_002_midnight_drive', 'test', 'completed'),
  (2, 4, 39.99, 'txn_003_urban_groove', 'test', 'completed'),
  (3, 1, 29.99, 'txn_004_summer_vibes', 'test', 'completed'),
  (3, 3, 24.99, 'txn_005_mountain_peak', 'test', 'completed');

-- Insert wallet transactions (earnings from purchases)
INSERT OR REPLACE INTO wallet_transactions (wallet_id, transaction_type, amount, description, reference_type, reference_id) VALUES 
  (1, 'earning', 29.99, 'Sale: Summer Vibes', 'purchase', 1),
  (2, 'earning', 34.99, 'Sale: Midnight Drive', 'purchase', 2),
  (1, 'earning', 39.99, 'Sale: Urban Groove', 'purchase', 3),
  (1, 'earning', 29.99, 'Sale: Summer Vibes', 'purchase', 4),
  (1, 'earning', 24.99, 'Sale: Mountain Peak', 'purchase', 5),
  (1, 'withdrawal', -560.00, 'Withdrawal to bank account', 'withdrawal', 1),
  (2, 'withdrawal', -824.00, 'Withdrawal to PayPal', 'withdrawal', 2);

-- Insert sample withdrawal requests
INSERT OR REPLACE INTO withdrawals (id, user_id, amount, status, payment_method, payment_details, requested_at, processed_at, processed_by) VALUES 
  (1, 4, 560.00, 'paid', 'bank_transfer', '{"bank": "Chase", "account": "****1234"}', '2024-12-15 10:30:00', '2024-12-16 14:22:00', 1),
  (2, 5, 824.00, 'paid', 'paypal', '{"email": "producer2@example.com"}', '2024-12-20 09:15:00', '2024-12-21 11:45:00', 1);

-- Insert play history (recent plays by users)
INSERT OR REPLACE INTO play_history (user_id, track_id, played_at) VALUES 
  (2, 1, '2026-01-10 08:30:00'),
  (2, 2, '2026-01-10 09:15:00'),
  (2, 4, '2026-01-10 10:45:00'),
  (3, 1, '2026-01-10 11:20:00'),
  (3, 3, '2026-01-10 12:00:00'),
  (2, 1, '2026-01-10 13:30:00'),
  (2, 3, '2026-01-10 14:15:00');

-- Insert user activities
INSERT OR REPLACE INTO user_activities (user_id, activity_type, entity_type, entity_id, description) VALUES 
  (4, 'upload', 'track', 1, 'Uploaded new track: Summer Vibes'),
  (4, 'upload', 'track', 3, 'Uploaded new track: Mountain Peak'),
  (4, 'upload', 'track', 4, 'Uploaded new track: Urban Groove'),
  (5, 'upload', 'track', 2, 'Uploaded new track: Midnight Drive'),
  (5, 'upload', 'track', 5, 'Uploaded new track: Starlight Symphony'),
  (2, 'purchase', 'track', 1, 'Purchased track: Summer Vibes'),
  (2, 'purchase', 'track', 2, 'Purchased track: Midnight Drive'),
  (2, 'purchase', 'track', 4, 'Purchased track: Urban Groove'),
  (3, 'purchase', 'track', 1, 'Purchased track: Summer Vibes'),
  (3, 'purchase', 'track', 3, 'Purchased track: Mountain Peak'),
  (2, 'forum_post', 'forum_topic', 1, 'Created topic: Welcome to the Music Community!'),
  (3, 'forum_post', 'forum_topic', 2, 'Created topic: Best DAW for Beginners?');

-- Insert forum categories (from original seed)
INSERT OR REPLACE INTO forum_categories (id, name, slug, description, icon, posts_count) VALUES 
  (1, 'General Discussion', 'general', 'Talk about anything music related', '💬', 45),
  (2, 'Music Production', 'production', 'Share tips and tricks for making music', '🎵', 32),
  (3, 'Gear Reviews', 'gear', 'Discuss instruments and equipment', '🎸', 28),
  (4, 'Upcoming Events', 'events', 'Concerts, festivals, and meetups', '🎪', 15);

-- Insert sample forum topics (from original seed)
INSERT OR REPLACE INTO forum_topics (id, category_id, author_id, title, slug, content, views_count, replies_count) VALUES 
  (1, 1, 2, 'Welcome to the Music Community!', 'welcome-music-community', 'Hey everyone! Excited to be part of this amazing community. What genres do you all enjoy?', 234, 12),
  (2, 2, 3, 'Best DAW for Beginners?', 'best-daw-beginners', 'I am just starting out with music production. What digital audio workstation would you recommend for beginners?', 456, 23),
  (3, 3, 2, 'Review: Audio-Technica ATH-M50x', 'review-ath-m50x', 'Just got these headphones and wanted to share my thoughts after a week of use...', 321, 8);

-- Insert sample forum replies (from original seed)
INSERT OR REPLACE INTO forum_replies (topic_id, author_id, content) VALUES 
  (1, 3, 'Welcome! I am mostly into electronic and synthwave. What about you?'),
  (1, 1, 'Great to have you here! We have a diverse community with all kinds of music tastes.'),
  (2, 2, 'I started with FL Studio and found it very beginner-friendly. Ableton is also great!'),
  (2, 1, 'Reaper is free and powerful. Great for learning the basics.');

-- Insert sample blog posts (from original seed)
INSERT OR REPLACE INTO blog_posts (id, author_id, title, slug, content, excerpt, published, views_count) VALUES 
  (1, 1, 'The Evolution of Music Streaming', 'evolution-music-streaming', 'Music streaming has transformed how we consume music over the past decade...', 'Exploring how streaming platforms changed the music industry', 1, 567),
  (2, 3, '10 Tips for Better Music Production', 'tips-music-production', 'Whether you are a beginner or intermediate producer, these tips will help...', 'Essential advice for improving your production skills', 1, 892),
  (3, 1, 'Upcoming Music Festivals 2024', 'upcoming-festivals-2024', 'Get ready for an amazing year of music! Here are the must-attend festivals...', 'Your guide to the best music festivals this year', 1, 1234);
