import React from "react";
import { useWaterTrackerInitializer } from "../WaterTracker.hooks";
import { Grid } from "@mui/material";
import { MonthChart } from "../DataToView/MonthChart/MonthChart";
import { Week } from "../DataToView";
import { Today } from "../Today/Today";
import { TODAY } from "../../../Constants";
import classes from "./CurrentMonth.module.css";

// configuration object for container
const spacingConfig = { xs: 1 };

/**
 * Current Month Component: dispalys current week, today's drunk amount, month chart and infos
 */
const CurrentMonth: React.FC = () => {
  // initialize all necessary data for water tracker and provide them to components
  const { currentWeek } = useWaterTrackerInitializer(TODAY);

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

export { CurrentMonth };
