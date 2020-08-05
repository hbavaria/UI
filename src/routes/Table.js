import React, { Component } from 'react';
import {BsArrowDown, BsArrowUp} from "react-icons/bs"
class Table extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            value: '',
            results: [],
            isLoading: false,
            error: null,
            switchSort: false,
            serachResults: [], 
            sort: {
                column: null,
                directionNode: null,
                directionElapsed_Ms: null,
            },
            bgcolor1: '',
            bgcolor7: '',
        }
    }
    componentDidMount(){
        this.searchFun()
    }
    async searchFun(){
        const value = this.state.value
        let valueArray = []
        valueArray.push(value)
        let response = await fetch("http://localhost:4000/sendAverageNode/nodeAverage", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(valueArray)
            })
            let data = await response.json()
            this.setState({results: data})
        // let response =await fetch("http://localhost:4000/sendAverageNode/nodeAverage")
        // let data = await response.json()
        // this.setState({results: data})
    }
    setColor(){
        this.setState({
            bgcolor1: '',
            bgcolor2: '',
            bgcolor3: '',
            bgcolor4: '',
            bgcolor5: '',
            bgcolor6: '',
            bgcolor7: '',
        })
    }
    setDirection(){
        this.setState({
            sort: {
                directionNode: null,
                directionElapsed_Ms: null,
            }
        })
    }
    setArrowNode(){
        if(this.state.sort.directionNode === null){
            return 
        }
        if(this.state.sort.directionNode === 'desc'){
            return <BsArrowDown />
        }
        if(this.state.sort.directionNode === 'asc'){
            return <BsArrowUp />
        }
    };
    setArrowElapsed_Ms(){
        if(this.state.sort.directionElapsed_Ms === null){
            return 
        }
        if(this.state.sort.directionElapsed_Ms === 'desc'){
            return <BsArrowDown />
        }
        if(this.state.sort.directionElapsed_Ms === 'asc'){
            return <BsArrowUp />
        }
    };
    onSortNode = column => {
        return e => {
            const direction = this.state.sort.column ? (this.state.sort.directionNode === 'asc' ? 'desc' : 'asc') : 'desc'
            const sortedUsers = this.state.results.sort((a, b) => {
                if(column === 'Node'){
                    const nameA = a.Name.toUpperCase()
                    const nameB = b.Name.toUpperCase()
                    if(nameA < nameB)
                        return -1
                    if(nameA > nameB)
                        return 1
                    else return 0
                }
                else {
                    return a.Name - b.Name
                }
            })
        
            if (direction === 'desc') {
                sortedUsers.reverse()
            }
            this.setColor()
            this.setDirection()
            this.setState({
                results: sortedUsers,
                sort: {
                    column,
                    directionNode: direction,
                },
                bgcolor1: 'grey',
            })
    }
    }
    onSortAverage = column =>{
        return e => {
            const direction = this.state.sort.column ? (this.state.sort.directionElapsed_Ms === 'asc' ? 'desc' : 'asc') : 'desc'
            const sortedUsers = this.state.results.sort((a, b) => {
                if (column === 'Average'){
                    const nameA = a.Average
                    const nameB = b.Average
                    if(nameA < nameB)
                        return -1
                    if(nameA > nameB)
                        return 1
                    else return 0
                }
                else {
                    return a.Average - b.Average
                }
            })
            //console.log(direction)
            if (direction === 'desc') {
                sortedUsers.reverse()
            }
            this.setColor()
            this.setDirection()
            this.setState({
                results: sortedUsers,
                sort: {
                    column,
                    directionElapsed_Ms : direction,
                },
                bgcolor7: 'grey',
            }) 
        }
    }
    render() {
        const {results, isLoading, error, value} = this.state
        if (error || results == null) {
            return <p>Something went wrong</p>;
          }
        if(isLoading){
            return<p> Loading....</p>
        }
        return (
            <div style = {{backgroundColor : "#292b2c"}}>
            <input type = "text" style = {{float: 'right'}} value = {value} placeholder = "Search" onChange={event => {this.setState({value: event.target.value})}}
            onKeyPress={event => {
                        if (event.key === 'Enter') {
                          this.searchFun()
                        }
                      }}></input>
            <table id = "table" class = "table table-bordered table-dark" style={{backgroundColor: "#292b2c"}}>
            <thead>
            <tr>
            <th style={{backgroundColor: this.state.bgcolor1}} onClick={this.onSortNode('Node')} >Name {this.setArrowNode()}</th>
            <th style={{backgroundColor: this.state.bgcolor7}} onClick={this.onSortAverage('Elaped_Ms')}>Average (ms){this.setArrowElapsed_Ms()}</th>
            </tr>
            </thead>
            {
            results.map((data, i) => 
                    <tr>
                    <td>{data.Name}</td>
                    <td>{data.Average.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr> 
            )}
            </table>
            </div>
        )
    }
}

export default Table;
