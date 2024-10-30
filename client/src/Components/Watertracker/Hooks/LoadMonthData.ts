import { useDispatch } from "react-redux";
import { useAuth } from "../../../Hooks/Auth";
import { MonthIndex } from "../../../Types/Global.types";
import { AppDispatch } from "../../../Reducers/Store";
import { getHeaders } from "../../../Utils/Request.utils";
import { getMonthData } from "../../../Reducers/WaterTracker/WaterTracker.thunks";
import {
  setSelectedMonth,
  setSelectedYear,
  setTimeTraverse,
} from "../../../Reducers";

/**
 * load month data based on year and month
 * @returns loadMonth function
 */
const useLoadMonthData = () => {
  // get current user and dispatch
  const { currentUser } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  /**
   * load month data based on year and month
   * @param year YYYY
   * @param monthIndex number 0 - 11
   * @returns Promise<void>
   */
  const loadMonth = async (year: number, monthIndex: MonthIndex) => {
    // get token
    const token = await currentUser?.getIdToken();

    //TODO: handle unauthorized instead of returning undefined
    // if no token then return
    if (!token) return;

    // get headers with token
    const headers = getHeaders(token);

    // dispatch getMonthData thunk
    await dispatch(
      getMonthData({
        year: year,
        month: monthIndex,
        headers: headers,
      })
    );

    // set selected month and year indexes in redux
    dispatch(setSelectedMonth(monthIndex));
    dispatch(setSelectedYear(year));
    dispatch(setTimeTraverse({ year, month: monthIndex }));
  };

  return { loadMonth };
};

export { useLoadMonthData };
