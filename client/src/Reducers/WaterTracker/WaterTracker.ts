import { createSlice } from "@reduxjs/toolkit";
import { extraReducers } from "./ExtraReducers.utils";
import { reducers } from "./Reducers.utils";
import * as asyncThunks from "./WaterTracker.thunks";
import * as utils from "./WaterTracker.utils";
import * as types from "../../Types/WaterTracker.types";
import * as vars from "../../Constants";

// setting initial state
const initialState: types.State = {
  controls: { amount: null, goal: null, type: null },
  timeTraverse: {
    year: vars.CURRENT_YEAR,
    month: vars.CURRENT_MONTH,
  },
  selectedMonth: vars.CURRENT_MONTH,
  selectedYear: vars.CURRENT_YEAR,

  // show hourly activity or current week
  hourlyActivity: false,

  // month data - weeeks and days get extracted from here
  month: null,

  // TODO: check if this is necessary
  todaysGoalInput: null,

  // loading indicator on every fetch
  loading: false,

  // content is loading (all data - month, today, controls)
  contentIsLoading: false,

  // initial loading has to be true at the start
  initialLoading: true,

  // false will trigger initialization
  initialized: false,

  error: null,
};

// creating water tracker slice with reducers and extra reducers
const WaterTracker = createSlice({
  name: "water-tracker",
  initialState: { ...initialState },
  reducers: reducers,
  extraReducers: (builder) => {
    // Get month data
    builder
      .addCase(asyncThunks.getMonthData.pending, utils.setContentLoadingState)
      .addCase(asyncThunks.getMonthData.fulfilled, extraReducers.setMonthData)
      .addCase(asyncThunks.getMonthData.rejected, utils.setErrorState);
    // Create month data
    builder
      .addCase(asyncThunks.createMonthData.pending, utils.setLoadingState)
      .addCase(
        asyncThunks.createMonthData.fulfilled,
        extraReducers.setMonthData
      )
      .addCase(asyncThunks.createMonthData.rejected, utils.setErrorState);
    // Update daily amount
    builder
      .addCase(asyncThunks.updateDayAmount.pending, utils.setLoadingState)
      .addCase(asyncThunks.updateDayAmount.fulfilled, extraReducers.setDayData)
      .addCase(asyncThunks.updateDayAmount.rejected, utils.setErrorState);
    // Edit daily amount
    builder
      .addCase(asyncThunks.setDayData.pending, utils.setLoadingState)
      .addCase(asyncThunks.setDayData.fulfilled, extraReducers.setDayData)
      .addCase(asyncThunks.setDayData.rejected, utils.setErrorState);
    // Update daily goal
    builder
      .addCase(asyncThunks.setDailyGoal.pending, utils.setLoadingState)
      .addCase(
        asyncThunks.setDailyGoal.fulfilled,
        extraReducers.updateDailyGoal
      )
      .addCase(asyncThunks.setDailyGoal.rejected, utils.setErrorState);
    // Get control object: amount, goal
    builder
      .addCase(asyncThunks.getControlValues.pending, utils.setLoadingState)
      .addCase(
        asyncThunks.getControlValues.fulfilled,
        extraReducers.setControlValues
      )
      .addCase(asyncThunks.getControlValues.rejected, utils.setErrorState);
    // Initialize water tracker
    builder
      .addCase(asyncThunks.initialize.pending, utils.setContentLoadingState)
      .addCase(asyncThunks.initialize.fulfilled, extraReducers.initialize)
      .addCase(asyncThunks.initialize.rejected, utils.setErrorState);
    // Reset last drink action
    builder
      .addCase(asyncThunks.resetLastDrink.pending, utils.setLoadingState)
      .addCase(asyncThunks.resetLastDrink.fulfilled, extraReducers.setDayData)
      .addCase(asyncThunks.resetLastDrink.rejected, utils.setErrorState);
    // Set a control value
    builder
      .addCase(asyncThunks.setControlValue.pending, utils.setLoadingState)
      .addCase(
        asyncThunks.setControlValue.fulfilled,
        extraReducers.setControlValue
      )
      .addCase(asyncThunks.setControlValue.rejected, utils.setErrorState);
    // Set control values
    builder
      .addCase(asyncThunks.setControlValues.pending, utils.setLoadingState)
      .addCase(
        asyncThunks.setControlValues.fulfilled,
        extraReducers.handleControlsUpdate
      )
      .addCase(asyncThunks.setControlValues.rejected, utils.setErrorState);
  },
});

export const {
  setLoading,
  setTimeTraverse,
  setSelectedMonth,
  setSelectedYear,
  setDrinkAmount,
  setControls,
  setContentIsLoading,
  setTodaysGoalInput,
  resetState,
  setHourlyActivity,
  setInitialized,
} = WaterTracker.actions;
export default WaterTracker;

export { initialState };
