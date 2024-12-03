import { Request, Response } from "express";
import { HTTPStatusCodes } from "../../../../Constants/Constants";
import { AmountUpdater, HourlyData } from "../../../../Types/WaterTracker";
import { formatStringToDate, isDateStringValid } from "../../../../Utils/Time";
import { waterTrackerGetModel } from "../../../../Model/WaterTracker.get";
import { waterTrackerSetModel } from "../../../../Model/WaterTracker.set";
import { sendInternalErrorMessage } from "../../../index.utils";
import { ErrorMessages } from "../../../index.enums";

/**
 * update the amount based on the date
 * @param req body: {date: DD.MM.YYYY.HH, amount: number, type: string}
 * @param res updated day
 * @returns
 */
async function updateAmount(req: Request, res: Response) {
  // Authentication check
  if (!req.user) {
    return res.status(HTTPStatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    // validate body and handle errors
    const errors = validateAmountUpdater(req.body);
    if (errors.length > 0) {
      return res.status(HTTPStatusCodes.BAD_REQUEST).json({ error: errors });
    }

    // get values from request body
    const { date, amount, type } = req.body as AmountUpdater;

    // get date object from incoming string
    const dateObj = formatStringToDate(date, "DD.MM.YYYY.HH");

    // Get hours from date string
    const hours = dateObj.getHours();

    // get uid from request
    const uid = req.user.uid;
    const day = await waterTrackerGetModel.getDay(dateObj, uid);

    // check if the day is not found
    if (!day) {
      return res
        .status(HTTPStatusCodes.NOT_FOUND)
        .send({ error: "Day not found" });
    }

    // check if the activity exists otherwise fill it
    day.activity = day.activity ?? new Array(24).fill(0);

    // check if hourly value is nullish
    if (!Array.isArray(day.activity[hours]))
      day.activity[hours] = [] as Array<HourlyData>;

    // update the the hourly activity
    if (Array.isArray(day.activity[hours])) {
      const daysActivity = day.activity[hours] as Array<HourlyData>;
      daysActivity.push({ amount: amount, type: type });
      day.activity[hours] = daysActivity;
    }

    // update the day data
    const updatedDay = await waterTrackerSetModel.setDayData(day, uid);
    res.status(HTTPStatusCodes.OK).json(updatedDay);
  } catch (error) {
    sendInternalErrorMessage(res);
  }
}

/**
 * validate amount updater values
 */
function validateAmountUpdater(body: any) {
  const { amount, date } = body;
  const errors = [];

  // check daily amount
  if (typeof amount !== "number" || amount === 0) {
    errors.push(ErrorMessages.invalidControlAmount);
  }

  // check daily date
  if (!isDateStringValid(date, "DD.MM.YYYY.HH")) {
    errors.push(ErrorMessages.invalidDate);
  }

  return errors;
}

export { updateAmount };
