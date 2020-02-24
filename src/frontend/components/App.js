import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

// Pages
import TrafficPage from "../pages/TrafficPage";
import MapPage from "../pages/MapPage";
import StoragePage from "../pages/StoragePage";

//nav components
// import Header from "../components/navigation/Header";
// import Nav from "../components/navigation/Nav";

class App extends Component {
  render(){
    return(
      <div className="App">
      <Router>
        <h1> My App </h1>
        <Route path="/"/>
        <Route path="/traffic" component = {TrafficPage} />
        <Route path="/map" component = {MapPage} />
        <Route path="/storage" component = {StoragePage} />
      </Router>
      </div>
    );
  }
}

export default App;
