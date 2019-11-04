import React, { Component } from "react";
import { connect } from "react-redux";
import DisplayArt from "../../components/DisplayArt/DisplayArt";
import SideDrawer from "../../components/UI/SideDrawer/SideDrawer";
import Navbar from "../../components/Navbar/Navbar";
import Modal from "../../components/UI/Modal/Modal";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";

import { AUTH_TOKEN } from "../../utils/constants";

import classes from "./Home.module.css";

class Home extends Component {
  state = {
    showReg: false,
    modalType: "",
    showLogin: false,
    usersEmail: ""
  };

  showRegModal = () => {
    // const registeredUser = localStorage.getItem(AUTH_TOKEN);
    // const typeModal = registeredUser ? "Login" : "register";
    this.setState({ showReg: true, modalType: "register" });
  };

  hideRegModal = () => {
    this.setState({ showReg: false, modalType: "" });
  };

  showLoginModal = () => {
    this.setState({ showLogin: true, modalType: "Login" });
  };

  hideLoginModal = () => {
    this.setState({ showLogin: false });
  };

  switchToLogin = email => {
    this.setState({ modalType: "Login", usersEmail: email });
  };

  render() {
    let modalContent;
    if (this.state.modalType === "register") {
      modalContent = <Register handleSwitchToLogin={this.switchToLogin} />;
    } else if (this.state.modalType === "Login") {
      modalContent = (
        <Login
          usersEmail={this.state.usersEmail}
          handleHideLoginModal={this.hideLoginModal}
        />
      );
    }

    return (
      <div>
        <Navbar click={this.showRegModal} />

        <Modal show={this.state.showReg} handleClose={this.hideRegModal}>
          {/* TODO check context for current user. If current user show Login modal; If not show Register modal */}
          {modalContent}
        </Modal>

        <div className={classes.home}>
          <SideDrawer />
          <DisplayArt />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
