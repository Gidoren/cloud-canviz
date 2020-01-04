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

import Splash from "./components/Splash/Splash";

import { theme } from "./muiTheme/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";

class App extends Component {
  state = {
    currentUser: null
  };

  currentUserHandler = currentUser => {
    this.setState({ currentUser: currentUser });
  };
  componentDidMount() {
    AOS.init({
      duration: 2000
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            {/* <Route path="/" exact component={Home} /> */}
            {/* Below Route for home is the same as above but passes the apollo client down as prop
            which allows for queries to apollo client to manage local state */}
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  client={this.props.client}
                  currentUser={this.state.currentUser}
                  currentUserHandler={currentUser =>
                    this.currentUserHandler(currentUser)
                  }
                />
              )}
            />
            <Route
              exact
              path="/crm/:username"
              render={props => <Crm {...props} client={this.props.client} />}
            />
            <Route
              path="/profile/:username"
              component={Profile}
              client={this.props.client}
              currentUser={this.state.currentUser}
            />
            <Route
              exact
              path="/crm/contacts/:username"
              render={props => (
                <Contacts {...props} client={this.props.client} />
              )}
            />
            <Route
              exact
              path="/splash"
              render={props => <Splash {...props} client={this.props.client} />}
            />
          </MuiThemeProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
