import { generateRandomRGB } from "../../../Utils/Color.utils";
import { formatDateToString } from "../../../Utils/Time.utils";
import { COLOR_PALETTE } from "../../../Constants";
import { SingleDayData } from "../../../Types/WaterTracker.types";

/**
 *  Get today from week array
 *
 * @param week - week has to be an array with exactly 7 elements
 * @returns - today's data or null
 */
function getTodayFromWeek(week: Array<SingleDayData> | null) {
  //
  if (!week || !Array.isArray(week) || week.length !== 7) return null;

  const today = formatDateToString(new Date(), "DD.MM.YYYY");
  const result = week.find((day) => day.date === today);
  return result ? result : null;
}

/**
 * Set data for liquid types
 * @param day - day data
 */
function setLiquidTypes(day: SingleDayData | null) {
  if (!day) return [];

  // create map of liquid types
  const liquidTypes = new Map();
  if (day && day.activity) {
    // iterate over hourly activity
    day.activity.forEach((hour) => {
      // check if the element is an array and has content
      if (Array.isArray(hour) && hour.length > 0) {
        // iterate over the array and sum up the amount of each liquid type
        hour.forEach((item) => {
          // if liquid type is already in the map then add the amount to the existing amount
          if (liquidTypes.has(item.type)) {
            liquidTypes.set(
              item.type,
              liquidTypes.get(item.type) + item.amount
            );
          } else {
            liquidTypes.set(item.type, item.amount);
          }
        });
      }
    });
  }

  // set up the data for the chart
  const data = [] as {
    id: string;
    label: string;
    value: number;
    color: string;
  }[];
  let index = 0;
  liquidTypes.forEach((value, key) => {
    data.push({
      id: key,
      label: key,
      value: value,
      color: `${
        COLOR_PALETTE[index] ? COLOR_PALETTE[index] : generateRandomRGB()
      }`,
    });
    index++;
  });

  return data;
}

/**
 * Extend colors array to match the length of the liquid types
 */
function extendColors(liquidTypes: Map<string, number>) {
  const extendedColors = [...COLOR_PALETTE];
  const diff = liquidTypes.size - COLOR_PALETTE.length;

  if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      extendedColors.push(generateRandomRGB());
    }
  }

  return extendedColors;
}

export { getTodayFromWeek, setLiquidTypes, extendColors };
