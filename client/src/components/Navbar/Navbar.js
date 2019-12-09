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

  handleLogout = () => {
    console.log("Clearing local storage");
    localStorage.clear();
    const token = localStorage.getItem(AUTH_TOKEN);
    console.log("After clear token: ", token);
    this.forceUpdate()
    this.props.handleIsLoggedin(false);
  };

  render = () => {
    const cName =
      this.state.menu === "toggled"
        ? `${classes.topMenu} ${classes.toggled}`
        : `${classes.topMenu}`;

    const authToken = localStorage.getItem(AUTH_TOKEN);
    console.log(authToken)

    return (
      <div className={classes.header}>
        <div className={cName}>
          <Link to={{ pathname: "/" }}>
            <Logo className={classes.logo}  width="9em" />
          </Link>
          <div className={classes.left}></div>
          <div className={classes.right}>
            {this.props.page === "Crm" && <Item text={this.props.item4} active={this.props.active}>
              <Link to={{ pathname: this.props.link4 }} className={classes.link}>{this.props.item4}</Link>
            </Item>}
            {this.props.page !== "Crm" && <Item text={this.props.item1} active={this.props.active}>
              <Link to={{ pathname: this.props.link1 }} className={classes.link}>{this.props.item1}</Link>
            </Item>}
            {authToken && this.props.isLoggedIn && (
              <Item text={this.props.item2} active={this.props.active}>
                <Link to={{ pathname: this.props.link2 }} className={classes.link}>{this.props.item2}</Link>
              </Item>
            )}
            {console.log(this.props.link3)} 
            {authToken && this.props.isLoggedIn && this.props.isArtist && (
              <Item text={this.props.item3} active={this.props.active}>
                <Link to={{ pathname: this.props.link3 }} className={classes.link}>{this.props.item3}</Link>
              </Item>
            )}
            {!authToken && this.props.page === "Home" && (
              <Item text="Login" click={this.props.click}>
                Login
              </Item>
            )}
            {authToken && this.props.isLoggedIn && this.props.page === "Home" && (
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
