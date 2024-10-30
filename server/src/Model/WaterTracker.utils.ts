import moment from "moment";
import { DateFormat } from "../Types/Globals";

/**
 * Get week keys for accessing weeks in the data base
 * @param monthIndex 0 - 11
 * @param year YYYY
 * @returns a list of week indexes WW-YYYY
 */
function getWeekKeysForMonth(monthIndex: number, year: number) {
  // Create a Moment object for the first day of the month
  const firstDayOfMonth = moment()
    .month(monthIndex)
    .year(year)
    .startOf("month");

  // Determine the number of days in the month
  const daysInMonth = firstDayOfMonth.daysInMonth();

  // Initialize a set to store the unique week numbers
  const weekIndexes = new Set();

  // Iterate through each week of the month
  for (let day = 1; day <= daysInMonth; day++) {
    // Create a Moment object for the current day
    const currentDay = firstDayOfMonth.clone().add(day - 1, "days");

    // Check for the week overlap from december to januar
    const weekNumber = +currentDay.format("WW").toString();
    if (weekNumber === 1 && monthIndex === 11) {
      // Create a Moment object for the first day of the month
      const newYear = moment()
        .month(0)
        .year(year + 1)
        .startOf("month");

      // add week index to set and stop looping
      weekIndexes.add(newYear.format("WW-YYYY" as DateFormat).toString());
      break;
    }

    // Check for the week of prevoius year, otherwise add week index to set
    if (weekNumber >= 52 && monthIndex === 0) {
      // year - 1 is previous year
      weekIndexes.add(`${weekNumber}-${year - 1}`);
    } else {
      // Get the week number for the current day and add it to the set
      const weekIndex = currentDay.format("WW-YYYY" as DateFormat).toString();
      weekIndexes.add(weekIndex);
    }
  }

  // Return the array of week numbers
  return [...weekIndexes] as Array<string>;
}

export { getWeekKeysForMonth };
