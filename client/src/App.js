import React, {Component} from 'react';
import './App.css';
import {Route, BrowserRouter} from 'react-router-dom'
import Home from './containers/Home/Home'
import Profile from './containers/Profile/Profile'
import Auth from './containers/Auth/Auth'
import AOS from 'aos';
import 'aos/dist/aos.css';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: 'https://localhost:4000/graphql'
})
const client = new ApolloClient({
  cache,
  link
})
class App extends Component{
  componentDidMount(){
    AOS.init({
      duration: 2000
    })
  }
  render(){
    return (
      <ApolloProvider client={client}>
        <div>
          <link href="https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap" rel="stylesheet"></link>
          <BrowserRouter>
            <Route path="/" exact component={Auth}/>
            <Route path="/home/:username" component={Home}/>
            <Route path="/profile/:username" component={Profile}/>
          </BrowserRouter>
        </div>
      </ApolloProvider>
      
    );
  }
}

export default App;
