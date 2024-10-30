import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../../Hooks/Auth";
import { useTranslation } from "react-i18next";
import { getWeekdayIndex, getWeekFromDate } from "../../../../Utils/Time.utils";
import { getDailyAmountSum } from "../../WaterTracker.utils";
import { isDigitString } from "../../../../Utils/Validations.utils";
import * as vars from "../../../../Constants";
import { setControlValues } from "../../../../Reducers/WaterTracker/WaterTracker.thunks";
import { getHeaders } from "../../../../Utils/Request.utils";
import { AppDispatch, RootState } from "../../../../Reducers/Store";

const MAX_CHARS = 40;

const useEditControls = (closeEdit: Function) => {
  // get dispatch
  const dispatch = useDispatch<AppDispatch>();

  // get the current user
  const { currentUser } = useAuth();

  // get the controls and the month from the store
  const { controls, month } = useSelector(
    (state: RootState) => state.waterTracker
  );

  // get translations
  const { t } = useTranslation();

  // get current week out of month
  const currentWeek = getWeekFromDate(month, new Date());
  // weekday index for accessing the day from current week array
  const weekdayIndex = getWeekdayIndex(new Date());
  // today data
  const today =
    currentWeek && currentWeek[weekdayIndex] ? currentWeek[weekdayIndex] : null;
  // amount of water drank today
  const drunkAmount = today ? getDailyAmountSum(today) : 0;

  // set the variables with the original values
  const amountStart = controls.amount !== null ? controls.amount : 0;
  const goalStart = today ? today.goal : 0;
  const typeStart = controls.type ? controls.type : "";

  // state for the amount, goal and type
  const [amount, setAmount] = useState<number | string>(amountStart);
  const [goal, setGoal] = useState<number | string>(goalStart);
  const [type, setType] = useState(typeStart);

  // activate validation for the the input fields
  const [validate, setValidate] = useState(false);

  /**
   * handle the change of the amount
   */
  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  /**
   * handle the change of the goal
   */
  const handleChangeGoal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(event.target.value);
  };

  /**
   * handle the change of the type
   */
  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  /**
   * cancel the edit dialog
   */
  const handleCancelEdit = () => {
    // reset the values to the original ones
    setAmount(amountStart);
    setGoal(goalStart);
    setType(typeStart);

    // set validation to false
    setValidate(false);

    // close the dialog
    closeEdit();
  };

  /**
   * submit the values
   */
  const handleSubmit = async () => {
    // get token
    const token = await currentUser?.getIdToken();

    // activate validation
    setValidate(true);

    // check if the values are valid and user is logged in
    if (!isAmountValid || !isGoalValid || !isTypeValid || !token || !today) {
      return;
    }
    const headers = getHeaders(token);

    // set the values for the submit action
    const payloadData = {
      amount: parseInt(amount.toString()),
      goal: parseInt(goal.toString()),
      type: type.trim(),
      date: today.date,
    };

    // dispatch the action
    dispatch(setControlValues({ payloadData, headers }));

    // set validation to false
    setValidate(false);

    // close the dialog
    closeEdit();
  };

  // validation for the goal
  const goalNumber = parseInt(goal.toString());
  const isGoalValid =
    isDigitString(goal.toString()) &&
    goalNumber >= vars.MIN_GOAL &&
    goalNumber <= vars.MAX_GOAL;

  // validation for the goal
  const amountNumber = parseInt(amount.toString());
  const isAmountValid =
    isDigitString(amount.toString()) &&
    amountNumber >= vars.MIN_CONTROL_AMOUNT &&
    amountNumber + drunkAmount <= vars.MAX_GOAL;

  // validation for the type
  const isTypeValid = type.length <= 40;

  // set translations
  const translations = {
    title: t("tracker.editControls.title"),
    // text helper for the amount
    drinkAmount: {
      description: t("tracker.editControls.drinkAmount.description"),
      hint: t("tracker.editControls.drinkAmount.hint", {
        min: vars.MIN_CONTROL_AMOUNT,
        max: vars.MAX_AMOUNT,
      }),
    },
    // text helper for the goal
    todaysGoal: {
      description: t("tracker.editControls.todaysGoal.description"),
      hint: t("tracker.editControls.todaysGoal.hint", {
        min: vars.MIN_GOAL,
        max: vars.MAX_GOAL,
      }),
    },
    // text helper for the type
    liquidType: {
      description: t("tracker.editControls.liquidType.description"),
      hint: t("tracker.editControls.liquidType.hint", {
        current: type.length,
        max: MAX_CHARS,
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
    amount,
    goal,
    type,
    isAmountValid,
    isGoalValid,
    isTypeValid,
    validate,
    translations,
    handleChangeAmount,
    handleChangeGoal,
    handleChangeType,
    handleCancelEdit,
    handleSubmit,
  };
};

export { useEditControls };
