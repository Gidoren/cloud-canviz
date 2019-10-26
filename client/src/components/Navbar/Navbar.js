import React, { Component } from "react";
import Logo from "../UI/Logo/Logo";
import Item from "./Item/Item";
import classes from "./Navbar.module.css";
import UseAnimations from "react-useanimations";

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

  render = () => {
    const cName =
      this.state.menu == "toggled"
        ? `${classes.topMenu} ${classes.toggled}`
        : `${classes.topMenu}`;
    return (
      <div>
        <div className={cName}>
          <Logo text="Logo" />
          <div className={classes.left}>
            {/* <Item text="Left1" />
            <Item text="Left2" /> */}
          </div>
          <div className={classes.right}>
            <Item text="Profile" />
            <Item text="Login" />
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
