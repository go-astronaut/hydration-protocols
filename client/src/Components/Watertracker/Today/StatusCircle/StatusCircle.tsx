import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Skeleton, SxProps, Theme } from "@mui/material";
import {
  PieChart,
  PieChartSlotProps,
  PieSeriesType,
  PieValueType,
} from "@mui/x-charts";
import { MakeOptional } from "@mui/x-date-pickers/internals";
import { getDailyAmountSum } from "../../WaterTracker.utils";
import { setLiquidTypes } from "../Today.utils";
import { SingleDayData } from "../../../../Types/WaterTracker.types";
import { RootState } from "../../../../Reducers/Store";
import classes from "./StatusCircle.module.css";

interface ProgressBarRoundProp {
  day: SingleDayData | null;
}

const fullCircle = 360;

const StatusCircle: React.FC<ProgressBarRoundProp> = ({ day }) => {
  const { initialLoading, contentIsLoading, month } = useSelector(
    (state: RootState) => state.waterTracker
  );

  // Get translations
  const { t } = useTranslation();
  const translations = {
    ml: t("measuringUnits.ml"),
  };

  // Set the data for the chart
  const data = setLiquidTypes(day);

  const amount = day ? getDailyAmountSum(day) : null;
  const currentGoal = day ? day.goal : null;

  // Calculate the percentage of the current goal
  const percentege =
    amount && currentGoal
      ? parseFloat(((amount / currentGoal) * 100).toFixed(1))
      : 0;

  // Calculate the angle of the circle. The angle cant be more than 360 degrees
  const angle = percentege > 100 ? fullCircle : (fullCircle / 100) * percentege;

  const chartConfig = {
    series: [
      {
        data,
        outerRadius: 105,
        startAngle: 1,
        // Angle from 1 to the percentage of the current goal in degrees
        endAngle: angle,
        cx: 130,
        cy: 130,
        highlightScope: { faded: "global", highlighted: "item" },
        faded: {
          innerRadius: 34,
          additionalRadius: -34,
          color: "gray",
        },
        valueFormatter: (value) => `${value.value} ${translations.ml}`,
      },
    ] as MakeOptional<
      PieSeriesType<MakeOptional<PieValueType, "id">>,
      "type"
    >[],
    slotProps: {
      legend: { hidden: true },
    } as PieChartSlotProps,
    sx: { "&&": { touchAction: "auto" } } as SxProps<Theme>,
  };

  const message = month && (
    <div className={`${classes["message-container"]}`}>
      <div className={classes["text-numbers-top"]}>{`${
        amount ? amount : 0
      } `}</div>
      <div className={classes["text-numbers-bottom"]}>{`/ ${
        currentGoal ? currentGoal : 0
      } ${translations.ml}`}</div>
    </div>
  );

  return contentIsLoading || initialLoading ? (
    <div className={`${classes["skeleton-container"]}`}>
      <Skeleton variant="circular" width={"12rem"} height={"12rem"} />
    </div>
  ) : (
    <div className={`${classes["chart-container"]}`}>
      {data.length > 0 && (
        <PieChart {...chartConfig} sx={{ "&&": { touchAction: "auto" } }} />
      )}
      <div className={classes["message-wrapper"]}>{message}</div>
    </div>
  );
};

export { StatusCircle };
