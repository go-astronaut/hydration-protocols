import { SerializedError } from "@reduxjs/toolkit";
import { ControlKeys } from "../Constants";
import { MonthIndex } from "./Global.types";

/**
 * Reset last drink action request data
 */
interface ResetLastDrink {
  date: string;
  hour: number;
}

/**
 * Goal value from request
 */
interface GoalValue {
  goal: number;
}

/**
 * Hourly data for a single day
 */
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
 * Interface for updating the goal based on the date
 */
interface GoalUpdater {
  date: string;
  goal: number;
}

/**
 *  Control object for updating the amount, goal and type
 */
interface ControlUpdater {
  amount: number;
  type: string;
  goal: number;
  date: string;
}

/**
 * Controls for single day manipulation
 */
interface Controls {
  amount: number | null;
  goal: number | null;
  type: string | null;
}

/**
 * Daily values to update a daily value
 */
interface DailyValues {
  date: string;
  valueType: ControlKeys;
  value: number;
}

/**
 * control value with incoming value
 */
interface SetControlValue {
  controlValueType: ControlKeys;
  value: number;
}

/**
 * Necessary data to create an empty month
 */
interface CreateEmptyMonth {
  year: number;
  month: MonthIndex;
  goal: number;
}

/**
 * Necessary data to get single day data
 */
interface GetDayData {
  year: number;
  month: MonthIndex;
  date: number;
}

/**
 * time setter for traverse between months and years
 */
interface MonthSetter {
  year: number;
  month: number;
}

/**
 * Month data: Month to Weeks to Days
 */
type Month = {
  [key: string]: {
    [key: string]: Array<SingleDayData>;
  };
};

/**
 * Month data: Weeks to Days
 */
type WeekData = { [key: string]: Array<SingleDayData> };

/**
 * redux state
 */
interface State {
  controls: Controls;
  selectedMonth: number;
  timeTraverse: MonthSetter;
  hourlyActivity: boolean;
  month: Month | null;
  selectedYear: number;
  todaysGoalInput: number | null;
  loading: boolean;
  contentIsLoading: boolean;
  initialLoading: boolean;
  initialized: boolean;
  error: SerializedError | string | null;
}

/**
 * Initializer for water tracker
 */
interface Initializer {
  control: Controls | null;
  today: SingleDayData | null;
  month: Month | null;
}

export type {
  ResetLastDrink,
  AmountUpdater,
  HourlyData,
  SingleDayData,
  Controls,
  ControlUpdater,
  DailyValues,
  Month,
  SetControlValue,
  CreateEmptyMonth,
  MonthSetter,
  GetDayData,
  WeekData,
  State,
  Initializer,
  GoalUpdater,
  GoalValue,
};
