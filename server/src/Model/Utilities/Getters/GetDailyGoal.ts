import { child, get } from "firebase/database";
import { getTimeNavigationIndexes } from "../../../Utils/Time";
import { dbRef } from "../../../Firebase/FirebaseConfig";
import { DB_DATA_PATH, SingleDayKeys } from "../../../Constants/Constants";

async function getDailyGoal(date: Date, uid: string) {
  try {
    // get time indexes
    const { yearIndex, weekIndexDB, weekday } = getTimeNavigationIndexes(date);

    // get daily goal from db
    const snapshot = await get(
      child(
        dbRef,
        `/${uid}/${DB_DATA_PATH}/${yearIndex}/${weekIndexDB}/${weekday}/${SingleDayKeys.goal}`
      )
    );

    // return daily goal value or null if not found
    if (snapshot.exists()) {
      return snapshot.val() as number;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { getDailyGoal };
