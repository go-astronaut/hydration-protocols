import React from "react";
import { Grid, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Reducers/Store";
import classes from "./Statistics.module.css";
import { useTranslation } from "react-i18next";

interface StatisticsProps {
  max: number | null;
  average: number | null;
  daysLeft: number | null;
  daysInTotal: number | null;
  goalsReached: number | null;
}

const Statistics: React.FC<StatisticsProps> = ({
  max,
  average,
  daysLeft,
  daysInTotal,
  goalsReached,
}) => {
  const { contentIsLoading, initialLoading } = useSelector(
    (state: RootState) => state.waterTracker
  );

  // get translations
  const { t } = useTranslation();
  const translations = {
    noData: t("statistics.noData"),
    ml: t("measuringUnits.ml"),
    max: t("statistics.max"),
    average: t("statistics.average"),
    of: t("statistics.of"),
    goals: t("statistics.goals"),
    daysLeft: t("statistics.daysLeft"),
    finished: t("statistics.finished"),
  };

  const isLoading = contentIsLoading || initialLoading;

  // skeleton for text
  const textSkeleton = <Skeleton variant="text" width={100} />;
  const noData = <span>{translations.noData}</span>;

  // display text if month stats are available otherwise show skeleton
  const maxTextEl = max ? (
    <div>
      <span> {`${translations.max} `}</span>
      <span className={`${classes["highlight"]}`}>{max}</span>
      <span>{` ${translations.ml}`}</span>
    </div>
  ) : (
    noData
  );

  // display skeleton if content is loading otherwise show text
  const maxEl = isLoading ? textSkeleton : maxTextEl;

  // display text if month stats are available otherwise show no data
  const averageTextEl = average ? (
    <div>
      <span>{`${translations.average} `}</span>
      <span className={`${classes["highlight"]}`}>{average}</span>
      <span>{` ${translations.ml}`}</span>
    </div>
  ) : (
    noData
  );

  // display skeleton if content is loading otherwise show text
  const averageEl =
    contentIsLoading || initialLoading ? textSkeleton : averageTextEl;

  // daysLeft === 0 is a past week
  // daysLeft === -1 || !daysLeft is either a future week or no data status
  const daysLeftContent =
    daysLeft === 0 || daysLeft === -1 ? (
      <span>{`${daysLeft === 0 ? translations.finished : ""}${
        daysLeft === -1 ? translations.noData : ""
      }`}</span>
    ) : (
      <div>
        <span className={`${classes["highlight"]}`}>{daysLeft}</span>
        <span>{` ${translations.daysLeft}`}</span>
      </div>
    );

  // display text if month stats are available otherwise show skeleton
  const daysLeftTextEl =
    daysLeft !== null && daysInTotal ? daysLeftContent : noData;

  // display skeleton if content is loading otherwise show text
  const daysLeftEl =
    contentIsLoading || initialLoading ? textSkeleton : daysLeftTextEl;

  // display text if month stats are available otherwise show skeleton
  const finishedTextEl =
    goalsReached !== null && daysInTotal ? (
      <div>
        <span className={`${classes["highlight"]}`}>{goalsReached}</span>
        <span>{` ${translations.of} `}</span>
        <span className={`${classes["highlight"]}`}>{daysInTotal}</span>
        <span>{` ${translations.goals}`}</span>
      </div>
    ) : (
      noData
    );

  // display skeleton if content is loading otherwise show text
  const finishedEl =
    contentIsLoading || initialLoading ? textSkeleton : finishedTextEl;

  return (
    <div className={`text-center pb-4`}>
      <Grid container>
        <Grid item sm={3} xs={6}>
          <div className={`${classes["info"]}`}>
            <div className={classes["circle"]}>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <path
                  d="M464,256c0-114.9-93.1-208-208-208S48,141.1,48,256s93.1,208,208,208S464,370.9,464,256z M0,256C0,114.6,114.6,0,256,0
        s256,114.6,256,256S397.4,512,256,512S0,397.4,0,256z"
                />
                <path
                  d="M12.9,466.2c-13,13-15.8,31-6.4,40.4c9.4,9.4,27.4,6.5,40.4-6.4L499.5,47.4c13-13,15.8-31,6.4-40.4s-27.4-6.5-40.4,6.4
        L12.9,466.2z"
                />
              </svg>
            </div>
            {averageEl}
          </div>
        </Grid>
        <Grid item sm={3} xs={6}>
          <div className={`${classes["info"]}`}>
            <div className={classes["circle"]}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M384 160c-17.7 0-32-14.3-32-32s14.3-32 32-32l160 0c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-82.7L342.6 374.6c-12.5 12.5-32.8 12.5-45.3 0L192 269.3 54.6 406.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160c12.5-12.5 32.8-12.5 45.3 0L320 306.7 466.7 160 384 160z" />
              </svg>
            </div>
            {maxEl}
          </div>
        </Grid>
        <Grid item sm={3} xs={6}>
          <div className={`${classes["info"]}`}>
            <div className={classes["circle"]}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
              </svg>
            </div>
            {daysLeftEl}
          </div>
        </Grid>
        <Grid item sm={3} xs={6}>
          <div className={`${classes["info"]}`}>
            <div className={classes["circle"]}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
              </svg>
            </div>
            {finishedEl}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export { Statistics };
