import React from "react";
import { useSignIn } from "./SignIn.hooks";
import { useRedirectToProtected } from "../../../Hooks/Redirect";
import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import LoadingOverlay from "../../Overlays/LoadingOverlay/LoadingOverlay";
import { buttonStyles } from "../../../Constants";
import RoutesValues from "../../../Routes/Routes.values";
import { boxStyles } from "../Athentication.constants";
import classes from "../Authentication.module.css";

/**
 * Sign in component for user
 */
const SignIn: React.FC = () => {
  // get object with all sign in functions and states
  const signIn = useSignIn();

  useRedirectToProtected();

  return !signIn.currentUser && signIn.userIsLoading ? (
    <LoadingOverlay />
  ) : (
    <>
      <CssBaseline />
      <Box sx={boxStyles}>
        <Box
          component="form"
          noValidate
          onSubmit={signIn.handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField {...signIn.emailInputProps} />
          <TextField {...signIn.passwordInputProps} />
          <FormControlLabel
            control={<Checkbox {...signIn.rememberMeInputProps} />}
            label={signIn.translations.rememberMe}
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            style={buttonStyles}
            sx={{ mt: 3 }}
          >
            {signIn.translations.signin}
          </Button>
          <Grid container justifyContent={"end"}>
            <Grid item sx={{ mt: 2 }}>
              <NavLink to={RoutesValues.signUp}>
                {signIn.translations.question}
              </NavLink>
            </Grid>
          </Grid>
          {signIn.errorMessage && (
            <div className={classes["error-message"]}>
              {signIn.translations.invalidInput}
            </div>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SignIn;
