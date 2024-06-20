import {
  parseISO,
  format,
  differenceInMilliseconds,
  isSameDay,
  isSameWeek,
  isSameMonth,
  isAfter,
} from 'date-fns';

export function formatDateTime(dateTime: string) {
  const date = parseISO(dateTime);
  const formattedDate = format(date, 'dd/MM/yyyy');
  const formattedTime = format(date, 'h:mm a');
  return { date: formattedDate, time: formattedTime };
}

// utils/getTimeDifference.js

export function convertMillisecondsToMinutes(milliseconds: any) {
  return (milliseconds / 60000).toFixed(2); // 60000 is the number of milliseconds in a minute
}

export function getTimeDifference(isoString: string) {
  const targetDate = parseISO(isoString);
  const now = new Date();

  const differenceInMs = differenceInMilliseconds(targetDate, now);

  // Convert milliseconds to minutes as a floating-point number
  const differenceInMinutes = convertMillisecondsToMinutes(differenceInMs);
  // Convert milliseconds to days as a floating-point number
  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

  return { minutes: differenceInMinutes, days: differenceInDays };
}

export function isToday(dateString: string) {
  const givenDate = parseISO(dateString);
  const today = new Date();
  return isSameDay(givenDate, today);
}

export function isThisWeek(dateString: string) {
  const givenDate = parseISO(dateString);
  const today = new Date();
  return isSameWeek(givenDate, today);
}
export function isThisMonth(dateString: string) {
  const givenDate = parseISO(dateString);
  const today = new Date();
  return isSameMonth(givenDate, today);
}

export const checkIsAfter = (dateString: string) => {
  const targetTime = parseISO(dateString);
  const currentTime = new Date();
  return isAfter(currentTime, targetTime);
};
