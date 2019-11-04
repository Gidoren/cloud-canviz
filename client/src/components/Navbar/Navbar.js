import React, { Component } from "react";
import Logo from "../UI/Logo/Logo";
import Item from "./Item/Item";
import classes from "./Navbar.module.css";
import UseAnimations from "react-useanimations";

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

  render = () => {
    const cName =
      this.state.menu == "toggled"
        ? `${classes.topMenu} ${classes.toggled}`
        : `${classes.topMenu}`;
    return (
      <div className={classes.header}>
        <div className={cName}>
          <Logo />
          <div className={classes.left}></div>
          <div className={classes.right}>
            <Item text="Profile" />
            <Item text="Login" click={this.props.click} />
            <Item text="Logout" click={this.clearLocalStorage} />
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
