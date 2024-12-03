import { child, get } from "firebase/database";
import { ControlKeys, DB_CONTROLS_PATH } from "../../../Constants/Constants";
import { dbRef } from "../../../Firebase/FirebaseConfig";
import { ControlsData } from "../../../Types/WaterTracker";

/**
 * get controls object: {amount and goal}
 * @param uid user identifier
 * @returns controls object
 */
async function getControls(uid: string) {
  // get data snapshot of the data
  const snapshot = await get(child(dbRef, `/${uid}/${DB_CONTROLS_PATH}`));

  // check if the data snapshot exists and return the data
  if (snapshot.exists()) {
    return snapshot.val() as ControlsData;
  } else {
    return null;
  }
}

/**
 * get value of drunk amount or goal
 * @param controlKey amount or goal
 * @param uid user identifier
 * @returns amount or goal value
 */
async function getControlValue(controlKey: ControlKeys, uid: string) {
  // get data snapshot of the data
  const snapshot = await get(
    child(dbRef, `/${uid}/${DB_CONTROLS_PATH}/${controlKey}`)
  );

  // check if the data snapshot exists and return the value
  if (snapshot.exists()) {
    return snapshot.val() as number;
  }
  return null;
}

export { getControls, getControlValue };
