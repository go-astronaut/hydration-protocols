import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../../Types/WaterTracker.types";

const reducers = {
  /**
   * Set hourly activity to display hourly activity or current week
   */
  setHourlyActivity(state: types.State, action: PayloadAction<boolean>) {
    state.hourlyActivity = action.payload;
  },

  /**
   * Set loading indicator for fetching data
   */
  setLoading(state: types.State, action: PayloadAction<boolean>) {
    state.loading = action.payload;
  },

  /**
   * Set control's drink amount for manipulating daily data
   */
  setDrinkAmount(state: types.State, action: PayloadAction<number>) {
    state.controls.amount = action.payload;
  },

  setControls(state: types.State, action: PayloadAction<types.Controls>) {
    state.controls = { ...action.payload };
  },

  /**
   * Set indicator for loading water tracker related data
   */
  setContentIsLoading(state: types.State, action: PayloadAction<boolean>) {
    state.contentIsLoading = action.payload;
  },

  setTodaysGoalInput(state: types.State, action: PayloadAction<number | null>) {
    state.todaysGoalInput = action.payload;
  },
};

export { reducers };
