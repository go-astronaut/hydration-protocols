import * as vars from "../Constants/Constants";
import { MIN_PASSWORD_LENGTH } from "./User/User.variables";

enum ErrorMessages {
  isFuture = "Future months and years are not allowed",
  invalidYear = "Invalid year provided. Year must be the current year + 2 or - 2",
  invalidMonth = `Invalid month provided. Month must be between ${vars.MIN_MONTH_INDEX} and ${vars.MAX_MONTH_INDEX}`,
  invalidGoal = `Invalid goal provided. Goal must be a number between ${vars.MIN_GOAL} and ${vars.MAX_GOAL}`,
  invalidAmount = `Invalid amount provided. Amount must be a number between ${vars.MIN_AMOUNT} and ${vars.MAX_AMOUNT}`,
  invalidControlAmount = `Invalid amount provided. Amount must be a number between ${vars.MIN_CONTROL_AMOUNT} and ${vars.MAX_CONTROL_AMOUNT}`,
  invalidDate = `Invalid date provided`,
  noData = "No data found",
  invalidData = "Invalid format values. Please provide correct data",
  notAuthorized = "Not authorized",
  missingToken = "Missing token",
  invalidMail = "Invalid email provided",
  passwordLength = `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
  serverError = "Internal server error",
  invalidActivityProperty = "Invalid activity provided",
  invalidHourProperty = "Invalid hour provided",
  invalidTypeProperty = "Invalid type provided",
  invalidLanguageParameter = "Invalid language parameter",
  notSupported = "Invalid language parameter provided",
}

export { ErrorMessages };
