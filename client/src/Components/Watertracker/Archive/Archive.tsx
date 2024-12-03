import React from "react";
import { useWaterTrackerInitializer } from "../WaterTracker.hooks";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { Month } from "../DataToView";
import MonthHeader from "../MonthHeader/MonthHeader";
import { MonthSkeleton } from "../DataToView/Month/Month.skeleton";
import {
  formatDateToString,
  formatStringToDate,
} from "../../../Utils/Time.utils";
import { DateFormat } from "../../../Types/Global.types";
import classes from "./Archive.module.css";

/**
 * Component for displaying month and month navigation
 */
const Archive: React.FC = () => {
  // Get params object to access date
  const params = useParams();

  // Validate date string and redirect to 404 if not valid
  const regex = /^\d{1,2}-\d{4}$/;
  const match = regex.test(
    typeof params.monthIndex === "string" ? params.monthIndex : ""
  );

  // Month index from params
  const monthIndex = params.monthIndex as string;
  // validate if month index is valid
  const isValid = /^\d{1,2}-\d{4}$/.test(monthIndex as string);

  const date =
    match && params.monthIndex
      ? formatStringToDate(params.monthIndex as string, "MM-YYYY")
      : null;

  // initialize all necessary data for water tracker and provide them to components
  const { initialLoading } = useWaterTrackerInitializer(
    (isValid
      ? monthIndex
      : formatDateToString(new Date(), "MM-YYYY")) as DateFormat
  );

  // if month data is loading then show skeleton
  const MonthOnLoading = initialLoading ? MonthSkeleton : Month;

  return (
    <div className={`lg:my-3 my-0 ${classes["wrapper"]}`}>
      <Grid container spacing={{ xs: 1 }} alignItems={"center"}>
        {/* Initializer will redirect to 404 page if data is nullish */}
        {date && <MonthHeader date={date} />}
        <MonthOnLoading />
      </Grid>
    </div>
  );
};

export { Archive };
