-- MusicHub Seed Data for Development
-- This file populates the database with test data for all major features
-- Run with: npm run db:seed

-- ============================================================================
-- 1. USERS (Listeners, Producers, Admin)
-- ============================================================================

-- Admin User (password: admin123)
INSERT INTO users (id, email, username, password_hash, name, role, email_verified, bio, is_producer, created_at) VALUES 
(1, 'admin@webapp.com', 'admin', '$2a$10$rGvCJXHnS3mS3nJ5kKqODOjVZj2fvNh6nK5bY8kJmNqZGvWqNqWqW', 'System Admin', 'admin', 1, 'MusicHub Platform Administrator', 0, datetime('now', '-365 days'));

-- Producer Users (password: password123)
INSERT INTO users (id, email, username, password_hash, name, role, email_verified, bio, is_producer, created_at) VALUES 
(2, 'john@example.com', 'john_producer', '$2a$10$rGvCJXHnS3mS3nJ5kKqODOjVZj2fvNh6nK5bY8kJmNqZGvWqNqWqW', 'John Smith', 'user', 1, 'Electronic music producer from Istanbul. Specializing in Deep House and Techno.', 1, datetime('now', '-180 days')),
(3, 'sarah@example.com', 'sarah_beats', '$2a$10$rGvCJXHnS3mS3nJ5kKqODOjVZj2fvNh6nK5bY8kJmNqZGvWqNqWqW', 'Sarah Johnson', 'user', 1, 'Hip-hop and R&B producer. Creating vibes since 2015.', 1, datetime('now', '-150 days')),
(4, 'mehmet@example.com', 'mehmet_sound', '$2a$10$rGvCJXHnS3mS3nJ5kKqODOjVZj2fvNh6nK5bY8kJmNqZGvWqNqWqW', 'Mehmet Yılmaz', 'user', 1, 'Türk sanat müziği ve modern füzyon yapımcısı.', 1, datetime('now', '-120 days')),
(5, 'alex@example.com', 'dj_alex', '$2a$10$rGvCJXHnS3mS3nJ5kKqODOjVZj2fvNh6nK5bY8kJmNqZGvWqNqWqW', 'Alex Rodriguez', 'user', 1, 'Trance and Progressive House. Touring DJ and producer.', 1, datetime('now', '-90 days'));

-- Listener Users (password: password123)
INSERT INTO users (id, email, username, password_hash, name, role, email_verified, bio, is_producer, created_at) VALUES 
(6, 'emily@example.com', 'emily_music', '$2a$10$rGvCJXHnS3mS3nJ5kKqODOjVZj2fvNh6nK5bY8kJmNqZGvWqNqWqW', 'Emily Davis', 'user', 1, 'Music enthusiast. Love discovering new artists.', 0, datetime('now', '-60 days')),
(7, 'david@example.com', 'david_listener', '$2a$10$rGvCJXHnS3mS3nJ5kKqODOjVZj2fvNh6nK5bY8kJmNqZGvWqNqWqW', 'David Brown', 'user', 1, 'Electronic music lover. Daily listener.', 0, datetime('now', '-45 days')),
(8, 'ayse@example.com', 'ayse_k', '$2a$10$rGvCJXHnS3mS3nJ5kKqODOjVZj2fvNh6nK5bY8kJmNqZGvWqNqWqW', 'Ayşe Kaya', 'user', 1, 'Her tarz müziği dinlerim. Yeni keşifler için buradayım!', 0, datetime('now', '-30 days'));

-- ============================================================================
-- 2. PRODUCER APPLICATIONS
-- ============================================================================

INSERT INTO producer_applications (user_id, real_name, turkish_id, phone, instagram_url, youtube_url, soundcloud_url, spotify_url, status, reviewed_by, reviewed_at, created_at) VALUES 
(2, 'John Smith', '12345678901', '+905551234567', 'https://instagram.com/johnproducer', 'https://youtube.com/@johnsmith', 'https://soundcloud.com/johnsmith', 'https://open.spotify.com/artist/johnsmith', 'approved', 1, datetime('now', '-175 days'), datetime('now', '-180 days')),
(3, 'Sarah Johnson', '23456789012', '+905551234568', 'https://instagram.com/sarahbeats', 'https://youtube.com/@sarahjohnson', 'https://soundcloud.com/sarahbeats', 'https://open.spotify.com/artist/sarah', 'approved', 1, datetime('now', '-145 days'), datetime('now', '-150 days')),
(4, 'Mehmet Yılmaz', '34567890123', '+905551234569', 'https://instagram.com/mehmetsound', 'https://youtube.com/@mehmetyilmaz', 'https://soundcloud.com/mehmetsound', NULL, 'approved', 1, datetime('now', '-115 days'), datetime('now', '-120 days')),
(5, 'Alex Rodriguez', '45678901234', '+905551234570', 'https://instagram.com/djalex', 'https://youtube.com/@djalex', 'https://soundcloud.com/djalex', 'https://open.spotify.com/artist/djalex', 'approved', 1, datetime('now', '-85 days'), datetime('now', '-90 days'));

