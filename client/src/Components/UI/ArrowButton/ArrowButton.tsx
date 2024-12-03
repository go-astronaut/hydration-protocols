import React from "react";
import { ArrowDirections } from "../../../Constants";
import classes from "./ArrowButton.module.css";

interface ArrowButtonProps {
  description: string;
  direction: ArrowDirections;
  width: number;
  isClosed: boolean;
  clickHandler: () => void;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  description,
  direction,
  width,
  isClosed,
  clickHandler,
}) => {
  const divStyle: React.CSSProperties = {
    width: width,
  };
  return (
    <div className={classes["wrapper"]} style={divStyle} onClick={clickHandler}>
      <div
        className={`${classes["arrow"]} ${classes[`arrow--${direction}`]} ${
          classes[isClosed ? "" : "open"]
        }`}
      >
        <span>{description}</span>
      </div>
    </div>
  );
};

export default ArrowButton;
