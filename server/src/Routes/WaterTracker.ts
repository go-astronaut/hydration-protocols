import express from "express";
import waterTrackerSetController from "../Controllers/WaterTracker/WaterTracker.put";
import { userController } from "../Controllers/User/User";
import { waterTrackerGetController } from "../Controllers/WaterTracker/WaterTracker.get";

const waterTrackerRoutes = express.Router();

waterTrackerRoutes.get(
  "/get-month",
  userController.verifyToken,
  waterTrackerGetController.getMonth
);

waterTrackerRoutes.get(
  "/get-control-values",
  userController.verifyToken,
  waterTrackerGetController.getControlValues
);

waterTrackerRoutes.get(
  "/get-today-data",
  userController.verifyToken,
  waterTrackerGetController.getToday
);

waterTrackerRoutes.get(
  "/get-week-data",
  userController.verifyToken,
  waterTrackerGetController.getWeek
);

waterTrackerRoutes.put(
  "/update-daily-amount",
  userController.verifyToken,
  waterTrackerSetController.updateAmount
);

waterTrackerRoutes.put(
  "/set-control-value",
  userController.verifyToken,
  waterTrackerSetController.setControlValue
);

waterTrackerRoutes.put(
  "/set-day-data",
  userController.verifyToken,
  waterTrackerSetController.setDay
);

waterTrackerRoutes.put(
  "/set-daily-goal",
  userController.verifyToken,
  waterTrackerSetController.setDailyGoal
);

waterTrackerRoutes.put(
  "/amount-step-backwards",
  userController.verifyToken,
  waterTrackerSetController.resetLastAmountAction
);

waterTrackerRoutes.put(
  "/set-control-values",
  userController.verifyToken,
  waterTrackerSetController.setControlValues
);

export default waterTrackerRoutes;
