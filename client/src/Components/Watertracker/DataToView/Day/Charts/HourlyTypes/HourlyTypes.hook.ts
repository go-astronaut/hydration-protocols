import { useSelector } from "react-redux";
import { RootState } from "../../../../../../Reducers/Store";
import { useLiquidTypes } from "../LiquidTypes/LiquidTypes.hook";
import { useScreenWidth } from "../../../../../../Providers/ScreenWidth";
import { useTranslation } from "react-i18next";
import { getDailyAmountSum } from "../../../../WaterTracker.utils";
import { BREAKPOINT_SLIDER } from "../Charts.constants";
import { SingleDayData } from "../../../../../../Types/WaterTracker.types";

const useHourlyTypes = (colors: Array<string>, day: SingleDayData | null) => {
  // receive month data from store
  const { contentIsLoading, initialLoading } = useSelector(
    (state: RootState) => state.waterTracker
  );

  // get translations
  const { t } = useTranslation();
  const translations = {
    title: t("tracker.todayPanel.hourlyTypes.title"),
    listTitle: t("tracker.todayPanel.hourlyTypes.listTitle"),
    emptyMessage: t("tracker.emptyMessage"),
    ml: t("measuringUnits.ml"),
    hours: t("timeUnits.hours"),
  };

  // get the liquid types data for the legend
  const listData = useLiquidTypes(day).data;

  // get screen width to determine if the view is mobile
  const { screenWidth } = useScreenWidth();
  const isMobile = screenWidth <= BREAKPOINT_SLIDER;

  // get amount sum of the day
  const sum = day ? getDailyAmountSum(day) : 0;
  const isDayEmpty = sum <= 0;

  // generate an aray with 0 for each hour
  const generateEmpty = () => Array.from({ length: 24 }, () => 0);

  // generate a map of liquid types
  const liquidTypes = new Map();
  if (day && day.activity) {
    // iterate over hourly activity
    day.activity.forEach((hourlyData, hourlyIndex) => {
      // check if the element is an array and has content
      if (Array.isArray(hourlyData) && hourlyData.length > 0) {
        // iterate over the array and sum up the amount of each liquid type
        hourlyData.forEach((item) => {
          // if liquid type is already in the map then add the amount to the existing amount
          if (liquidTypes.has(item.type)) {
            liquidTypes.set(
              item.type,
              liquidTypes
                .get(item.type)
                .concat({ hour: hourlyIndex, amount: item.amount })
            );
          } else {
            liquidTypes.set(item.type, [
              {
                hour: hourlyIndex,
                amount: item.amount,
              },
            ]);
          }
        });
      }
    });
  }

  // extract the data from the map
  const data = Array.from(liquidTypes).map(([key, value], index) => {
    const hourlyData = generateEmpty();

    // iterate over the values and add the amount to the corresponding hour
    value.forEach((item: { hour: number; amount: number }) => {
      if (hourlyData[item.hour] === 0) {
        hourlyData[item.hour] = item.amount;
      } else {
        hourlyData[item.hour] += item.amount;
      }
    });

    return {
      data: hourlyData,
      stack: "1",
      id: key as string,
      color: colors[index],
    };
  });

  // boolean for activating loading spinner
  const isLoading = contentIsLoading || initialLoading;

  return {
    data,
    listData,
    isMobile,
    isDayEmpty,
    translations,
    isLoading,
  };
};

export { useHourlyTypes };