-- ============================================================================
-- 3. TRACKS (Sample music from producers)
-- ============================================================================

-- John's Tracks (Deep House & Techno)
INSERT INTO tracks (id, user_id, title, artist, album, genre, duration, bpm, mood, tags, price, release_year, cover_url, audio_url, description, plays_count, likes_count, is_featured, created_at) VALUES 
(1, 2, 'Midnight Groove', 'John Smith', 'Deep Sessions Vol. 1', 'Deep House', 327, 124, 'Chill', 'deep house,electronic,chill', 29.99, 2024, 'https://picsum.photos/seed/track1/400/400', 'https://example.com/audio/track1.mp3', 'A smooth deep house track perfect for late night sessions. Features warm basslines and atmospheric pads.', 1523, 89, 1, datetime('now', '-150 days')),
(2, 2, 'Urban Pulse', 'John Smith', 'Deep Sessions Vol. 1', 'Techno', 412, 128, 'Energetic', 'techno,electronic,club', 34.99, 2024, 'https://picsum.photos/seed/track2/400/400', 'https://example.com/audio/track2.mp3', 'High-energy techno banger designed for peak-time club sets.', 987, 67, 1, datetime('now', '-120 days')),
(3, 2, 'Ocean Breeze', 'John Smith', 'Ambient Collection', 'Ambient', 285, 100, 'Relaxing', 'ambient,chill,downtempo', 24.99, 2024, 'https://picsum.photos/seed/track3/400/400', 'https://example.com/audio/track3.mp3', 'Serene ambient soundscape inspired by coastal mornings.', 645, 45, 0, datetime('now', '-90 days'));

-- Sarah's Tracks (Hip-Hop & R&B)
INSERT INTO tracks (id, user_id, title, artist, album, genre, duration, bpm, mood, tags, price, release_year, cover_url, audio_url, description, plays_count, likes_count, is_featured, created_at) VALUES 
(4, 3, 'City Lights', 'Sarah Johnson', 'Urban Stories', 'Hip-Hop', 198, 92, 'Uplifting', 'hip-hop,rap,urban', 29.99, 2024, 'https://picsum.photos/seed/track4/400/400', 'https://example.com/audio/track4.mp3', 'Smooth hip-hop beat with jazzy undertones and crisp drums.', 2341, 134, 1, datetime('now', '-130 days')),
(5, 3, 'Soulful Nights', 'Sarah Johnson', 'R&B Sessions', 'R&B', 234, 78, 'Romantic', 'r&b,soul,vocals', 32.99, 2024, 'https://picsum.photos/seed/track5/400/400', 'https://example.com/audio/track5.mp3', 'Sultry R&B instrumental with lush Rhodes and warm bass.', 1876, 112, 1, datetime('now', '-100 days')),
(6, 3, 'Trap Energy', 'Sarah Johnson', 'Urban Stories', 'Trap', 167, 140, 'Aggressive', 'trap,hip-hop,bass', 27.99, 2024, 'https://picsum.photos/seed/track6/400/400', 'https://example.com/audio/track6.mp3', 'Hard-hitting trap beat with 808 slides and crisp hi-hats.', 1234, 89, 0, datetime('now', '-70 days'));

-- Mehmet's Tracks (Turkish Fusion)
INSERT INTO tracks (id, user_id, title, artist, album, genre, duration, bpm, mood, tags, price, release_year, cover_url, audio_url, description, plays_count, likes_count, is_featured, created_at) VALUES 
(7, 4, 'İstanbul Geceleri', 'Mehmet Yılmaz', 'Modern Türküler', 'World', 256, 110, 'Nostalgic', 'world,turkish,fusion', 34.99, 2024, 'https://picsum.photos/seed/track7/400/400', 'https://example.com/audio/track7.mp3', 'Geleneksel Türk müziği ile modern elektronik seslerin füzyonu.', 1654, 98, 1, datetime('now', '-110 days')),
(8, 4, 'Anadolu Rüzgarı', 'Mehmet Yılmaz', 'Modern Türküler', 'World', 312, 95, 'Uplifting', 'world,turkish,traditional', 29.99, 2024, 'https://picsum.photos/seed/track8/400/400', 'https://example.com/audio/track8.mp3', 'Anadolu ezgileri ile modern aranjmanların buluşması.', 1123, 76, 0, datetime('now', '-80 days'));

