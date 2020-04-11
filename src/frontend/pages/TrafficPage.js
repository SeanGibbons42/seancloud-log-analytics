import React, {Component} from "react";
import ReactDOM from "react-dom";

// dashboard components
import TrafficCounter from "../components/traffic/TrafficCounter.js";
import BrowserGraph from "../components/traffic/BrowserGraph.js";
import MessageCenter from "../components/traffic/MessageCenter.js";
import TrafficHistory from "../components/traffic/TrafficHistory.js";

import "./layout.css";
import "./trafficpage.css";

class TrafficPage extends Component{
  render(){
    return(
      <div>
        <h1> Traffic </h1>
        <div className="flex-container">
          <div className="col-4">
            <TrafficCounter />
          </div>
          <div className="col-4">
              <BrowserGraph/>
          </div>
          <div className="col-4">
              <MessageCenter/>
          </div>
        </div>
        <div className="flex-container">
          <div className="col-12">
            <TrafficHistory/>
          </div>
        </div>

      </div>
    );
  }
}

export default TrafficPage;
