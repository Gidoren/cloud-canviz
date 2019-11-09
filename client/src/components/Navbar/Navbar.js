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

  clearLocalStorage = () => {
    console.log("Clearing local storage");
    localStorage.clear();
    const token = localStorage.getItem(AUTH_TOKEN);
    console.log("After clear token: ", token);
  };

  isLoggedIn = () => {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    // return authToken ? true
  };

  render = () => {
    const cName =
      this.state.menu == "toggled"
        ? `${classes.topMenu} ${classes.toggled}`
        : `${classes.topMenu}`;

    return (
      <div className={classes.header}>
        <div className={cName}>
          <Logo width="11em" />
          <div className={classes.left}></div>
          <div className={classes.right}>
            <Item text="Profile">
              <Link to={{ pathname: this.props.profileLink }}>Profile</Link>
            </Item>
            <Item text="Login" click={this.props.click}>
              Login
            </Item>
            <Item text="Logout" click={this.clearLocalStorage}>
              Logout
            </Item>
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
