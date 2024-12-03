import React from "react";
import { Week } from "../Week/Week";
import { v4 } from "uuid";
import _ from "lodash";
import { getWeeksInCurrentMonth } from "../../../../Utils/Time.utils";

/**
 * Month Skeleton Component: Displays a skeleton for month view on content loading
 * @example contetIsLoading ? <MonthSkeleton /> : <Month month={month} />
 */
const MonthSkeleton: React.FC = () => {
  // get the number of weeks in the current month
  const weeksInMonth = getWeeksInCurrentMonth(new Date());

  return (
    <>
      {_.times(weeksInMonth, () => (
        <Week weekData={null} key={v4()} />
      ))}
    </>
  );
};

export { MonthSkeleton };
