import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Reducers/Store";
import { COLOR_PALETTE, TODAY } from "../../../Constants";
import { getTodayFromWeek } from "./Today.utils";
import {
  changeDateFormat,
  formatDateToString,
  getWeekFromDate,
} from "../../../Utils/Time.utils";
import { generateRandomRGB } from "../../../Utils/Color.utils";
import { useScreenWidth } from "../../Providers/ScreenWidth";
import { BREAKPOINT_SLIDER } from "../DataToView/Day/Charts/Charts.constants";
import { useTranslation } from "react-i18next";

const useTodayController = () => {
  // get translations
  const { t } = useTranslation();
  const translations = {
    today: t("tracker.todayPanel.controls.todayTitle"),
    controls: t("tracker.todayPanel.controls.controlsTitle"),
  };

  const { controls, month, initialLoading } = useSelector(
    (state: RootState) => state.waterTracker
  );

  // get screen width and show the correct view
  const { screenWidth } = useScreenWidth();
  const isMobile = screenWidth <= BREAKPOINT_SLIDER;

  // get slider reference
  const sliderRef = React.useRef<any>(null);

  // get current week out of month
  const currentWeek = getWeekFromDate(month, TODAY);

  // get today from current week and set the daily goal
  const day = getTodayFromWeek(currentWeek);

  // generate a set of the liquid types
  const liquidTypes = new Set();
  if (day && day.activity) {
    day.activity.forEach((hourlyData) => {
      if (Array.isArray(hourlyData) && hourlyData.length > 0) {
        hourlyData.forEach((item) => {
          liquidTypes.add(item.type);
        });
      }
    });
  }

  // generate additional colors if the current colors are not enough
  const generateAdditionalColors = (size: number) => {
    const additionalColors = [...COLOR_PALETTE];
    for (let i = 0; i < size; i++) {
      additionalColors.push(generateRandomRGB());
    }
    return additionalColors;
  };

  // Generate additional colors for the liquid types if current colors are not enough
  const COLORS =
    COLOR_PALETTE.length <= liquidTypes.size
      ? COLOR_PALETTE
      : generateAdditionalColors(COLOR_PALETTE.length - liquidTypes.size);

  // control values
  const goal = day?.goal ? day.goal : 0;
  const amount = controls.amount !== null ? controls.amount : 0;
  const type = controls.type ? controls.type : "there is nothing yet";

  // show the goal edit dialog
  const [showControlEdit, setControlEdit] = React.useState(false);

  /**
   * Cancel the goal edit dialog
   */
  const closeEdit = () => {
    setControlEdit(false);
  };

  /**
   * Open the goal edit dialog
   */
  const openEdit = () => {
    setControlEdit(true);
  };

  // today title
  const todayTitle = `${translations.today}: ${
    day?.date
      ? changeDateFormat(day.date, "DD.MM.YYYY", "DD.MM.YY")
      : formatDateToString(TODAY, "DD.MM.YY")
  }`;

  /**
   * handle click to next slide
   */
  const handleNextClick = () => {
    sliderRef.current?.slickNext();
  };

  /**
   * handle click to previous slide
   */
  const handlePrevClick = () => {
    sliderRef.current?.slickPrev();
  };

  return {
    showControlEdit,
    todayTitle,
    amount,
    goal,
    type,
    initialLoading,
    COLORS,
    screenWidth,
    isMobile,
    day,
    sliderRef,
    translations,
    handleNextClick,
    handlePrevClick,
    closeEdit,
    openEdit,
  };
};

export { useTodayController };
