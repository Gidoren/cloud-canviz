import React, { Component } from "react";
import Logo from "../UI/Logo/Logo";
import Item from "./Item/Item";
import classes from "./Navbar.module.css";
import UseAnimations from "react-useanimations";
import { Link } from "react-router-dom";

import { AUTH_TOKEN } from "../../utils/constants";

class Navbar extends Component {
  state = {
    menu: ""
  };

  setToggleTopMenuClass = () => {
    if (this.state.menu === "") {
      this.setState({
        menu: "toggled"
      });
    } else {
      this.setState({
        menu: ""
      });
    }
  };

  handleLogout = () => {
    console.log("Clearing local storage");
    localStorage.clear();
    const token = localStorage.getItem(AUTH_TOKEN);
    console.log("After clear token: ", token);
    this.props.handleIsLoggedin(false);
  };

  render = () => {
    const cName =
      this.state.menu === "toggled"
        ? `${classes.topMenu} ${classes.toggled}`
        : `${classes.topMenu}`;

    const authToken = localStorage.getItem(AUTH_TOKEN);

    return (
      <div className={classes.header}>
        <div className={cName}>
          <Link to={{ pathname: "/" }}>
            <Logo width="9em" />
          </Link>
          <div className={classes.left}></div>
          <div className={classes.right}>
            {authToken && this.props.isLoggedIn && (
              <Item text="Profile">
                <Link to={{ pathname: this.props.profileLink }}>Profile</Link>
              </Item>
            )}
            {authToken && this.props.isLoggedIn && (
              <Item text="CRM">
                <Link to={{ pathname: "/crm" }}>CRM</Link>
              </Item>
            )}
            {!authToken && (
              <Item text="Login" click={this.props.click}>
                Login
              </Item>
            )}
            {authToken && this.props.isLoggedIn && (
              <Item text="Logout" click={this.handleLogout}>
                Logout
              </Item>
            )}
          </div>
          <div
            className={classes.topMenuIcon}
            onClick={this.setToggleTopMenuClass}
          >
            <UseAnimations
              animationKey="menu2"
              size={35}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className={classes.clearFix} />
        </div>
      </div>
    );
  };
}

export default Navbar;
