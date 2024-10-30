import { ref, set } from "firebase/database";
import { db } from "../Firebase/FirebaseConfig";
import * as types from "../Types/WaterTracker";
import * as vars from "../Constants/Constants";
import * as time from "../Utils/Time";
import { waterTrackerGetModel } from "./WaterTracker.get";

const waterTrackerSetModel = {
  /**
   * set day data
   * @param data day data
   * @param uid user identifier
   * @returns updated day data
   */
  async setDayData(data: types.SingleDayData, uid: string) {
    const date = time.formatStringToDate(data.date, "DD.MM.YYYY");
    const { yearIndex, weekIndexDB, weekday } =
      time.getTimeNavigationIndexes(date);
    await set(
      ref(
        db,
        `/${uid}/${vars.DB_DATA_PATH}/${yearIndex}/${weekIndexDB}/${weekday}`
      ),
      data
    );
    return await waterTrackerGetModel.getDay(date, uid);
  },

  /**
   * set the amount or goal value
   * @param value amount or goal value
   * @param controlKey control key
   * @param uid user identifier
   * @returns promise
   */
  async setAmount(value: number, controlKey: vars.ControlKeys, uid: string) {
    return await set(
      ref(db, `/${uid}/${vars.DB_CONTROLS_PATH}/${controlKey}`),
      value
    );
  },

  /**
   * set controls object: {amount and goal}
   * @param controls controls object
   * @param uid user identifier
   * @returns promise
   */
  async setControls(controls: types.ControlsData, uid: string) {
    return await set(ref(db, `/${uid}/${vars.DB_CONTROLS_PATH}`), controls);
  },

  /**
   * set daily goal
   * @param goal daily goal value
   * @param dateObj date object
   * @param uid user identifier
   * @returns promise
   */
  async setDailyGoal(goal: number, dateObj: Date, uid: string) {
    const { yearIndex, monthIndex, weekIndexDB, weekday } =
      time.getTimeNavigationIndexes(dateObj);
    return await set(
      ref(
        db,
        `/${uid}/${vars.DB_DATA_PATH}/${yearIndex}/${weekIndexDB}/${weekday}/${vars.SingleDayKeys.goal}`
      ),
      goal
    );
  },
};

export { waterTrackerSetModel };
