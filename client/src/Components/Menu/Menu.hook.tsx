import React from "react";
import i18next from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/Auth";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { getDayFromMonth } from "../Watertracker/WaterTracker.utils";
import { getMonthData } from "../../Reducers/WaterTracker/WaterTracker.thunks";
import { getHeaders } from "../../Utils/Request.utils";
import { AppDispatch, RootState } from "../../Reducers/Store";
import { formatDateToString } from "../../Utils/Time.utils";
import RoutesValues from "../../Routes/Routes.values";

enum Languages {
  en = "EN",
  de = "DE",
  ru = "RU",
}

const useMenu = () => {
  const { month } = useSelector((state: RootState) => state.waterTracker);
  const { currentUser } = useAuth();

  // Set state for language buttons
  const [language, setLanguage] = React.useState(
    // get language upper case signature from i18next
    i18next.language.split("-")[0].toLocaleUpperCase()
  );

  // get translations
  const { t } = useTranslation();
  const translations = {
    close: t("menu.close"),
    tracker: t("menu.tracker"),
    archive: t("menu.archive"),
    logout: t("menu.logout"),
  };

  // Get dispatch for managing states
  const dispatch = useDispatch<AppDispatch>();

  // location for displaying the neccessary menu items
  const location = useLocation();

  // logout function for logout button
  const { logout } = useAuth();

  // navigate function for using on nav items
  const navigate = useNavigate();

  // get reference object for menu to detect clicks
  const menuRef = useRef<HTMLDivElement>(null);

  // state for menu open/close
  const [open, setOpen] = React.useState(false);

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  // observe clicks outside the menu
  React.useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // get current pathname
  const { pathname } = location;

  // open menu
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // close menu
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // logout user and navigate to sign in page
  const handleLogout = async () => {
    await logout();
    navigate(RoutesValues.signIn);
  };

  // navigate to archive page
  const navigateToArchive = async () => {
    // set time traverse values
    const now = new Date();
    const yearIndex = now.getFullYear();
    const monthIndex = now.getMonth();

    // get month data if it's neccessary
    const today = new Date(yearIndex, monthIndex, 1);
    const match = getDayFromMonth(month, today)?.date;
    if (!match && currentUser) {
      // get user token and headers
      const token = await currentUser.getIdToken();
      const headers = getHeaders(token);

      // dispatch get month action
      await dispatch(
        getMonthData({
          year: yearIndex,
          month: monthIndex,
          headers,
        })
      );
    }

    // navigate to archive
    navigate(`${RoutesValues.archive}/${formatDateToString(now, "MM-YYYY")}`);
  };

  // navigate to tracker
  const navigateToTracker = async () => {
    // get month data if it's neccessary
    const today = new Date();
    const match = getDayFromMonth(month, today)?.date;

    // navigate to tracker page
    navigate(RoutesValues.tracker);

    if (!match && currentUser) {
      // get user token and headers
      const token = await currentUser.getIdToken();
      const headers = getHeaders(token);

      // dispatch get month action
      await dispatch(
        getMonthData({
          year: today.getFullYear(),
          month: today.getMonth(),
          headers,
        })
      );
    }
  };

  /**
   * handle language switch on button clicks
   */
  const handleLangChange = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    // get target languge
    const lang = event.currentTarget.innerText;

    // check for language signature and switch to another langauge
    switch (lang) {
      case Languages.de:
        i18next.changeLanguage(`de-DE`);
        setLanguage(Languages.de);
        break;
      case Languages.en:
        i18next.changeLanguage(`en-UK`);
        setLanguage(Languages.en);
        break;
      case Languages.ru:
        i18next.changeLanguage(`ru-RU`);
        setLanguage(Languages.ru);
        break;
    }
  };

  return {
    pathname,
    menuRef,
    open,
    translations,
    Languages,
    language,
    navigateToArchive,
    navigateToTracker,
    handleLogout,
    handleDrawerOpen,
    handleDrawerClose,
    handleLangChange,
  };
};

export { useMenu };
