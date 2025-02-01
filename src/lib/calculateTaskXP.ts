export const calculateTaskXP = (
  effort: number,
  impact: number,
  difficulty: number
) => {
  return effort * impact * difficulty * 2;
};
