export function calculateLevel(xp: number): number {
  if (xp < 0) return 1; // Ensures XP is never negative

  // Formula to determine level from XP
  const level = (-100 + Math.sqrt(100 ** 2 + 800 * xp)) / 200;

  return Math.floor(level) + 1; // Rounds down to get the current level
}
