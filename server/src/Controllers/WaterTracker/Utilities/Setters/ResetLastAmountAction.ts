import { Request, Response } from "express";
import { HTTPStatusCodes } from "../../../../Constants/Constants";
import { formatStringToDate, isDateStringValid } from "../../../../Utils/Time";
import { waterTrackerGetModel } from "../../../../Model/WaterTracker.get";
import { HourlyData } from "../../../../Types/WaterTracker";
import { waterTrackerSetModel } from "../../../../Model/WaterTracker.set";
import { sendInternalErrorMessage } from "../../../index.utils";
import { ErrorMessages } from "../../../index.enums";

/**
 * reset last amount action
 * @param req - { date: "DD.MM.YYYY". hour: 0-23, index: number }
 * @param res - updated day data
 */
async function resetLastAmountAction(req: Request, res: Response) {
  // Authentication check
  if (!req.user) {
    return res.status(HTTPStatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    // validate daily amount and send an error req
    const errors = validateAmountStepBackwards(req.body);
    if (errors.length > 0) {
      return res.status(HTTPStatusCodes.BAD_REQUEST).send({ error: errors });
    }

    // get values from request body
    const { date, hour } = req.body as {
      date: string;
      hour: number;
    };
    const uid = req.user.uid;

    // get date object from incoming string
    const dateObj = formatStringToDate(date, "DD.MM.YYYY");

    // get day data from the model
    const day = await waterTrackerGetModel.getDay(dateObj, uid);

    // check if the day is not found
    if (!day) {
      return res
        .status(HTTPStatusCodes.NOT_FOUND)
        .send({ error: "Day not found" });
    }

    // check if the activity exists otherwise fill it
    day.activity = day.activity ?? new Array(24).fill(0);

    // get hourly data
    const hourData = day.activity[hour];

    // check if hourly value is nullish or not an array, then send response with error
    if (
      !Array.isArray(day.activity[hour]) ||
      (Array.isArray(hourData) && hourData.length === 0)
    ) {
      return res
        .status(HTTPStatusCodes.BAD_REQUEST)
        .send({ error: "Invalid hour index provided" });
    }

    // remove the last amount action
    if (Array.isArray(hourData) && hourData.length > 0) {
      const lastAction = day.activity[hour] as Array<HourlyData>;
      lastAction.pop();
      day.activity[hour] = lastAction;

      // set the hourly value to 0 if there is no action
      if (lastAction.length === 0) {
        day.activity[hour] = 0;
      }
    }

    // update the day data
    const updatedDay = await waterTrackerSetModel.setDayData(day, uid);

    res.status(HTTPStatusCodes.OK).json(updatedDay);
  } catch (error) {
    sendInternalErrorMessage(res);
  }
}

/**
 * validate amount step backwards request
 */
function validateAmountStepBackwards(body: any) {
  const { date, hour } = body;
  const errors = [];

  // check date
  if (!isDateStringValid(date, "DD.MM.YYYY")) {
    errors.push(ErrorMessages.invalidDate);
  }

  // check hour, number between 0 and 23
  if (typeof hour !== "number" || hour < 0 || hour > 23) {
    errors.push(ErrorMessages.invalidHourProperty);
  }

  return errors;
}

export { resetLastAmountAction };
