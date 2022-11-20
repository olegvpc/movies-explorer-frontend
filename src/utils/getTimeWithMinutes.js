// ф-ция преобразования времени
export function getTimeWithMin(mints) {
  const hours = Math.floor(mints/60);
  const minutes = mints % 60;
  return `${hours}ч ${minutes}м`;
};
