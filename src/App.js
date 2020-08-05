import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/js/dist/dropdown'
import React, { Component} from 'react';
import {BrowserRouter,Route, Switch} from 'react-router-dom'
//const Getdata = lazy(() => import('./routes/GetData'))
import Getdata from './routes/GetData';
//const Table = lazy(()=> import('./routes/Table'))
import Table from './routes/Table'
//const Navigation = lazy(()=> import('./routes/Navigation'))
import Navigation from './routes/Navigation'
class App extends Component{
  render(){
    return ( 
      <BrowserRouter>
      <div className = "App">
      <Navigation />
      <Switch>
      <Route path = '/' component = {Table} exact/>
      <Route path = '/entries' component = {Getdata} /> 
      </Switch>
      </div>
      </BrowserRouter>
    )
}
}

export default App;
