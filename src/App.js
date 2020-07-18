import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/js/dist/dropdown'
import React, { Component} from 'react';
import {BrowserRouter,Switch} from 'react-router-dom'
import Getdata from './routes/GetData';
class App extends Component{
  render(){
    return (
      <BrowserRouter>
      <div className = "App">
      <Getdata/>
      <Switch>
      </Switch>
      </div>
      </BrowserRouter>
    )
}
}

export default App;
