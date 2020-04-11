import React, {Component} from "react";
import ReactDOM from "react-dom";

import "./message-center.css";

class MessageCenter extends Component{
    constructor(props){
        super(props);
    }
    

    render(){
        return(
            <div className="wrapper h-250">
                <h3 className="title">Message Center</h3>
                <div className="card-content">
                    <table>
                        <thead className="table">
                            <tr>
                                <th> Summary </th>
                                <th> Category </th>
                                <th> Actions </th>
                            </tr>
                        </thead>

                        <tbody>

                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}

export default MessageCenter;