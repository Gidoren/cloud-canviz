import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import ApolloClient from "apollo-boost";
import { ApolloProvider, ApolloConsumer } from "react-apollo";
import { defaults } from "./grqphql/store/defaults";

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
  },
  // intializes the clientState store for
  clientState: {
    resolvers: {},
    typeDefs: `
      type Query {
        isLoggedIn: Boolean
      }
      type Query {
        showLogin: String
      }
    `
  }
});

// TODO HANDLE GRAPHQL ERROR FOR USERS AUTH TOKEN EXPIRED

// check if there is auth token in local storage
let isAuthToken = false;
// if auth token then user is logged in.
if (localStorage.getItem(AUTH_TOKEN)) {
  isAuthToken = true;
}

// Sets the default values for local state schema
// ...defaults imported from file (see above)
client.writeData({ data: { ...defaults, isLoggedIn: isAuthToken } });

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloConsumer>
      {apolloClient => {
        return <App client={apolloClient} />;
      }}
    </ApolloConsumer>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
