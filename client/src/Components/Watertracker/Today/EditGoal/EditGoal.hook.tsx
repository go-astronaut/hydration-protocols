import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../../Hooks/Auth";
import { useTranslation } from "react-i18next";
import { getWeekdayIndex, getWeekFromDate } from "../../../../Utils/Time.utils";
import { isDigitString } from "../../../../Utils/Validations.utils";
import * as vars from "../../../../Constants";
import {
  setControlValue,
  setDailyGoal,
} from "../../../../Reducers/WaterTracker/WaterTracker.thunks";
import { getHeaders } from "../../../../Utils/Request.utils";
import { AppDispatch, RootState } from "../../../../Reducers/Store";
import { SetControlValue } from "../../../../Types/WaterTracker.types";

const useEditGoal = (closeEdit: Function) => {
  // Get dispatch
  const dispatch = useDispatch<AppDispatch>();

  // Get the current user
  const { currentUser } = useAuth();

  // Get the controls and the month from the store
  const { controls, month } = useSelector(
    (state: RootState) => state.waterTracker
  );

  // Get translations
  const { t } = useTranslation();

  // Get current week out of month
  const currentWeek = getWeekFromDate(month, new Date());
  // Weekday index for accessing the day from current week array
  const weekdayIndex = getWeekdayIndex(new Date());
  // Today data
  const today =
    currentWeek && currentWeek[weekdayIndex] ? currentWeek[weekdayIndex] : null;

  // Set the variables with the original values
  const todaysGoalStart = today?.goal ? today.goal : 0;
  const goalStart = controls?.goal ? controls.goal : 0;

  // State for the amount, goal and type
  const [todaysGoal, setTodaysGoal] = useState<number | string>(
    todaysGoalStart
  );
  const [minGoal, setMinGoal] = useState<number | string>(goalStart);

  // Activate validation for the the input fields
  const [validate, setValidate] = useState(false);

  /**
   * Handle the change of the amount
   */
  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodaysGoal(event.target.value);
  };

  /**
   * Handle the change of the goal
   */
  const handleChangeGoal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinGoal(event.target.value);
  };

  /**
   * Cancel the edit dialog
   */
  const handleCancelEdit = () => {
    // Reset the values to the original ones
    setTodaysGoal(todaysGoalStart);
    setMinGoal(goalStart);

    // Set validation to false
    setValidate(false);

    // Close the dialog
    closeEdit();
  };

  /**
   * submit the values
   */
  const handleSubmit = async () => {
    // Get token
    const token = await currentUser?.getIdToken();

    // Activate validation
    setValidate(true);

    // Check if the values are valid and user is logged in
    if (!isAmountValid || !isGoalValid || !token || !today) {
      return;
    }
    const headers = getHeaders(token);

    // Set payload for the minimum goal
    const payloadMinGoal: SetControlValue = {
      value: +minGoal,
      controlValueType: "goal" as vars.ControlKeys,
    };

    // Setpayload for the today's goal
    const payloadTodaysGoal = {
      goal: +todaysGoal,
      date: today.date,
    };

    // Dispatch the actions
    await dispatch(setControlValue({ payloadData: payloadMinGoal, headers }));
    await dispatch(setDailyGoal({ payloadData: payloadTodaysGoal, headers }));

    // Set validation to false
    setValidate(false);

    // Close the dialog
    closeEdit();
  };

  // validation for the goal
  const goalNumber = parseInt(minGoal.toString());
  const isGoalValid =
    isDigitString(minGoal.toString()) &&
    goalNumber >= vars.MIN_GOAL &&
    goalNumber <= vars.MAX_GOAL;

  // validation for the goal
  const todaysGoalNumber = parseInt(todaysGoal.toString());
  const isAmountValid =
    isDigitString(minGoal.toString()) &&
    todaysGoalNumber >= vars.MIN_GOAL &&
    todaysGoalNumber <= vars.MAX_GOAL;

  // set translations
  const translations = {
    title: t("tracker.goalModal.title"),
    // text helper for the amount
    minGoal: {
      description: t("tracker.goalModal.todaysGoal", {
        date: today?.date ? today.date : "",
      }),
      hint: t("tracker.goalModal.hint", {
        min: vars.MIN_GOAL,
        max: vars.MAX_GOAL,
      }),
    },
    // text helper for the goal
    todaysGoal: {
      description: t("tracker.goalModal.minimumGoal"),
      hint: t("tracker.goalModal.hint", {
        min: vars.MIN_GOAL,
        max: vars.MAX_GOAL,
      }),
    },
    ml: t("measuringUnits.ml"),
    hours: t("timeUnits.hours"),
    buttons: {
      ok: t("buttons.ok"),
      cancel: t("buttons.cancel"),
    },
  };

  return {
    todaysGoal,
    minGoal,
    isAmountValid,
    isGoalValid,
    validate,
    translations,
    handleChangeAmount,
    handleChangeGoal,
    handleCancelEdit,
    handleSubmit,
  };
};

export { useEditGoal };
