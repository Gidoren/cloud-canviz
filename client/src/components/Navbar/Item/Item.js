import React, { Component } from "react";
import classes from "./Item.module.css";

class Item extends Component {
  state = {
    text: this.props.text,
    activeClass: this.props.active
  }
  handleClick = () => {
    this.setState({text: this.props.text,
                   click: this.props.click})
  }
  render() {
    return (
      <p className={this.props.text === this.props.active ? classes.active : classes.topMenuItem} onClick={this.props.click}>
        {this.props.children}
      </p>
    );
  }
}

export default Item;
