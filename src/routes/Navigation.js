import React, { Component } from 'react';
class Navigation extends Component{
    render(){
        return(
            <ul class="nav" style = {{backgroundColor : "#292b2c"}}>
  <li class="nav-item">
    <a class="nav-link active text-white" href="/">Get average</a>
  </li>
  <li class="nav-item">
    <a class="nav-link text-white" href="/entries">Get all entries</a>
  </li>
</ul>
        )
    }
}
export default Navigation;