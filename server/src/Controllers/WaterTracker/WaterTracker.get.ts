import { getMonth } from "./Utilities/Getters/GetMonth";
import { getToday } from "./Utilities/Getters/GetToday";
import { getControlValues } from "./Utilities/Getters/GetControlValues";
import { getWeek } from "./Utilities/Getters/GetWeek";

const waterTrackerGetController = {
  /**
   * get month data from year and month queries
   * @param req - query values: year YYYY and month 0 - 11
   * @param res - data of targeted month
   */
  getMonth,

  /**
   * get single day data
   * @param req - date: D, month: MM (1 - 12), year: YYYY
   * @param res - single day data
   */
  getToday,

  /**
   * get control object: drink amount, daily goal for initializing
   */
  getControlValues,

  /**
   * get week data from date target
   * @param req date target { date, month, year }
   */
  getWeek,
};

export { waterTrackerGetController };
