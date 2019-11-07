import React, { Component } from "react";
import classes from "./Item.module.css";

class Item extends Component {
  constructor(props) {
    super(props);
    this.text = props.text;
    this.click = props.click;
  }

  render() {
    return (
      <div className={classes.topMenuItem} onClick={this.click}>
        {this.props.children}
      </div>
    );
  }
}

export default Item;
