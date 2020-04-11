import React, {Component} from "react";
import ReactDOM from "react-dom";

import DonutChart from "../../visualization/DonutChart.js";
import "./browser-graph.css";

class BrowserGraph extends Component{
    constructor(props){
        super(props);
        this.state = {data:null};
    }

    componentWillMount(){
        this.requestData();
    }

    requestData(){
        //placeholder for axios ajax promise :)
        const data = {"Chrome":60, "Firefox":20, "Safari":10, "Edge":7, "Brave":3};
        this.returnData(data);
    }

    returnData(data){
        //callback for successful fetch
        this.setState({data: data})
    }

    render(){
        return(
            <div className="wrapper h-250">
                <h3 className="title"> Top Browsers </h3>
                <DonutChart data={this.state.data}/>
            </div>
        );
    }
}

export default BrowserGraph;
