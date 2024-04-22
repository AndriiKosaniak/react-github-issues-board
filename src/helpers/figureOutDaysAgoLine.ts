export const figureOutDaysAgoLine = (daysAgo: number) => {
  const createdToday = daysAgo === 0;
  if (createdToday) return "today";

  const isMoreThanOneDayOld = daysAgo > 1;

  return `${daysAgo} ${isMoreThanOneDayOld ? "days" : "day"}`;
};
