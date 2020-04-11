import React, {Component} from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faMapMarkerAlt, faCog } from "@fortawesome/free-solid-svg-icons";
import { faChartBar } from "@fortawesome/free-regular-svg-icons";

import "./nav.css";
import NavLink from "./NavLink";


class Nav extends Component{
  constructor(props){
    super(props);
    this.state = {open:false};
  }

  toggleSidebar(){
    console.log("hover")
    this.setState({open:!this.state.open});
  }

  render(){
    return(
      <div  className={"navbar-container" + (this.state.open ? " navbar-container-hover" : "")} 
            onMouseOver={()=>{this.toggleSidebar()}}
            onMouseOut={()=>{this.toggleSidebar()}}
      >
        <div className="navbar">
          <NavLink icon={faChartBar}     href="/traffic" text="Traffic"/>
          <NavLink icon={faMapMarkerAlt} href="/map"     text="Visitor Map"/>
          <NavLink icon={faCog}          href="/storage" text="Settings"/>
        </div>
      </div>
    );
  }
}


export default Nav;
