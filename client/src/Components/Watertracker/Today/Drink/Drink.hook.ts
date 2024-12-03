import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../../Hooks/Auth";
import { useTranslation } from "react-i18next";
import {
  formatDateToString,
  getWeekdayIndex,
  getWeekFromDate,
} from "../../../../Utils/Time.utils";
import { getDailyAmountSum } from "../../WaterTracker.utils";
import { isDigitString } from "../../../../Utils/Validations.utils";
import {
  setControlsAmountAndType,
  updateDayAmount,
} from "../../../../Reducers/WaterTracker/WaterTracker.thunks";
import { getHeaders } from "../../../../Utils/Request.utils";
import { AppDispatch, RootState } from "../../../../Reducers/Store";
import * as vars from "../../../../Constants";

const MAX_CHARS = 40;

const useDrink = (closeEdit: Function, closeDrink: Function) => {
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
  const typeStart = controls.type ? controls.type : "";

  // state for the amount, goal and type
  const [amount, setAmount] = useState<number | string>(amountStart);
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
    setType(typeStart);

    // set validation to false
    setValidate(false);

    // close the dialog
    closeEdit();
  };

  /**
   * Cancel drink modal
   */
  const handleCancelDrink = () => {
    // reset the values to the original ones
    setAmount(amountStart);
    setType(typeStart);

    // set validation to false
    setValidate(false);

    // close the dialog
    closeDrink();
  };

  /**
   * Submit the drink
   */
  const handleSubmit = async () => {
    try {
      // Get token from current user
      const token = await currentUser?.getIdToken();
      if (today && token && controls.goal !== null) {
        const headers = getHeaders(token);

        // Get hours for the request
        const reqHour = formatDateToString(new Date(), "HH");
        const day = {
          date: `${today.date}.${reqHour}`,
          amount: +amount,
          type: type || "",
        };

        // Check if control amount and type are changed
        const isAmountChanged =
          controls.amount !== null && controls.amount !== +amount;
        const isTypeChanged = controls.type !== null && controls.type !== type;
        if (isAmountChanged || isTypeChanged) {
          // Submut the control's amount and type values to the server
          await dispatch(
            setControlsAmountAndType({
              payloadData: { amount: +amount, type },
              headers: headers,
            })
          );
        }

        // Close the dialog
        closeDrink();

        // Submit the drink to the server
        await dispatch(updateDayAmount({ payloadData: day, headers: headers }));

        // Set validation to false
        setValidate(false);
      }
    } catch (error) {
      // TODO: error handling
      console.log(error);
    }
  };

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
    title: t("tracker.drinkModal.title"),
    // text helper for the amount
    drinkAmount: {
      description: t("tracker.drinkModal.descAmount"),
      hint: t("tracker.drinkModal.hintAmount", {
        min: vars.MIN_CONTROL_AMOUNT,
        max: vars.MAX_AMOUNT,
      }),
    },
    // text helper for the type
    liquidType: {
      description: t("tracker.drinkModal.descType"),
      hint: t("tracker.drinkModal.hintType", {
        current: type.length,
        max: MAX_CHARS,
      }),
    },
    ml: t("measuringUnits.ml"),
    hours: t("timeUnits.hours"),
    buttons: {
      add: t("tracker.drinkModal.add"),
      close: t("buttons.close"),
    },
  };

  return {
    amount,
    type,
    isAmountValid,
    isTypeValid,
    validate,
    translations,
    handleChangeAmount,
    handleChangeType,
    handleCancelEdit,
    handleSubmit,
    handleCancelDrink,
  };
};

export { useDrink };
