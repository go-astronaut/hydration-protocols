import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { getDailyAmountSum } from "../../WaterTracker.utils";
import { Month, SingleDayData } from "../../../../Types/WaterTracker.types";
import { RootState } from "../../../../Reducers/Store";
import classes from "./ProgressBarRound.module.css";

interface ProgressBarRoundProp {
  day: SingleDayData | null;
  month: Month | null;
}

const ProgressBarRound: React.FC<ProgressBarRoundProp> = ({ day, month }) => {
  const { initialLoading, contentIsLoading } = useSelector(
    (state: RootState) => state.waterTracker
  );

  // get translations
  const { t } = useTranslation();
  const translations = {
    ml: t("measuringUnits.ml"),
  };

  const amount = day ? getDailyAmountSum(day) : null;
  const currentGoal = day ? day.goal : null;

  const percentege =
    amount && currentGoal
      ? parseFloat(((amount / currentGoal) * 100).toFixed(1))
      : 0;

  const background = `radial-gradient(closest-side, rgb(247, 247, 247) 77%, transparent 0% 100%), conic-gradient(rgb(116, 235, 213) ${percentege}%, rgb(210, 234, 241) 0)`;

  return initialLoading || contentIsLoading ? (
    <Skeleton variant="circular" width={"12rem"} height={"12rem"} />
  ) : (
    <div className={classes["progress-bar"]} style={{ background: background }}>
      <div className={classes["text-wrapper"]}>
        {month && (
          <>
            <div className={classes["text-numbers-top"]}>{`${
              amount ? amount : 0
            } `}</div>
            <div className={classes["text-numbers-bottom"]}>{`/ ${
              currentGoal ? currentGoal : 0
            } ${translations.ml}`}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgressBarRound;
