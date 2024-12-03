import React from "react";
import { CircularProgress } from "@mui/material";
import classes from "./LoadingFullScreen.module.css";

const LoadingFullScreen: React.FC = () => {
  return (
    <div className={classes["container"]}>
      <CircularProgress />
    </div>
  );
};
export default LoadingFullScreen;
