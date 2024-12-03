import React from "react";
import { useWaterTrackerInitializer } from "../WaterTracker.hooks";
import { Grid } from "@mui/material";
import { MonthChart } from "../DataToView/MonthChart/MonthChart";
import { Week } from "../DataToView";
import { Today } from "../Today/Today";
import { formatDateToString } from "../../../Utils/Time.utils";
import { DateFormat } from "../../../Types/Global.types";
import classes from "./Tracker.module.css";

// configuration object for container
const spacingConfig = { xs: 1 };

/**
 * Current Month Component: dispalys current week, today's drunk amount, month chart and infos
 */
const Tracker: React.FC = () => {
  // initialize all necessary data for water tracker and provide them to components
  const { currentWeek } = useWaterTrackerInitializer(
    formatDateToString(new Date(), "MM-YYYY") as DateFormat
  );

  return (
    <div className={`lg:my-3 my-0 ${classes["wrapper"]}`}>
      <Grid container spacing={spacingConfig} alignItems={"center"}>
        <Today />
        <Week weekData={currentWeek} />
        <MonthChart />
      </Grid>
    </div>
  );
};

export { Tracker };