-- Alex's Tracks (Trance & Progressive)
INSERT INTO tracks (id, user_id, title, artist, album, genre, duration, bpm, mood, tags, price, release_year, cover_url, audio_url, description, plays_count, likes_count, is_featured, created_at) VALUES 
(9, 5, 'Horizon', 'DJ Alex', 'Euphoria', 'Trance', 456, 138, 'Euphoric', 'trance,uplifting,progressive', 39.99, 2024, 'https://picsum.photos/seed/track9/400/400', 'https://example.com/audio/track9.mp3', 'Uplifting trance anthem with emotional melodies and driving bassline.', 3456, 234, 1, datetime('now', '-80 days')),
(10, 5, 'Dreamscape', 'DJ Alex', 'Euphoria', 'Progressive House', 389, 126, 'Dreamy', 'progressive,house,melodic', 36.99, 2024, 'https://picsum.photos/seed/track10/400/400', 'https://example.com/audio/track10.mp3', 'Progressive house journey with lush pads and hypnotic grooves.', 2789, 178, 1, datetime('now', '-50 days')),
(11, 5, 'Solar Flare', 'DJ Alex', 'Energy EP', 'Psytrance', 423, 145, 'Energetic', 'psytrance,psychedelic,electronic', 32.99, 2024, 'https://picsum.photos/seed/track11/400/400', 'https://example.com/audio/track11.mp3', 'High-octane psytrance with cosmic soundscapes and rolling basslines.', 1567, 134, 0, datetime('now', '-30 days'));

-- Free Sample Tracks
INSERT INTO tracks (id, user_id, title, artist, album, genre, duration, bpm, mood, tags, price, release_year, cover_url, audio_url, description, plays_count, likes_count, is_featured, created_at) VALUES 
(12, 2, 'Summer Vibes (Free)', 'John Smith', 'Free Samples', 'House', 198, 122, 'Happy', 'house,summer,free', 0.00, 2024, 'https://picsum.photos/seed/track12/400/400', 'https://example.com/audio/track12.mp3', 'Free house track - perfect for your summer playlist!', 5634, 345, 1, datetime('now', '-25 days')),
(13, 3, 'Lo-Fi Dreams (Free)', 'Sarah Johnson', 'Free Beats', 'Lo-Fi', 156, 85, 'Relaxing', 'lofi,chill,free', 0.00, 2024, 'https://picsum.photos/seed/track13/400/400', 'https://example.com/audio/track13.mp3', 'Chill lo-fi beat for studying or relaxing. 100% free!', 7823, 456, 1, datetime('now', '-15 days'));

-- ============================================================================
-- 4. PURCHASES (Track sales)
-- ============================================================================

INSERT INTO purchases (user_id, track_id, price, transaction_id, payment_method, payment_status, created_at) VALUES 
(6, 1, 29.99, 'TXN_001_2024', 'credit_card', 'completed', datetime('now', '-60 days')),
(6, 4, 29.99, 'TXN_002_2024', 'credit_card', 'completed', datetime('now', '-58 days')),
(7, 2, 34.99, 'TXN_003_2024', 'credit_card', 'completed', datetime('now', '-55 days')),
(7, 9, 39.99, 'TXN_004_2024', 'credit_card', 'completed', datetime('now', '-52 days')),
(8, 7, 34.99, 'TXN_005_2024', 'credit_card', 'completed', datetime('now', '-50 days')),
(6, 5, 32.99, 'TXN_006_2024', 'paypal', 'completed', datetime('now', '-45 days')),
(7, 7, 34.99, 'TXN_007_2024', 'credit_card', 'completed', datetime('now', '-40 days')),
(8, 1, 29.99, 'TXN_008_2024', 'credit_card', 'completed', datetime('now', '-35 days')),
(6, 10, 36.99, 'TXN_009_2024', 'credit_card', 'completed', datetime('now', '-30 days')),
(7, 4, 29.99, 'TXN_010_2024', 'paypal', 'completed', datetime('now', '-25 days'));

-- ============================================================================
-- 5. WALLETS (Producer earnings)
-- ============================================================================

