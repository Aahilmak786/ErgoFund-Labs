TRUNCATE referral_events, contributions, referrals, campaigns RESTART IDENTITY CASCADE;

INSERT INTO campaigns (slug, title, description, owner_address, goal_amount, goal_token, deadline)
VALUES
  ('solar-village', 'Solar Village Fund', 'Community solar microgrid.', '9egN2qqb1QVorg34KKNsLV8qqsJGW89CKrMm8DZicsZd', 2000000000000, 'APT', now() + interval '90 days'),
  ('edu-dao', 'Education DAO Grants', 'Scholarships in ERG ecosystem.', '9egN2qqb1QVorg34KKNsLV8qqsJGW89CKrMm8DZicsZd', 50000000000, 'SIGUSD', now() + interval '60 days'),
  ('tree-planting-drive', 'Urban Tree Planting Drive', 'Fund native saplings and watering for three city parks.', '9fRAWhdxEsTcdb8PhGNrZfwqa65zfkuYHAMmkQLcic1gdLSV', 2500000000000, 'ERG', now() + interval '45 days'),
  ('open-source-ergo', 'Open-Source Ergo Tooling', 'Grants for wallets, explorers, and developer docs.', '9fRAWhdxEsTcdb8PhGNrZfwqa65zfkuYHAMmkQLcic1gdLSV', 800000000000, 'ERG', now() + interval '120 days'),
  ('disaster-relief-2026', 'Cross-Border Disaster Relief', 'Stablecoin pool for rapid aid distribution.', '9egN2qqb1QVorg34KKNsLV8qqsJGW89CKrMm8DZicsZd', 100000000000, 'SIGUSD', now() + interval '30 days'),
  ('makerspace-youth', 'Youth Makerspace Equipment', '3D printers and safety gear for a nonprofit workshop.', '9egN2qqb1QVorg34KKNsLV8qqsJGW89CKrMm8DZicsZd', 1500000000000, 'PFT', now() + interval '75 days'),
  ('ergo-privacy-research', 'Privacy Research Mini-Grants', 'Small grants for Sigma protocols and dApp privacy patterns.', '9fRAWhdxEsTcdb8PhGNrZfwqa65zfkuYHAMmkQLcic1gdLSV', 500000000000, 'ERG', NULL);

INSERT INTO contributions (campaign_id, wallet_address, token_id, amount, tx_id)
SELECT c.id, '9egN2qqb1QVorg34KKNsLV8qqsJGW89CKrMm8DZicsZd', 'apt-placeholder-token-id', 120000000000, 'demo-tx-1'
FROM campaigns c WHERE c.slug = 'solar-village';

INSERT INTO contributions (campaign_id, wallet_address, token_id, amount, tx_id)
SELECT c.id, '9egN2qqb1QVorg34KKNsLV8qqsJGW89CKrMm8DZicsZd', 'sigusd-placeholder-token-id', 3500000000, 'demo-tx-2'
FROM campaigns c WHERE c.slug = 'edu-dao';

INSERT INTO contributions (campaign_id, wallet_address, token_id, amount, tx_id)
SELECT c.id, '9fRAWhdxEsTcdb8PhGNrZfwqa65zfkuYHAMmkQLcic1gdLSV', 'erg-placeholder', 180000000000, 'demo-tx-3'
FROM campaigns c WHERE c.slug = 'tree-planting-drive';

INSERT INTO contributions (campaign_id, wallet_address, token_id, amount, tx_id)
SELECT c.id, '9fRAWhdxEsTcdb8PhGNrZfwqa65zfkuYHAMmkQLcic1gdLSV', 'sigusd-placeholder-token-id', 12000000000, 'demo-tx-4'
FROM campaigns c WHERE c.slug = 'disaster-relief-2026';

INSERT INTO contributions (campaign_id, wallet_address, token_id, amount, tx_id)
SELECT c.id, '9egN2qqb1QVorg34KKNsLV8qqsJGW89CKrMm8DZicsZd', 'pft-placeholder-token-id', 90000000000, 'demo-tx-5'
FROM campaigns c WHERE c.slug = 'makerspace-youth';

INSERT INTO referrals (code, referrer_wallet)
VALUES ('BENE-ERG-01', '9egN2qqb1QVorg34KKNsLV8qqsJGW89CKrMm8DZicsZd');
