import React from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import { ChartIsLoading, ChartLegendList } from "../Charts";
import { SingleDayData } from "../../../../../../Types/WaterTracker.types";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../Reducers/Store";
import { setLiquidTypes } from "../../../../Today/Today.utils";
import classes from "./LiquidTypes.module.css";
import classesChart from "../Charts.module.css";

/**
 * no data message
 */
const NoData = () => {
  // get translations
  const { t } = useTranslation();
  const message = t("tracker.emptyMessage");

  return (
    <div className={`${classesChart["no-data-container"]}`}>
      <svg
        className={`${classesChart["icon"]} my-3`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
      >
        <path d="M304 240l0-223.4c0-9 7-16.6 16-16.6C443.7 0 544 100.3 544 224c0 9-7.6 16-16.6 16L304 240zM32 272C32 150.7 122.1 50.3 239 34.3c9.2-1.3 17 6.1 17 15.4L256 288 412.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L320 288l238.4 0z" />
      </svg>

      <h4 className={`${classesChart["no-data-text"]}`}>{message}</h4>
    </div>
  );
};

interface LiquidTypesProps {
  colors: string[];
  day: SingleDayData | null;
}

/**
 * Liquid Types Component: displays the liquid types and their amounts in a pie chart
 */
const LiquidTypes: React.FC<LiquidTypesProps> = ({ day }) => {
  const { contentIsLoading, initialLoading } = useSelector(
    (state: RootState) => state.waterTracker
  );

  // Set up the data for the list
  const data = setLiquidTypes(day);

  // Boolean for activating loading spinner
  const isLoading = contentIsLoading || initialLoading;

  // Get translations
  const { t } = useTranslation();
  const translations = {
    chartTitle: t("tracker.todayPanel.liquidTypes.chartTitle"),
    listTitle: t("tracker.todayPanel.liquidTypes.listTitle"),
    ml: t("measuringUnits.ml"),
    hours: t("timeUnits.hours"),
  };

  const content =
    data.length > 0 ? (
      <Grid item xs={12}>
        <div className={`${classes["list-container"]}`}>
          <ChartLegendList data={data} />
        </div>
      </Grid>
    ) : (
      <Grid item xs={12}>
        <NoData />
      </Grid>
    );

  const contentOnLoading = isLoading ? (
    <Grid item xs={12}>
      <ChartIsLoading />
    </Grid>
  ) : (
    content
  );

  return (
    <div className={`${classesChart["container"]}`}>
      <Grid container>
        <Grid item xs={12}>
          <div className={classesChart["title-container"]}>
            <h3 className={`${classesChart["title"]}`}>
              {translations.chartTitle}
            </h3>
          </div>
        </Grid>
        {contentOnLoading}
      </Grid>
    </div>
  );
};

export { LiquidTypes };
