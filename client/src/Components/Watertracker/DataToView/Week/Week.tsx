import React from "react";
import { useWeek } from "./Week.hooks";
import { useOpenDay } from "../../Hooks/OpenDay";
import { Grid } from "@mui/material";
import {
  BarPlot,
  ChartsGrid,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  LinePlot,
  MarkPlot,
  ResponsiveChartContainer,
} from "@mui/x-charts";
import { NoData } from "../Day/Charts/Charts";
import { ContentIsLoading } from "../ContentIsLoading";
import { Statistics } from "../Statistics/Statistics";
import { SingleDayData } from "../../../../Types/WaterTracker.types";
import chartClasses from "../DataToView.module.css";

interface WeekProps {
  weekData: Array<SingleDayData> | null;
}

/**
 * Component for displaying a week of water tracking data
 */
const Week: React.FC<WeekProps> = ({ weekData }) => {
  const week = useWeek(weekData);
  const { openDay } = useOpenDay(week.dates);

  const chart =
    week.chartData.length > 0 ? (
      <ResponsiveChartContainer
        sx={{ "&&": { touchAction: "auto" } }}
        series={[
          {
            type: "bar",
            data: week.amounts,
            valueFormatter: week.amountValueFormatter,
          },
          {
            type: "line",
            data: week.goals,
            valueFormatter: week.goalValueFormatter,
          },
        ]}
        xAxis={[
          {
            scaleType: "band",
            data: week.translations.weekdayNameShorts,
            disableTicks: true,
            tickLabelInterval: (value) => (value ? value : "0"),
            id: "weekdays-x-axis",
          },
        ]}
        yAxis={[
          {
            label: week.translations.ml,
            labelStyle: {
              transform: "rotate(0deg) translate(0.5rem, -38%)",
            },
            disableLine: true,
            disableTicks: true,
            id: "daily-amounts-y-axis",
            // TODO: I think it's an issue in the library, mixed colors are not displayed
            // BUG: e.g. two greens in the middle of the week surrounded by reds, output is all red
            // data: amounts,
            // colorMap: {
            //   type: "ordinal",
            //   colors: colors,
            //   values: amounts,
            // },
          },
        ]}
      >
        <BarPlot onItemClick={openDay} />
        <ChartsGrid horizontal />
        <ChartsXAxis position="bottom" axisId="weekdays-x-axis" />
        <ChartsYAxis position="left" axisId="daily-amounts-y-axis" />
        <LinePlot />
        <MarkPlot />
        <ChartsTooltip />
      </ResponsiveChartContainer>
    ) : (
      <NoData emptyMessage={week.translations.emptyMessage} />
    );

  const content = week.isLoading ? <ContentIsLoading /> : chart;

  return (
    <Grid item lg={6} xs={12}>
      <div className={`${chartClasses["container"]}`}>
        <div className={chartClasses["container-title"]}>
          <h3 className={`${chartClasses["title"]}`}>
            {week.translations.title}
          </h3>
        </div>
        <div className={chartClasses["chart-container"]}>{content}</div>
        <Statistics {...week.statisticsConfig} />
      </div>
    </Grid>
  );
};

export { Week };
