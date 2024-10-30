import React from "react";
import { useDay } from "./Day.hook";
import { Grid, Skeleton } from "@mui/material";
import { MobileSlider } from "./MobileSlider/MobileSlider";
import ProgressBarRound from "../../Today/ProgressBarRound/ProgressBarRound";
import NotFound from "../../../404/NotFound";
import { HourlyTypes } from "./Charts/HourlyTypes/HourlyTypes";
import { LiquidTypes } from "./Charts/LiquidTypes/LiquidTypes";
import { HourlyAmounts } from "./Charts/HourlyAmounts/HourlyAmounts";
import { v4 } from "uuid";
import classes from "./Day.module.css";

/**
 * Component to display single day data
 */
const Day = () => {
  const day = useDay();

  const slides = [
    <div key={v4()}>
      <div className={`${classes["slide"]}`}>
        <div
          className={` ${classes["progress-bar-container"]} flex flex-col justify-center items-center`}
        >
          <h3 className={`${classes["title"]}`}>
            {day.data?.date ? day.data.date : ""}
          </h3>
          <ProgressBarRound day={day.data} month={day.month} />
        </div>
      </div>
    </div>,
    <div key={v4()}>
      <div className={`${classes["slide"]}`}>
        <HourlyAmounts day={day.data} />
      </div>
    </div>,
    <div key={v4()}>
      <div className={`${classes["slide"]}`}>
        <HourlyTypes colors={day.COLORS} day={day.data} />
      </div>
    </div>,
    <div key={v4()}>
      <div className={`${classes["slide"]}`}>
        <LiquidTypes colors={day.COLORS} day={day.data} />
      </div>
    </div>,
  ];

  const allChartsView = (
    <Grid container alignItems={"center"}>
      <Grid item lg={6} xs={12}>
        <div
          className={`${classes["progress-bar-container"]} flex flex-col justify-center items-center`}
        >
          {day.isLoading ? (
            <Skeleton
              style={{ marginBottom: "0.75rem" }}
              variant="rounded"
              width={"10rem"}
              height={"1.4rem"}
            />
          ) : (
            <h3 className={`${classes["title"]}`}>{day.title}</h3>
          )}
          <ProgressBarRound day={day.data} month={day.month} />
        </div>
      </Grid>
      <Grid item lg={6} xs={12}>
        <HourlyAmounts day={day.data} />
      </Grid>
      <Grid item lg={6} xs={12}>
        <LiquidTypes colors={day.COLORS} day={day.data} />
      </Grid>
      <Grid item lg={6} xs={12}>
        <HourlyTypes colors={day.COLORS} day={day.data} />
      </Grid>
    </Grid>
  );

  const button = (
    <button
      className={`${classes["go-back-button"]}`}
      onClick={day.handleGoBack}
    >
      <svg
        className={`${classes["go-back-icon"]}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
      </svg>
    </button>
  );

  const content = day.isMobile ? (
    <div className={`${classes["container"]}`}>
      {button}
      <MobileSlider slides={slides} />
    </div>
  ) : (
    <div className={`${classes["lg-container"]}`}>
      {button}
      {allChartsView}
    </div>
  );

  return day.match ? content : <NotFound />;
};

export { Day };
