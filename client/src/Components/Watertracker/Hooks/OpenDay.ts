import { BarItemIdentifier } from "@mui/x-charts";
import { formatDateToString } from "../../../Utils/Time.utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RoutesValues from "../../../Routes/Routes.values";

/**
 * openDay function triggers navigation to a specific day by clicking on a chart bar
 * @param dates an array of string dates DD.MM.YYYY
 * @returns openDay function
 */
function useOpenDay(dates: Array<string>) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  // Month index to manipalte URL
  const monthIndex = params.monthIndex;

  /**
   * set all the neccessary data and open day modal
   */
  const openDay = (
    _: React.MouseEvent<SVGElement, MouseEvent>,
    barItemIdentifier: BarItemIdentifier
  ) => {
    const date = dates.at(barItemIdentifier.dataIndex);
    if (!date) return;

    // Check if date is today date, if so smoothly scroll to the top and it's current month view
    const today = formatDateToString(new Date(), "DD.MM.YYYY");
    const isToday = today === date;
    const isTracker = location.pathname.includes(RoutesValues.tracker);
    if (isToday && isTracker) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (isTracker) {
      // Navigate to day with dynamic route
      navigate(`${RoutesValues.trackerDay}/${date}`);
    } else {
      // Navigate to day with dynamic route
      navigate(`${RoutesValues.archive}/${monthIndex}/${date}`);
    }
  };

  return { openDay };
}

export { useOpenDay };
