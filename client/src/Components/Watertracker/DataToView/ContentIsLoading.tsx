import React from "react";
import { CircularProgress } from "@mui/material";
import classes from "./DataToView.module.css";

/**
 * Component for displaying loading spinner and text
 */
const ContentIsLoading: React.FC = () => {
  return (
    <div
      className={`${classes["loading-container"]} flex justify-center items-center pt-12`}
    >
      <CircularProgress />
      <h5 className={`${classes["loading-text"]}`}>...loading</h5>
    </div>
  );
};

export { ContentIsLoading };
