import React from "react";
import moment from "moment";
import { useLoadMonthData } from "../Hooks/LoadMonthData";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useScreenWidth } from "../../../Providers/ScreenWidth";
import { getMonthStats } from "../WaterTracker.utils";
import {
  formatDateToString,
  formatStringToDate,
  getMonthKey,
} from "../../../Utils/Time.utils";
import { getAllMonthlyDrinks } from "./MonthHeader.utils";
import { RootState } from "../../../Reducers/Store";
import { MonthIndex } from "../../../Types/Global.types";
import { Drink } from "../../../Types/WaterTracker.types";
import { BREAKPOINT_SLIDER } from "../DataToView/Day/Charts/Charts.constants";

const useMonthHeader = (date: Date) => {
  // Get screen width for responsiveness and check if the screen is mobile
  const { screenWidth } = useScreenWidth();
  const isMobile = screenWidth < BREAKPOINT_SLIDER;

  // All the neccessary data from redux
  const { month, initialLoading, contentIsLoading } = useSelector(
    (state: RootState) => state.waterTracker
  );

  // Modal visibility
  const [showTimeTraverse, setShowTimeTraverse] = React.useState(false);

  // LoadMonth function for month initialization
  const { loadMonth } = useLoadMonthData();

  // Get translations
  const { t } = useTranslation();
  const translations = {
    title: t("archive.title", {
      month: t(`timeUnits.months.${getMonthKey(date.getMonth())}`),
      year: date.getFullYear(),
    }),
    buttonDesc: t("archive.buttonDesc"),
    navigate: t("archive.navigate"),
    l: t("measuringUnits.l"),
    drinksListTitle: t("archive.drinksListTitle"),
  };

  // Get a list with all drinks of the month
  const allDrinks = month ? getAllMonthlyDrinks(month) : null;

  // Drinks this month
  const drinksCounter = allDrinks?.length ? allDrinks.length : 0;

  // Calculate sum of all drinks
  const sum = allDrinks
    ? allDrinks?.reduce((acc, curr) => acc + curr.amount, 0)
    : 0;
  const sumDrinks = sum > 0 ? Math.trunc(sum / 1000) : 0;

  // Count of all drinks
  const drinkTypes = new Set();
  allDrinks?.forEach((drink) => drinkTypes.add(drink.type));
  const types = drinkTypes.size;

  // Calculate average drinks per day
  const monthKey = month ? Object.keys(month)[0] : null;
  // Get the date of the first day of the month
  const firstDay = monthKey ? formatStringToDate(monthKey, "MM-YYYY") : null;
  // Get the days in the month
  let daysInMonth = firstDay ? moment(firstDay).daysInMonth() : 0;
  // Check if the month is the current month and set the days in the month to the current day
  const today = formatDateToString(new Date(), "MM-YYYY");
  if (monthKey && monthKey === today) {
    daysInMonth = moment().date();
  }

  // Calculate average drinks per day
  const averageDrinksPerDay =
    drinksCounter > 0 && daysInMonth > 0
      ? Math.round(drinksCounter / daysInMonth)
      : null;

  // Create a Map of drinks and their amount for the month
  const drinksMap = new Map();
  if (allDrinks) {
    allDrinks.forEach((drink) => {
      // Each drink is a set with the type and the sum of the amounts
      const drinkSet = drinksMap.has(drink.type)
        ? drinksMap.get(drink.type)
        : { type: drink.type, amount: 0 };
      drinkSet.amount += drink.amount;
      drinksMap.set(drink.type, drinkSet);
    });
  }

  // Convert drinksMap to an array and sort it by the amount
  const drinks = (Array.from(drinksMap.values()) as Drink[]).sort(
    (a, b) => b.amount - a.amount
  );

  // Convert ml to l for each drink and round it to 1 decimal
  drinks.forEach((drink) => {
    drink.amount = Math.round(drink.amount / 100) / 10;
  });

  // isLoading check
  const isLoading = initialLoading || contentIsLoading;

  // Get month statistics and set config object for statistics component
  const monthStats = month && getMonthStats(month);
  const statisticsConfig = {
    max: monthStats?.maxAmount ? monthStats.maxAmount : null,
    average: monthStats?.averageAmount ? monthStats.averageAmount : null,
    daysLeft:
      monthStats && typeof monthStats?.daysInMonthLeft === "number"
        ? monthStats.daysInMonthLeft
        : null,
    daysInTotal: monthStats?.daysInMonth ? monthStats.daysInMonth : null,
    goalsReached: monthStats?.goalReachedCounter
      ? monthStats.goalReachedCounter
      : 0,
  };

  // Set config object for extended statistics component
  const extendedStatisticsConfig = {
    drinks: drinksCounter,
    liters: sumDrinks,
    types,
    drinksPerDay: averageDrinksPerDay,
  };

  /**
   * load month data based on year and month
   */
  const loadSetTime = async (time: { year: number; month: MonthIndex }) => {
    // close modal for time navigation
    setShowTimeTraverse(false);

    // load month data
    await loadMonth(time.year, time.month);
  };

  /**
   * open modal for time navigation
   */
  const openModal = () => {
    // set date from URL
    setShowTimeTraverse(true);
  };

  /**
   * close on cancel modal for time navigation
   */
  const closeModal = () => {
    setShowTimeTraverse(false);
  };

  return {
    loadSetTime,
    closeModal,
    openModal,
    showTimeTraverse,
    statisticsConfig,
    translations,
    isLoading,
    extendedStatisticsConfig,
    drinks,
    isMobile,
  };
};

export { useMonthHeader };
