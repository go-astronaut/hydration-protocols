import React from "react";
import { useRedirectToProtected } from "../../../Hooks/Redirect";
import { useSignUp } from "./SignUp.hooks";
import { NavLink } from "react-router-dom";
import { Box, Button, CssBaseline, Grid, TextField } from "@mui/material";
import RoutesValues from "../../../Routes/Routes.values";
import { buttonStyles } from "../../../Constants";
import LoadingOverlay from "../../Overlays/LoadingOverlay/LoadingOverlay";
import { boxStyles } from "../Athentication.constants";
import classes from "../Authentication.module.css";

const SignUp: React.FC = () => {
  // get object with all sign up functions and states
  const signUp = useSignUp();

  useRedirectToProtected();

  return !signUp.currentUser && signUp.userIsLoading ? (
    <LoadingOverlay />
  ) : (
    <>
      <CssBaseline />
      <Box sx={boxStyles}>
        <Box
          component="form"
          noValidate
          onSubmit={signUp.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField {...signUp.nameInputProps} />
            </Grid>
            <Grid item xs={12}>
              <TextField {...signUp.emailInputProps} />
            </Grid>
            <Grid item xs={12}>
              <div className="mb-4">
                <TextField {...signUp.passwordInputProps} />
              </div>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            style={buttonStyles}
          >
            {signUp.translations.signup}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item sx={{ mt: 2 }}>
              <NavLink to={RoutesValues.signIn}>
                {signUp.translations.question}
              </NavLink>
            </Grid>
          </Grid>
          {signUp.errorMessage && (
            <div className={classes["error-message"]}>
              {signUp.translations.conflict}
            </div>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
