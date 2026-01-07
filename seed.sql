-- Insert sample users (password: "password123" hashed with bcrypt)
INSERT OR IGNORE INTO users (id, email, username, password_hash, name, role, bio) VALUES 
  (1, 'admin@webapp.com', 'admin', '$2a$10$rKx.KZ8N5Q7qF9nVJZXqNOVvJP.kKyKGqP1K5P5cJ1RqJ1K5P5cJ1', 'Admin User', 'admin', 'System administrator'),
  (2, 'john@example.com', 'johndoe', '$2a$10$rKx.KZ8N5Q7qF9nVJZXqNOVvJP.kKyKGqP1K5P5cJ1RqJ1K5P5cJ1', 'John Doe', 'user', 'Music enthusiast'),
  (3, 'jane@example.com', 'janesmith', '$2a$10$rKx.KZ8N5Q7qF9nVJZXqNOVvJP.kKyKGqP1K5P5cJ1RqJ1K5P5cJ1', 'Jane Smith', 'moderator', 'Community moderator');

-- Insert sample tracks
INSERT OR IGNORE INTO tracks (id, title, artist, album, genre, duration, release_year, description, plays_count, likes_count) VALUES 
  (1, 'Summer Vibes', 'The Wavelengths', 'Endless Summer', 'Pop', 215, 2023, 'An upbeat summer anthem perfect for beach days', 1234, 89),
  (2, 'Midnight Drive', 'Echo Dreams', 'Night Rider', 'Electronic', 245, 2023, 'Synthwave journey through neon-lit streets', 987, 67),
  (3, 'Mountain Peak', 'Acoustic Souls', 'Nature Sounds', 'Folk', 198, 2022, 'Peaceful acoustic guitar with nature ambience', 2341, 134),
  (4, 'Urban Groove', 'Beat Masters', 'City Life', 'Hip Hop', 203, 2024, 'Fresh beats from the streets', 3456, 201),
  (5, 'Starlight Symphony', 'Classical Ensemble', 'Cosmos', 'Classical', 312, 2023, 'Orchestral masterpiece inspired by the cosmos', 876, 92);

-- Insert forum categories
INSERT OR IGNORE INTO forum_categories (id, name, slug, description, icon, posts_count) VALUES 
  (1, 'General Discussion', 'general', 'Talk about anything music related', '💬', 45),
  (2, 'Music Production', 'production', 'Share tips and tricks for making music', '🎵', 32),
  (3, 'Gear Reviews', 'gear', 'Discuss instruments and equipment', '🎸', 28),
  (4, 'Upcoming Events', 'events', 'Concerts, festivals, and meetups', '🎪', 15);

-- Insert sample forum topics
INSERT OR IGNORE INTO forum_topics (id, category_id, author_id, title, slug, content, views_count, replies_count) VALUES 
  (1, 1, 2, 'Welcome to the Music Community!', 'welcome-music-community', 'Hey everyone! Excited to be part of this amazing community. What genres do you all enjoy?', 234, 12),
  (2, 2, 3, 'Best DAW for Beginners?', 'best-daw-beginners', 'I am just starting out with music production. What digital audio workstation would you recommend for beginners?', 456, 23),
  (3, 3, 2, 'Review: Audio-Technica ATH-M50x', 'review-ath-m50x', 'Just got these headphones and wanted to share my thoughts after a week of use...', 321, 8);

-- Insert sample forum replies
INSERT OR IGNORE INTO forum_replies (topic_id, author_id, content) VALUES 
  (1, 3, 'Welcome! I am mostly into electronic and synthwave. What about you?'),
  (1, 1, 'Great to have you here! We have a diverse community with all kinds of music tastes.'),
  (2, 2, 'I started with FL Studio and found it very beginner-friendly. Ableton is also great!'),
  (2, 1, 'Reaper is free and powerful. Great for learning the basics.');

-- Insert sample blog posts
INSERT OR IGNORE INTO blog_posts (id, author_id, title, slug, content, excerpt, published, views_count) VALUES 
  (1, 1, 'The Evolution of Music Streaming', 'evolution-music-streaming', 'Music streaming has transformed how we consume music over the past decade...', 'Exploring how streaming platforms changed the music industry', 1, 567),
  (2, 3, '10 Tips for Better Music Production', 'tips-music-production', 'Whether you are a beginner or intermediate producer, these tips will help...', 'Essential advice for improving your production skills', 1, 892),
  (3, 1, 'Upcoming Music Festivals 2024', 'upcoming-festivals-2024', 'Get ready for an amazing year of music! Here are the must-attend festivals...', 'Your guide to the best music festivals this year', 1, 1234);