INSERT INTO wallets (user_id, balance, total_earned, total_withdrawn, currency) VALUES 
(2, 245.32, 523.45, 278.13, 'TRY'), -- John
(3, 412.67, 789.23, 376.56, 'TRY'), -- Sarah
(4, 189.45, 267.89, 78.44, 'TRY'),  -- Mehmet
(5, 678.90, 1234.56, 555.66, 'TRY'); -- Alex

-- ============================================================================
-- 6. PLAY HISTORY
-- ============================================================================

-- Recent plays for all tracks
INSERT INTO play_history (user_id, track_id, played_at) VALUES 
-- Emily's listening history
(6, 1, datetime('now', '-1 days')),
(6, 2, datetime('now', '-1 days', '-2 hours')),
(6, 12, datetime('now', '-2 days')),
(6, 4, datetime('now', '-3 days')),
(6, 13, datetime('now', '-4 days')),

-- David's listening history
(7, 9, datetime('now', '-1 days')),
(7, 10, datetime('now', '-1 days', '-3 hours')),
(7, 2, datetime('now', '-2 days')),
(7, 7, datetime('now', '-3 days')),
(7, 12, datetime('now', '-5 days')),

-- Ayşe's listening history
(8, 7, datetime('now', '-1 days')),
(8, 8, datetime('now', '-2 days')),
(8, 13, datetime('now', '-2 days', '-5 hours')),
(8, 1, datetime('now', '-4 days')),
(8, 4, datetime('now', '-6 days'));

-- ============================================================================
-- 7. TRACK LIKES
-- ============================================================================

INSERT INTO user_track_likes (user_id, track_id, created_at) VALUES 
-- Emily likes
(6, 1, datetime('now', '-60 days')),
(6, 4, datetime('now', '-58 days')),
(6, 5, datetime('now', '-45 days')),
(6, 12, datetime('now', '-25 days')),

-- David likes
(7, 2, datetime('now', '-55 days')),
(7, 9, datetime('now', '-52 days')),
(7, 10, datetime('now', '-30 days')),
(7, 13, datetime('now', '-20 days')),

-- Ayşe likes
(8, 7, datetime('now', '-50 days')),
(8, 8, datetime('now', '-40 days')),
(8, 1, datetime('now', '-35 days'));

-- ============================================================================
-- 8. FORUM CATEGORIES
-- ============================================================================

INSERT INTO forum_categories (id, name, slug, description, icon, posts_count) VALUES 
(1, 'General Discussion', 'general', 'Talk about anything music-related', 'fa-comments', 45),
(2, 'Production Tips', 'production-tips', 'Share production techniques and tips', 'fa-sliders', 67),
(3, 'Gear Talk', 'gear', 'Discuss equipment and software', 'fa-headphones', 34),
(4, 'Feedback', 'feedback', 'Get feedback on your tracks', 'fa-star', 89),
(5, 'Industry News', 'news', 'Latest music industry news', 'fa-newspaper', 23);

-- ============================================================================
-- 9. FORUM TOPICS
-- ============================================================================

INSERT INTO forum_topics (id, category_id, author_id, title, slug, content, pinned, views_count, replies_count, created_at) VALUES 
(1, 1, 2, 'Welcome to MusicHub!', 'welcome-to-musichub', 'Hey everyone! Excited to be part of this community. Looking forward to sharing music and connecting with fellow producers.', 1, 234, 12, datetime('now', '-150 days')),
(2, 2, 3, 'Best plugins for mixing vocals?', 'best-vocal-plugins', 'What are your go-to plugins for mixing vocals? I''m currently using FabFilter Pro-Q3 and Waves Renaissance Vox. Would love to hear your recommendations!', 0, 156, 23, datetime('now', '-120 days')),
(3, 3, 5, 'MIDI controller recommendations', 'midi-controller-recs', 'Looking to upgrade my MIDI controller. Budget around $500. What do you guys recommend? Considering Arturia KeyLab or Native Instruments Komplete Kontrol.', 0, 89, 15, datetime('now', '-90 days')),
(4, 4, 4, 'My first track - would love feedback!', 'first-track-feedback', 'Just finished my first complete track! It''s a fusion of traditional Turkish music with electronic elements. I''d really appreciate any feedback on the mix and arrangement.', 0, 178, 34, datetime('now', '-60 days')),
(5, 5, 6, 'Spotify''s new artist features', 'spotify-new-features', 'Has anyone tried Spotify''s new Canvas feature for tracks? Wondering if it''s worth creating custom videos for each release.', 0, 67, 8, datetime('now', '-30 days'));

-- ============================================================================
-- 10. FORUM REPLIES
-- ============================================================================

