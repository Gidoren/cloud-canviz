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

// class Modal extends Component {
//   onClose = e => {
//     this.props.onClose && this.props.onClose(e);
//   };
//   render() {
//     if (!this.props.show) {
//       return null;
//     }
//     return (
//       <div className={classes.modal}>
//         <div className={classes.content}>{this.props.children}</div>

//         <div className={classes.actions}>
//           <button class={classes.toggleButton} onClick={this.onClose}>
//             Close
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// export default Modal;
