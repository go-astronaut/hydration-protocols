import { useSelector } from "react-redux";
import { RootState } from "../../../../Reducers/Store";
import { v4 } from "uuid";
import { Week } from "../Week/Week";

/**
 * Component for displaying the month data
 */
const Month = () => {
  const { month } = useSelector((state: RootState) => state.waterTracker);

  // get weeks from month data
  const monthArr = month && Object.values(month);
  const weeksArr = monthArr && Object.values(monthArr[0]);

  // create month view with weeks arrays or empty if no data
  const monthView = weeksArr
    ? weeksArr.map((week) => {
        return <Week weekData={week} key={v4()} />;
      })
    : "";

  return <>{monthView}</>;
};

export { Month };
