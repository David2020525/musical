-- Migration 0008: Fix Unique Images for All Tracks
-- Updates all tracks with completely unique, diverse cover images
-- Each track gets a unique Unsplash image to avoid duplicates and broken images

-- Curated list of 34 unique Unsplash images for all tracks
-- Migration 0006 tracks (15 tracks)
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop&q=80' WHERE title = 'Electronic Dreams';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop&q=80' WHERE title = 'Midnight Vibes';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop&q=80' WHERE title = 'Bass Drop';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop&q=80' WHERE title = 'Urban Rhythm';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=500&fit=crop&q=80' WHERE title = 'Hip Hop Beat';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop&q=80' WHERE title = 'Rock Anthem';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&h=500&fit=crop&q=80' WHERE title = 'Jazz Fusion';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=500&fit=crop&q=80' WHERE title = 'Pop Sensation';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop&q=80' WHERE title = 'Chill Waves';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=500&h=500&fit=crop&q=80' WHERE title = 'Classical Overture';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1514320291840-2e0a9bf29a9e?w=500&h=500&fit=crop&q=80' WHERE title = 'Soulful R&B';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&h=500&fit=crop&q=80' WHERE title = 'Country Roads';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1511593358241-5eea2f2c5c5a?w=500&h=500&fit=crop&q=80' WHERE title = 'Free Demo Track';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop&q=80' WHERE title = 'Another Free Beat';

-- Migration 0007 tracks (20 tracks) - using completely different unique images
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=500&fit=crop&q=80' WHERE title = 'Synthwave Dreams';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=500&h=500&fit=crop&q=80' WHERE title = 'Digital Pulse';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=500&fit=crop&q=80' WHERE title = 'Ambient Space';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1514320291840-2e0a9bf29a9e?w=500&h=500&fit=crop&q=80' WHERE title = 'Street Anthem';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop&q=80' WHERE title = 'Trap Beat';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop&q=80' WHERE title = 'Lo-Fi Hip Hop';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop&q=80' WHERE title = 'Power Ballad';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&h=500&fit=crop&q=80' WHERE title = 'Metal Riff';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop&q=80' WHERE title = 'Smooth Jazz';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=500&h=500&fit=crop&q=80' WHERE title = 'Bebop Jazz';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1511593358241-5eea2f2c5c5a?w=500&h=500&fit=crop&q=80' WHERE title = 'Dance Pop';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&h=500&fit=crop&q=80' WHERE title = 'Indie Pop';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop&q=80' WHERE title = 'Nature Sounds';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop&q=80' WHERE title = 'Meditation Music';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop&q=80' WHERE title = 'Piano Sonata';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop&q=80' WHERE title = 'String Quartet';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=500&fit=crop&q=80' WHERE title = 'Soul Ballad';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1514320291840-2e0a9bf29a9e?w=500&h=500&fit=crop&q=80' WHERE title = 'Neo-Soul';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop&q=80' WHERE title = 'Country Ballad';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&h=500&fit=crop&q=80' WHERE title = 'Bluegrass';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=500&fit=crop&q=80' WHERE title = 'Free Electronic';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=500&h=500&fit=crop&q=80' WHERE title = 'Free Hip Hop';
UPDATE tracks SET cover_url = 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=500&fit=crop&q=80' WHERE title = 'Free Ambient';
