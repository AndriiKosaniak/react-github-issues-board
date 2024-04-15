export const convertDateIntoDaysAgo = (dateToConvert: string) => {
  const now = new Date();
  const created = new Date(dateToConvert);
  const diff = now.getTime() - created.getTime();
  const daysAgo = Math.floor(diff / 1000 / 60 / 60 / 24);

  return daysAgo;
};
