import { Request, Response } from "express";
import {
  HTTPStatusCodes,
  MAX_TYPE_LENGTH,
} from "../../../../Constants/Constants";
import { isAmountRangeValid } from "../../WaterTracker.utils";
import { ErrorMessages } from "../../../index.enums";
import { waterTrackerGetModel } from "../../../../Model/WaterTracker.get";
import { waterTrackerSetModel } from "../../../../Model/WaterTracker.set";

/**
 * Controller to handle setting the amount and type of control values
 * @param req - Controls { amount: number, type: string }
 * @param res - updated control values
 */
async function setControlsAmountAndType(req: Request, res: Response) {
  // Authentication check
  if (!req.user) {
    return res.status(HTTPStatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    // validate daily amount and send an error req
    const errors = validateControlValues(req.body);
    if (errors.length > 0) {
      return res.status(HTTPStatusCodes.BAD_REQUEST).send({ error: errors });
    }

    // get values from request body
    const { amount, type } = req.body as {
      amount: number;
      type: string;
    };
    const uid = req.user.uid;

    // get previous control values and day data
    const controls = await waterTrackerGetModel.getControls(uid);

    // send error if the values are not found
    if (!controls) {
      return res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: ErrorMessages.valuesNotFound });
    }

    // set control values and get updated ones
    await waterTrackerSetModel.setControls(
      { goal: controls.goal, type, amount },
      uid
    );
    const updatedValues = await waterTrackerGetModel.getControls(uid);

    // send error if the values are not found
    if (!updatedValues) {
      return res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: ErrorMessages.valuesNotFound });
    }

    // set response with updated control values
    return res.status(HTTPStatusCodes.OK).send(updatedValues);
  } catch (error) {}
}

/**
 * Validate control values
 */
function validateControlValues(body: any) {
  const errors = [];

  // Check for required fields
  if (!body.amount) {
    errors.push(ErrorMessages.amountRequired);
  }
  if (!body.type) {
    errors.push(ErrorMessages.typeRequired);
  }

  // Check for amount range
  if (!isAmountRangeValid(body.amount)) {
    errors.push(ErrorMessages.invalidControlAmount);
  }

  // Check for type length
  if (body.type.length > MAX_TYPE_LENGTH) {
    errors.push(ErrorMessages.invalidTypeProperty);
  }

  return errors;
}

export { setControlsAmountAndType };
