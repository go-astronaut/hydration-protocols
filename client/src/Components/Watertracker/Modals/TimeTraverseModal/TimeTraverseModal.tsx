import { useTranslation } from "react-i18next";
import { useLoadMonthData } from "../../Hooks/LoadMonthData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import BluredOverlay from "../../../Overlays/BluredOverlay/BluredOverlay";
import {
  LocalizationProvider,
  MonthCalendar,
  YearCalendar,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { formatDateToString } from "../../../../Utils/Time.utils";
import RoutesValues from "../../../../Routes/Routes.values";
import { MonthIndex } from "../../../../Types/Global.types";
import classes from "./TimeTraverseModal.module.css";

interface TimeTraverseModalProps {
  closeModal: () => void;
}

/**
 * TimeTraverseModal component for time navigation
 */
const TimeTraverseModal: React.FC<TimeTraverseModalProps> = ({
  closeModal,
}) => {
  const { loadMonth } = useLoadMonthData();

  const [year, setYear] = useState<number | null>(null);

  // Get navigation function
  const navigate = useNavigate();

  //get translations
  const { t } = useTranslation();
  const translations = {
    title: t("timeNavigation.title"),
  };

  // Set translations for month abbreviations
  const customLocale = {
    months: [
      t("timeUnits.months.january"),
      t("timeUnits.months.february"),
      t("timeUnits.months.march"),
      t("timeUnits.months.april"),
      t("timeUnits.months.may"),
      t("timeUnits.months.june"),
      t("timeUnits.months.july"),
      t("timeUnits.months.august"),
      t("timeUnits.months.september"),
      t("timeUnits.months.october"),
      t("timeUnits.months.november"),
      t("timeUnits.months.december"),
    ],
  };

  // Handler for year picks
  const handleYearPick = (e: dayjs.Dayjs) => {
    setYear(e.year());
  };

  // Handler for month picks
  const handleMonthPick = async (e: dayjs.Dayjs) => {
    if (year === null) return;

    // set month index for navigation
    const monthIndex = formatDateToString(new Date(year, e.month()), "MM-YYYY");

    // close modal and navigate to desired time point
    closeModal();
    loadMonth(year, e.month() as MonthIndex);
    navigate(`${RoutesValues.archive}/${monthIndex}`);
  };

  /**
   * Reset year to go back to year selection
   */
  const resetYear = () => {
    setYear(null);
  };

  /**
   * Handle close modal
   */
  const handleClose = () => {
    closeModal();
    setYear(null);
  };

  dayjs.locale("en", customLocale);

  return (
    <BluredOverlay>
      <div className={classes["modal-wrapper"]}>
        {year && (
          <div className={`${classes["arrow-container"]}`} onClick={resetYear}>
            <svg
              className={`${classes["arrow"]}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </div>
        )}
        <div className={`${classes["close-container"]} `} onClick={handleClose}>
          <svg
            className={`${classes["close"]}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </div>
        <h3 className={classes["title"]}>{translations.title}</h3>
        <h5 className={classes["sub-title"]}>{` -- / ${
          year ? year : "----"
        }`}</h5>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {!year && (
            <div className={`${classes["date-picker__container"]}`}>
              <YearCalendar
                maxDate={dayjs("2029-12-31", "YYYY-MM-DD")}
                minDate={dayjs("2018-01-01", "YYYY-MM-DD")}
                onChange={handleYearPick}
              />
            </div>
          )}
          {year && (
            <div className={`${classes["date-picker__container"]}`}>
              <MonthCalendar onChange={handleMonthPick} />
            </div>
          )}
        </LocalizationProvider>
      </div>
    </BluredOverlay>
  );
};
export { TimeTraverseModal };
