import { Request, Response } from "express";
import { HTTPStatusCodes } from "../../../../Constants/Constants";
import { QueryParam } from "../../../../Types/WaterTracker";
import { ErrorMessages } from "../../../index.enums";
import { waterTrackerGetModel } from "../../../../Model/WaterTracker.get";
import { sendInternalErrorMessage } from "../../../index.utils";

/**
 * get single day data
 * @param req - date: D, month: MM (1 - 12), year: YYYY
 * @param res - single day data
 */
async function getToday(req: Request, res: Response) {
  // Authentication check
  if (!req.user)
    return res.status(HTTPStatusCodes.UNAUTHORIZED).send("Unauthorized");
  try {
    const { date, month, year } = req.query as {
      date: QueryParam;
      year: QueryParam;
      month: QueryParam;
    };

    // validate queries
    if (!date || !month || !year || !isValidDayData(date, month, year)) {
      // TODO: create set of errors for all values
      return res
        .status(HTTPStatusCodes.BAD_REQUEST)
        .send({ error: ErrorMessages.invalidData });
    }

    // date object and uid to access day data
    const dateObj = new Date(+year, +month, +date);
    const uid = req.user.uid;

    // get day data from targeted date and user
    const dayData = await waterTrackerGetModel.getDay(dateObj, uid);
    res.status(HTTPStatusCodes.OK).json(dayData);
  } catch (error) {
    console.log(error);
    sendInternalErrorMessage(res);
  }
}

/**
 * check queries from request get day data
 *
 * @param date - DD format
 * @param month - number 1 - 12
 * @param year - YYYY format
 * @returns - is valid boolean value
 */
function isValidDayData(date: QueryParam, month: QueryParam, year: QueryParam) {
  //TODO: specify ranges
  return year && month && date
    ? !isNaN(+year) && !isNaN(+month) && !isNaN(+date)
    : false;
}

export { getToday };
