import { Request, Response } from "express";
import moment from "moment";
import { waterTrackerGetModel } from "../../../../Model/WaterTracker.get";
import { sendInternalErrorMessage } from "../../../index.utils";
import { HTTPStatusCodes } from "../../../../Constants/Constants";
import { QueryParam } from "../../../../Types/WaterTracker";
import { MonthIndex } from "../../../../Types/Globals";
import { ErrorMessages } from "../../../index.enums";

/**
 * get month data from year and month queries
 * @param req - query values: year YYYY and month 0 - 11
 * @param res - data of targeted month
 */
async function getMonth(req: Request, res: Response) {
  // Authentication check
  if (!req.user)
    return res.status(HTTPStatusCodes.UNAUTHORIZED).send("Unauthorized");
  try {
    const { year, month } = req.query as {
      year: QueryParam;
      month: QueryParam;
    };

    // validate queries
    const errors = isValidMonthData(req.query);

    // check for validity
    if (year && month && errors.length === 0) {
      const uid = req.user.uid;

      const yearNum = +year as number;
      const monthNum = +month as MonthIndex;

      const monthData = await waterTrackerGetModel.getMonth(
        yearNum,
        monthNum,
        uid
      );

      res.status(HTTPStatusCodes.OK).json(monthData);
    } else {
      res.status(HTTPStatusCodes.BAD_REQUEST).send({ errors });
    }
  } catch (error) {
    console.log(error);
    sendInternalErrorMessage(res);
  }
}

/**
 * check queries from request get month data
 * @param year - YYYY format
 * @param month - number 0 - 11
 * @returns - is valid boolean value
 */
function isValidMonthData(query: any) {
  const errors = [];
  const { year, month } = query;

  // check if values exist and are valid
  const validValues = year && month ? !isNaN(+year) && !isNaN(+month) : false;

  if (!validValues) errors.push(ErrorMessages.invalidData);

  // Check if the requested month and year are in the future
  // temporary deactivated: frontend need a proper time navigation
  // const now = moment.utc();
  // const isFuture =
  //   year && month ? now.month() < +month || now.year() < +year : false;
  // if (isFuture) errors.push(ErrorMessages.isFuture);

  //TODO: specify ranges (future done)
  return errors;
}

export { getMonth };
