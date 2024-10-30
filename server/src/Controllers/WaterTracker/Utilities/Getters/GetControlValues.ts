import { Request, Response } from "express";
import { HTTPStatusCodes } from "../../../../Constants/Constants";
import { waterTrackerGetModel } from "../../../../Model/WaterTracker.get";
import { sendInternalErrorMessage } from "../../../index.utils";

/**
 * get control object: drink amount, daily goal for initializing
 */
async function getControlValues(req: Request, res: Response) {
  // Authentication check
  if (!req.user) {
    return res.status(HTTPStatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    // get user's control values from model
    const uid = req.user.uid;
    const controls = await waterTrackerGetModel.getControls(uid);

    res.status(HTTPStatusCodes.OK).json(controls);
  } catch (error) {
    console.log(error);
    sendInternalErrorMessage(res);
  }
}

export { getControlValues };
