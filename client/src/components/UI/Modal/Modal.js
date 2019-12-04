import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import classes from "./Modal.module.css";

const Modal = ({ handleClose, show, children, showCloseButton, width }) => {
  const showHideClassName = show
    ? `${classes.displayBlock}`
    : `${classes.displayNone}`;

  return (
    <div className={`${classes.modal} ${showHideClassName}`}>
      <section className={classes.modalMain} style={{ width: width }}>
        {showCloseButton && (
          <Grid container item xs={12} justify="flex-end">
            <Grid item>
              <div style={{ padding: "10px" }}>
                <Button size="small" onClick={handleClose} color="secondary">
                  Cancel
                </Button>
              </div>
            </Grid>
          </Grid>
        )}
        {children}
      </section>
    </div>
  );
};

export default Modal;
