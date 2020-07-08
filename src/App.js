import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/js/dist/dropdown'
import React, { Component} from 'react';
import HomePage from './routes/HomePage'
import Home from './routes/Home'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Getdata from './routes/GetData';
class App extends Component{
  render(){
    return (
      <BrowserRouter>
      <div className = "App">
      <HomePage/>
      <Switch>
      <Route path = '/' component = {Home} exact/>
      <Route path = '/data' component = {Getdata} exact/>
      </Switch>
      </div>
      </BrowserRouter>
    )
}
}

export default App;
