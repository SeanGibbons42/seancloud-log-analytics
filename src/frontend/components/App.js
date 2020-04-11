import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

// Pages
import TrafficPage from "../pages/TrafficPage";
import MapPage from "../pages/MapPage";
import StoragePage from "../pages/StoragePage";

//nav components
import Header from "../components/navigation/Header";
import Nav from "../components/navigation/Nav";

import "./app.css"

class App extends Component {
  render(){
    return(
      <div className="App">
      <Router>
        {/* <div className="page-grid"> */}

          <div>
            <Header />
          </div>
          <div className="page-body">
          <div className="l-sidebar">
            <Nav/>
          </div>

          <div className="content">
            <Route path="/"/>
            <Route path="/traffic" component = {TrafficPage} />
            <Route path="/map" component = {MapPage} />
            <Route path="/storage" component = {StoragePage} />
          </div>
          </div>
        {/* </div> */}
      </Router>
      </div>
    );
  }
}

export default App;
