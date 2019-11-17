import React, { Component } from "react";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import UseAnimations from "react-useanimations";
import DisplayArt from "../../components/DisplayArt/DisplayArt";
import SideDrawer from "../../components/UI/SideDrawer/SideDrawer";
import Navbar from "../../components/Navbar/Navbar";
import Modal from "../../components/UI/Modal/Modal";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import { currentUser } from "../../grqphql/queries";
import { gql } from "apollo-boost";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Home.module.css";

class Home extends Component {
  state = {
    show: false,
    modalType: "",
    usersEmail: "",
    isLoggedIn: false,
    menu: "disabled"
  };

  setToggleMenuClass = () => {
    /*If menu is disabled, enable*/
    if (this.state.menu === "disabled") {
      this.setState({
        menu: "enabled"
      });
    } else {
      /*else, enable*/
      this.setState({
        menu: "disabled"
      });
    }
  }

  async componentDidMount() {
    const { data } = await this.props.client.query({
      query: gql`
        {
          isLoggedIn @client
        }
      `
    });

    this.setState({ isLoggedIn: data.isLoggedIn });
    console.log("isLoggedIn data: ", data);
    console.log("isLoggedIn state: ", this.state.isLoggedIn);
  }

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

  handleIsLoggedin = value => {
    this.setState({ isLoggedIn: value });
  };

  render = () => {
    /*Determine if sidebar is toggled or not*/
    const cName =
      this.state.menu === "enabled"
        ? `${classes.sideBar} ${classes.toggled}`
        : `${classes.sideBar}`;

    let modalContent;
    if (this.state.modalType === "register") {
      modalContent = <Register handleSwitchToLogin={this.switchToLogin} />;
    } else if (this.state.modalType === "Login") {
      modalContent = (
        <Login
          usersEmail={this.state.usersEmail}
          handleHideModal={this.hideModal}
          handleSwitchToRegister={this.switchToRegister}
          client={this.props.client}
          handleIsLoggedin={this.handleIsLoggedin}
        />
      );
    }

    return (
      <div>
        <Query query={currentUser}>
          {({ loading, error, data, refetch }) => {
            if (loading) return <Spinner />;
            if (error) {
              console.log("query error get user art :", error);
            }
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
                  isLoggedIn={this.state.isLoggedIn}
                  handleIsLoggedin={this.handleIsLoggedin}
                />

                <Modal
                  show={this.state.show}
                  handleClose={this.hideModal}
                  showCloseButton={true}
                >
                  {/* TODO check context for current user. If current user show Login modal; If not show Register modal */}
                  {/* {modalContent} */}
                  {this.state.modalType === "Login" ? (
                    <Login
                      usersEmail={this.state.usersEmail}
                      handleHideModal={this.hideModal}
                      handleSwitchToRegister={this.switchToRegister}
                      client={this.props.client}
                      handleIsLoggedin={this.handleIsLoggedin}
                      handleRefetchUser={refetch}
                    />
                  ) : (
                    <Register handleSwitchToLogin={this.switchToLogin} />
                  )}
                </Modal>
                <div className={classes.home}>
                  <div className={classes.con}>
                    <div className={classes.bar}>
                      <div
                      className={classes.sideBarIcon}
                      onClick={this.setToggleMenuClass}
                      >
                        <UseAnimations
                          animationKey="menu2"
                          size={35}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cName}>
                    <SideDrawer />
                  </div>
                  <DisplayArt type="Home" />
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  };
}
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
