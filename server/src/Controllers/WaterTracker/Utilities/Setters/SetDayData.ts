import { Request, Response } from "express";
import { SingleDayData } from "../../../../Types/WaterTracker";
import { waterTrackerSetModel } from "../../../../Model/WaterTracker.set";
import { sendInternalErrorMessage } from "../../../index.utils";
import { validateDailyGoalValue } from "../../../../Utils/WaterTracker";
import { isDateStringValid } from "../../../../Utils/Time";
import { HTTPStatusCodes } from "../../../../Constants/Constants";
import { ErrorMessages } from "../../../index.enums";

/**
 * set day data
 * @param req day data to set
 * @param res set day data
 */
async function setDay(req: Request, res: Response) {
  // Authentication check
  if (!req.user) {
    return res.status(HTTPStatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    // validate day data and send an error req
    const errors = validateDayData(req.body);
    if (errors.length > 0) {
      return res.status(HTTPStatusCodes.BAD_REQUEST).send({ error: errors });
    }

    // send day data to model and sen{ date, month, year } d back updated value to client
    const dayToUpdate = req.body as SingleDayData;
    const uid = req.user.uid;

    // get updated day data from the model
    const updated = await waterTrackerSetModel.setDayData(dayToUpdate, uid);

    res.status(HTTPStatusCodes.OK).json(updated);
  } catch (error) {
    sendInternalErrorMessage(res);
  }
}

/**
 * validate day data values
 * @param - day data
 * @returns error messages
 */
function validateDayData(day: any) {
  const errors = [];
  const { goal, date, activity } = day;

  // check activity array for invalid length
  if (Array.isArray(activity) && activity.length !== 24) {
    errors.push(ErrorMessages.invalidActivityProperty);
  }

  // check hourly amounts
  if (
    Array.isArray(activity) &&
    activity.find(
      (hourly) => hourly?.amount && hourly.amount > 0 && hourly.amount < 9000
    )
  ) {
    errors.push(ErrorMessages.invalidAmount);
  }

  // check daily goal
  if (!validateDailyGoalValue(goal)) {
    errors.push(ErrorMessages.invalidGoal);
  }

  // check daily date
  if (!isDateStringValid(date, "DD.MM.YYYY")) {
    errors.push(ErrorMessages.invalidDate);
  }

  return errors;
}

export { setDay };
