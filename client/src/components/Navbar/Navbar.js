import React, { Component } from "react";
import Logo from "../UI/Logo/Logo";
import Item from "./Item/Item";
import classes from "./Navbar.module.css";
import UseAnimations from "react-useanimations";
import { Link } from "react-router-dom";

import { AUTH_TOKEN } from "../../utils/constants";

class Navbar extends Component {
  state = {
    menu: "",
    rerender: ""
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
    this.forceUpdate()

  };

  render = () => {
    const cName =
      this.state.menu == "toggled"
        ? `${classes.topMenu} ${classes.toggled}`
        : `${classes.topMenu}`;

    const authToken = localStorage.getItem(AUTH_TOKEN);
    console.log(authToken)

    return (
      <div className={classes.header}>
        <div className={cName}>
          <Logo className={classes.logo} width="8em" />
          <div className={classes.left}></div>
          <div className={classes.right}>
            <Item text={this.props.item1} active={this.props.active}>
              <Link to={{ pathname: this.props.homeLink }} className={classes.link}>Home</Link>
            </Item>
            {authToken && (
              <Item text={this.props.item2} active={this.props.active}>
                <Link to={{ pathname: this.props.profileLink }} className={classes.link}>Profile</Link>
              </Item>
            )}
            {authToken && (
              <Item text={this.props.item3} active={this.props.active}>
                <Link to={{ pathname: this.props.crmLink }} className={classes.link}>CRM</Link>
              </Item>
            )}
            {!authToken && (
              <Item text="Login" click={this.props.click}>
                Login
              </Item>
            )}
            {authToken && (
              <Item text="Logout" click={this.clearLocalStorage}>
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
