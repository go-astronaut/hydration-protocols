import React from "react";
import { useHourlyTypes } from "./HourlyTypes.hook";
import { BarChart } from "@mui/x-charts";
import { ChartIsLoading, ChartLegendList } from "../Charts";
import { Grid } from "@mui/material";
import { getXLabelsIntervals } from "../Charts.utils";
import { HOURS } from "../../../../../../Constants";
import { SingleDayData } from "../../../../../../Types/WaterTracker.types";
import classes from "./HourlyTypes.module.css";
import classesChart from "../Charts.module.css";

/**
 * no data message for the legend list
 */
const NoData: React.FC<{ emptyMessage: string }> = ({ emptyMessage }) => {
  return (
    <div className={`${classesChart["no-data-container"]}`}>
      <svg
        className={`${classesChart["icon"]} mb-4`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z" />
      </svg>

      <h4 className={`${classesChart["no-data-text"]}`}>{`${emptyMessage}`}</h4>
    </div>
  );
};

interface HourlyTypesProps {
  colors: string[];
  day: SingleDayData | null;
}

/**
 * Hourly Types Component: displays the hourly activity of different liquid types
 */
const HourlyTypes: React.FC<HourlyTypesProps> = ({ colors, day }) => {
  const hourlyTypes = useHourlyTypes(colors, day);

  const chartEl = (
    <div className={`${classes["chart-container"]}`}>
      <BarChart
        sx={{ "&&": { touchAction: "auto" } }}
        series={hourlyTypes.data}
        grid={{ horizontal: true }}
        // TODO: configure tooltip to hide 0 values
        tooltip={{ trigger: "none" }}
        xAxis={[
          {
            label: `${hourlyTypes.translations.hours}`,
            scaleType: "band",
            data: HOURS,
            disableTicks: true,
            tickLabelInterval: hourlyTypes.isMobile
              ? getXLabelsIntervals
              : // 0 is not shown without ternary operator
                (value) => (value ? value : "0"),
          },
        ]}
        yAxis={[
          {
            label: `${hourlyTypes.translations.ml}`,
            labelStyle: { transform: "rotate(0deg) translate(0.5rem, -38%)" },
            disableLine: true,
            disableTicks: true,
          },
        ]}
      />
    </div>
  );

  const chartContent =
    hourlyTypes.data.length > 0 ? (
      chartEl
    ) : (
      <NoData emptyMessage={hourlyTypes.translations.emptyMessage} />
    );

  // show loading spinner if content is loading
  const chart = hourlyTypes.isLoading ? (
    <div className={classes["loading-container"]}>
      <ChartIsLoading />
    </div>
  ) : (
    chartContent
  );

  const chartLegendListContent = hourlyTypes.isMobile &&
    !hourlyTypes.isDayEmpty && <ChartLegendList data={hourlyTypes.listData} />;

  return (
    <div className={`${classesChart["container"]} `}>
      <Grid container>
        <Grid item xs={12}>
          <div className={`${classesChart["title-container"]}`}>
            <h3
              className={classesChart["title"]}
            >{`${hourlyTypes.translations.title}`}</h3>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {chart}
        {chartLegendListContent}
      </Grid>
    </div>
  );
};

export { HourlyTypes };
