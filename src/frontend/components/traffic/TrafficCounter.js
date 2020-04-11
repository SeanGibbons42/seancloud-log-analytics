import React, {Component} from "react";
import ReactDOM from "react-dom";

import "./traffic-counter.css";

class TrafficCounter extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="wrapper h-250">
                <h3 className="title"> Unique Visitors </h3>
                <div className="card-content">
                    <div className="content-wrapper"> 
                        <div className="display">
                            <div className="display-bubble">
                                <div className="display-value"> 20000 </div>
                                <hr className="display-decoration"/>
                                <div className="display-title">Traffic</div> 
                            </div>

                            <div className="display-bubble">
                                <div className="display-value"> +286 </div>
                                <hr className="display-decoration"/>
                                <div className="display-title">Change</div> 
                            </div>
                        </div>
                        
                        <div className="vr"> </div>

                        <div className="t-selector">
                            <ul>
                            <li className="date-bubble">Month</li>
                            <li className="date-bubble">Year</li> 
                            <li className="date-bubble">All</li> 
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TrafficCounter;