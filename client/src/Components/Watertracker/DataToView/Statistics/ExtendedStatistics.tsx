import React from "react";
import { Grid, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../../Reducers/Store";
import { useScreenWidth } from "../../../../Providers/ScreenWidth";
import { BREAKPOINT_SLIDER } from "../Day/Charts/Charts.constants";
import classes from "./Statistics.module.css";

interface StatisticsProps {
  drinks: number | null;
  liters: number | null;
  types: number | null;
  drinksPerDay: number | null;
}

const ExtendedStatistics: React.FC<StatisticsProps> = ({
  drinks,
  liters,
  types,
  drinksPerDay,
}) => {
  // Get screen width for responsive design
  const { screenWidth } = useScreenWidth();

  // Get loading states from redux
  const { contentIsLoading, initialLoading } = useSelector(
    (state: RootState) => state.waterTracker
  );

  // Get translations
  const { t } = useTranslation();
  const translations = {
    noData: t("statistics.noData"),
    ml: t("measuringUnits.ml"),
    l: t("measuringUnits.l"),
    drinks: t("statistics.drinks"),
    types: t("statistics.types"),
    drinksPerDay: t("statistics.drinksPerDay"),
  };

  const isLoading = contentIsLoading || initialLoading;

  // Skeleton for text
  const textSkeleton = <Skeleton variant="text" width={100} />;
  const noData = <span>{translations.noData}</span>;

  // Display text if month stats are available otherwise show skeleton
  const typesTextEl = types ? (
    <div>
      <span className={`${classes["highlight"]}`}>{`${types}`}</span>
      <span>{` ${translations.types}`}</span>
    </div>
  ) : (
    noData
  );

  // Display skeleton if content is loading otherwise show text
  const typesEl = isLoading ? textSkeleton : typesTextEl;

  // Display text if month stats are available otherwise show no data
  const drinksTextEl = (
    <div>
      <span className={`${classes["highlight"]}`}>{`${
        drinks ? drinks : 0
      }`}</span>
      <span>{` ${translations.drinks}`}</span>
    </div>
  );

  // Display skeleton if content is loading otherwise show text
  const drinksEl =
    contentIsLoading || initialLoading ? textSkeleton : drinksTextEl;

  // DaysLeft === -1 || !daysLeft is either a future week or no data status
  const litersContent = (
    <div>
      <span className={`${classes["highlight"]}`}>{liters}</span>
      <span>{` ${translations.l}`}</span>
    </div>
  );

  // Display text if month stats are available otherwise show skeleton
  const litersTextEl = liters !== null ? litersContent : noData;

  // Display skeleton if content is loading otherwise show text
  const litersEl =
    contentIsLoading || initialLoading ? textSkeleton : litersTextEl;

  // Display text if month stats are available otherwise show skeleton
  const drinksPerDayTextEl =
    drinksPerDay !== null ? (
      <div>
        <span className={`${classes["highlight"]}`}>{drinksPerDay}</span>
        <span>{` ${translations.drinksPerDay}`}</span>
      </div>
    ) : (
      noData
    );

  // Display skeleton if content is loading otherwise show text
  const drinksPerDayEl =
    contentIsLoading || initialLoading ? textSkeleton : drinksPerDayTextEl;

  // Conditional class for right borders on larger screens
  const borderClass =
    screenWidth > BREAKPOINT_SLIDER ? classes["border-right"] : "";

  return (
    <div className={`${classes["statistics-container"]}`}>
      <Grid container>
        <Grid item sm={3} xs={6}>
          <div className={`${classes["info"]} ${borderClass}`}>
            <div className={classes["circle"]}>
              <svg
                className={`${classes["icon"]}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M32 0C23.1 0 14.6 3.7 8.6 10.2S-.6 25.4 .1 34.3L28.9 437.7c3 41.9 37.8 74.3 79.8 74.3l166.6 0c42 0 76.8-32.4 79.8-74.3L383.9 34.3c.6-8.9-2.4-17.6-8.5-24.1S360.9 0 352 0L32 0zM73 156.5L66.4 64l251.3 0L311 156.5l-24.2 12.1c-19.4 9.7-42.2 9.7-61.6 0c-20.9-10.4-45.5-10.4-66.4 0c-19.4 9.7-42.2 9.7-61.6 0L73 156.5z" />
              </svg>
            </div>
            {drinksEl}
          </div>
        </Grid>
        <Grid item sm={3} xs={6}>
          <div className={`${classes["info"]} ${borderClass}`}>
            <div className={classes["circle"]}>
              <svg
                className={`${classes["icon"]}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d="M269.5 69.9c11.1-7.9 25.9-7.9 37 0C329 85.4 356.5 96 384 96c26.9 0 55.4-10.8 77.4-26.1c0 0 0 0 0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 149.7 417 160 384 160c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4C42.8 92.6 61 83.5 75.3 71.6c11.1-9.5 27.3-10.1 39.2-1.7c0 0 0 0 0 0C136.7 85.2 165.1 96 192 96c27.5 0 55-10.6 77.5-26.1zm37 288C329 373.4 356.5 384 384 384c26.9 0 55.4-10.8 77.4-26.1c0 0 0 0 0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 437.7 417 448 384 448c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7c0 0 0 0 0 0C136.7 373.2 165.1 384 192 384c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0zm0-144C329 229.4 356.5 240 384 240c26.9 0 55.4-10.8 77.4-26.1c0 0 0 0 0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 293.7 417 304 384 304c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.5 27.3-10.1 39.2-1.7c0 0 0 0 0 0C136.7 229.2 165.1 240 192 240c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0z" />
              </svg>
            </div>
            {litersEl}
          </div>
        </Grid>
        <Grid item sm={3} xs={6}>
          <div className={`${classes["info"]} ${borderClass}`}>
            <div className={classes["extended-circle"]}>
              <svg
                className={`${classes["icon"]}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M88 0C74.7 0 64 10.7 64 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C120.5 112.3 128 119.9 128 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C119.5 47.7 112 40.1 112 24c0-13.3-10.7-24-24-24zM32 192c-17.7 0-32 14.3-32 32L0 416c0 53 43 96 96 96l192 0c53 0 96-43 96-96l16 0c61.9 0 112-50.1 112-112s-50.1-112-112-112l-48 0L32 192zm352 64l16 0c26.5 0 48 21.5 48 48s-21.5 48-48 48l-16 0 0-96zM224 24c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C232.5 112.3 240 119.9 240 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C231.5 47.7 224 40.1 224 24z" />
              </svg>
              <svg
                className={`${classes["icon"]} mx-1`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M32 0C23.1 0 14.6 3.7 8.6 10.2S-.6 25.4 .1 34.3L28.9 437.7c3 41.9 37.8 74.3 79.8 74.3l166.6 0c42 0 76.8-32.4 79.8-74.3L383.9 34.3c.6-8.9-2.4-17.6-8.5-24.1S360.9 0 352 0L32 0zM73 156.5L66.4 64l251.3 0L311 156.5l-24.2 12.1c-19.4 9.7-42.2 9.7-61.6 0c-20.9-10.4-45.5-10.4-66.4 0c-19.4 9.7-42.2 9.7-61.6 0L73 156.5z" />
              </svg>
              <svg
                className={`${classes["bottle-icon"]}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M120 0l80 0c13.3 0 24 10.7 24 24l0 40L96 64l0-40c0-13.3 10.7-24 24-24zM32 167.5c0-19.5 10-37.6 26.6-47.9l15.8-9.9C88.7 100.7 105.2 96 122.1 96l75.8 0c16.9 0 33.4 4.7 47.7 13.7l15.8 9.9C278 129.9 288 148 288 167.5c0 17-7.5 32.3-19.4 42.6C280.6 221.7 288 238 288 256c0 19.1-8.4 36.3-21.7 48c13.3 11.7 21.7 28.9 21.7 48s-8.4 36.3-21.7 48c13.3 11.7 21.7 28.9 21.7 48c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64c0-19.1 8.4-36.3 21.7-48C40.4 388.3 32 371.1 32 352s8.4-36.3 21.7-48C40.4 292.3 32 275.1 32 256c0-18 7.4-34.3 19.4-45.9C39.5 199.7 32 184.5 32 167.5zM96 240c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-96 0c-8.8 0-16 7.2-16 16zm16 112c-8.8 0-16 7.2-16 16s7.2 16 16 16l96 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-96 0z" />
              </svg>
            </div>
            {typesEl}
          </div>
        </Grid>
        <Grid item sm={3} xs={6}>
          <div className={`${classes["info"]}`}>
            <div className={classes["circle"]}>
              <svg
                className={`${classes["icon"]}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" />
              </svg>
            </div>
            {drinksPerDayEl}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export { ExtendedStatistics };
