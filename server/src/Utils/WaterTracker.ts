import { SingleDayData } from "../Types/WaterTracker";
import { formatDateToString } from "./Time";
import * as vars from "../Constants/Constants";

/**
 *
 */
function initializeWeekData(monday: Date, goal: number) {
  const week = [] as Array<SingleDayData>;
  for (let i = 0; i < 7; i++) {
    const day = {
      date: formatDateToString(
        new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i),
        "DD.MM.YYYY"
      ),
      goal,
      // activity is an optional property
      // not initializing it will reduce up- and download trafic, aswell as database storage
      // activity: initializeEmptyHourlyData(),
    };
    week.push(day);
  }
  return week;
}

/**
 * Get the week number for a given date
 * @param date Date to get the week number for
 */
function getWeekNumber(date: Date): number {
  // Copy date so don't modify original
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNumber = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  );
  // Return array of year and week number
  return weekNumber;
}

/**
 * Initialize empty hourly data for a day
 */
function initializeEmptyHourlyData(): Array<number> {
  const hourlyData = [] as Array<number>;
  for (let i = 0; i < 24; i++) {
    hourlyData[i] = 0;
  }
  return hourlyData;
}

/**
 * validate goal value: is number within a specific range
 * @param - goal value
 * @returns is valid within the range or not
 */
function validateDailyGoalValue(goal: number): boolean {
  return (
    typeof goal === "number" && goal >= vars.MIN_GOAL && goal <= vars.MAX_GOAL
  );
}

export {
  getWeekNumber,
  initializeWeekData,
  initializeEmptyHourlyData,
  validateDailyGoalValue,
};
