import React from "react";
import { useTodayController } from "./Today.hooks";
import { Grid } from "@mui/material";
import { DrinkAmount, Goal, Type } from "./Today.components";
import { MobileSlider } from "../DataToView/Day/MobileSlider/MobileSlider";
import EditControls from "./EditControls/EditControls";
import TodayController from "./TodayController/TodayController";
import { HourlyAmounts } from "../DataToView/Day/Charts/HourlyAmounts/HourlyAmounts";
import { LiquidTypes } from "../DataToView/Day/Charts/LiquidTypes/LiquidTypes";
import { HourlyTypes } from "../DataToView/Day/Charts/HourlyTypes/HourlyTypes";
import { v4 } from "uuid";
import classes from "./Today.module.css";

/**
 * Component for displaying today controls and progress
 */
const Today: React.FC = () => {
  // get all necessary data to fill the view
  const today = useTodayController();

  const slides = [
    <div key={v4()}>
      <div className={`${classes["hourly-amounts-background"]}`}>
        <HourlyAmounts day={today.day} />
      </div>
    </div>,
    <div key={v4()}>
      <div className={`${classes["todays-types-background"]}`}>
        <LiquidTypes colors={today.COLORS} day={today.day} />
      </div>
    </div>,
    <div key={v4()}>
      <div className={`${classes["hourly-types-background"]}`}>
        <HourlyTypes colors={today.COLORS} day={today.day} />
      </div>
    </div>,
  ];

  const charts = today.isMobile ? (
    <Grid item lg={6} xs={12}>
      <MobileSlider slides={slides} />
    </Grid>
  ) : (
    <>
      <Grid item lg={6} xs={12}>
        <div className={`${classes["hourly-amounts-background"]}`}>
          <HourlyAmounts day={today.day} />
        </div>
      </Grid>
      <Grid item lg={6} xs={12}>
        <div className={`${classes["todays-types-background"]}`}>
          <LiquidTypes colors={today.COLORS} day={today.day} />
        </div>
      </Grid>
      <Grid item lg={6} xs={12}>
        <div className={`${classes["hourly-types-background"]}`}>
          <HourlyTypes colors={today.COLORS} day={today.day} />
        </div>
      </Grid>
    </>
  );

  return (
    <Grid item xs={12}>
      {today.showControlEdit && <EditControls closeEdit={today.closeEdit} />}
      <div className={`${classes["today-container"]}`}>
        <Grid container>
          <Grid item lg={6} xs={12}>
            <div className={`${classes["controls-background"]} content-center`}>
              <Grid container>
                <Grid item md={6} xs={12}>
                  <h1 className={classes["today"]}>{today.todayTitle}</h1>
                  <div className={`${classes["controls-label"]} `}>
                    <h3 className={`${classes["controls-title"]} `}>
                      {`${today.translations.controls}:`}
                    </h3>
                  </div>
                  <div
                    onClick={today.openEdit}
                    className={`${classes["button"]}`}
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <DrinkAmount
                          amount={today.amount}
                          initialLoading={today.initialLoading}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Goal
                          goal={today.goal}
                          initialLoading={today.initialLoading}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Type
                          type={today.type}
                          initialLoading={today.initialLoading}
                        />
                      </Grid>
                    </Grid>

                    <div className={`${classes["edit-controls-overlay"]}`}>
                      <svg
                        className={`${classes["edit-icon"]}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                      </svg>
                    </div>
                  </div>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                  display={"flex"}
                  justifyContent={"center"}
                >
                  <TodayController openControlEdit={today.openEdit} />
                </Grid>
              </Grid>
            </div>
          </Grid>
          {charts}
        </Grid>
      </div>
    </Grid>
  );
};

export { Today };
