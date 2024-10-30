import { Response } from "express";
import { HTTPStatusCodes } from "../Constants/Constants";
import { ResponseMessages } from "../Types/WaterTracker";

/**
 * set and send response with status 500 with message "An error occured"
 */
function sendInternalErrorMessage(res: Response) {
  const resMessage: ResponseMessages = "An error occurred";
  res
    .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
    .send({ message: resMessage });
}

export { sendInternalErrorMessage };
