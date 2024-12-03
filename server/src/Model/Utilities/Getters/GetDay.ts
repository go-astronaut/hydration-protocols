import { child, get } from "firebase/database";
import { getTimeNavigationIndexes } from "../../../Utils/Time";
import { dbRef } from "../../../Firebase/FirebaseConfig";
import { DB_DATA_PATH } from "../../../Constants/Constants";
import { SingleDayData } from "../../../Types/WaterTracker";

/**
 * get day water tracker data from db
 * @param date object
 * @param uid user identifier
 * @returns day data
 */
async function getDay(date: Date, uid: string) {
  try {
    // get time navigation indexes to access day data in the data base
    const { yearIndex, weekIndexDB, weekday } = getTimeNavigationIndexes(date);

    // get a data snapshot from the data base
    const snapshot = await get(
      child(
        dbRef,
        `/${uid}/${DB_DATA_PATH}/${yearIndex}/${weekIndexDB}/${weekday}`
      )
    );

    // check if the data snapshots exists
    if (snapshot.exists()) {
      // get value out of snapshot and type cast it
      return snapshot.val() as SingleDayData;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export { getDay };
