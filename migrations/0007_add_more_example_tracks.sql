-- Migration 0007: Add More Example Tracks
-- Adds additional diverse tracks to the database for better testing and demonstration

-- Insert more example tracks with diverse genres, prices, and metadata
INSERT OR IGNORE INTO tracks (
    title, artist, album, genre, duration, release_year, cover_url, audio_url, 
    description, plays_count, likes_count, price, user_id, bpm, mood, tags, is_featured, created_at
) VALUES
-- More Electronic Tracks
('Synthwave Dreams', 'Retro Future', 'Neon Nights', 'Electronic', 205, 2024,
 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
 'Retro synthwave track with nostalgic 80s vibes. Perfect for driving or gaming.',
 15678, 1234, 27.99, NULL, 125, 'Nostalgic', 'synthwave,retro,electronic', 0,
 datetime('now', '-15 days')),

('Digital Pulse', 'Cyber Beats', 'Virtual Reality', 'Electronic', 195, 2024,
 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=500&fit=crop',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
 'Futuristic electronic track with cyberpunk aesthetics. High energy and immersive.',
 13456, 987, 31.99, NULL, 135, 'Energetic', 'cyberpunk,electronic,futuristic', 1,
 datetime('now', '-16 days')),

('Ambient Space', 'Cosmic Sounds', 'Galaxy', 'Electronic', 220, 2024,
 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=500&h=500&fit=crop',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
 'Atmospheric ambient electronic track. Perfect for meditation or focus.',
 8765, 654, 22.99, NULL, 85, 'Peaceful', 'ambient,electronic,space', 0,
 datetime('now', '-17 days')),

-- More Hip Hop Tracks
('Street Anthem', 'Urban Legends', 'City Streets', 'Hip Hop', 230, 2024,
 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=500&fit=crop',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
 'Powerful hip hop anthem with heavy bass and crisp drums. Street-ready.',
 19876, 1543, 36.99, NULL, 100, 'Powerful', 'hiphop,street,anthem', 1,
 datetime('now', '-18 days')),

('Trap Beat', 'Trap Master', 'Underground Trap', 'Hip Hop', 210, 2024,
 'https://images.unsplash.com/photo-1514320291840-2e0a9bf29a9e?w=500&h=500&fit=crop',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
 'Hard trap beat with 808s and hi-hats. Perfect for modern rap.',
 16789, 1321, 33.99, NULL, 140, 'Aggressive', 'trap,hiphop,808', 0,
 datetime('now', '-19 days')),

('Lo-Fi Hip Hop', 'Chill Beats Studio', 'Study Sessions', 'Hip Hop', 180, 2024,
 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
 'Relaxing lo-fi hip hop beat. Perfect for studying or working.',
 23456, 1876, 24.99, NULL, 85, 'Chill', 'lofi,hiphop,study', 1,
 datetime('now', '-20 days')),

-- More Rock Tracks
('Power Ballad', 'Rock Legends', 'Emotional', 'Rock', 260, 2024,
 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop&q=80',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
 'Emotional rock power ballad with soaring guitars and powerful vocals.',
 11234, 876, 38.99, NULL, 120, 'Emotional', 'rock,ballad,power', 0,
 datetime('now', '-21 days')),

('Metal Riff', 'Heavy Metal Co', 'Thunder', 'Rock', 240, 2024,
 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop&q=80',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
 'Heavy metal track with crushing riffs and thunderous drums.',
 9876, 765, 41.99, NULL, 150, 'Intense', 'metal,rock,heavy', 0,
 datetime('now', '-22 days')),

-- More Jazz Tracks
('Smooth Jazz', 'Jazz Collective', 'Evening Mood', 'Jazz', 245, 2024,
 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&h=500&fit=crop&q=80',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
 'Smooth jazz track perfect for evening relaxation or dinner ambiance.',
 6543, 432, 28.99, NULL, 105, 'Smooth', 'jazz,smooth,relaxing', 0,
 datetime('now', '-23 days')),

('Bebop Jazz', 'Jazz Masters', 'Classic Bebop', 'Jazz', 225, 2024,
 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop&q=80',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
 'Classic bebop jazz with fast tempo and complex harmonies.',
 5432, 321, 35.99, NULL, 180, 'Energetic', 'jazz,bebop,classic', 0,
 datetime('now', '-24 days')),

-- More Pop Tracks
('Dance Pop', 'Pop Stars', 'Party Time', 'Pop', 195, 2024,
 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop&q=80',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
 'Upbeat dance pop track with infectious energy. Perfect for parties.',
 18765, 1432, 29.99, NULL, 130, 'Upbeat', 'pop,dance,party', 1,
 datetime('now', '-25 days')),

