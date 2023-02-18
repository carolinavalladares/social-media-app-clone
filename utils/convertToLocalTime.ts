export function convertToLocalTime(dateString: string) {
  const localDate = new Date(dateString);
  const dateLocale = localDate.toLocaleString();

  const [date, time] = dateLocale.split(" ");
  const [day, month, year] = date.split("/");
  const [hours, minutes, seconds] = time.split(":");

  const monthYear = `${month}/${year}`;
  const dayMonthYear = `${day}/${month}/${year}`;
  const dateTime = `${dayMonthYear} ${hours}:${minutes}`;
  const dateTimeFull = `${dayMonthYear} ${hours}:${minutes}:${seconds}`;
  const hourMinute = `${hours}:${minutes}`;
  const hourMinuteSecond = `${hours}:${minutes}:${seconds}`;

  return {
    dateLocale,
    monthYear,
    dateTime,
    dateTimeFull,
    hourMinute,
    hourMinuteSecond,
  };
}
