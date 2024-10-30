import moment from "moment";
import { DateFormat } from "../Types/Global.types";
import { Month } from "../Types/WaterTracker.types";

/**
 * Convert date object to formated string.
 */
function formatDateToString(date: Date, formatValue: DateFormat) {
  return moment(date).format(formatValue).toString();
}

/**
 * Convert formated string to date object.
 */
function formatStringToDate(date: string, formatValue: DateFormat) {
  return moment(date, formatValue).toDate();
}

/**
 * Get weekday index: 0 is Monday, 6 is Sunday.
 */
function getWeekdayIndex(date: Date) {
  const dayIndex = date.getDay();
  return dayIndex === 0 ? 6 : dayIndex - 1;
}

/**
 * Get navigation indexes for data structure from from year to month, to week, to day.
 * @param date target date object
 * @returns yearIndex (YYYY), monthIndex (MM-YYYY), weekIndex(WW-MM-YYYY), weekday (number: 0 - 6)
 */
function getTimeNavigationIndexes(date: Date) {
  // key string to access year data
  const yearIndex = date.getFullYear().toString();

  // key string to access month data
  const monthIndex = formatDateToString(date, "MM-YYYY");

  // key string to access week data
  const weekIndex = formatDateToString(date, "WW-YYYY");

  // week are arrays with 7 elements, weekday is a number from 0 to 6
  const weekday = getWeekdayIndex(date);

  return { yearIndex, monthIndex, weekIndex, weekday };
}

/**
 * Get number of days in month.
 * @param year number - YYYY
 * @param month number between 0 and 11
 * @returns number of days in month
 */
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Function to get the number of weeks in a month based on a given date.
 * @param date - A Date object for which the number of weeks in the month will be calculated.
 * @returns The number of weeks in the month of the given date.
 */
function getWeeksInCurrentMonth(date: Date): number {
  // Create a moment object from the incoming date
  const momentDate = moment(date);

  // Get the first day of the current month
  const firstDayOfMonth = momentDate.clone().startOf("month");

  // Get the last day of the current month
  const lastDayOfMonth = momentDate.clone().endOf("month");

  // Calculate the difference in weeks between the last and first days of the month
  const weeksInMonth = moment(lastDayOfMonth).diff(firstDayOfMonth, "week");

  // Add 1 to account for the week that includes the first day of the month
  return weeksInMonth + 2;
}

/**
 * get a copy of week data from date target
 * @param month data
 * @param date object
 */
function getWeekFromDate(month: Month | null, date: Date) {
  // check for nullish values and return null
  if (!month || !date) return null;

  // extract key strings from date object for accessing week data
  const { monthIndex, weekIndex } = getTimeNavigationIndexes(date);

  // access and copy week data
  const week = month?.[monthIndex]?.[weekIndex];
  if (week) return week;
  return null;
}

/**
 * Change date string to anther format.
 * @param date string
 * @param from format
 *  @param to format
 */
function changeDateFormat(date: string, from: DateFormat, to: DateFormat) {
  return moment(date, from).format(to);
}

export {
  formatDateToString,
  formatStringToDate,
  getWeekdayIndex,
  getTimeNavigationIndexes,
  getDaysInMonth,
  getWeeksInCurrentMonth,
  getWeekFromDate,
  changeDateFormat,
};
