import React from "react";
import ArrowButton from "../../../UI/ArrowButton/ArrowButton";
import { ArrowDirections } from "../../../../Constants";
import classes from "./NumberSpinner.module.css";

interface NumberSpinnerProps {
  areArrowsVisible: boolean;
  value: number;
  index: number;
  arr: Array<string> | null;
  setValue?: (value: number) => void;
}

/**
 * single digit spinner: 0 - 9
 */
const NumberSpinner: React.FC<NumberSpinnerProps> = ({
  areArrowsVisible,
  value,
  index,
  arr,
  setValue,
}) => {
  const width = 27;

  const checkAndSet = (value: number) => {
    if (setValue) setValue(value);
  };

  const handleNext = () => {
    const resultValue = value + 1;
    if (resultValue > 9) {
      const resetValue = 0;
      checkAndSet(resetValue);
      return resetValue;
    } else {
      checkAndSet(resultValue);
      return resultValue;
    }
  };

  const handlePrevious = () => {
    const resultValue = value - 1;
    if (resultValue < 0) {
      const resetValue = 9;
      checkAndSet(resetValue);
      return resetValue;
    } else {
      checkAndSet(resultValue);
      return resultValue;
    }
  };

  return (
    <div className={`${classes["container"]}`}>
      <div className={classes["arrows-wrapper"]}>
        {areArrowsVisible && (
          <ArrowButton
            description={""}
            direction={ArrowDirections.top}
            width={width}
            clickHandler={handleNext}
            isClosed={true}
          />
        )}
      </div>
      <div className={classes["number-output"]}>{value}</div>
      <div className={classes["arrows-wrapper"]}>
        {areArrowsVisible && (
          <ArrowButton
            description={""}
            direction={ArrowDirections.bottom}
            width={width}
            clickHandler={handlePrevious}
            isClosed={true}
          />
        )}
      </div>
    </div>
  );
};

export default NumberSpinner;
