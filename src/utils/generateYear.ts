export const generateYears = (start: number, end: number) => {
  const years = [];
  for (let year = start; year <= end; year++) {
    years.push({ value: year.toString(), label: year.toString() });
  }
  return years;
};
