import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../Hooks/Auth";
import { initialize } from "../../Reducers/WaterTracker/WaterTracker.thunks";
import { getHeaders } from "../../Utils/Request.utils";
import { getWeekFromDate } from "../../Utils/Time.utils";
import { setInitialized } from "../../Reducers/WaterTracker/WaterTracker";
import { MonthIndex } from "../../Types/Global.types";
import { AppDispatch, RootState } from "../../Reducers/Store";
import { TODAY } from "../../Constants";

const useWaterTrackerInitializer = (date: Date | null) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    month,
    contentIsLoading,
    initialLoading,
    hourlyActivity,
    initialized,
  } = useSelector((state: RootState) => state.waterTracker);
  const { currentUser, userIsLoading, isAuthenticated } = useAuth();

  // initialize data on component mount
  React.useEffect(() => {
    if (!initialized && date) {
      // initialize all necessary data for water tracker
      const initializer = async () => {
        // if user is not logged in, return
        if (!currentUser) return;

        // get user token and headers
        const token = await currentUser.getIdToken();
        const headers = getHeaders(token);

        // initialize all necessary data
        const req = {
          year: date.getFullYear(),
          month: date.getMonth() as MonthIndex,
          date: date.getDate(),
        };

        // dispatch initialize action
        await dispatch(initialize({ req, headers }));
      };

      initializer();
      dispatch(setInitialized(true));
    }
  }, [initialized, currentUser, dispatch, date]);

  // get current week from current month
  const currentWeek = getWeekFromDate(month, TODAY);

  return {
    contentIsLoading,
    currentWeek,
    month,
    userIsLoading,
    currentUser,
    isAuthenticated,
    initialLoading,
    hourlyActivity,
  };
};

export { useWaterTrackerInitializer };
