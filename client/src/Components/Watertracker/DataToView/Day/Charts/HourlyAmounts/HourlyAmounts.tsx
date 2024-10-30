import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../Reducers/Store";
import { useScreenWidth } from "../../../../../Providers/ScreenWidth";
import { useTranslation } from "react-i18next";
import { BarChart } from "@mui/x-charts";
import { ChartIsLoading, NoData } from "../Charts";
import { getDailyAmountSum } from "../../../../WaterTracker.utils";
import { BREAKPOINT_SLIDER, sx } from "../Charts.constants";
import { SingleDayData } from "../../../../../../Types/WaterTracker.types";
import classes from "./HourlyAmounts.module.css";

interface HourlyAmountsProps {
  day: SingleDayData | null;
}

/**
 * Day Chart Component: displays the hourly activity of decreasing and increasing water amount
 */
const HourlyAmounts: React.FC<HourlyAmountsProps> = ({ day }) => {
  const { contentIsLoading, initialLoading } = useSelector(
    (state: RootState) => state.waterTracker
  );

  // get translations
  const { t } = useTranslation();
  const translations = {
    title: t("tracker.todayPanel.hourlyAmounts.title"),
    emptyMessage: t("tracker.emptyMessage"),
    ml: t("measuringUnits.ml"),
    hours: t("timeUnits.hours"),
  };

  // get screen width to check for breakpoints
  const { screenWidth } = useScreenWidth();

  const activity = day?.activity;

  // get the amount sum of the dayd
  const amountSum = day ? getDailyAmountSum(day) : 0;

  // get the hourly sum of the day
  const data = activity
    ? activity.map((el) => {
        let hourlySum = 0;
        if (Array.isArray(el) && el.length > 0) {
          for (const hour of el) {
            hourlySum += hour.amount;
          }
        }
        return hourlySum;
      })
    : ([] as Array<number>);

  // convert the data to the format needed for the chart
  const chartData = data.map((amount, index) => {
    return { hour: index, amount };
  });

  // chart element for large and small screens
  const chartEl =
    screenWidth > BREAKPOINT_SLIDER ? (
      <BarChart
        dataset={chartData}
        grid={{ horizontal: true }}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "hour",
            label: `${translations.hours}`,
            disableTicks: true,
          },
        ]}
        series={[
          {
            dataKey: "amount",
            valueFormatter: (value) => `${value} ${translations.ml}`,
          },
        ]}
        yAxis={[
          {
            label: `${translations.ml}`,
            labelStyle: { transform: "rotate(0deg) translate(0.5rem, -38%)" },
            disableTicks: true,
            disableLine: true,
          },
        ]}
      />
    ) : (
      <BarChart
        // with the sx prop the chart can be scrolled on mobile
        sx={sx}
        dataset={chartData}
        tooltip={{ trigger: "none" }}
        grid={{ vertical: true }}
        yAxis={[
          {
            scaleType: "band",
            dataKey: "hour",
            label: `${translations.hours}`,
            labelStyle: {
              transform: "rotate(0deg) translate(1.5rem, calc(-50%  + 2.5rem))",
            },
            disableTicks: true,
          },
        ]}
        series={[{ dataKey: "amount" }]}
        layout="horizontal"
        xAxis={[
          {
            label: `${translations.ml}`,
            disableTicks: true,
          },
        ]}
      />
    );

  const chartContent =
    amountSum > 0 ? (
      chartEl
    ) : (
      <NoData emptyMessage={translations.emptyMessage} />
    );
  const chart =
    contentIsLoading || initialLoading ? (
      <div className={classes["loading-container"]}>
        <ChartIsLoading />
      </div>
    ) : (
      chartContent
    );

  return (
    <div className={`${classes["container"]}`}>
      <div className={`${classes["title-container"]}`}>
        <h3 className={classes["title"]}>{translations.title}</h3>
      </div>
      <div className={`${classes["chart-container"]}`}>{chart}</div>
    </div>
  );
};

export { HourlyAmounts };