('Indie Pop', 'Indie Collective', 'Dreamy', 'Pop', 200, 2024,
 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop&q=80',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
 'Dreamy indie pop with ethereal vocals and atmospheric production.',
 12345, 987, 26.99, NULL, 110, 'Dreamy', 'indie,pop,dreamy', 0,
 datetime('now', '-26 days')),

-- More Ambient Tracks
('Nature Sounds', 'Ambient Nature', 'Forest', 'Ambient', 300, 2024,
 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop&q=80',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
 'Peaceful ambient track with nature sounds. Perfect for relaxation.',
 9876, 654, 18.99, NULL, 60, 'Peaceful', 'ambient,nature,relaxing', 0,
 datetime('now', '-27 days')),

('Meditation Music', 'Zen Sounds', 'Inner Peace', 'Ambient', 360, 2024,
 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&h=500&fit=crop&q=80',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
 'Calming meditation music with gentle tones and peaceful atmosphere.',
 7654, 543, 19.99, NULL, 55, 'Calm', 'ambient,meditation,zen', 0,
 datetime('now', '-28 days')),

-- More Classical Tracks
('Piano Sonata', 'Classical Pianist', 'Solo Piano', 'Classical', 320, 2024,
 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop&q=80',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
 'Beautiful piano sonata with emotional depth and technical mastery.',
 8765, 654, 47.99, NULL, 90, 'Elegant', 'classical,piano,sonata', 0,
 datetime('now', '-29 days')),

('String Quartet', 'Chamber Music', 'Intimate', 'Classical', 280, 2024,
 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop&q=80',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
 'Intimate string quartet performance with rich harmonies.',
 6543, 432, 45.99, NULL, 95, 'Intimate', 'classical,strings,chamber', 0,
 datetime('now', '-30 days')),

-- More R&B Tracks
('Soul Ballad', 'Soul Singer', 'Heartfelt', 'R&B', 240, 2024,
 'https://images.unsplash.com/photo-1514320291840-2e0a9bf29a9e?w=500&h=500&fit=crop&q=80',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
 'Emotional R&B ballad with soulful vocals and smooth instrumentation.',
 11234, 876, 34.99, NULL, 100, 'Soulful', 'rnb,soul,ballad', 1,
 datetime('now', '-31 days')),

('Neo-Soul', 'Modern Soul', 'Contemporary', 'R&B', 215, 2024,
 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop&q=80',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
 'Modern neo-soul track with contemporary production and smooth vocals.',
 9876, 765, 32.99, NULL, 108, 'Smooth', 'neosoul,rnb,modern', 0,
 datetime('now', '-32 days')),

-- More Country Tracks
('Country Ballad', 'Country Singer', 'Heartland', 'Country', 250, 2024,
 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop&q=80',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
 'Emotional country ballad with heartfelt lyrics and acoustic guitar.',
 8765, 654, 28.99, NULL, 110, 'Emotional', 'country,ballad,acoustic', 0,
 datetime('now', '-33 days')),

('Bluegrass', 'Bluegrass Band', 'Mountain Music', 'Country', 195, 2024,
 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&h=500&fit=crop&q=80',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
 'Traditional bluegrass track with banjo, fiddle, and mandolin.',
 5432, 321, 30.99, NULL, 125, 'Energetic', 'bluegrass,country,traditional', 0,
 datetime('now', '-34 days')),

-- More Free Tracks
('Free Electronic', 'Free Music', 'Demo Collection', 'Electronic', 160, 2024,
 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop&q=80',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
 'Free electronic track for your projects. No cost, full quality.',
 4321, 234, 0.00, NULL, 128, 'Energetic', 'free,electronic,demo', 0,
 datetime('now', '-35 days')),

('Free Hip Hop', 'Free Beats', 'No Cost Beats', 'Hip Hop', 170, 2024,
 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop&q=80',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
 'Free hip hop beat for your rap projects. Download and use freely.',
 3210, 187, 0.00, NULL, 95, 'Chill', 'free,hiphop,beats', 0,
 datetime('now', '-36 days')),

('Free Ambient', 'Free Sounds', 'Relaxation Free', 'Ambient', 200, 2024,
 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop&q=80',
 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
 'Free ambient track for meditation and relaxation. No strings attached.',
 2109, 156, 0.00, NULL, 70, 'Peaceful', 'free,ambient,meditation', 0,
 datetime('now', '-37 days'));

-- Update timestamps
UPDATE tracks SET updated_at = created_at WHERE updated_at IS NULL;
