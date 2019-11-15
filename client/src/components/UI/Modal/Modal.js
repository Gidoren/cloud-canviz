import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import classes from "./Modal.module.css";

const Modal = ({ handleClose, show, children, showCloseButton }) => {
  const showHideClassName = show
    ? `${classes.displayBlock}`
    : `${classes.displayNone}`;

  return (
    <div className={`${classes.modal} ${showHideClassName}`}>
      <section className={classes.modalMain}>
        {showCloseButton && (
          <Grid container item xs={12} justify="flex-end">
            <Grid item>
              <Button size="large" onClick={handleClose} color="secondary">
                Cancel
              </Button>
            </Grid>
          </Grid>
        )}
        {children}
      </section>
    </div>
  );
};

export default Modal;
