import React, { Component } from "react";
import ArtForm from "../../components/ArtForm/ArtForm";
import Modal from "../../components/UI/Modal/Modal";

import { AUTH_TOKEN } from "../../utils/constants";

import classes from "./Crm.module.css";

class Crm extends Component {
  state = {
    show: false
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    // let modalContent;
    // if (this.state.modalType === "register") {
    //   modalContent = <Register handleSwitchToLogin={this.switchToLogin} />;
    // } else if (this.state.modalType === "Login") {
    //   modalContent = (
    //     <Login
    //       usersEmail={this.state.usersEmail}
    //       handleHideModal={this.hideModal}
    //     />
    //   );
    // }
    return (
      <div>
        <button onClick={this.showModal}>Upload Artwork</button>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <ArtForm />
        </Modal>
      </div>
    );
  }
}

export default Crm;
