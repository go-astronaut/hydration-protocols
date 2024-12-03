import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useScreenWidth } from "../../../../Providers/ScreenWidth";
import { useWaterTrackerInitializer } from "../../WaterTracker.hooks";
import {
  formatDateToString,
  formatStringToDate,
} from "../../../../Utils/Time.utils";
import { getColorScheme, getDayFromMonth } from "../../WaterTracker.utils";
import { setLiquidTypes } from "../../Today/Today.utils";
import { BREAKPOINT_SLIDER } from "./Charts/Charts.constants";
import RoutesValues from "../../../../Routes/Routes.values";
import { DateFormat } from "../../../../Types/Global.types";

const useDay = () => {
  // navigate object for going one step back
  const navigate = useNavigate();

  // get params object to access date
  const params = useParams();

  // get full path
  const location = useLocation();
  const pathname = location.pathname;

  // Month index from params
  const monthIndex = params.monthIndex as string;
  // validate if month index is valid
  const isValid = /^\d{1,2}-\d{4}$/.test(monthIndex as string);

  // validate date string and redirect to 404 if not valid
  const regex = /^\d{1,2}\.\d{1,2}\.\d{4}$/;
  const match = regex.test(typeof params.date === "string" ? params.date : "");

  // get screen width and calculate breakpoint for mobile devices
  const { screenWidth } = useScreenWidth();
  const isMobile = screenWidth <= BREAKPOINT_SLIDER;

  // convert string to date object
  const date = match
    ? formatStringToDate(params.date as string, "DD.MM.YYYY")
    : null;

  const { month, initialLoading, contentIsLoading } =
    useWaterTrackerInitializer(
      (isValid
        ? (monthIndex as DateFormat)
        : formatDateToString(new Date(), "MM-YYYY")) as DateFormat
    );

  const data = date && getDayFromMonth(month, date);

  const handleGoBack = () => {
    // If current URL path contains archive then navigate to archive
    if (pathname.includes(RoutesValues.archive)) {
      if (!isValid) return;
      navigate(`${RoutesValues.archive}/${monthIndex}`);
    }

    // If current URL path contains tracker then navigate to tracker
    if (pathname.includes(RoutesValues.tracker)) {
      navigate(RoutesValues.tracker);
    }
  };

  // generate a set of the liquid types
  const liquidTypes = new Set();

  data?.activity &&
    data.activity.forEach((hourlyData) => {
      if (Array.isArray(hourlyData) && hourlyData.length > 0) {
        hourlyData.forEach((item) => {
          liquidTypes.add(item.type);
        });
      }
    });

  // Generate additional colors for the liquid types if current colors are not enough
  const COLORS = getColorScheme(data);

  // Generate chart data
  const chartData = setLiquidTypes(data);

  const title = data?.date ? data.date : "";

  const isLoading = contentIsLoading || initialLoading;

  return {
    data,
    COLORS,
    isLoading,
    match,
    title,
    isMobile,
    month,
    chartData,
    handleGoBack,
  };
};

export { useDay };
