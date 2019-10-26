import React, { Component } from "react";
import classes from "./Item.module.css";

class Item extends Component {
  constructor(props) {
    super(props);
    this.text = props.text;
  }

  render() {
    return <div className={classes.topMenuItem}>{this.text}</div>;
  }
}

export default Item;
