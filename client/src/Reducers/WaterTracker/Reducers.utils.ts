import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../../Types/WaterTracker.types";
import * as vars from "../../Constants";

const reducers = {
  /**
   * set hourly activity to display hourly activity or current week
   */
  setHourlyActivity(state: types.State, action: PayloadAction<boolean>) {
    state.hourlyActivity = action.payload;
  },

  /**
   * reset state to initial state
   */
  resetState(state: types.State) {
    // TODO: dynamic solution needed
    state.controls = { amount: null, goal: null, type: null };
    state.timeTraverse = {
      year: vars.CURRENT_YEAR,
      month: vars.CURRENT_MONTH,
    };
    state.selectedMonth = vars.CURRENT_MONTH;
    state.selectedYear = vars.CURRENT_YEAR;
    state.hourlyActivity = false;
    state.month = null;
    state.todaysGoalInput = null;
    state.contentIsLoading = true;
    state.initialLoading = true;
    state.initialized = false;
    state.error = null;
  },

  /**
   * set loading indicator for fetching data
   */
  setLoading(state: types.State, action: PayloadAction<boolean>) {
    state.loading = action.payload;
  },

  /**
   * set time traverse object for navigation between months and years
   */
  setTimeTraverse(
    state: types.State,
    action: PayloadAction<types.MonthSetter>
  ) {
    state.timeTraverse = { ...action.payload };
  },

  /**
   * set control's drink amount for manipulating daily data
   */
  setDrinkAmount(state: types.State, action: PayloadAction<number>) {
    state.controls.amount = action.payload;
  },

  setSelectedMonth(state: types.State, action: PayloadAction<number>) {
    state.selectedMonth = action.payload;
  },

  setSelectedYear(state: types.State, action: PayloadAction<number>) {
    state.selectedYear = action.payload;
  },

  setControls(state: types.State, action: PayloadAction<types.Controls>) {
    state.controls = { ...action.payload };
  },

  /**
   * set indicator for loading water tracker related data
   */
  setContentIsLoading(state: types.State, action: PayloadAction<boolean>) {
    state.contentIsLoading = action.payload;
  },

  setTodaysGoalInput(state: types.State, action: PayloadAction<number | null>) {
    state.todaysGoalInput = action.payload;
  },

  setInitialized(state: types.State, action: PayloadAction<boolean>) {
    state.initialized = action.payload;
  },
};

export { reducers };
