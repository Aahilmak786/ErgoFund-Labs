import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ReferralService } from './referral.service.js';
import type { ReferralRepository } from '../repositories/referral.repository.js';

function mockRepo(partial: Partial<ReferralRepository>): ReferralRepository {
  return partial as ReferralRepository;
}

test('validateUse rejects self-referral', async () => {
  const svc = new ReferralService(
    mockRepo({
      findByCode: async () => ({ id: 'rid', referrer_wallet: '9aaa' }),
      countEventsLastWindow: async () => 0,
      insertEvent: async () => {}
    })
  );
  const r = await svc.validateUse({
    code: 'X',
    referrerWallet: '9same111',
    referredWallet: '9same111'
  });
  assert.equal(r.ok, false);
  if (!r.ok) assert.match(r.reason, /self-referral/i);
});

test('validateUse rejects unknown code', async () => {
  const svc = new ReferralService(
    mockRepo({
      findByCode: async () => null,
      countEventsLastWindow: async () => 0,
      insertEvent: async () => {}
    })
  );
  const r = await svc.validateUse({
    code: 'missing',
    referrerWallet: '9a',
    referredWallet: '9b'
  });
  assert.equal(r.ok, false);
});

test('validateUse succeeds when rules pass', async () => {
  let inserted = false;
  const svc = new ReferralService(
    mockRepo({
      findByCode: async () => ({ id: 'rid-1', referrer_wallet: '9ref' }),
      countEventsLastWindow: async () => 0,
      insertEvent: async () => {
        inserted = true;
      }
    })
  );
  const r = await svc.validateUse({
    code: 'BENE-1',
    referrerWallet: '9ref',
    referredWallet: '9new'
  });
  assert.equal(r.ok, true);
  assert.equal(inserted, true);
});
