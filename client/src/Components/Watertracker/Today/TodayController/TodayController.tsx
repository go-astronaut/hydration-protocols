import { useAmountController } from "./TodayController.hook";
import classes from "./TodayController.module.css";
import ProgressBarRound from "../ProgressBarRound/ProgressBarRound";

interface AmountControllerProps {
  openControlEdit: () => void;
}

/**
 * Component for manipulating todays amount
 */
const TodayController: React.FC<AmountControllerProps> = ({
  openControlEdit,
}) => {
  const amountController = useAmountController();

  /**
   * handle opening the edit dialog
   */
  const openModal = () => {
    openControlEdit();
  };

  const leftSide = amountController.showButton && (
    <div className={classes["left"]}>
      <button
        onClick={openModal}
        className={`${classes["edit-button"]} ${classes["button"]}`}
      >
        <svg
          className={`${classes["edit-icon"]}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" />
        </svg>
      </button>

      {amountController.showResetButton && (
        <button
          onClick={amountController.resetLastDrinkAction}
          className={`${classes["backwards-button"]} ${classes["button"]}`}
        >
          <svg
            className={`${classes["backwards-icon"]}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M48.5 224L40 224c-13.3 0-24-10.7-24-24L16 72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8L48.5 224z" />
          </svg>
        </button>
      )}
    </div>
  );

  const rightSide = amountController.today && (
    <div className={classes["right"]}>
      <button
        onClick={amountController.drinkAmount}
        className={`${classes["drink-button"]} ${classes["button"]}`}
      >
        <svg
          className={`${classes["drink-icon"]}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path d="M32 0C23.1 0 14.6 3.7 8.6 10.2S-.6 25.4 .1 34.3L28.9 437.7c3 41.9 37.8 74.3 79.8 74.3l166.6 0c42 0 76.8-32.4 79.8-74.3L383.9 34.3c.6-8.9-2.4-17.6-8.5-24.1S360.9 0 352 0L32 0zM73 156.5L66.4 64l251.3 0L311 156.5l-24.2 12.1c-19.4 9.7-42.2 9.7-61.6 0c-20.9-10.4-45.5-10.4-66.4 0c-19.4 9.7-42.2 9.7-61.6 0L73 156.5z" />
        </svg>
      </button>

      {amountController.showFinishButton && (
        <button
          onClick={amountController.finishToday}
          className={`${classes["finish-button"]} ${classes["button"]}`}
        >
          <svg
            className={`${classes["finish-icon"]}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
          </svg>
        </button>
      )}
    </div>
  );

  return (
    <div className={classes["watertracker_day-controls-item"]}>
      <ProgressBarRound
        day={amountController.today}
        month={amountController.month}
      />
      {rightSide}
      {leftSide}
    </div>
  );
};

export default TodayController;
