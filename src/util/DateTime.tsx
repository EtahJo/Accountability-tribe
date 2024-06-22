import {
  parseISO,
  // format,
  differenceInMilliseconds,
  isSameDay,
  isSameWeek,
  isSameMonth,
  isAfter,
} from 'date-fns';
import { toZonedTime, format } from 'date-fns-tz';

export function formatDateTime(dateTime: string, timezone: string) {
  const date = new Date(dateTime);
  const localTime = toZonedTime(date, timezone);
  const formattedDate = format(localTime, 'dd/MM/yyyy', { timeZone: timezone });
  const formattedTime = format(localTime, 'h:mm a', { timeZone: timezone });
  return { date: formattedDate, time: formattedTime };
}

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
// get the duration between the start and end time
export function getDuration(startIsoString: string, endIsoString: string) {
  // parse the start and end date (convert them to date objects)
  const startDate = parseISO(startIsoString);
  const endDate = parseISO(endIsoString);

  // get the difference between the start and end date in milliseconds
  const differenceInMs = differenceInMilliseconds(endDate, startDate);

  // Convert milliseconds to minutes as a floating-point number
  const differenceInMinutes = convertMillisecondsToMinutes(differenceInMs);
  // Convert milliseconds to days as a floating-point number
  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

  const differenceInHours = differenceInMs / (1000 * 60 * 60);
  const absHours = Math.floor(differenceInHours);
  const hours = absHours > 9 ? absHours : '0' + absHours;

  // get leftover hours and convert to minutes
  const minutesLeft = (differenceInHours - absHours) * 60;
  const absMinutes = Math.floor(minutesLeft);
  const minutes = absMinutes > 9 ? absMinutes : '0' + absMinutes;

  return {
    minutes: differenceInMinutes,
    days: differenceInDays,
    hours: differenceInHours,
    hm: { hours, minutes },
  };
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
