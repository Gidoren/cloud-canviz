import React, {Component} from 'react';
import './App.css';
import {Route, BrowserRouter} from 'react-router-dom'
import Home from './containers/Home/Home'
import Profile from './containers/Profile/Profile'
import Auth from './containers/Auth/Auth'

class App extends Component{
  render(){
    return (
      <div>
        <BrowserRouter>
          <Route path="/" exact component={Auth}/>
          <Route path="/home/:username" component={Home}/>
          <Route path="/profile/:username" component={Profile}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
