import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../../Types/WaterTracker.types";
import {
  formatStringToDate,
  getTimeNavigationIndexes,
} from "../../Utils/Time.utils";

/**
 * update a day of month
 * @param month month object to update
 * @param updatedDay day target data
 */
function updateDayOfMonth(month: types.Month, updatedDay: types.SingleDayData) {
  const date = formatStringToDate(updatedDay.date, "DD.MM.YYYY");

  // values for traverse in month data
  const { monthIndex, weekIndex, weekday } = getTimeNavigationIndexes(date);

  month[monthIndex][weekIndex][weekday] = { ...updatedDay };
}

/**
 * set reducer's loading state
 */
function setLoadingState(state: types.State) {
  state.loading = true;
}

/**
 * set reducer's content loading and loading state
 */
function setContentLoadingState(state: types.State) {
  state.loading = true;
  state.contentIsLoading = true;
}

/**
 * set reducer's error state
 */
function setErrorState(state: types.State, action: PayloadAction<any>) {
  state.loading = false;
  state.contentIsLoading = false;
  state.initialLoading = false;
  // TODO: create error message object in back-end like this {error: "something went wrong"}
  state.error = "something went wrong";
}

export {
  updateDayOfMonth,
  setLoadingState,
  setContentLoadingState,
  setErrorState,
};
