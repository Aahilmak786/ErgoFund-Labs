-- Demo data for local / staging (idempotent-ish: clear first in dev only)

TRUNCATE referral_events, contributions, referrals, campaigns RESTART IDENTITY CASCADE;

INSERT INTO campaigns (slug, title, description, owner_address, goal_amount, goal_token, deadline)
VALUES
  ('solar-village', 'Solar Village Fund', 'Community solar microgrid.', '9egN2qqb1QVorg34KKNsLV8qqsJGW89CKrMm8DZicsZd', 2000000000000, 'APT', now() + interval '90 days'),
  ('edu-dao', 'Education DAO Grants', 'Scholarships in ERG ecosystem.', '9egN2qqb1QVorg34KKNsLV8qqsJGW89CKrMm8DZicsZd', 50000000000, 'SIGUSD', now() + interval '60 days');

INSERT INTO contributions (campaign_id, wallet_address, token_id, amount, tx_id)
SELECT c.id, '9egN2qqb1QVorg34KKNsLV8qqsJGW89CKrMm8DZicsZd', 'apt-placeholder-token-id', 120000000000, 'demo-tx-1'
FROM campaigns c WHERE c.slug = 'solar-village';

INSERT INTO contributions (campaign_id, wallet_address, token_id, amount, tx_id)
SELECT c.id, '9egN2qqb1QVorg34KKNsLV8qqsJGW89CKrMm8DZicsZd', 'sigusd-placeholder-token-id', 3500000000, 'demo-tx-2'
FROM campaigns c WHERE c.slug = 'edu-dao';

INSERT INTO referrals (code, referrer_wallet)
VALUES ('BENE-ERG-01', '9egN2qqb1QVorg34KKNsLV8qqsJGW89CKrMm8DZicsZd');
