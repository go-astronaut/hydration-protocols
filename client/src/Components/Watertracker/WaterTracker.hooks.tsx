import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../Hooks/Auth";
import { useNavigate } from "react-router-dom";
import { initialize } from "../../Reducers/WaterTracker/WaterTracker.thunks";
import { getHeaders } from "../../Utils/Request.utils";
import { formatStringToDate, getWeekFromDate } from "../../Utils/Time.utils";
import { DateFormat, MonthIndex } from "../../Types/Global.types";
import { AppDispatch, RootState } from "../../Reducers/Store";
import { TODAY } from "../../Constants";
import RoutesValues from "../../Routes/Routes.values";

const useWaterTrackerInitializer = (date: DateFormat | null) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    month,
    contentIsLoading,
    initialLoading,
    hourlyActivity,
    initialized,
  } = useSelector((state: RootState) => state.waterTracker);
  // get user related data from redux
  const { currentUser, userIsLoading, isAuthenticated } = useAuth();

  // get navigate method
  const navigate = useNavigate();

  // initialize data on component mount
  React.useEffect(() => {
    if (!initialized && date) {
      // format string to object
      const dateObj = formatStringToDate(date, "MM-YYYY");

      // initialize all necessary data for water tracker
      const initializer = async () => {
        // if user is not logged in, return
        if (!currentUser) return;

        // get user token and headers
        const token = await currentUser.getIdToken();
        const headers = getHeaders(token);

        // initialize all necessary data
        const req = {
          year: dateObj.getFullYear(),
          month: dateObj.getMonth() as MonthIndex,
          date: dateObj.getDate(),
        };

        // dispatch initialize action
        await dispatch(initialize({ req, headers }));
      };

      initializer();
    }

    // navigate to 404 page if no date provided
    if (!date) navigate(RoutesValues.notFound);
  }, [initialized, currentUser, dispatch, date, navigate]);

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
