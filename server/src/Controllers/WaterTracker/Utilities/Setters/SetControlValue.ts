import { Request, Response } from "express";
import { waterTrackerSetModel } from "../../../../Model/WaterTracker.set";
import { waterTrackerGetModel } from "../../../../Model/WaterTracker.get";
import { sendInternalErrorMessage } from "../../../index.utils";
import { isAmountRangeValid, isGoalRangeValid } from "../../WaterTracker.utils";
import { ControlKeys, HTTPStatusCodes } from "../../../../Constants/Constants";
import { ErrorMessages } from "../../../index.enums";

/**
 * set the control values of drunk water: amount or goal
 * @param req incoming { amount: number }
 * @param res outcoming { amount: number }
 */
async function setControlValue(req: Request, res: Response) {
  // Authentication check
  if (!req.user) {
    return res.status(HTTPStatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    // validate body and handle errors
    const errors = validateControlValue(req.body);
    if (errors.length > 0) {
      return res.status(HTTPStatusCodes.BAD_REQUEST).json({ error: errors });
    }

    // get values from request body
    const { value, controlValueType } = req.body as {
      value: number;
      controlValueType: ControlKeys;
    };
    const uid = req.user.uid;

    // set control value and get control value
    await waterTrackerSetModel.setAmount(value, controlValueType, uid);
    const amountUpdated = await waterTrackerGetModel.getControlValue(
      controlValueType,
      uid
    );

    // send updated value to client
    res
      .status(HTTPStatusCodes.CREATED)
      .send({ controlValueType: controlValueType, value: amountUpdated });
  } catch (error) {
    sendInternalErrorMessage(res);
  }
}

/**
 * validate control value from incoming request
 */
function validateControlValue(body: any) {
  const errors = [];
  const { value, controlValueType } = body;

  // check for control key amount range
  if (controlValueType === ControlKeys.amount && !isAmountRangeValid(value)) {
    errors.push(ErrorMessages.invalidAmount);
  }

  // check for control key goal range
  if (controlValueType === ControlKeys.goal && !isGoalRangeValid(value)) {
    errors.push(ErrorMessages.invalidGoal);
  }

  // check for invalid data types and values
  if (
    typeof value !== "number" ||
    typeof controlValueType !== "string" ||
    (controlValueType !== ControlKeys.amount &&
      controlValueType !== ControlKeys.goal)
  ) {
    errors.push(ErrorMessages.invalidData);
  }

  return errors;
}

export { setControlValue };
