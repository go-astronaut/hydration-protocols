import React from "react";
import classes from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import RoutesValues from "../../Routes/Routes.values";
import { useTranslation } from "react-i18next";
import { buttonStyles } from "../../Constants";

const NotFound: React.FC = () => {
  // get navigation function
  const navigate = useNavigate();

  // get translations
  const { t } = useTranslation();
  const translations = {
    notFound: t("404Page.title"),
    toMain: t("404Page.button"),
  };

  // handle navigation to the main page
  const navigateToMainPage = () => {
    navigate(RoutesValues.root);
  };

  return (
    <div className={classes["wrapper"]}>
      <h1 className={classes["header"]}>404</h1>
      <h3 className={classes["sub-header"]}>{translations.notFound}</h3>
      <Button
        style={buttonStyles}
        variant={"outlined"}
        onClick={navigateToMainPage}
      >
        {translations.toMain}
      </Button>
    </div>
  );
};

export default NotFound;
