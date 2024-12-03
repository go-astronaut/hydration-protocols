import React from "react";
import { useToday } from "./Today.hooks";
import { v4 } from "uuid";
import { Grid } from "@mui/material";
import { Drink } from "./Drink/Drink";
import { MobileSlider } from "../DataToView/Day/MobileSlider/MobileSlider";
import EditControls from "./EditGoal/EditGoal";
import { TodayController } from "./TodayController/TodayController";
import { HourlyAmounts } from "../DataToView/Day/Charts/HourlyAmounts/HourlyAmounts";
import { LiquidTypes } from "../DataToView/Day/Charts/LiquidTypes/LiquidTypes";
import { HourlyTypes } from "../DataToView/Day/Charts/HourlyTypes/HourlyTypes";
import classes from "./Today.module.css";

/**
 * Component for displaying today controls and progress
 */
const Today: React.FC = () => {
  // get all necessary data to fill the view
  const today = useToday();

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
      {today.drink.drinkModal && (
        <Drink
          closeEdit={today.closeEdit}
          closeDrink={today.drink.closeDrinkModal}
        />
      )}
      <div className={`${classes["today-container"]}`}>
        <Grid container>
          <Grid
            item
            lg={6}
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <div
              className={`${classes["controls-background"]} ${classes["controls-container"]}`}
            >
              <h1 className={classes["today"]}>{today.todayTitle}</h1>
              <TodayController
                openControlEdit={today.openEdit}
                openDrinkModal={today.drink.openDrinkModal}
              />
            </div>
          </Grid>
          {charts}
        </Grid>
      </div>
    </Grid>
  );
};

export { Today };
