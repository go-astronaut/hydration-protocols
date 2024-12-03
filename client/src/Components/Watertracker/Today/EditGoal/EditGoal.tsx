import React from "react";
import { useEditGoal } from "./EditGoal.hook";
import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import BluredOverlay from "../../../Overlays/BluredOverlay/BluredOverlay";
import { buttonStyles } from "../../../../Constants";
import classes from "./EditGoal.module.css";

interface EditGoalProps {
  closeEdit: () => void;
}

const EditGoal: React.FC<EditGoalProps> = ({ closeEdit }) => {
  const editGoal = useEditGoal(closeEdit);
  return (
    <BluredOverlay>
      <div className={classes["modal-wrapper"]}>
        <Grid item xs={12}>
          <h3 className={classes["title"]}>{editGoal.translations.title}</h3>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              error={editGoal.validate && !editGoal.isAmountValid}
              label={editGoal.translations.minGoal.description}
              variant="outlined"
              helperText={editGoal.translations.minGoal.hint}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {editGoal.translations.ml}
                  </InputAdornment>
                ),
              }}
              value={editGoal.todaysGoal ? editGoal.todaysGoal : ""}
              fullWidth
              margin="dense"
              autoComplete="off"
              autoCorrect="off"
              onChange={editGoal.handleChangeAmount}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              error={!editGoal.isGoalValid}
              label={editGoal.translations.todaysGoal.description}
              variant="outlined"
              helperText={editGoal.translations.todaysGoal.hint}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {editGoal.translations.ml}
                  </InputAdornment>
                ),
              }}
              autoComplete="off"
              autoCorrect="off"
              value={editGoal.minGoal ? editGoal.minGoal : ""}
              fullWidth
              margin="dense"
              onChange={editGoal.handleChangeGoal}
            />
          </Grid>
        </Grid>

        <div className={`${classes["control-buttons-container"]} mt-4`}>
          <Button
            onClick={editGoal.handleSubmit}
            style={buttonStyles}
            variant="outlined"
          >
            {editGoal.translations.buttons.ok}
          </Button>
          <Button
            onClick={editGoal.handleCancelEdit}
            style={buttonStyles}
            variant="outlined"
          >
            {editGoal.translations.buttons.cancel}
          </Button>
        </div>
      </div>
    </BluredOverlay>
  );
};

export default EditGoal;
