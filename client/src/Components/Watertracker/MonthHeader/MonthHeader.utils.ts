import { Drink, Month } from "../../../Types/WaterTracker.types";
import {
  formatDateToString,
  formatStringToDate,
} from "../../../Utils/Time.utils";

/**
 * Get drink types with summed amounts
 * @param month month data
 */
function getAllMonthlyDrinks(month: Month) {
  // Week objects from month data
  const weeks = Object.values(month)?.at(0);

  // Get month key
  const monthKey = Object.keys(month)?.at(0);

  // Array to store all drinks
  const allDrinks = [] as Array<Drink>;

  // Get all drinks
  if (weeks && monthKey) {
    Object.values(weeks)
      // flat sub arrays, i.e. extract days to a single array
      .flat()
      // extract activity properties from days
      .map((day) => {
        const date = formatStringToDate(day.date, "DD.MM.YYYY");
        const dayMonthKey = formatDateToString(date, "MM-YYYY");

        // check if day is in current month
        if (dayMonthKey === monthKey && day.activity) {
          return day.activity;
        }
        return null;
      })
      // iterate over activities
      .forEach((activitity) => {
        if (activitity && typeof activitity !== "number") {
          // iterate over activities
          activitity.forEach((hourlyData) => {
            // filter out undefined values and zeros
            if (Array.isArray(hourlyData) && typeof hourlyData !== "number") {
              // flat sub arrays, i.e. extract drinks to a single array
              hourlyData.forEach((hourlyData) => {
                if (hourlyData) {
                  allDrinks.push(hourlyData);
                }
              });
            }
          });
        }
      });
  }

  return allDrinks.length > 0 ? allDrinks : null;
}

export { getAllMonthlyDrinks };
