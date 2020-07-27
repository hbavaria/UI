import React, { Component } from 'react';
import {BsArrowDown, BsArrowUp} from "react-icons/bs"
const dateFormat = require('dateformat')
class Getdata extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            results: [],
            isLoading: false,
            error: null,
            switchSort: false,
            value: '',
            serachResults: [], 
            sort: {
                column: null,
                directionNode: null,
                directionSession: null,
                directionRun: null,
                directionRun_Group: null,
                directionStart: null,
                directionEnd: null,
                directionElapsed_Ms: null,
            },
            bgcolor1: '',
            bgcolor2: '',
            bgcolor3: '',
            bgcolor4: '',
            bgcolor5: '',
            bgcolor6: '',
            bgcolor7: '',
        }
        this.searchFun = this.searchFun.bind(this)  
    }
    
    async componentDidMount(){
        let response = await fetch("http://localhost:4000/SendPerformanceData/send")
        const data = await response.json()
        // for(let i = 0; i < data.length; i++){
        //     let number  = data[i].Elapsed_Ms
        //     let newNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        //     data[i].Elapsed_Ms = newNumber
        // }
        this.setState({results: data, isLoading: false})
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
                directionSession: null,
                directionRun: null,
                directionRun_Group: null,
                directionStart: null,
                directionEnd: null,
                directionElapsed_Ms: null,
            }
        })
    }
    setArrowRun(){
        if(this.state.sort.directionRun === null){
            return 
        }
        if(this.state.sort.directionRun === 'desc'){
            return <BsArrowDown />
        }
        if(this.state.sort.directionRun === 'asc'){
            return <BsArrowUp />
        }
    };
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
    setArrowSession(){
        if(this.state.sort.directionSession === null){
            return 
        }
        if(this.state.sort.directionSession === 'desc'){
            return <BsArrowDown />
        }
        if(this.state.sort.directionSession === 'asc'){
            return <BsArrowUp />
        }
    };
    setArrowRun_Group(){
        if(this.state.sort.directionRun_Group === null){
            return 
        }
        if(this.state.sort.directionRun_Group === 'desc'){
            return <BsArrowDown />
        }
        if(this.state.sort.directionRun_Group === 'asc'){
            return <BsArrowUp />
        }
    };
    setArrowStart(){
        if(this.state.sort.directionStart === null){
            return 
        }
        if(this.state.sort.directionStart === 'desc'){
            return <BsArrowDown />
        }
        if(this.state.sort.directionStart === 'asc'){
            return <BsArrowUp />
        }
    };
    setArrowEnd(){
        if(this.state.sort.directionEnd === null){
            return 
        }
        if(this.state.sort.directionEnd === 'desc'){
            return <BsArrowDown />
        }
        if(this.state.sort.directionEnd === 'asc'){
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
    async searchFun(event) {
        // if(event.key === 'ENter'){
        const value = this.state.value
        let valueArray = []
        valueArray.push(value)
        //let jsonValue = JSON.parse(JSON.stringify(valueArray))
        let response = await fetch("http://localhost:4000/sendFilteredData/sendFilteredData", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(valueArray)
        })
        let data = await response.json()
        if(value !== ''){
        this.setState({results: data})
    }
    }
    onSortNode = column => {
        return e => {
            const direction = this.state.sort.column ? (this.state.sort.directionNode === 'asc' ? 'desc' : 'asc') : 'desc'
            const sortedUsers = this.state.results.sort((a, b) => {
                if(column === 'Node'){
                    const nameA = a.Node.toUpperCase()
                    const nameB = b.Node.toUpperCase()
                    if(nameA < nameB)
                        return -1
                    if(nameA > nameB)
                        return 1
                    else return 0
                }
                else {
                    return a.Node - b.Node
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
    onSortSession = column =>{
        return e => {
            const direction = this.state.sort.column ? (this.state.sort.directionSession === 'asc' ? 'desc' : 'asc') : 'desc'
            const sortedUsers = this.state.results.sort((a, b) => {
                if (column === 'Session'){
                    const nameA = a.Session
                    const nameB = b.Session
                    if(nameA < nameB)
                        return -1
                    if(nameA > nameB)
                        return 1
                    else return 0
                }
                else {
                    return a.Session - b.Session
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
                    directionSession: direction,
                },
                bgcolor2: 'grey',
            }) 
        }
    }
    onSortRun = column =>{
        return e => {
            const direction = this.state.sort.column ? (this.state.sort.directionRun === 'asc' ? 'desc' : 'asc') : 'desc'
            const sortedUsers = this.state.results.sort((a, b) => {
                if (column === 'Run'){
                    const nameA = a.Run.toUpperCase()
                    const nameB = b.Run.toUpperCase()
                    if(nameA < nameB)
                        return -1
                    if(nameA > nameB)
                        return 1
                    else return 0
                }
                else {
                    return a.Run - b.Run
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
                    directionRun: direction,
                },
                bgcolor3: 'grey',
            }) 
        }
    }
    onSortRun_Group = column =>{
        return e => {
            const direction = this.state.sort.column ? (this.state.sort.directionRun_Group === 'asc' ? 'desc' : 'asc') : 'desc'
            const sortedUsers = this.state.results.sort((a, b) => {
                if (column === 'Run_Group'){
                    const nameA = a.Run_Group.toUpperCase()
                    const nameB = b.Run_Group.toUpperCase()
                    if(nameA < nameB)
                        return -1
                    if(nameA > nameB)
                        return 1
                    else return 0
                }
                else {
                    return a.Run_Group - b.Run_Group
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
                    directionRun_Group: direction,
                },
                bgcolor4: 'grey',
            }) 
        }
    }
    onSortStart = column =>{
        return e => {
            const direction = this.state.sort.column ? (this.state.sort.directionStart === 'asc' ? 'desc' : 'asc') : 'desc'
            // eslint-disable-next-line array-callback-return
            const sortedUsers = this.state.results.sort((a, b) => {
                if (column === 'Start'){
                    const nameA = new Date(a.Start)
                    const nameB = new Date(b.Start)
                    if(nameA < nameB)
                        return -1
                    if(nameA > nameB)
                        return 1
                    else return 0
                }
                else {
                    return new Date(a.Start) - new Date(b.Start)
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
                    directionStart: direction,
                },
                bgcolor5: 'grey',
            }) 
        }
    }
    onSortEnd = column => {
        return e => {
            const direction = this.state.sort.column ? (this.state.sort.directionEnd === 'asc' ? 'desc' : 'asc') : 'desc'
            // eslint-disable-next-line array-callback-return
            const sortedUsers = this.state.results.sort((a, b) => {
                if (column === 'End'){
                    const nameA = new Date(a.End)
                    const nameB = new Date(b.End)
                    // this.sortCondition(nameA, nameB)
                    if(nameA < nameB)
                        return -1
                    if(nameA > nameB)
                        return 1
                    else return 0
                }
                else {
                    return new Date(a.End) - new Date(b.End)
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
                    directionEnd: direction,
                },
                bgcolor6: 'grey',
            }) 
        }
    }
    onSortElapsed_Ms = column =>{
        return e => {
            const direction = this.state.sort.column ? (this.state.sort.directionElapsed_Ms === 'asc' ? 'desc' : 'asc') : 'desc'
            const sortedUsers = this.state.results.sort((a, b) => {
                if (column === 'Elapsed_Ms'){
                    const nameA = a.Elapsed_Ms
                    const nameB = b.Elapsed_Ms
                    if(nameA < nameB)
                        return -1
                    if(nameA > nameB)
                        return 1
                    else return 0
                }
                else {
                    return a.Elapsed_Ms - b.Elapsed_Ms
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
            <div align = "right" style = {{backgroundColor : "#292b2c"}}><input type = "text" value = {value} placeholder = "Search" onChange={event => {this.setState({value: event.target.value})}}
            onKeyPress={event => {
                        if (event.key === 'Enter') {
                          this.searchFun()
                        }
                      }}></input>
            <table id = "table" class = "table table-bordered table-dark" style={{backgroundColor: "#292b2c"}}>
            <thead>
            <tr>
            <th style={{backgroundColor: this.state.bgcolor1}} onClick={this.onSortNode('Node')} >Node {this.setArrowNode()}</th>
            <th style={{backgroundColor: this.state.bgcolor2}} onClick={this.onSortSession('Sesion')}>Session {this.setArrowSession()}</th>
            <th style={{backgroundColor: this.state.bgcolor3}} onClick={this.onSortRun('Run')}>Run {this.setArrowRun()}</th>
            <th style={{backgroundColor: this.state.bgcolor4}} onClick={this.onSortRun_Group('Run_Group')}>Run Group {this.setArrowRun_Group()}</th>
            <th style={{backgroundColor: this.state.bgcolor5}} onClick={this.onSortStart('Start')}>Start (local) {this.setArrowStart()}</th>
            <th style={{backgroundColor: this.state.bgcolor6}} onClick={this.onSortEnd('End')}>End (local) {this.setArrowEnd()}</th>
            <th style={{backgroundColor: this.state.bgcolor7}} onClick={this.onSortElapsed_Ms('Elaped_Ms')}>Elapsed Ms{this.setArrowElapsed_Ms()}</th>
            </tr>
            </thead>
            {
            results.map((data, i) => 
                    <tr>
                    <td>{data.Node}</td>
                    <td>{data.Session}</td>
                    <td>{data.Run}</td>
                    <td>{data.Run_Group}</td>
                    <td>{dateFormat(data.Start, "dddd, mmmm dS, yyyy, h:MM:ss.ms TT")}</td>
                    <td>{dateFormat(data.End, "dddd, mmmm dS, yyyy, h:MM:ss.ms TT")}</td>
                    <td>{data.Elapsed_Ms.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr> 
            )}
            </table>
            </div>
        )
    }
}

export default Getdata;
