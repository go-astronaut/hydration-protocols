import { setControlValue } from "./Utilities/Setters/SetControlValue";
import { updateAmount } from "./Utilities/Setters/UpdateAmount";
import { setDay } from "./Utilities/Setters/SetDayData";
import { setDailyGoal } from "./Utilities/Setters/SetDailyGoal";
import { resetLastAmountAction } from "./Utilities/Setters/ResetLastAmountAction";
import { setControlValues } from "./Utilities/Setters/SetControlValues";

const waterTrackerSetController = {
  /**
   * set the control values of drunk water: amount or goal
   * @param req incoming { amount: number }
   * @param res outcoming { amount: number }
   */
  setControlValue,

  /**
   * update the amount based on the date
   * @param req
   * @param res
   * @returns
   */
  updateAmount,

  /**
   * set day data
   * @param req day data to set
   * @param res set day data
   */
  setDay,

  /**
   * set daily goal
   * @param req daily goal to set { goal: number, date: string }
   * @param res status code
   */
  setDailyGoal,

  /**
   * reset last amount action
   * @param req - { date: "DD.MM.YYYY". hour: 0-23, index: number }
   * @param res - updated day data
   */
  resetLastAmountAction,

  /**
   * set control values
   * @param req - Controls { amount: number, goal: number, type: string }
   * @param res - updated control values
   */
  setControlValues,
};

export default waterTrackerSetController;
