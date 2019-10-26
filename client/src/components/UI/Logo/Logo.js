import React from "react";
import classes from "./Logo.module.css";

const Logo = props => {
  return <div className={classes.logo}>{props.text}</div>;
};

export default Logo;
