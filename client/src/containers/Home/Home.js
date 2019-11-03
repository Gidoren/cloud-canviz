import React, { Component } from "react";
import { connect } from "react-redux";
import DisplayArt from "../../components/DisplayArt/DisplayArt";
import SideDrawer from "../../components/UI/SideDrawer/SideDrawer";
import Navbar from "../../components/Navbar/Navbar";
import Modal from "../../components/UI/Modal/Modal";
import Signup from "../../components/Signup/Signup";
import Register from "../../components/Register/Register";

import classes from "./Home.module.css";

class Home extends Component {
  state = {
    showReg: false,
    modalType: "",
    showSignup: false
  };

  showRegModal = () => {
    this.setState({ showReg: true, modalType: "register" });
  };

  hideRegModal = () => {
    this.setState({ showReg: false, modalType: "" });
  };

  showSignupModal = () => {
    this.setState({ showSignup: true, modalType: "signup" });
  };

  hideSignupModal = () => {
    this.setState({ showSignup: false });
  };

  switchToSignup = () => {
    this.setState({ modalType: "signup" });
  };

  render() {
    let modalContent;
    if (this.state.modalType === "register") {
      modalContent = <Register handleSwitchToSignup={this.switchToSignup} />;
    } else if (this.state.modalType === "signup") {
      modalContent = <Signup />;
    }

    return (
      <div>
        <Navbar click={this.showRegModal} />
        <Modal show={this.state.showReg} handleClose={this.hideRegModal}>
          {/* TODO check context for current user. If current user show signup modal; If not show Register modal */}
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
