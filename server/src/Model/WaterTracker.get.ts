import { getDay } from "./Utilities/Getters/GetDay";
import { getDailyGoal } from "./Utilities/Getters/GetDailyGoal";
import { getMonth } from "./Utilities/Getters/GetMonth";
import { getWeek } from "./Utilities/Getters/GetWeek";
import { getControls, getControlValue } from "./Utilities/Getters/GetControls";

// Water tracker: model for get requests
const waterTrackerGetModel = {
  /**
   * get month water tracker data from db
   * @param year YYYY
   * @param month M (0 - 11)
   * @param uid user identifier
   * @returns month data
   */
  getMonth,

  /**
   * get week water tracker data from db
   * @param date object
   * @param uid user identifier
   * @returns week data
   */
  getWeek,

  /**
   * get day water tracker data from db
   * @param date object
   * @param uid user identifier
   * @returns day data
   */
  getDay,

  /**
   * get daily goal
   * @param date object
   * @param uid user identifier
   */
  getDailyGoal,

  /**
   * get controls object: {amount and goal}
   * @param uid user identifier
   * @returns controls object
   */
  getControls,

  /**
   * get value of drunk amount or goal
   * @param controlKey amount or goal
   * @param uid user identifier
   * @returns amount or goal value
   */
  getControlValue,
};

export { waterTrackerGetModel };
