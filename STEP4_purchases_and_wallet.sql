-- Step 4: Purchases, wallet, and financial tables
CREATE TABLE IF NOT EXISTS purchases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  track_id INTEGER NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  platform_commission DECIMAL(10,2) NOT NULL,
  artist_earning DECIMAL(10,2) NOT NULL,
  payment_id TEXT UNIQUE NOT NULL,
  payment_token TEXT,
  conversation_id TEXT,
  payment_status TEXT DEFAULT 'PENDING',
  paid_at DATETIME,
  download_count INTEGER DEFAULT 0,
  last_downloaded_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS wallets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER UNIQUE NOT NULL,
  available_balance DECIMAL(10,2) DEFAULT 0.00,
  pending_balance DECIMAL(10,2) DEFAULT 0.00,
  lifetime_earnings DECIMAL(10,2) DEFAULT 0.00,
  bank_name TEXT,
  iban TEXT,
  account_holder TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS withdrawal_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  bank_name TEXT NOT NULL,
  iban TEXT NOT NULL,
  account_holder TEXT NOT NULL,
  note TEXT,
  status TEXT DEFAULT 'PENDING',
  admin_notes TEXT,
  processed_by INTEGER,
  processed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_track_id ON purchases(track_id);
CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_withdrawal_requests_user_id ON withdrawal_requests(user_id);
