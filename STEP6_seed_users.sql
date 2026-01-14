-- Step 6: Add test users and basic data
-- Password for all users: password123

-- Admin User: david2020524@gmail.com / password123
INSERT INTO users (id, email, username, name, password_hash, role, email_verified, created_at)
VALUES (
  1,
  'david2020524@gmail.com',
  'admin',
  'Admin User',
  '$2a$10$rN8YvM.9vx8PqX5X6I8ZPe4K4jh7kqK5nHZ.rXqK9K7C4K5h7kqK5',
  'admin',
  1,
  CURRENT_TIMESTAMP
);

-- Test Producer
INSERT INTO users (id, email, username, name, password_hash, role, email_verified, created_at)
VALUES (
  2,
  'producer@musichub.com',
  'testproducer',
  'Test Producer',
  '$2a$10$rN8YvM.9vx8PqX5X6I8ZPe4K4jh7kqK5nHZ.rXqK9K7C4K5h7kqK5',
  'user',
  1,
  CURRENT_TIMESTAMP
);

-- Test Listener
INSERT INTO users (id, email, username, name, password_hash, role, email_verified, created_at)
VALUES (
  3,
  'user@musichub.com',
  'testuser',
  'Test User',
  '$2a$10$rN8YvM.9vx8PqX5X6I8ZPe4K4jh7kqK5nHZ.rXqK9K7C4K5h7kqK5',
  'user',
  1,
  CURRENT_TIMESTAMP
);

-- Create wallets for users
INSERT INTO wallets (user_id, available_balance, pending_balance, lifetime_earnings)
VALUES 
  (1, 0.00, 0.00, 0.00),
  (2, 0.00, 0.00, 0.00),
  (3, 0.00, 0.00, 0.00);

-- Forum Categories
INSERT INTO forum_categories (name, slug, description, icon, posts_count)
VALUES 
  ('General Discussion', 'general', 'General music discussions', '💬', 0),
  ('Production Tips', 'production', 'Share production techniques', '🎵', 0),
  ('Collaboration', 'collaboration', 'Find collaborators and partners', '🤝', 0);
