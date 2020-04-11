import React, {Component} from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./nav.css";
import { thresholdScott } from "d3";

class NavLink extends Component{
    constructor(props){
        super(props);
        this.state = {iconclass:"navlink-icon"};
    }

    highlight(){
        console.log("mousein")
        this.setState({iconclass:"navlink-icon navlink-icon-hover"})
    }

    dehighlight(){
        console.log("mouseout")
        this.setState({iconclass:"navlink-icon"})
    }

    render(){
        return(
            <div className="navlink" onMouseEnter={()=>this.highlight()} onMouseLeave={()=>this.dehighlight()}> 
                <a href={this.props.href}> 
                    <span className={this.state.iconclass}><FontAwesomeIcon icon={this.props.icon}/> </span>
                    <span className="navlink-text">{this.props.text}</span> 
                </a> 
            </div>
        );
    }

}

export default NavLink;
