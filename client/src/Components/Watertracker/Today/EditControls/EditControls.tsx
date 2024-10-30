import React from "react";
import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { useEditControls } from "./EditControls.hook";
import BluredOverlay from "../../../Overlays/BluredOverlay/BluredOverlay";
import { buttonStyles } from "../../../../Constants";
import classes from "./EditControls.module.css";

interface EditControlsProps {
  closeEdit: () => void;
}

const EditControls: React.FC<EditControlsProps> = ({ closeEdit }) => {
  const editControls = useEditControls(closeEdit);
  return (
    <BluredOverlay>
      <div className={classes["modal-wrapper"]}>
        <Grid item xs={12}>
          <h3 className={classes["title"]}>
            {editControls.translations.title}
          </h3>
        </Grid>

        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <TextField
              error={editControls.validate && !editControls.isAmountValid}
              label={editControls.translations.drinkAmount.description}
              variant="outlined"
              helperText={editControls.translations.drinkAmount.hint}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {editControls.translations.ml}
                  </InputAdornment>
                ),
              }}
              value={editControls.amount}
              fullWidth
              margin="dense"
              autoComplete="off"
              autoCorrect="off"
              onChange={editControls.handleChangeAmount}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              error={!editControls.isGoalValid}
              label={editControls.translations.todaysGoal.description}
              variant="outlined"
              helperText={editControls.translations.todaysGoal.hint}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {editControls.translations.ml}
                  </InputAdornment>
                ),
              }}
              autoComplete="off"
              autoCorrect="off"
              value={editControls.goal ? editControls.goal : ""}
              fullWidth
              margin="dense"
              onChange={editControls.handleChangeGoal}
            />
          </Grid>
        </Grid>

        <TextField
          error={!editControls.isTypeValid}
          helperText={editControls.translations.liquidType.hint}
          value={editControls.type ? editControls.type : ""}
          onChange={editControls.handleChangeType}
          label={editControls.translations.liquidType.description}
          variant="outlined"
          fullWidth
          autoComplete="off"
          autoCorrect="off"
          margin="dense"
        />

        <div className={`${classes["control-buttons-container"]} mt-4`}>
          <Button
            onClick={editControls.handleSubmit}
            style={buttonStyles}
            variant="outlined"
          >
            {editControls.translations.buttons.ok}
          </Button>
          <Button
            onClick={editControls.handleCancelEdit}
            style={buttonStyles}
            variant="outlined"
          >
            {editControls.translations.buttons.cancel}
          </Button>
        </div>
      </div>
    </BluredOverlay>
  );
};

export default EditControls;
