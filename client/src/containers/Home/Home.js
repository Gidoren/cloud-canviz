import React, { Component } from "react";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import DisplayArt from "../../components/DisplayArt/DisplayArt";
import SideDrawer from "../../components/UI/SideDrawer/SideDrawer";
import Navbar from "../../components/Navbar/Navbar";
import Modal from "../../components/UI/Modal/Modal";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import { currentUser } from "../../grqphql/queries";

import { AUTH_TOKEN } from "../../utils/constants";

import classes from "./Home.module.css";

class Home extends Component {
  state = {
    show: false,
    modalType: "",
    usersEmail: ""
  };

  showModal = () => {
    // const registeredUser = localStorage.getItem(AUTH_TOKEN);
    // const typeModal = registeredUser ? "Login" : "register";
    this.setState({ show: true, modalType: "Login" });
  };

  hideModal = () => {
    this.setState({ show: false, modalType: "" });
  };

  switchToRegister = () => {
    this.setState({ modalType: "register" });
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
          handleHideModal={this.hideModal}
          handleSwitchToRegister={this.switchToRegister}
        />
      );
    }

    return (
      <div>
        <Query query={currentUser}>
          {({ loading, error, data, refetch }) => {
            if (loading) return "loading ..";
            if (error) console.log("query error get user art :", error);
            console.log("Data from currentUser: ", data);

            return (
              <div>
                <Navbar
                  click={this.showModal}
                  link2={data ? "/profile/" + data.currentUser._id : "/"}
                  link1={data ? "/home/" + data.currentUser._id : "/"}
                  link3={data ? "/crm/" + data.currentUser._id : "/"}
                  active="Home"
                  item1="Home"
                  item2="Profile"
                  item3="CRM"

                  // user={...data.currentUser}
                />

                <Modal show={this.state.show} handleClose={this.hideModal}>
                  {/* TODO check context for current user. If current user show Login modal; If not show Register modal */}
                  {modalContent}
                </Modal>
                <div className={classes.home}>
                  <SideDrawer />
                  <DisplayArt type="Home" />
                </div>
              </div>
            );
          }}
        </Query>
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
