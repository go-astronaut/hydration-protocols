import React from "react";
import ReactDOM from "react-dom";
import classes from "./BluredOverlay.module.css";

interface BluredOverlayProps {
  children: React.ReactNode;
}

const BluredOverlay: React.FC<BluredOverlayProps> = ({ children }) => {
  const rootOverlay = document.getElementById("root-overlay");

  if (!rootOverlay) return null;

  const overlay = <div className={classes["blured-overlay"]}>{children}</div>;

  return ReactDOM.createPortal(overlay, rootOverlay);
};

export default BluredOverlay;
