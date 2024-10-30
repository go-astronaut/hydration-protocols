import React from "react";
import classes from "./Today.module.css";
import { Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";

interface DrinkAmountProps {
  amount: number;
  initialLoading: boolean;
}

/**
 * Component for displaying the drink amount
 */
const DrinkAmount: React.FC<DrinkAmountProps> = ({
  amount,
  initialLoading,
}) => {
  // get translations
  const { t } = useTranslation();
  const drinkAmount = t("tracker.todayPanel.controls.amountInputDesc");
  const ml = t("measuringUnits.ml");

  return initialLoading ? (
    <Skeleton
      variant="rounded"
      width={"7rem"}
      height={"1.85rem"}
      style={{ marginLeft: "0.75rem", marginBottom: "1.75rem" }}
    />
  ) : (
    <>
      <div className={`${classes["description"]}`}>{`${drinkAmount}: `}</div>
      <div className={`${classes["value"]}`}>{`${amount} ${ml}`}</div>
    </>
  );
};

interface TypeProps {
  type: string;
  initialLoading: boolean;
}

/**
 * Component for displaying the liquid type
 */
const Type: React.FC<TypeProps> = ({ initialLoading, type }) => {
  // get translations
  const { t } = useTranslation();
  const typeInputDesc = t("tracker.todayPanel.controls.typeInputDesc");

  return initialLoading ? (
    <Skeleton
      variant="rounded"
      width={"calc(100% - 1.125rem)"}
      height={"1.85rem"}
      style={{ marginLeft: "0.75rem" }}
    />
  ) : (
    <>
      <div
        className={`${classes["description"]} ${classes["description-long"]}`}
      >{`${typeInputDesc} `}</div>
      <div className={`${classes["value"]}`}>{`${type}`}</div>
    </>
  );
};

interface GoalProps {
  goal: number;
  initialLoading: boolean;
}

/**
 * Component for displaying the daily goal
 */
const Goal: React.FC<GoalProps> = ({ initialLoading, goal }) => {
  // get translations
  const { t } = useTranslation();
  const goalInputDesc = t("tracker.todayPanel.controls.goalInputDesc");

  return initialLoading ? (
    <Skeleton
      variant="rounded"
      width={"7rem"}
      height={"1.85rem"}
      style={{ marginLeft: "0.75rem", marginBottom: "1.75rem" }}
    />
  ) : (
    <>
      <div className={`${classes["description"]}`}>{`${goalInputDesc}: `}</div>
      <div className={`${classes["value"]}`}>{`${goal} ml`}</div>
    </>
  );
};

export { DrinkAmount, Type, Goal };
