import React, { Component } from "react";
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./containers/Home/Home";
import Profile from "./containers/Profile/Profile";
import Contacts from "./containers/Contacts/Contacts";
import Crm from "./containers/Crm/Crm";
import AOS from "aos";
import "aos/dist/aos.css";

class App extends Component {
  componentDidMount() {
    AOS.init({
      offset: 300,
      duration: 2000
    });
  }
  render() {
    return (
      <div>
        <link
          href="https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
          rel="stylesheet"
        ></link>
        <BrowserRouter>
          <Route path="/" exact component={Home} />
          <Route path="/crm" component={Crm} />
          <Route path="/home/:username" component={Home} />
          <Route path="/profile/:username" component={Profile} />
          <Route path="/contacts/:username" component={Contacts} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
