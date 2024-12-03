import { Request, Response } from "express";
import { formatStringToDate, isDateStringValid } from "../../../../Utils/Time";
import { waterTrackerSetModel } from "../../../../Model/WaterTracker.set";
import { waterTrackerGetModel } from "../../../../Model/WaterTracker.get";
import { sendInternalErrorMessage } from "../../../index.utils";
import { HTTPStatusCodes } from "../../../../Constants/Constants";
import { validateDailyGoalValue } from "../../../../Utils/WaterTracker";
import { ErrorMessages } from "../../../index.enums";

/**
 * set daily goal
 * @param req daily goal to set { goal: number, date: string }
 * @param res status code
 */
async function setDailyGoal(req: Request, res: Response) {
  // Authentication check
  if (!req.user) {
    return res.status(HTTPStatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    // validate daily goal and send an error req
    const errors = validateDailyGoalReq(req.body);
    if (errors.length > 0) {
      return res.status(HTTPStatusCodes.BAD_REQUEST).send({ error: errors });
    }

    // get values from request body
    const { goal, date } = req.body as { goal: number; date: string };
    const uid = req.user.uid;

    // get date object from incoming string
    const dateObj = formatStringToDate(date, "DD.MM.YYYY");

    // set daily goal and send status code to client
    await waterTrackerSetModel.setDailyGoal(goal, dateObj, uid);

    // get updated goal from the model
    const updatedGoal = await waterTrackerGetModel.getDailyGoal(dateObj, uid);

    res.status(HTTPStatusCodes.OK).send({ goal: updatedGoal, date: date });
  } catch (error) {
    sendInternalErrorMessage(res);
  }
}

function validateDailyGoalReq(body: any) {
  const { goal, date } = body;
  const errors = [];

  // check daily goal
  if (!validateDailyGoalValue(goal)) {
    errors.push(ErrorMessages.invalidGoal);
  }

  // check date
  if (!isDateStringValid(date, "DD.MM.YYYY")) {
    errors.push(ErrorMessages.invalidDate);
  }

  return errors;
}

export { setDailyGoal };