INSERT INTO forum_replies (topic_id, author_id, content, created_at) VALUES 
-- Replies to "Welcome to MusicHub"
(1, 3, 'Welcome! Great to have you here. Don''t hesitate to share your work!', datetime('now', '-149 days')),
(1, 5, 'Hey! Looking forward to hearing your music!', datetime('now', '-148 days')),

-- Replies to "Best plugins for mixing vocals"
(2, 2, 'I swear by Slate Digital''s Virtual Mix Rack. The revival plugin is incredible for vocals.', datetime('now', '-119 days')),
(2, 4, 'Auto-Tune Pro is essential for me. Also check out iZotope Nectar for the all-in-one solution.', datetime('now', '-118 days')),
(2, 5, 'Don''t sleep on the free stuff! TDR Nova is amazing and completely free.', datetime('now', '-117 days')),

-- Replies to "MIDI controller recommendations"
(3, 2, 'I have the KeyLab 61. Build quality is amazing and the integration with Analog Lab is seamless.', datetime('now', '-89 days')),
(3, 3, 'Komplete Kontrol is great if you''re already in the NI ecosystem. The light guide is super helpful.', datetime('now', '-88 days')),

-- Replies to "My first track - would love feedback"
(4, 2, 'Just listened! The fusion is really unique. I''d suggest pulling back the reverb on the main melody around 1:30.', datetime('now', '-59 days')),
(4, 3, 'Love the concept! The percussion could use a bit more punch in the mix. Overall great work!', datetime('now', '-58 days')),
(4, 5, 'This is fire! The cultural elements blend so well with the electronic production. Keep it up!', datetime('now', '-57 days'));

-- ============================================================================
-- 11. BLOG POSTS
-- ============================================================================

INSERT INTO blog_posts (id, author_id, title, slug, content, excerpt, cover_image, published, views_count, created_at) VALUES 
(1, 1, '10 Tips for Better Mixing', '10-mixing-tips', '# 10 Tips for Better Mixing\n\nMixing is an art form that takes years to master...', 'Learn essential mixing techniques that will take your productions to the next level.', 'https://picsum.photos/seed/blog1/800/400', 1, 1234, datetime('now', '-90 days')),
(2, 1, 'The Future of AI in Music Production', 'ai-in-music', '# The Future of AI in Music Production\n\nArtificial Intelligence is changing the music industry...', 'Explore how AI is revolutionizing music creation and what it means for producers.', 'https://picsum.photos/seed/blog2/800/400', 1, 987, datetime('now', '-60 days')),
(3, 1, 'Getting Started as a Music Producer', 'getting-started-producer', '# Getting Started as a Music Producer\n\nSo you want to make music? Here''s where to begin...', 'A comprehensive guide for aspiring producers starting their journey.', 'https://picsum.photos/seed/blog3/800/400', 1, 2345, datetime('now', '-30 days'));

-- ============================================================================
-- 12. SESSIONS (Active user sessions)
-- ============================================================================

INSERT INTO sessions (user_id, token, expires_at, created_at) VALUES 
(6, 'session_emily_' || hex(randomblob(16)), datetime('now', '+7 days'), datetime('now', '-2 hours')),
(7, 'session_david_' || hex(randomblob(16)), datetime('now', '+7 days'), datetime('now', '-4 hours')),
(8, 'session_ayse_' || hex(randomblob(16)), datetime('now', '+7 days'), datetime('now', '-1 days'));

-- ============================================================================
-- END OF SEED DATA
-- ============================================================================

-- Update sequence counters
UPDATE sqlite_sequence SET seq = 8 WHERE name = 'users';
UPDATE sqlite_sequence SET seq = 13 WHERE name = 'tracks';
UPDATE sqlite_sequence SET seq = 5 WHERE name = 'forum_categories';
UPDATE sqlite_sequence SET seq = 5 WHERE name = 'forum_topics';
UPDATE sqlite_sequence SET seq = 3 WHERE name = 'blog_posts';

-- Verify counts
SELECT 'Users:', COUNT(*) FROM users;
SELECT 'Tracks:', COUNT(*) FROM tracks;
SELECT 'Purchases:', COUNT(*) FROM purchases;
SELECT 'Wallets:', COUNT(*) FROM wallets;
SELECT 'Play History:', COUNT(*) FROM play_history;
SELECT 'Forum Categories:', COUNT(*) FROM forum_categories;
SELECT 'Forum Topics:', COUNT(*) FROM forum_topics;
SELECT 'Forum Replies:', COUNT(*) FROM forum_replies;
