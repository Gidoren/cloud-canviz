import React, { Component } from "react";
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
// import { gql } from "apollo-boost";
import Home from "./containers/Home/Home";
import Profile from "./containers/Profile/Profile";
import Contacts from "./containers/Contacts/Contacts";
import Crm from "./containers/Crm/Crm";
import AOS from "aos";
import "aos/dist/aos.css";

class App extends Component {
  state = {};

  componentDidMount() {
    AOS.init({
      duration: 2000
    });

    // const { data } = await this.props.client.query({
    //   query: gql`
    //     {
    //       isLoggedIn @client
    //     }
    //   `
    // });

    // console.log(" is logged In: ", data);
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
          {/* <Route path="/" exact component={Home} /> */}
          {/* Below Route for home is the same as above but passes the apollo client down as prop
            which allows for queries to apollo client to manage local state */}
          <Route
            exact
            path="/"
            render={props => <Home {...props} client={this.props.client} />}
          />
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
