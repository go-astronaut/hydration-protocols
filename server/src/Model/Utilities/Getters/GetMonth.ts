import moment from "moment";
import { child, get, ref, set } from "firebase/database";
import {
  MonthWaterTrackerDB,
  SingleDayData,
} from "../../../Types/WaterTracker";
import { formatDateToString } from "../../../Utils/Time";
import { getWeekKeysForMonth } from "../../WaterTracker.utils";
import { initializeWeekData } from "../../../Utils/WaterTracker";
import { db, dbRef } from "../../../Firebase/FirebaseConfig";
import { DB_DATA_PATH } from "../../../Constants/Constants";
import { MonthIndex } from "../../../Types/Globals";

/**
 * get month water tracker data from db
 * @param year YYYY
 * @param month M (0 - 11)
 * @param uid user identifier
 * @returns month data for client side
 */
async function getMonth(year: number, month: MonthIndex, uid: string) {
  try {
    const date = new Date(year, month);
    const monthKey = formatDateToString(date, "MM-YYYY");
    const weekKeys = getWeekKeysForMonth(month, year);

    // initialize empty month data set
    const monthData = {
      [monthKey]: {},
    } as MonthWaterTrackerDB;

    // prepopulate week data with nullish values
    weekKeys.forEach((weekKey) => {
      monthData[monthKey][weekKey] = null;
    });

    // iterate through weeks sequentially
    for (let i = 0; i < weekKeys.length; i++) {
      const weekKey = weekKeys[i];

      // get snapshot (wait for it)
      const snapshot = await get(
        child(dbRef, `${uid}/${DB_DATA_PATH}/${year}/${weekKey}`)
      );

      if (!snapshot.exists()) {
        // get week and year values
        const [week, year] = weekKey.split("-");

        const monday = moment()
          .isoWeekYear(parseInt(year))
          .isoWeek(parseInt(week))
          .startOf("isoWeek")
          .toDate();

        // initialize empty week
        // TODO: get rid of hardcoded value, use control values instead
        const weekData = initializeWeekData(monday, 1500);

        // set week to data base (wait for it)
        await set(
          ref(db, `/${uid}/${DB_DATA_PATH}/${year}/${weekKey}`),
          weekData
        );

        // get week from data base after writing (wait for it)
        const weekDB = await get(
          child(dbRef, `${uid}/${DB_DATA_PATH}/${year}/${weekKey}`)
        );
        monthData[monthKey][weekKeys[i]] = weekDB.val() as Array<SingleDayData>;
      } else {
        // snapshot exists, use retrieved data
        monthData[monthKey][weekKeys[i]] =
          snapshot.val() as Array<SingleDayData>;
      }
    }

    return monthData;
  } catch (error) {
    return null;
  }
}

export { getMonth };
