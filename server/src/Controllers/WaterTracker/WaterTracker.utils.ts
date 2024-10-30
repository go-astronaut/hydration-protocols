import * as vars from "../../Constants/Constants";
import { ErrorMessages } from "../index.enums";
import { validateDailyGoalValue } from "../../Utils/WaterTracker";

/**
 * validate amount range
 * @param amount
 */
function isAmountRangeValid(amount: number) {
  return (
    typeof amount === "number" &&
    amount >= vars.MIN_CONTROL_AMOUNT &&
    amount <= vars.MAX_CONTROL_AMOUNT
  );
}

/*
 *check for goal range
 */
function isGoalRangeValid(goal: number) {
  return (
    typeof goal === "number" &&
    goal > 0 &&
    goal >= vars.MIN_GOAL &&
    goal <= vars.MAX_GOAL
  );
}

/**
 * validate request body of month initializer
 *
 * @param body -  { year, month, goal }
 */
function validateInitMonthData(body: any) {
  const errors = [];

  const { year, month, goal } = body;

  // has to be a number within a specific range
  if (
    typeof year !== "number" ||
    year < vars.MIN_YEAR ||
    year > vars.MAX_YEAR
  ) {
    errors.push(ErrorMessages.invalidYear);
  }

  // has to be a number within a specific range
  if (
    typeof month !== "number" ||
    month < vars.MIN_MONTH_INDEX ||
    month > vars.MAX_MONTH_INDEX
  ) {
    errors.push(ErrorMessages.invalidMonth);
  }

  // has to be a number within a specific range
  if (!validateDailyGoalValue(goal)) {
    errors.push(ErrorMessages.invalidGoal);
  }

  return errors;
}

export { isGoalRangeValid, isAmountRangeValid, validateInitMonthData };
