import { useNavigate, useParams } from "react-router-dom";
import { useScreenWidth } from "../../../Providers/ScreenWidth";
import { formatStringToDate } from "../../../../Utils/Time.utils";
import { useWaterTrackerInitializer } from "../../WaterTracker.hooks";
import { getColorScheme, getDayFromMonth } from "../../WaterTracker.utils";
import { BREAKPOINT_SLIDER } from "./Charts/Charts.constants";

const useDay = () => {
  // navigate object for going one step back
  const navigate = useNavigate();

  // get params object to access date
  const params = useParams();

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
    useWaterTrackerInitializer(date);

  const data = date && getDayFromMonth(month, date);

  const handleGoBack = () => {
    navigate(-1);
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
    handleGoBack,
  };
};

export { useDay };
