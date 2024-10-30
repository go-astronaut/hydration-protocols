import { useTranslation } from "react-i18next";
import BluredOverlay from "../../../Overlays/BluredOverlay/BluredOverlay";
import { Button, Grid } from "@mui/material";
import TimeTraverse from "./TimeTraverse/TimeTraverse";
import { buttonStyles } from "../../../../Constants";
import classes from "../index.module.css";

interface TimeTraverseModalProps {
  loadSetTime: () => void;
  closeModal: () => void;
  timeTraverseProps: {
    setNextMonth: () => void;
    setPreviousMonth: () => void;
    setNextYear: () => void;
    setPreviousYear: () => void;
    year: number;
    month: number;
  };
}

/**
 * TimeTraverseModal component for time navigation
 */
const TimeTraverseModal: React.FC<TimeTraverseModalProps> = ({
  loadSetTime,
  closeModal,
  timeTraverseProps,
}) => {
  //get translations
  const { t } = useTranslation();
  const translations = {
    title: t("timeNavigation.title"),
    ok: t("timeNavigation.ok"),
    cancel: t("timeNavigation.cancel"),
  };

  return (
    <BluredOverlay>
      <div className={classes["modal-wrapper"]}>
        <Grid item xs={12}>
          <h3 className={classes["title"]}>{translations.title}</h3>
        </Grid>
        <TimeTraverse {...timeTraverseProps} />
        <div className={classes["control-buttons-container"]}>
          <Button onClick={loadSetTime} style={buttonStyles} variant="outlined">
            {translations.ok}
          </Button>
          <Button onClick={closeModal} style={buttonStyles} variant="outlined">
            {translations.cancel}
          </Button>
        </div>
      </div>
    </BluredOverlay>
  );
};
export { TimeTraverseModal };
