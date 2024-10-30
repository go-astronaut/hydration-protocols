import { useAuth } from "../../Hooks/Auth";
import { Navigate } from "react-router-dom";
import { LoadingPage } from "../../Pages/App.pages";
import RoutesValues from "../Routes.enums";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

/**
 * Protected Route Component
 * @param element - The element to be rendered if the user is authenticated
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { currentUser, userIsLoading } = useAuth();

  // if the user is not loaded yet, show the loading screen
  if (userIsLoading) return <LoadingPage />;

  // if the user is loaded, show the protected element, if not, navigate to sign in page
  return currentUser ? element : <Navigate to={RoutesValues.signIn} />;
};

export default ProtectedRoute;
