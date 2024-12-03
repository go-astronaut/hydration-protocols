import { COLOR_PALETTE } from "../../Constants";
import { Month, SingleDayData } from "../../Types/WaterTracker.types";
import { generateRandomRGB } from "../../Utils/Color.utils";
import {
  formatDateToString,
  formatStringToDate,
  getDaysInMonth,
  getTimeNavigationIndexes,
} from "../../Utils/Time.utils";

/**
 * get week number from incoming date object
 * @param date
 * @returns
 */
function getWeekNumber(date: Date): number {
  // Copy date so don't modify original
  const dateObj = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  dateObj.setUTCDate(dateObj.getUTCDate() + 4 - (dateObj.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(dateObj.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNumber = Math.ceil(
    ((dateObj.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  );
  // Return week number
  return weekNumber;
}

/**
 * Get various statistics for a month
 * @param month month data object
 * @returns object with statistics for the month
 */
function getMonthStats(month: Month) {
  const now = new Date();
  const monthIndex = Object.keys(month)[0];
  const givenMonth = formatStringToDate(monthIndex, "MM-YYYY");
  const isCurrentMonth =
    now.getFullYear() === givenMonth.getFullYear() &&
    now.getMonth() === givenMonth.getMonth();

  // get days in month, for output like this: 21 of 31 goals reached
  const daysInMonth = getDaysInMonth(
    givenMonth.getFullYear(),
    givenMonth.getMonth()
  );
  const daysInMonthLeft = isCurrentMonth
    ? daysInMonth - now.getDate() + 1
    : null;

  // get status for the month, past or future
  const pastOrFuture = now.getTime() > givenMonth.getTime() ? 0 : -1;

  // if no month data available then return emtpy values
  const monthArr = month ? Object.values(month) : null;
  const weeksArr = monthArr ? Object.values(monthArr[0]) : null;
  if (!weeksArr)
    return {
      sum: 0,
      maxAmount: 0,
    };

  // set initial values for sum and counter
  let sum = 0;
  let counter = 0;

  // set initial value for max amount value of the month
  let maxAmount = 0;

  // set initial value for goalReachedCounter
  let goalReachedCounter = 0;

  // iterate over all days in a month and find the sum, counter and max amount
  for (const week of weeksArr) {
    for (const day of week) {
      /* Check if activity property is not defined and
       * if month index of the day matches with the given month to exclude previous and next month data
       */
      const dayDate = formatStringToDate(day.date, "DD.MM.YYYY");
      const currentMonth = formatDateToString(dayDate, "MM-YYYY");
      if (currentMonth === monthIndex && day.activity) {
        // get daily sum of all daily amounts
        const dailySum = getDailyAmountSum(day);
        sum += dailySum;

        // to avoid empty days from being counted
        if (dailySum > 0) counter++;

        // check if daily sum is greater than max amount
        if (dailySum > maxAmount) {
          maxAmount = dailySum;
        }

        // check if daily sum is greater or equal to daily goal
        if (dailySum >= day.goal) {
          goalReachedCounter++;
        }
      }
    }
  }

  return {
    sum,
    averageAmount: Math.trunc(sum === 0 ? 0 : sum / counter),
    maxAmount: maxAmount,
    goalReachedCounter: goalReachedCounter,
    daysInMonth: daysInMonth,
    daysInMonthLeft: isCurrentMonth ? daysInMonthLeft : pastOrFuture,
  };
}

/**
 * Get various statistics of the given week
 * @param week array with day elements
 * @returns week statitstics
 */
function getWeekStats(week: Array<SingleDayData>) {
  // is the given week current week?
  const now = new Date();
  const current = getTimeNavigationIndexes(now);
  const monday = formatStringToDate(week[0].date, "DD.MM.YYYY");
  const given = getTimeNavigationIndexes(monday);
  const isCurrentWeek = current.weekIndex === given.weekIndex;

  // get status for the week, past or future
  const pastOrFuture = now.getTime() > monday.getTime() ? 0 : -1;

  // set initial values for sum and counter
  let sum = 0;
  let counter = 0;

  // set initial value for max amount value of the month
  let maxAmount = 0;

  // set initial value for goalReachedCounter
  let goalReachedCounter = 0;

  // iterate over all days in a month and find the sum, counter and max amount

  for (const day of week) {
    // if activity property is not defined then continue with the next iteration
    if (day.activity) {
      // get daily sum of all daily amounts
      const dailySum = getDailyAmountSum(day);
      sum += dailySum;

      // to avoid empty days from being counted
      if (dailySum > 0) counter++;

      // check if daily sum is greater than max amount
      if (dailySum > maxAmount) {
        maxAmount = dailySum;
      }

      // check if daily sum is greater or equal to daily goal
      if (dailySum >= day.goal) {
        goalReachedCounter++;
      }
    }
  }

  return {
    sum,
    averageAmount: Math.trunc(sum === 0 ? 0 : sum / counter),
    maxAmount: maxAmount,
    goalReachedCounter: goalReachedCounter,
    daysInWeek: week.length,
    // if the given week is the current week: 7 - week day index = days left
    // future week is 0, past weeks are -1
    daysInWeekLeft: isCurrentWeek
      ? week.length - current.weekday
      : pastOrFuture,
  };
}

/**
 * calculate the sum of all amounts in a single day
 * @param day single day data object
 * @returns sum of all amounts in a single day
 */
function getDailyAmountSum(day: SingleDayData) {
  //return amount 0 ml if the activity property is not defined
  if (!day.activity) return 0;

  let sum = 0;

  // iterate through activity property and sum up amount values
  for (const hourly of day.activity) {
    if (Array.isArray(hourly) && hourly.length > 0) {
      for (const item of hourly) {
        sum += item.amount;
      }
    }
  }

  return sum;
}

/**
 * Get day from month data
 * @param month month data object
 * @param date date object
 */
function getDayFromMonth(month: Month | null, date: Date) {
  if (!month) return null;

  // Time navigation indexes
  const { weekday } = getTimeNavigationIndexes(date);
  const dateStr = formatDateToString(date, "DD.MM.YYYY");

  // Weeks objects from month
  const monthObj = Object.values(month)[0];
  // Extract values from weeks object
  const weeksArr = Object.values(monthObj);
  // Find the needed week and point at the weekday to get the day data
  const day = weeksArr
    .find((week) => week[weekday].date === dateStr)
    ?.at(weekday);

  if (!day) return null;
  return day;
}

/**
 * create color scheme for all liquid types
 * @param day day data
 * @returns array with hex color values
 */
function getColorScheme(day: SingleDayData | null) {
  // generate a set of the liquid types
  const liquidTypes = new Set();
  if (day && day.activity) {
    day.activity.forEach((hourlyData) => {
      if (Array.isArray(hourlyData) && hourlyData.length > 0) {
        hourlyData.forEach((item) => {
          liquidTypes.add(item.type);
        });
      }
    });
  }

  // generate additional colors if the current colors are not enough
  const generateAdditionalColors = (size: number) => {
    const additionalColors = [...COLOR_PALETTE];
    for (let i = 0; i < size; i++) {
      additionalColors.push(generateRandomRGB());
    }
    return additionalColors;
  };

  // Generate additional colors for the liquid types if current colors are not enough
  const COLORS =
    COLOR_PALETTE.length <= liquidTypes.size
      ? COLOR_PALETTE
      : generateAdditionalColors(COLOR_PALETTE.length - liquidTypes.size);

  return COLORS;
}

export {
  getWeekNumber,
  getMonthStats,
  getDailyAmountSum,
  getDayFromMonth,
  getColorScheme,
  getWeekStats,
};
