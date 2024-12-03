import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  CurrentMonthPage,
  DayPage,
  ArchivePage,
} from "../Pages/WaterTracker.pages";
import ProtectedRoute from "./Protected";
import {
  LandingPage,
  NotFoundPage,
  SignInPage,
  SignUpPage,
} from "../Pages/App.pages";
import RoutesValues from "./Routes.values";

/**
 * App Routes Component
 */
const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path={RoutesValues.archiveMonth}
          element={<ProtectedRoute element={<ArchivePage />} />}
        />
        <Route
          path={RoutesValues.tracker}
          element={<ProtectedRoute element={<CurrentMonthPage />} />}
        />
        <Route
          path={RoutesValues.trackerDayDynamic}
          element={<ProtectedRoute element={<DayPage />} />}
        />
        <Route
          path={RoutesValues.archiveDay}
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
