import React from "react";
import { useRedirectToProtected } from "../../../Hooks/Redirect";
import { useAuth } from "../../../Hooks/Auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Grid } from "@mui/material";
import LoadingOverlay from "../../Overlays/LoadingOverlay/LoadingOverlay";
import RoutesValues from "../../../Routes/Routes.values";
import { buttonStyles } from "../../../Constants";
import classes from "./Landing.module.css";

const Landing: React.FC = () => {
  const { userIsLoading } = useAuth();
  const navigate = useNavigate();
  useRedirectToProtected();

  // get tranlations
  const { t } = useTranslation();
  const translations = {
    signin: t("landingPage.signin"),
    signup: t("landingPage.signup"),
  };

  // Navigate to sign in page
  const navigateToSignIn = () => {
    navigate(RoutesValues.signIn);
  };

  // Navigate to sign up page
  const navigateToSignUp = () => {
    navigate(RoutesValues.signUp);
  };

  // TODO: indicator for loading without overlay
  return userIsLoading ? (
    <LoadingOverlay />
  ) : (
    <div className={`${classes["wrapper"]}`}>
      <Grid container>
        <Grid item xs={12}>
          <div className={`${classes["header-wrapper"]}`}>
            <h1 className={`${classes["title"]}`}>stay hydrated</h1>
            <h4 className={`${classes["subtitle"]}`}>
              and take good care of yourself
            </h4>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={`${classes["buttons-wrapper"]}`}>
            <Button
              variant="outlined"
              style={buttonStyles}
              onClick={navigateToSignIn}
            >
              {translations.signin}
            </Button>
            <Button
              variant="outlined"
              style={buttonStyles}
              onClick={navigateToSignUp}
            >
              {translations.signup}
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
