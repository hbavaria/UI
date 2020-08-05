import React, { Component } from 'react';
import ReactPaginate from 'react-paginate'
import './getData.css'
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
            offset: 0,
            perPage: 200,
            currentPage: 0,
            sort: {
        }  
    }
}
    
    async getData(){
        let response = await fetch("http://localhost:4000/SendPerformanceData/send")
        const data = await response.json()
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({results: slice, isLoading: false, pageCount: Math.ceil(data.length / this.state.perPage)})
    }
    async searchFun() {
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
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        //if(value !== ''){
        this.setState({results: slice, pageCount: Math.ceil(data.length / this.state.perPage)})
    //}
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getData()
        });
    }
    componentDidMount(){
        this.getData()
    }
    render() {
        const {results,value} = this.state
        // if (error || results == null) {
        //     return <p>Something went wrong</p>;
        //   }
        return (
            <div style = {{backgroundColor : "#292b2c"}}>
            <input type = "text" style = {{float: 'right'}} value = {value} placeholder = "Search" onChange={event => {this.setState({value: event.target.value})}}
            onKeyPress={event => {
                        if (event.key === 'Enter') {
                          this.searchFun()
                        }
                      }}></input>
                      <ReactPaginate
                      previousLabel={"prev"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={this.state.pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}/>
            <table id = "table" class = "table table-bordered table-dark" style={{backgroundColor: "#292b2c"}}>
            <thead>
            <tr>
            <th>Node</th>
            <th>Session</th>
            <th>Run</th>
            <th>Run Group</th>
            <th>Start (local)</th>
            <th>End (local)</th>
            <th>Elapsed Ms</th>
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
            //</div>
        )
    }
}

export default Getdata;
