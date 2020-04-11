import React, {Component} from "react";
import ReactDOM from "react-dom";

import BarChart from "../../visualization/BarChart";
import { thresholdScott } from "d3";

class TrafficHistory extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.requestData();
    }

    requestData(){
        this.returnData([
            {period: "Jan",     traffic: 254}, 
            {period: "Feb",    traffic: 392}, 
            {period: "Mar",     traffic: 195}, 
            {period: "Apr",   traffic: 452},
            {period: "May",     traffic: 263},
            {period: "Jun",     traffic: 263},
            {period: "Jul",     traffic: 263},
            {period: "Aug",     traffic: 263},
            {period: "Sep",     traffic: 263},
            {period: "Oct",     traffic: 263},
            {period: "Nov",     traffic: 263},
            {period: "Dev",     traffic: 263},

        ]);
    }

    returnData(data){
        this.setState({data: data});
    }

    render(){
        return(
            <div className="wrapper h-350">
                <h3 className="title">Traffic History</h3>
                {/* <div className="card-content"> */}
                    <BarChart data={this.state.data}/>
                {/* </div> */}
            </div>
        );
    }
}

export default TrafficHistory;