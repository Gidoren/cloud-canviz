import React, { Component } from "react";
import { connect } from "react-redux";
import DisplayArt from "../../components/DisplayArt/DisplayArt";
import SideDrawer from "../../components/UI/SideDrawer/SideDrawer";
import Navbar from "../../components/Navbar/Navbar";
import classes from "./Home.module.css";

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className={classes.home}>
          <SideDrawer />
          <DisplayArt />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
