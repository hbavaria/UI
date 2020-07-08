import React, { Component } from 'react';
const dateFormat = require('dateformat')
class Getdata extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            results: [],
            isLoading: false,
            error: null,
            switchSort: false,
        }   
    }
    async componentDidMount(){
        //this.setState({ isLoading: true})
        let response = await fetch("http://10.223.31.195:4000/SendPerformanceData/send")
        const data = await response.json()
        for(let index = 0; index < data.length; index ++){
            for(let i = 0; i < data[index].length; i ++){
                let startDate = data[index][i].Start
                let endDate = data[index][i].End
                data[index][i].Start = dateFormat(startDate, "dddd, mmmm dS, yyyy, h:MM:ss:ms TT")
                data[index][i].End = dateFormat(endDate, "dddd, mmmm dS, yyyy, h:MM:ss:ms TT")
            }
        }
        this.setState({results: data, isLoading: false})
    }
    render() {
        const {results, isLoading, error} = this.state
        if (error || results == null) {
            return <p>Something went wrong</p>;
          }
        if(isLoading){
            return<p> Loading....</p>
        }
        return (
            <table id = "table" data-toggle = "table" class = "table table-bordered table-dark">
            <thead>
            <tr>
            <th data-field="id" data-sortable="true">Node</th>
            <th>Session</th>
            <th>Run</th>
            <th>Run Group</th>
            <th>Start (local)</th>
            <th>End (local)</th>
            <th>Elapsed Ms</th>
            </tr>
            </thead>
            {
            results.map((result, i) => 
                (typeof(result) == 'object')?
                    result.map((data, k)=>
                    <tr>
                    <td> {data.Node}</td>
                    <td>{data.Session}</td>
                    <td>{data.Run}</td>
                    <td>{data.Run_Group}</td>
                    <td>{data.Start}</td>
                    <td>{data.End}</td>
                    <td>{data.Elapsed_Ms}</td>
                    </tr> 
                    )
                : null
            )}
            </table>
        )
    }
}

export default Getdata;
// class = "table table-stripped table-bordered table-dark"