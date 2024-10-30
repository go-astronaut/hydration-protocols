import { NextFunction, Request, Response } from "express";
import { admin } from "../../Firebase/FirebaseConfig";
import { sendInternalErrorMessage } from "../index.utils";
import { validateRegistrationData } from "./User.utils";
import { CONTROLS_INIT, HTTPStatusCodes } from "../../Constants/Constants";
import { ErrorMessages } from "../index.enums";
import { waterTrackerSetModel } from "../../Model/WaterTracker.set";
import { Translations } from "../../Types/Globals";

const userController = {
  /**
   * register a user with email and password
   *
   * @param req - email, password, user name
   * @param res
   */
  async signUp(req: Request, res: Response) {
    try {
      const { email, password, userName } = req.body;

      // validate req data
      const errors = validateRegistrationData(email, password, userName);
      if (errors.length > 0) {
        return res.status(HTTPStatusCodes.UNPROCESSABLE_CONTENT).json(errors);
      }

      // Create user account using Firebase Auth
      const user = await admin.auth().createUser({
        email: email,
        password: password,
        emailVerified: true,
        disabled: false,
        displayName: userName,
      });

      const uid = user.uid;

      // Initialize user's controls for water tracker
      await waterTrackerSetModel.setControls(CONTROLS_INIT, uid);

      res
        .status(HTTPStatusCodes.CREATED)
        .json({ message: "User successfully registered" });
    } catch {
      sendInternalErrorMessage(res);
    }
  },

  /**
   * Verifies a user's authorization token.
   *
   * @param req - Request object containing the authorization header
   * @param res - Response object for sending response data
   * @param next - Next function to continue middleware chain
   */
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split("Bearer ")[1];

      if (!token) {
        return res
          .status(HTTPStatusCodes.UNAUTHORIZED)
          .json({ error: ErrorMessages.missingToken });
      }
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      res
        .status(HTTPStatusCodes.UNAUTHORIZED)
        .json({ error: ErrorMessages.notAuthorized });
    }
  },

  /**
   * get translation json for i18next in frontend
   */
  async getTranslations(req: Request, res: Response) {
    try {
      // get language parameter
      const language = req.params.language;

      // at the moment are only 3 languages supported: english, russian, german
      if (language !== "en" && language !== "de" && language !== "ru") {
        return res
          .status(HTTPStatusCodes.BAD_REQUEST)
          .send({ error: ErrorMessages.invalidLanguageParameter });
      }

      // get translation json
      const translations: Translations = require(`../../../locales/${language}/translation.json`);

      res.status(HTTPStatusCodes.OK).json(translations);
    } catch (error) {
      res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ErrorMessages.serverError });
    }
  },
};

export { userController };
