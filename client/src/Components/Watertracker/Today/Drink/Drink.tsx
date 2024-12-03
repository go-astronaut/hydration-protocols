import React from "react";
import { useDrink } from "./Drink.hook";
import { Button, InputAdornment, TextField } from "@mui/material";
import BluredOverlay from "../../../Overlays/BluredOverlay/BluredOverlay";
import { buttonStyles } from "../../../../Constants";
import classes from "./Drink.module.css";

interface DrinkProps {
  closeEdit: () => void;
  closeDrink: () => void;
}

/**
 * Drink modal component
 */
const Drink: React.FC<DrinkProps> = ({ closeEdit, closeDrink }) => {
  const drink = useDrink(closeEdit, closeDrink);

  return (
    <BluredOverlay>
      <div className={classes["modal-wrapper"]}>
        <h3 className={classes["title"]}>{drink.translations.title}</h3>

        <TextField
          error={drink.validate && !drink.isAmountValid}
          label={drink.translations.drinkAmount.description}
          variant="outlined"
          helperText={drink.translations.drinkAmount.hint}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {drink.translations.ml}
              </InputAdornment>
            ),
          }}
          value={drink.amount}
          fullWidth
          margin="dense"
          autoComplete="off"
          autoCorrect="off"
          onChange={drink.handleChangeAmount}
        />

        <TextField
          error={!drink.isTypeValid}
          helperText={drink.translations.liquidType.hint}
          value={drink.type ? drink.type : ""}
          onChange={drink.handleChangeType}
          label={drink.translations.liquidType.description}
          variant="outlined"
          fullWidth
          autoComplete="off"
          autoCorrect="off"
          margin="dense"
        />

        <div className={`${classes["control-buttons-container"]} mt-4`}>
          <Button
            onClick={drink.handleSubmit}
            style={buttonStyles}
            variant="outlined"
          >
            {drink.translations.buttons.add}
          </Button>

          <Button
            onClick={drink.handleCancelDrink}
            style={buttonStyles}
            variant="outlined"
          >
            {drink.translations.buttons.close}
          </Button>
        </div>
      </div>
    </BluredOverlay>
  );
};

export { Drink };
