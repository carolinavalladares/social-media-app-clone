export function convertToLocalTime(date: string) {
  const localDate = new Date(date);
  const dateString = localDate.toLocaleString();

  return { dateString };
}
