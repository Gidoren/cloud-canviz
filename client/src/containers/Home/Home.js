import React, { Component } from "react";
import { connect } from "react-redux";
import DisplayArt from "../../components/DisplayArt/DisplayArt";
import SideDrawer from "../../components/UI/SideDrawer/SideDrawer";
import Navbar from "../../components/Navbar/Navbar";
import Modal from "../../components/UI/Modal/Modal";
import Register from "../../components/Register/Register";

import classes from "./Home.module.css";

class Home extends Component {
  state = {
    showReg: false
  };

  showRegModal = () => {
    this.setState({ showReg: true });
  };

  hideRegModal = () => {
    this.setState({ showReg: false });
  };

  render() {
    return (
      <div>
        <Navbar click={this.showRegModal} />
        <Modal show={this.state.showReg} handleClose={this.hideRegModal}>
          {/* TODO check context for current user. If current user show sign in; If not show Register */}
          <Register />
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
