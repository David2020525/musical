-- Migration 0006: Seed Example Tracks
-- Adds example tracks to the database for testing and demonstration
-- These tracks use royalty-free audio URLs and placeholder images

-- First, ensure we have at least one user (producer) for tracks
-- If no users exist, create a demo producer
INSERT OR IGNORE INTO users (email, username, password_hash, name, role, email_verified)
VALUES (
    'demo@musical.com',
    'demo_producer',
    '$2b$10$dummy_hash_for_demo_only_not_for_production',
    'Demo Producer',
    'user',
    1
);

-- Get the demo producer ID (or use NULL if we want to allow tracks without producers)
-- For now, we'll use NULL for user_id to allow tracks without requiring a producer account

-- Insert example tracks with diverse genres, prices, and metadata
INSERT OR IGNORE INTO tracks (
    title, artist, album, genre, duration, release_year, cover_url, audio_url, 
    description, plays_count, likes_count, price, user_id, bpm, mood, tags, is_featured, created_at
) VALUES
-- Electronic Tracks
('Electronic Dreams', 'Neon Waves', 'Digital Horizon', 'Electronic', 210, 2024, 
 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
 'A mesmerizing electronic journey through digital landscapes. Perfect for background music, gaming, or creative projects.',
 12543, 892, 29.99, NULL, 128, 'Energetic', 'electronic,synth,futuristic', 1,
 datetime('now', '-5 days')),

('Midnight Vibes', 'Synth City', 'Night Drive', 'Electronic', 195, 2024,
 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
 'Smooth electronic beats perfect for late-night sessions. Atmospheric and immersive.',
 8921, 654, 24.99, NULL, 120, 'Chill', 'electronic,ambient,night', 0,
 datetime('now', '-4 days')),

('Bass Drop', 'EDM Master', 'Festival Anthems', 'Electronic', 240, 2024,
 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
 'High-energy EDM track with powerful bass drops. Ideal for parties and events.',
 21098, 1876, 39.99, NULL, 140, 'Energetic', 'edm,bass,party', 1,
 datetime('now', '-3 days')),

-- Hip Hop Tracks
('Urban Rhythm', 'Street Beats', 'City Life', 'Hip Hop', 225, 2024,
 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
 'Hard-hitting hip hop beat with urban vibes. Perfect for rap vocals or instrumental tracks.',
 15234, 1123, 34.99, NULL, 95, 'Aggressive', 'hiphop,rap,urban', 1,
 datetime('now', '-6 days')),

('Hip Hop Beat', 'Beat Maker Pro', 'Underground', 'Hip Hop', 220, 2024,
 'https://images.unsplash.com/photo-1514320291840-2e0a9bf29a9e?w=500&h=500&fit=crop',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
 'Classic hip hop instrumental with smooth samples and crisp drums.',
 18765, 1432, 29.99, NULL, 90, 'Smooth', 'hiphop,instrumental,beats', 0,
 datetime('now', '-7 days')),

-- Rock Tracks
('Rock Anthem', 'Electric Storm', 'Power Chord', 'Rock', 245, 2024,
 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
 'Powerful rock track with driving guitars and energetic drums. Perfect for action scenes.',
 9876, 743, 35.99, NULL, 130, 'Powerful', 'rock,electric,guitar', 0,
 datetime('now', '-8 days')),

-- Jazz Tracks
('Jazz Fusion', 'Smooth Jazz Collective', 'Blue Notes', 'Jazz', 230, 2024,
 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&h=500&fit=crop',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
 'Smooth jazz fusion with modern elements. Elegant and sophisticated.',
 7654, 567, 27.99, NULL, 110, 'Smooth', 'jazz,fusion,smooth', 0,
 datetime('now', '-9 days')),

-- Pop Tracks
('Pop Sensation', 'Chart Toppers', 'Hit Parade', 'Pop', 200, 2024,
 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
 'Catchy pop track with infectious melodies. Perfect for commercial use.',
 11234, 987, 32.99, NULL, 125, 'Upbeat', 'pop,catchy,commercial', 1,
 datetime('now', '-2 days')),

-- Ambient Tracks
('Chill Waves', 'Ambient Sounds', 'Relaxation', 'Ambient', 180, 2024,
 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
 'Peaceful ambient track perfect for meditation, study, or relaxation.',
 6543, 432, 19.99, NULL, 70, 'Peaceful', 'ambient,chill,relaxing', 0,
 datetime('now', '-10 days')),

-- Classical Tracks
('Classical Overture', 'Symphony Orchestra', 'Masterpieces', 'Classical', 280, 2024,
 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
 'Elegant classical composition with orchestral arrangements. Timeless and sophisticated.',
 5432, 321, 44.99, NULL, 100, 'Elegant', 'classical,orchestral,elegant', 0,
 datetime('now', '-11 days')),

-- R&B Tracks
('Soulful R&B', 'Smooth Operator', 'Midnight Sessions', 'R&B', 215, 2024,
 'https://images.unsplash.com/photo-1514320291840-2e0a9bf29a9e?w=500&h=500&fit=crop',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
 'Smooth R&B track with soulful vibes. Perfect for romantic scenes or chill playlists.',
 8765, 654, 31.99, NULL, 105, 'Soulful', 'rnb,soul,smooth', 0,
 datetime('now', '-12 days')),

-- Country Tracks
('Country Roads', 'Wild West', 'Prairie Songs', 'Country', 235, 2024,
 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
 'Authentic country track with acoustic guitars and heartfelt melodies.',
 4321, 298, 26.99, NULL, 115, 'Nostalgic', 'country,acoustic,folk', 0,
 datetime('now', '-13 days')),

-- Free Tracks (for testing free filter)
('Free Demo Track', 'Demo Artist', 'Free Samples', 'Electronic', 150, 2024,
 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
 'Free demo track to showcase the platform. Perfect for testing.',
 5432, 234, 0.00, NULL, 120, 'Energetic', 'free,demo,electronic', 0,
 datetime('now', '-1 day')),

('Another Free Beat', 'Free Music Co', 'No Cost Collection', 'Hip Hop', 165, 2024,
 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
 'Another free track for your projects. No strings attached.',
 3210, 187, 0.00, NULL, 100, 'Chill', 'free,hiphop,beats', 0,
 datetime('now', '-14 days'));

-- Update timestamps
UPDATE tracks SET updated_at = created_at WHERE updated_at IS NULL;
