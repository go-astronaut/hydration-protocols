import { useSelector } from "react-redux";
import { useScreenWidth } from "../../../../Providers/ScreenWidth";
import { useTranslation } from "react-i18next";
import {
  formatStringToDate,
  getMonthKey,
  getTimeNavigationIndexes,
} from "../../../../Utils/Time.utils";
import { setChartWeekData } from "../DataToView.utils";
import { getMonthStats } from "../../WaterTracker.utils";
import { RootState } from "../../../../Reducers/Store";
import { SeriesValueFormatter } from "@mui/x-charts/internals";

/**
 * logic for month chart component
 */
function useMonthChart() {
  // get screen width
  const { screenWidth } = useScreenWidth();

  // get translations
  const { t } = useTranslation();
  const translations = {
    emptyMessage: t("tracker.emptyMessage"),
    ml: t("measuringUnits.ml"),
    hours: t("timeUnits.hours"),
    title: t("month.title", {
      month: t(`timeUnits.months.${getMonthKey(new Date().getMonth())}`),
      year: new Date().getFullYear(),
    }),
  };

  // getting all neccessary data from redux
  const { month, initialLoading, contentIsLoading } = useSelector(
    (state: RootState) => state.waterTracker
  );

  // get month statistics and set config object for statistics component
  const monthStats = month && getMonthStats(month);
  const statisticsConfig = {
    max: monthStats?.maxAmount ? monthStats.maxAmount : null,
    average: monthStats?.averageAmount ? monthStats.averageAmount : null,
    daysLeft: monthStats?.daysInMonthLeft ? monthStats.daysInMonthLeft : null,
    daysInTotal: monthStats?.daysInMonth ? monthStats.daysInMonth : null,
    goalsReached: monthStats?.goalReachedCounter
      ? monthStats.goalReachedCounter
      : 0,
  };

  // extract values from collection
  const monthValues = month ? Object.values(month) : null;
  const monthArray = monthValues ? Object.values(monthValues[0]) : [];

  // converting data to display it in mui x chart
  const chartData = monthArray
    // convert month data to an array with weeks as sub arrays
    .map((week) => setChartWeekData(week))
    // flat weeks/sub-arrays to an array so the array has days
    .flat()
    // filter only month days
    .filter((item) => {
      // month to display
      const monthIndex = month && Object.keys(month)[0];

      // check if day can be included
      const itemDate = formatStringToDate(item.date, "DD.MM.YYYY");
      const itemMonthIndex = getTimeNavigationIndexes(itemDate).monthIndex;
      return monthIndex === itemMonthIndex;
    });

  // check if data is loading
  const isLoading = initialLoading || contentIsLoading;

  // arrays with primitive values to
  const amounts = chartData.map((item) => item.amount);
  const goals = chartData.map((item) => item.goal);
  const dates = chartData.map((item) => item.date);

  /**
   * calculate intervals for chart ticks
   */
  const getIntervals = (value: any) => {
    // from large to small screens
    if (screenWidth >= 375) return value % 2 === 0 ? "" : value;

    // extra small screens
    if (screenWidth < 375) return value === 1 || value % 5 === 0;

    return value;
  };

  /**
   * value formatter for charts bars and tooltips
   */
  const amountValueFormatter:
    | SeriesValueFormatter<number | null>
    | undefined = (value: number | null) => {
    return t("chartTooltip.amountTooltip", { value });
  };

  /**
   *  value formatter for charts bars and tooltips
   */
  const goalValueFormatter: SeriesValueFormatter<number | null> | undefined = (
    value: number | null
  ) => {
    return t("chartTooltip.goalTooltip", { value });
  };

  return {
    screenWidth,
    isLoading,
    amounts,
    goals,
    dates,
    chartData,
    statisticsConfig,
    translations,
    getIntervals,
    amountValueFormatter,
    goalValueFormatter,
  };
}

export { useMonthChart };
