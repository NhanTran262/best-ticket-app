import dayjs from "dayjs";

export const CalculateDuration = (startDate, endDate) => {
  const startDateTime = dayjs(startDate);
  const endDateTime = dayjs(endDate);
  const duration = endDateTime.diff(startDateTime, 'minute');
  const days = Math.floor(duration / (24 * 60));
  const hours = Math.floor((duration % (24 * 60)) / 60);
  const minutes = duration % 60;
  const durationString = [];
  if (days > 0) {
    durationString.push(`${days} ngày`);
  }
  if (hours > 0) {
    durationString.push(`${hours} giờ`);
  }
  if (minutes > 0) {
    durationString.push(`${minutes} phút`);
  }

  return durationString.join(', ');
};
