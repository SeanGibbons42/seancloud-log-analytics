import React, {Component} from "react";
import ReactDOM from "react-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from "@fortawesome/free-regular-svg-icons";

import "./nav.css";
import "./header.css";


class Header extends Component{
  render(){
    return(
      <div className = "header">
        <div className="logo">
          <h1>SeanCloud Log Analyzer</h1>
        </div>

        <div className="header-end">
          <div className="header-link">
             <FontAwesomeIcon icon={faIdBadge}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
