import { ControlKeys } from "../Constants/Constants";

/**
 * Year data for data base: Year to Weeks to Days
 */
type YearData = {
  [key: string]: WeekWaterTrackerDB;
};

interface HourlyData {
  amount: number;
  type: string;
}

/**
 * single day data
 */
interface SingleDayData {
  date: string;
  goal: number;
  activity?: Array<HourlyData[] | number>;
}

/**
 * Interface for updating the amount based on the date
 */
interface AmountUpdater {
  date: string;
  amount: number;
  type: string;
}

/**
 * Controls data: amount, goal, type
 * to avoid confucion with goal value. It's used for initialising data
 */
interface ControlsData {
  amount: number;
  goal: number;
  type: string;
}

/**
 * Month data for data base: Month to Weeks to Days (week data can't be null on frontend)
 */
type MonthData = {
  [key: string]: {
    [key: string]: Array<SingleDayData> | null;
  };
};

type WeekWaterTrackerDB = { [key: string]: Array<SingleDayData> };

type ResponseMessages =
  | "Month was successfully created"
  | "Bad request"
  | "An error occurred"
  | "Data couldn't be updated"
  | "Value was successfully updated"
  | "created";

type ErrorMessages =
  | "Invalid email"
  | "Password must be at least 7 characters long"
  | "Username is required"
  | "You are not authorized"
  | "Invalid year or month format. Please provide correct data"
  | "Invalid date, year or month format. Please provide correct data";

interface DailyValues {
  date: string;
  valueType: ControlKeys;
  value: number;
}

type QueryParam = string | number | boolean | undefined;

export {
  HourlyData,
  AmountUpdater,
  SingleDayData,
  MonthData as MonthWaterTrackerDB,
  WeekWaterTrackerDB,
  ResponseMessages,
  ControlsData,
  DailyValues,
  ErrorMessages,
  QueryParam,
  YearData,
};
