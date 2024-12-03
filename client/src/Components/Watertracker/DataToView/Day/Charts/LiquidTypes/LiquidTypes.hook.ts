import { useSelector } from "react-redux";
import { RootState } from "../../../../../../Reducers/Store";
import { setLiquidTypes } from "../../../../Today/Today.utils";
import { SingleDayData } from "../../../../../../Types/WaterTracker.types";

function useLiquidTypes(day: SingleDayData | null) {
  const { contentIsLoading, initialLoading } = useSelector(
    (state: RootState) => state.waterTracker
  );

  // set up the data for the chart
  const data = setLiquidTypes(day);

  // boolean for activating loading spinner
  const isLoading = contentIsLoading || initialLoading;

  return { data, isLoading };
}

export { useLiquidTypes };
