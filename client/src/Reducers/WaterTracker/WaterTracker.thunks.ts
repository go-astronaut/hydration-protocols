import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as types from "../../Types/WaterTracker.types";
import { HeadersReq } from "../../Types/Global.types";
import * as vars from "../../Constants";

/**
 * Async thunk for fetching month data
 */
const getMonthData = createAsyncThunk<
  types.Month | null,
  { year: number; month: number; headers: HeadersReq }
>("data/getMonthData", async ({ year, month, headers }) => {
  const response = await axios.get(
    `${vars.BACK_END_WATER_TRACKER}/get-month?year=${year}&month=${month}`,
    headers
  );
  return response.data as types.Month | null;
});

/**
 * Async thunk for fetching single day data
 */
const getTodayData = createAsyncThunk<
  types.SingleDayData | null,
  { req: types.GetDayData; headers: HeadersReq }
>("data/getTodayData", async ({ req, headers }) => {
  const response = await axios.get(
    `${vars.BACK_END_WATER_TRACKER}/get-today-data?year=${req.year}&month=${req.month}&date=${req.date}`,
    headers
  );
  return response.data as types.SingleDayData | null;
});

/**
 * Async thunk for fetching month data
 */
const createMonthData = createAsyncThunk<
  types.Month | null,
  { payload: types.CreateEmptyMonth; headers: HeadersReq }
>("data/createMonthData", async ({ payload, headers }) => {
  const response = await axios.put(
    `${vars.BACK_END_WATER_TRACKER}/create-empty-month`,
    payload,
    headers
  );
  return response.data as types.Month | null;
});

/**
 * Async thunk for updating single day data. Amount will be summed: drink amount + current amount.
 * For editing use editDailyValue.
 *
 * DailyValues { date: string; valueType: ControlKeys; value: number; }
 */
const setDayData = createAsyncThunk<
  types.SingleDayData | null,
  { payloadData: types.SingleDayData; headers: HeadersReq }
>("data/set-day-data", async ({ payloadData, headers }) => {
  const response = await axios.put(
    `${vars.BACK_END_WATER_TRACKER}/set-day-data/`,
    payloadData,
    headers
  );
  return response.data as types.SingleDayData;
});

/**
 * Async thunk for updating amount of a single day
 */
const updateDayAmount = createAsyncThunk<
  types.SingleDayData | null,
  { payloadData: types.AmountUpdater; headers: HeadersReq }
>("data/update-daily-amount", async ({ payloadData, headers }) => {
  const response = await axios.put(
    `${vars.BACK_END_WATER_TRACKER}/update-daily-amount`,
    payloadData,
    headers
  );
  return response.data as types.SingleDayData | null;
});

/**
 * Async thunk for setting daily goal value
 */
const setDailyGoal = createAsyncThunk<
  types.GoalUpdater | null,
  { payloadData: types.GoalUpdater; headers: HeadersReq }
>("data/update-daily-goal", async ({ payloadData, headers }) => {
  const response = await axios.put(
    `${vars.BACK_END_WATER_TRACKER}/set-daily-goal`,
    payloadData,
    headers
  );
  return response.data as types.GoalUpdater | null;
});

/**
 * Async thunk for setting a control value
 */
const setControlValue = createAsyncThunk<
  types.SetControlValue | null,
  { payloadData: types.SetControlValue; headers: HeadersReq }
>("data/setControlValue", async ({ payloadData, headers }) => {
  const response = await axios.put(
    `${vars.BACK_END_WATER_TRACKER}/set-control-value/`,
    payloadData,
    headers
  );
  return response.data as types.SetControlValue | null;
});

/**
 * Async thunk for setting control values: amount and type. Date and goal are day data related.
 */
const setControlValues = createAsyncThunk<
  types.ControlUpdater | null,
  { payloadData: types.ControlUpdater; headers: HeadersReq }
>("data/setControlValues", async ({ payloadData, headers }) => {
  const response = await axios.put(
    `${vars.BACK_END_WATER_TRACKER}/set-control-values/`,
    payloadData,
    headers
  );
  return response.data as types.ControlUpdater | null;
});

/**
 * Async thunk for setting a control value
 */
const setControlsAmountAndType = createAsyncThunk<
  types.Controls | null,
  { payloadData: { amount: number; type: string }; headers: HeadersReq }
>("data/setControlsAmountAndType", async ({ payloadData, headers }) => {
  const response = await axios.put(
    `${vars.BACK_END_WATER_TRACKER}/set-controls-amount-and-type/`,
    payloadData,
    headers
  );
  return response.data as types.Controls | null;
});

/**
 * Async thunk for setting a control value
 */
const getControlValues = createAsyncThunk<types.Controls | null, HeadersReq>(
  "data/getControlValues",
  async (headers) => {
    const response = await axios.get(
      `${vars.BACK_END_WATER_TRACKER}/get-control-values/`,
      headers
    );
    return response.data as types.Controls;
  }
);

/**
 * Async thunk for initializing water tracker
 */
const initialize = createAsyncThunk<
  types.Initializer,
  { req: types.GetDayData; headers: HeadersReq }
>("data/initialize", async ({ req, headers }) => {
  // get control values
  const control = await axios.get(
    `${vars.BACK_END_WATER_TRACKER}/get-control-values/`,
    headers
  );

  // get month data
  const month = await axios.get(
    `${vars.BACK_END_WATER_TRACKER}/get-month?year=${req.year}&month=${req.month}`,
    headers
  );

  return {
    control: control.data,
    month: month.data,
  } as types.Initializer;
});

/*
 * Async thunk to reset last drink action
 */
const resetLastDrink = createAsyncThunk<
  types.SingleDayData | null,
  { payloadData: types.ResetLastDrink; headers: HeadersReq }
>("data/resetLastDrink", async ({ payloadData, headers }) => {
  const response = await axios.put(
    `${vars.BACK_END_WATER_TRACKER}/amount-step-backwards`,
    payloadData,
    headers
  );
  return response.data as types.SingleDayData | null;
});

export {
  updateDayAmount,
  getMonthData,
  getTodayData,
  createMonthData,
  setDayData,
  getControlValues,
  initialize,
  setDailyGoal,
  resetLastDrink,
  setControlValue,
  setControlValues,
  setControlsAmountAndType,
};
