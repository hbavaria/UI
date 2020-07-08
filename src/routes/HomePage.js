import React, { Component} from 'react';
//import {NavLink} from 'react-router-dom'

class HomePage extends Component {
    constructor(props){
    super(props);
    this.state = {
        results: [],
    }
}
async componentDidMount(){
    //this.setState({ isLoading: true})
    let response = await fetch("http://10.223.31.195:4000/sendRunGroup/rungroup")
    const data = await response.json()
    for(let index = 0; index < data.length; index ++){
        console.log(data)
    }
    this.setState({results: data})
}
getSelectValue(){
        let select = document.getElementsByClassName("dropdown-item").value
        console.log(select)
}

    render() {
        const {results} = this.state
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="http://localhost:3000">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="http://localhost:3000/data">Show all entries</a>
                        </li>
                        <li class="nav-item dropdown"> 
                            <a class="nav-link dropdown-toggle" href="# " id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Run group</a>
                            <div class="dropdown-menu" aria-labelledby = "navbarDropdownMenuLink">
                                {      results.map((result) =>
                                        <a class="dropdown-item" href="# ">{result}</a>

                                 )}
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
export default HomePage;