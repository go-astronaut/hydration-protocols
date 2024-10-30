import { SingleDayData } from "../../../Types/WaterTracker.types";
import { calculateColor } from "../../../Utils/Color.utils";

/**
 * convert data set for displaying it into mui x charts
 * @param week - Array<SingleDayData>
 * @returns chart data for mui x charts
 */
function setChartWeekData(week: Array<SingleDayData>) {
  // set week data for chart
  return week.map((day) => {
    // tranform activity to array with numbers
    const activityArray = day.activity
      ? day.activity.map((hour) => {
          if (Array.isArray(hour)) {
            return hour.reduce((a, b) => a + b.amount, 0);
          } else {
            return 0;
          }
        })
      : [];

    // sum the array
    const activitySum = activityArray.reduce((a, b) => a + b, 0);

    // calculate the color of the progress bar
    const percentage = (activitySum / day.goal) * 100;
    const { hex } = calculateColor(percentage, 1);

    return {
      date: day.date,
      amount: activitySum,
      goal: day.goal,
      color: hex,
    };
  });
}

export { setChartWeekData };
