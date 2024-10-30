import moment from "moment";
import { DateFormat } from "../Types/Globals";

/**
 * date string to date object
 * @param date date string to convert
 * @param formatValue format
 * @returns date object
 */
function formatStringToDate(date: string, formatValue: DateFormat) {
  return moment(date, formatValue).toDate();
}

/**
 * date to specific formated date string
 * @param date date object to convert
 * @param formatValue format
 * @returns formated string day value
 */
function formatDateToString(date: Date, formatValue: DateFormat) {
  return moment(date).format(formatValue).toString();
}

/**
 * get weekday index from date object
 * @param date date object
 * @returns weekday index 0 - 6 (accessing array of weekdays)
 */
function getWeekdayIndex(date: Date) {
  const dayIndex = date.getDay();
  return dayIndex === 0 ? 6 : dayIndex - 1;
}

/**
 * get navigation indexes for data structure from from year to month, to week, to day
 * @param date target date object
 * @returns yearIndex (YYYY), monthIndex (MM-YYYY), weekIndex(WW-MM-YYYY), weekday (number: 0 - 6)
 */
function getTimeNavigationIndexes(date: Date) {
  // key string to access year data
  const yearIndex = date.getFullYear().toString();

  // key string to access month data
  const monthIndex = formatDateToString(date, "MM-YYYY");

  // key string to access week data on client side
  const weekKeyClient = formatDateToString(date, "WW-MM-YYYY");

  const weekIndexDB = formatDateToString(date, "WW-YYYY");

  // week are arrays with 7 elements, weekday is a number from 0 to 6
  const weekday = getWeekdayIndex(date);

  return { yearIndex, monthIndex, weekKeyClient, weekIndexDB, weekday };
}

/**
 * validate date string
 * @param dateString date string
 * @param format format DD.MM.YYYY | DD.MM.YYYY.H
 * @returns is valid
 */
function isDateStringValid(
  dateString: string,
  format: "DD.MM.YYYY" | "DD.MM.YYYY.HH"
): boolean {
  // Regex to match the format DD.MM.YYYY
  if (format === "DD.MM.YYYY") {
    const regex = /^\d{2}\.\d{2}\.\d{4}$/;

    // Check if the string matches the regex
    return regex.test(dateString);
  }

  // Regex to match the format DD.MM.YYYY
  if (format === "DD.MM.YYYY.HH") {
    const regex = /^(\d{2})\.(\d{2})\.(\d{4})\.(\d{2})$/;

    // Check if the string matches the regex
    return regex.test(dateString);
  }

  return false;
}

export {
  formatStringToDate,
  formatDateToString,
  getWeekdayIndex,
  getTimeNavigationIndexes,
  isDateStringValid,
};
