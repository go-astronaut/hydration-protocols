import { PayloadAction } from "@reduxjs/toolkit";
import * as utils from "./WaterTracker.utils";
import {
  formatStringToDate,
  getTimeNavigationIndexes,
} from "../../Utils/Time.utils";
import * as types from "../../Types/WaterTracker.types";
import { ControlKeys } from "../../Constants";

const extraReducers = {
  /**
   * set month data from payload
   */
  setMonthData: (
    state: types.State,
    action: PayloadAction<types.Month | null>
  ) => {
    state.loading = false;
    state.contentIsLoading = false;
    const monthData = action.payload;
    state.month = monthData ? { ...monthData } : null;
  },
  /**
   * set day data from payload and update month and current week
   */
  setDayData: (
    state: types.State,
    action: PayloadAction<types.SingleDayData | null>
  ) => {
    state.loading = false;
    const day = action.payload;
    const month = state.month;
    if (day && month) {
      // Update the day data
      utils.updateDayOfMonth(month, day);
    }
  },
  /**
   * update daily goal of a day
   */
  updateDailyGoal: (
    state: types.State,
    action: PayloadAction<types.GoalUpdater | null>
  ) => {
    state.loading = false;
    // get goal and date from payload
    const goal = action.payload?.goal;
    const date = action.payload?.date;

    // get month from state
    const month = state.month;

    // if values are present, update the goal
    if (goal && date && month) {
      const dateObj = formatStringToDate(date, "DD.MM.YYYY");
      const { monthIndex, weekIndex, weekday } =
        getTimeNavigationIndexes(dateObj);
      if (month[monthIndex]?.[weekIndex]?.[weekday]) {
        month[monthIndex][weekIndex][weekday].goal = goal;
      }
    }
  },

  /**
   * Set control values: type and amount
   */
  setAmountAndType: (
    state: types.State,
    action: PayloadAction<types.Controls | null>
  ) => {
    state.loading = false;
    const payload = action.payload;
    if (payload?.amount && payload?.type !== null) {
      state.controls.amount = payload.amount;
      state.controls.type = payload.type;
    }
  },

  /**
   * set control value based on control type
   */
  setControlValue: (
    state: types.State,
    action: PayloadAction<types.SetControlValue | null>
  ) => {
    state.loading = false;
    const payload = action.payload;
    if (payload) {
      const controlValueType = payload.controlValueType;
      const value = payload.value;

      // Check for type of control value and update it
      switch (controlValueType) {
        case ControlKeys.amount:
          state.controls.amount = +value;
          break;
        case ControlKeys.goal:
          state.controls.goal = +value;
          break;
        case ControlKeys.type:
          state.controls.type = value.toString();
          break;
      }
    }
  },
  /**
   * set both control values: amount and goal
   */
  setControlValues: (
    state: types.State,
    action: PayloadAction<types.Controls | null>
  ) => {
    state.loading = false;
    const payload = action.payload;
    if (payload) {
      state.controls = { ...payload };
    }
  },
  /**
   * handle controls update
   */
  handleControlsUpdate: (
    state: types.State,
    action: PayloadAction<types.ControlUpdater | null>
  ) => {
    //unsetting loading
    state.loading = false;

    //getting payload data
    const payload = action.payload;

    if (payload) {
      //getting date and month data
      const date = payload.date;
      const month = state.month;

      //if month data is present
      if (month) {
        //formatting date
        const dateObj = formatStringToDate(date, "DD.MM.YYYY");
        const { monthIndex, weekIndex, weekday } =
          getTimeNavigationIndexes(dateObj);

        //if day data is present
        if (month[monthIndex]?.[weekIndex]?.[weekday]) {
          //updating goal in day data
          month[monthIndex][weekIndex][weekday].goal = payload.goal;
        }
      }

      //updating control values
      state.controls.amount = payload.amount;
      state.controls.type = payload.type;
    }
  },

  /**
   * set initial data
   */
  initialize: (
    state: types.State,
    action: PayloadAction<types.Initializer>
  ) => {
    // unsetting loading
    state.loading = false;
    state.contentIsLoading = false;
    state.initialLoading = false;

    // setting month data
    const month = action.payload.month;
    state.month = month ? { ...month } : null;

    // setting control values
    const control = action.payload.control;
    if (control) {
      state.controls = { ...control };
    }
  },
};

export { extraReducers };
