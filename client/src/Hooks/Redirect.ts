import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { useEffect } from "react";
import RoutesValues from "../Routes/Routes.values";

/**
 * wait for user and redirect to protected route if signed in.
 * Don't allow authorized user to visit sign in or sign up page
 */
const useRedirectToProtected = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  //  redirect to tracker page if the user is signed in
  useEffect(() => {
    if (currentUser) navigate(RoutesValues.tracker);
  }, [currentUser, navigate]);
};

export { useRedirectToProtected };
