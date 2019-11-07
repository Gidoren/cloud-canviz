import React, { Component } from "react";
import classes from "./Modal.module.css";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show
    ? `${classes.displayBlock}`
    : `${classes.displayNone}`;

  return (
    <div className={`${classes.modal} ${showHideClassName}`}>
      <section className={classes.modalMain}>
        <button className={classes.closeButton} onClick={handleClose}>
          Close
        </button>
        {children}
      </section>
    </div>
  );
};

export default Modal;
