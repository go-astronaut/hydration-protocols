import { Request, Response } from "express";
import { HTTPStatusCodes } from "../../../../Constants/Constants";
import { waterTrackerGetModel } from "../../../../Model/WaterTracker.get";
import { sendInternalErrorMessage } from "../../../index.utils";
import { ErrorMessages } from "../../../index.enums";

/**
 * get week data from date target
 * @param req date target { date, month, year }
 */
async function getWeek(req: Request, res: Response) {
  // Authentication check
  if (!req.user) {
    return res.status(HTTPStatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    // validate data and respond to the client if an error occurred
    const errors = validateDate(req.query);

    if (errors && errors.length > 0)
      return res.status(HTTPStatusCodes.BAD_REQUEST).json({ error: errors });

    // set date object and user id to access the week in model
    const { date, month, year } = req.query as {
      date: string;
      month: string;
      year: string;
    };
    const dateObj = new Date(+year, +month, +date);
    const uid = req.user.uid;

    // get week data and send it to client
    const week = await waterTrackerGetModel.getWeek(dateObj, uid);
    res.status(HTTPStatusCodes.OK).json(week);
  } catch (error) {
    console.log(error);
    sendInternalErrorMessage(res);
  }
}

/**
 * validate D.M.YYYY formated string
 * @param dateString
 */
function validateDate(body: any) {
  const { date, month, year } = body;
  const dateString = `${date}.${month}.${year}`;
  const errors = [];
  const regex = /^\d{1,2}\.\d{1,2}\.\d{4}$/;
  const match = regex.test(dateString);

  if (!match) {
    errors.push(ErrorMessages.invalidDate);
    return errors;
  }

  return;
}

export { getWeek };
