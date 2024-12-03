import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { formatStringToDate, getMonthKey } from "../../../../Utils/Time.utils";
import { setChartWeekData } from "../DataToView.utils";
import { getWeekStats } from "../../WaterTracker.utils";
import { SingleDayData } from "../../../../Types/WaterTracker.types";
import { RootState } from "../../../../Reducers/Store";
import { SeriesValueFormatter } from "@mui/x-charts/internals";

const useWeek = (week: Array<SingleDayData> | null) => {
  const { initialLoading, contentIsLoading } = useSelector(
    (state: RootState) => state.waterTracker
  );

  // set week data for chart
  const chartData = week ? setChartWeekData(week) : [];

  // get translations
  const { t } = useTranslation();

  // get week statistics and set configuration object
  const weekStats = week && getWeekStats(week);
  const statisticsConfig = {
    max: weekStats && weekStats.maxAmount,
    average: weekStats && weekStats.averageAmount,
    daysLeft: weekStats && weekStats.daysInWeekLeft,
    daysInTotal: weekStats && weekStats.daysInWeek,
    goalsReached: weekStats && weekStats.goalReachedCounter,
  };

  // check if data is loading
  const isLoading = initialLoading || contentIsLoading;

  // get the week stats
  const stats = week && getWeekStats(week);

  // get monday and sunday of the week
  const monday = week?.at(0)
    ? formatStringToDate(week[0].date, "DD.MM.YYYY")
    : null;
  const sunday = week?.at(6)
    ? formatStringToDate(week[6].date, "DD.MM.YYYY")
    : null;

  // get previeous and next month names if there are overlapping months
  const prevMonth = monday
    ? t(`timeUnits.months.${getMonthKey(monday.getMonth())}`)
    : "";
  const lastMonth = sunday
    ? t(`timeUnits.months.${getMonthKey(sunday.getMonth())}`)
    : "";

  // date of week start and end
  const weekStart = `${monday ? monday.getDate() : ""} ${
    prevMonth === lastMonth ? "" : prevMonth
  }`;
  const weekEnd = `${sunday ? sunday.getDate() : ""} ${
    sunday ? lastMonth : ""
  }`;

  // TODO: check it later, colorMap might be bugged
  // const colors = week.chartData.map((day) => day.color);
  const amounts = chartData.map((day) => day.amount);
  const goals = chartData.map((day) => day.goal);
  const dates = chartData.map((day) => day.date);

  const translations = {
    emptyMessage: t("tracker.emptyMessage"),
    title: week ? t("week.title", { weekStart, weekEnd }) : t("timeUnits.week"),
    // week days shortened names for x axis
    weekdayNameShorts: [
      t("timeUnits.abbreviations.weekdays.mon"),
      t("timeUnits.abbreviations.weekdays.tue"),
      t("timeUnits.abbreviations.weekdays.wed"),
      t("timeUnits.abbreviations.weekdays.thu"),
      t("timeUnits.abbreviations.weekdays.fri"),
      t("timeUnits.abbreviations.weekdays.sat"),
      t("timeUnits.abbreviations.weekdays.sun"),
    ],
    ml: t("measuringUnits.ml"),
  };

  /**
   * value formatter for charts bars and tooltips
   */
  const amountValueFormatter:
    | SeriesValueFormatter<number | null>
    | undefined = (value: number | null) => {
    // get dynamic translation for formatted value
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
    stats,
    isLoading,
    chartData,
    amounts,
    goals,
    dates,
    statisticsConfig,
    translations,
    amountValueFormatter,
    goalValueFormatter,
  };
};

export { useWeek };
