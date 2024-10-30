import { Container } from "@mui/material";
import { Landing, SignIn, SignUp } from "../Components/Authentication";
import LoadingFullScreen from "../Components/LoadingFullScreen/LoadingFullScreen";
import NotFound from "../Components/404/NotFound";

/**
 * Landing Page
 */
const LandingPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Landing />
    </Container>
  );
};

/**
 * Loading page for authentication
 */
const LoadingPage = () => {
  return <LoadingFullScreen />;
};

/**
 * Not Found Page 404
 */
const NotFoundPage = () => {
  return <NotFound />;
};

/**
 * Sign In Page
 */
const SignInPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <SignIn />
    </Container>
  );
};

/**
 * Sign Up Page
 */
const SignUpPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <SignUp />
    </Container>
  );
};

export { LandingPage, LoadingPage, NotFoundPage, SignInPage, SignUpPage };
