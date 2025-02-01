export function calculateXPneededForNextLevel(currentXp: number): number {
  // Calculate current level
  const currentLevel =
    Math.floor((-100 + Math.sqrt(100 ** 2 + 800 * currentXp)) / 200) + 1;

  // XP required to reach the next level
  const nextLevelXp = ((currentLevel + 1) * currentLevel * 100) / 2;

  // XP still needed
  return nextLevelXp - currentXp;
}
