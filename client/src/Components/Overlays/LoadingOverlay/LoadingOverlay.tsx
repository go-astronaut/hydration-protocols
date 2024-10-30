import { CircularProgress } from "@mui/material";
import React from "react";
import BluredOverlay from "../BluredOverlay/BluredOverlay";

const LoadingOverlay: React.FC = () => {
  return (
    <BluredOverlay>
      <CircularProgress />
    </BluredOverlay>
  );
};

export default LoadingOverlay;
