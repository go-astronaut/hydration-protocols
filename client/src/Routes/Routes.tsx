import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  CurrentMonthPage,
  DayPage,
  TimeTraversePage,
} from "../Pages/WaterTracker.pages";
import ProtectedRoute from "./Protected";
import {
  LandingPage,
  NotFoundPage,
  SignInPage,
  SignUpPage,
} from "../Pages/App.pages";
import RoutesValues from "./Routes.enums";

/**
 * App Routes Component
 */
const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path={RoutesValues.monthTraverse}
          element={<ProtectedRoute element={<TimeTraversePage />} />}
        />
        <Route
          path={RoutesValues.currentMonth}
          element={<ProtectedRoute element={<CurrentMonthPage />} />}
        />
        <Route
          path={RoutesValues.date}
          element={<ProtectedRoute element={<DayPage />} />}
        />
        <Route path={RoutesValues.root} element={<LandingPage />} />
        <Route path={RoutesValues.signUp} element={<SignUpPage />} />
        <Route path={RoutesValues.signIn} element={<SignInPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
