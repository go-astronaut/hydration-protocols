import { useOpenDay } from "../../Hooks/OpenDay";
import { useMonthChart } from "./MonthChart.hook";
import {
  BarPlot,
  ChartsGrid,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  LinePlot,
  ResponsiveChartContainer,
} from "@mui/x-charts";
import { Grid } from "@mui/material";
import { ContentIsLoading } from "../ContentIsLoading";
import { NoData } from "../Day/Charts/Charts";
import { Statistics } from "../Statistics/Statistics";
import classes from "../DataToView.module.css";

/**
 * Component for displaying month chart and statistics
 */
const MonthChart = () => {
  const monthChart = useMonthChart();

  // get a function to navigate to a specific day
  const { openDay } = useOpenDay(monthChart.dates);

  // open day component on large screens
  // bars are very small for selection with a finger an touch screens
  const openDayOnLG = monthChart.screenWidth >= 900 ? openDay : () => {};

  // chart or no data component, depending on availability of the data
  const chart =
    monthChart.chartData.length > 0 ? (
      <ResponsiveChartContainer
        sx={{ "&&": { touchAction: "auto" } }}
        series={[
          {
            type: "bar",
            data: monthChart.amounts,
            valueFormatter: monthChart.amountValueFormatter,
          },
          {
            type: "line",
            data: monthChart.goals,
            valueFormatter: monthChart.goalValueFormatter,
          },
        ]}
        xAxis={[
          {
            scaleType: "band",
            data: Array.from(
              { length: monthChart.chartData.length },
              (_, i) => i + 1
            ),
            disableTicks: true,
            tickLabelInterval: monthChart.getIntervals,
            id: "weekdays-x-axis",
          },
        ]}
        yAxis={[
          {
            label: monthChart.translations.ml,
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
        <BarPlot onItemClick={openDayOnLG} />
        <ChartsGrid horizontal />
        <ChartsXAxis position="bottom" axisId="weekdays-x-axis" />
        <ChartsYAxis position="left" axisId="daily-amounts-y-axis" />
        <LinePlot />
        <ChartsTooltip />
      </ResponsiveChartContainer>
    ) : (
      <NoData emptyMessage={monthChart.translations.emptyMessage} />
    );

  const content = monthChart.isLoading ? <ContentIsLoading /> : chart;

  return (
    <Grid item lg={6} xs={12}>
      <div className={`${classes["container"]}`}>
        <div className={classes["container-title"]}>
          <h3 className={`${classes["title"]}`}>
            {monthChart.translations.title}
          </h3>
        </div>
        <div className={`${classes["chart-container"]}`}>{content}</div>
        <Statistics {...monthChart.statisticsConfig} />
      </div>
    </Grid>
  );
};

export { MonthChart };
