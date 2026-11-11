import test from 'node:test';
import assert from 'node:assert/strict';
import { clamp, calculateNextEvasion, MAX_EVASION_ATTEMPTS, EVASION_LABELS } from './evasionMath';

test('clamp restricts numbers within bounds', () => {
  assert.equal(clamp(50, 0, 100), 50);
  assert.equal(clamp(-20, 0, 100), 0);
  assert.equal(clamp(150, 0, 100), 100);
  assert.equal(clamp(150, 100, 0), 100); // handles reversed bounds
});

test('calculateNextEvasion progressive shrinking and displacement', () => {
  // Deterministic mock RNG
  let rngVal = 0.25;
  const mockRng = () => rngVal;

  const step1 = calculateNextEvasion(0, { width: 300, height: 200 }, mockRng);
  assert.equal(step1.attemptCount, 1);
  assert.equal(step1.isGone, false);
  assert.ok(step1.scale < 1.0, 'Scale should decrease on first dodge');
  assert.equal(step1.label, EVASION_LABELS[1]);
  assert.ok(step1.x !== 0 || step1.y !== 0, 'Button should move from origin');

  const step2 = calculateNextEvasion(1, { width: 300, height: 200 }, mockRng);
  assert.equal(step2.attemptCount, 2);
  assert.ok(step2.scale < step1.scale, 'Scale should decrease further on subsequent dodges');
});

test('calculateNextEvasion disappears after max attempts', () => {
  const finalStep = calculateNextEvasion(MAX_EVASION_ATTEMPTS - 1, { width: 300, height: 200 });
  assert.equal(finalStep.isGone, true);
  assert.equal(finalStep.scale, 0);

  const overflowStep = calculateNextEvasion(10, { width: 300, height: 200 });
  assert.equal(overflowStep.isGone, true);
  assert.equal(overflowStep.scale, 0);
});
