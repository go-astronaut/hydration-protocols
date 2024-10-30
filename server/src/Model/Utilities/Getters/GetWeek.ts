import { child, get } from "firebase/database";
import { getTimeNavigationIndexes } from "../../../Utils/Time";
import { dbRef } from "../../../Firebase/FirebaseConfig";
import { DB_DATA_PATH } from "../../../Constants/Constants";
import { SingleDayData } from "../../../Types/WaterTracker";

/**
 * get week water tracker data from db
 * @param date object
 * @param uid user identifier
 * @returns week data
 */
async function getWeek(date: Date, uid: string) {
  try {
    // get navigation indexes for data base
    const { yearIndex, weekIndexDB } = getTimeNavigationIndexes(date);

    // get a data snapshot
    const snapshot = await get(
      child(dbRef, `/${uid}/${DB_DATA_PATH}/${yearIndex}/${weekIndexDB}`)
    );

    // check if snapshot exists
    if (snapshot.exists()) {
      // get the value out of data snapshot and make type casting
      return snapshot.val() as Array<SingleDayData>;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { getWeek };
