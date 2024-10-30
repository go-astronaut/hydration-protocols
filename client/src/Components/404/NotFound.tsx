import React from "react";
import classes from "./NotFound.module.css";

const NotFound: React.FC = () => {
  return (
    <div className={classes["wrapper"]}>
      <h1 className={classes["header"]}>404</h1>
      <h3 className={"sub-header"}>Not found</h3>
    </div>
  );
};

export default NotFound;
