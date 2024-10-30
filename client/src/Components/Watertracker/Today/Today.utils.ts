import { SingleDayData } from "../../../Types/WaterTracker.types";
import { formatDateToString } from "../../../Utils/Time.utils";

/**
 *  Get today from week array
 *
 * @param week - week has to be an array with exactly 7 elements
 * @returns - today's data or null
 */
function getTodayFromWeek(week: Array<SingleDayData> | null) {
  //
  if (!week || !Array.isArray(week) || week.length !== 7) return null;

  const today = formatDateToString(new Date(), "DD.MM.YYYY");
  const result = week.find((day) => day.date === today);
  return result ? result : null;
}

export { getTodayFromWeek };
