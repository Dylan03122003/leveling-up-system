export function getLevelProgress(currentXp: number): number {
  // Determine current level
  const currentLevel =
    Math.floor((-100 + Math.sqrt(100 ** 2 + 800 * currentXp)) / 200) + 1;

  // XP required for current and next level
  const currentLevelXp = (currentLevel * (currentLevel - 1) * 100) / 2;
  const nextLevelXp = ((currentLevel + 1) * currentLevel * 100) / 2;

  // Calculate progress percentage
  return ((currentXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;
}
