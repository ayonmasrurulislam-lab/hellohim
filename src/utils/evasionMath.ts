/**
 * Pure logic for the playful "Let me think…" runaway button in the proposal section.
 */

export interface EvasionState {
  attemptCount: number;
  x: number;
  y: number;
  scale: number;
  label: string;
  isGone: boolean;
}

export const EVASION_LABELS = [
  "Let me think…",
  "Wait, really? 🥺",
  "Are you sure? 💕",
  "Nice try! 😉",
  "Almost caught me! 🏃‍♀️",
  "Only YES is possible! ✨"
];

export const MAX_EVASION_ATTEMPTS = 5;

/**
 * Clamps a numerical value within [min, max] range.
 */
export function clamp(val: number, min: number, max: number): number {
  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }
  return Math.min(Math.max(val, min), max);
}

/**
 * Calculates new position offset and scale for the runaway button.
 */
export function calculateNextEvasion(
  attempt: number,
  containerBounds = { width: 360, height: 200 },
  rng: () => number = Math.random
): EvasionState {
  const nextAttempt = attempt + 1;

  if (nextAttempt >= MAX_EVASION_ATTEMPTS) {
    return {
      attemptCount: nextAttempt,
      x: 0,
      y: 0,
      scale: 0,
      label: EVASION_LABELS[EVASION_LABELS.length - 1],
      isGone: true
    };
  }

  // Calculate safe movement boundaries within container
  const maxX = Math.max(40, (containerBounds.width / 2) - 60);
  const maxY = Math.max(30, (containerBounds.height / 2) - 40);

  // Pick a random direction ensuring noticeable displacement
  const angle = rng() * Math.PI * 2;
  const distanceFactor = 0.6 + (rng() * 0.4); // 60% to 100% of max radius
  const rawX = Math.cos(angle) * maxX * distanceFactor;
  const rawY = Math.sin(angle) * maxY * distanceFactor;

  const x = clamp(Math.round(rawX), -maxX, maxX);
  const y = clamp(Math.round(rawY), -maxY, maxY);

  // Progressive shrinking scale: 1.0 -> 0.82 -> 0.65 -> 0.48 -> 0.32 -> 0
  const scale = Math.max(0.2, 1 - (nextAttempt * 0.17));
  const labelIndex = Math.min(nextAttempt, EVASION_LABELS.length - 2);

  return {
    attemptCount: nextAttempt,
    x,
    y,
    scale: parseFloat(scale.toFixed(2)),
    label: EVASION_LABELS[labelIndex],
    isGone: false
  };
}
