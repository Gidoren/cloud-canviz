import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createStore } from "redux";
import { Provider } from "react-redux";

import Reducer from "./store/reducer";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { HttpLink } from "apollo-link-http";

import { AUTH_TOKEN } from "./utils/constants";

// changed the way ApolloClient is imported to new version
// here are links to references
// https://www.apollographql.com/docs/react/get-started/
// https://github.com/apollographql/apollo-client/issues/3639#issuecomment-401602915

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  request: operation => {
    // gets the auth token from local storage if a user is signed in
    const token = localStorage.getItem(AUTH_TOKEN);
    console.log("current auth token: ", token);
    // set the header of every request with the users auth token in headerd
    operation.setContext({
      headers: {
        authorization: token ? `${token}` : ""
      }
    });
  }
});

const store = createStore(Reducer);
ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
