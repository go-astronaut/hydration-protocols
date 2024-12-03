import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../Reducers/Store";
import { useAuth } from "../../../../Hooks/Auth";
import {
  formatDateToString,
  getWeekdayIndex,
  getWeekFromDate,
} from "../../../../Utils/Time.utils";
import { getHeaders } from "../../../../Utils/Request.utils";
import { updateDayAmount } from "../../../../Reducers/WaterTracker/WaterTracker.thunks";
import { getDailyAmountSum } from "../../WaterTracker.utils";
import { resetLastDrink } from "../../../../Reducers/WaterTracker/WaterTracker.thunks";
import { ResetLastDrink } from "../../../../Types/WaterTracker.types";
import { TODAY } from "../../../../Constants";

const useTodayController = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useAuth();
  const { controls, month, initialLoading } = useSelector(
    (state: RootState) => state.waterTracker
  );

  // get current week out of month
  const currentWeek = getWeekFromDate(month, TODAY);

  // weekday index for accessing the day from current week array
  const weekdayIndex = getWeekdayIndex(new Date());
  // today data
  const today =
    currentWeek && currentWeek[weekdayIndex] ? currentWeek[weekdayIndex] : null;
  // value to add or subtract
  const controlAmount = controls.amount;

  // amount of water drank today
  const amount = today ? getDailyAmountSum(today) : 0;

  /**
   * update todays amount on increase
   */
  const drinkAmount = async () => {
    try {
      // get token from current user
      const token = await currentUser?.getIdToken();
      if (controlAmount && today && token) {
        const headers = getHeaders(token);

        // get hours for the request
        const reqHour = formatDateToString(new Date(), "HH");
        const day = {
          date: `${today.date}.${reqHour}`,
          amount: controlAmount,
          type: controls.type || "",
        };
        await dispatch(updateDayAmount({ payloadData: day, headers: headers }));
      }
    } catch (error) {
      // TODO: error handling
      console.log(error);
    }
  };

  /**
   * finish today's goal with one click
   */
  const finishToday = async () => {
    try {
      // get token from current user
      const token = await currentUser?.getIdToken();

      // check if today and token is available
      if (today && token) {
        // get goal and amount of today
        const goal = today.goal;
        const difference = goal - amount;

        // get headers for request
        const headers = getHeaders(token);

        // get hours for the request
        const reqHour = formatDateToString(new Date(), "HH");

        // create a day object with the difference for outcoming request
        const day = {
          date: `${today.date}.${reqHour}`,
          amount: difference,
          type: controls.type || "",
        };

        // if difference is greater than 0 then add the difference
        if (difference > 0) {
          // add the difference to the amount
          dispatch(updateDayAmount({ payloadData: day, headers: headers }));
        }
      }
    } catch (error) {
      // TODO: error handling
      console.log(error);
    }
  };

  /**
   * function to reset last drink amount action
   */
  const resetLastDrinkAction = async () => {
    try {
      // get token from current user
      const token = await currentUser?.getIdToken();

      // check if today and token is available
      if (today && today.activity && token) {
        // get headers for request
        const headers = getHeaders(token);

        // search for the last drink in the day array
        for (let i = today.activity.length - 1; i >= 0; i--) {
          // if the amount is not 0 then reset the last drink
          if (today.activity[i] !== 0) {
            const req = {
              date: today.date,
              hour: i,
            } as ResetLastDrink;
            // dispatch the action to reset the last drink
            await dispatch(
              resetLastDrink({ payloadData: req, headers: headers })
            );
            break;
          }
        }
      }
    } catch (error) {
      // TODO: error handling
      console.log(error);
    }
  };

  const showButton = today && controlAmount;
  const showFinishButton = today && amount < today.goal;
  const showResetButton = today && amount > 0;

  return {
    drinkAmount,
    finishToday,
    resetLastDrinkAction,
    showButton,
    today,
    month,
    showFinishButton,
    showResetButton,
    initialLoading,
  };
};

export { useTodayController };
