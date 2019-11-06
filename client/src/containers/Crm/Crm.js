import React, { Component } from "react";
import ArtForm from "../../components/ArtForm/ArtForm";

import { AUTH_TOKEN } from "../../utils/constants";

import classes from "./Crm.module.css";

class Crm extends Component {
  //   state = {

  //   };

  render() {
    return (
      <div>
        <ArtForm />
      </div>
    );
  }
}

export default Crm;
