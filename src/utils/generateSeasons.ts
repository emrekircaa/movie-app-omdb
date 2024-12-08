export const generateSeasonOptions = (totalSeason: string) => {
  return Array.from({ length: Number(totalSeason) }, (_, index) => ({
    value: `${index + 1}`,
    label: `Season ${index + 1}`
  }));
};
