import React, { Component } from 'react';
import './Room.css';


class Room extends Component {
    constructor(){
        super();
        this.state = {
            inRoom: false            
        };
        
    }

    clicked(){
        var index = this.state.currentMessage;
        index++;
        if(index > this.messages.length - 1) {
            index = 0;
        }
        this.setState({currentMessage: index});
    }
    getCurrentMessage() {
        return this.messages[this.state.currentMessage];
    }
    render() {
        console.log(this.state);
        // return (<h1 onClick={this.clicked.bind(this)}>{this.getCurrentMessage()}</h1>);
        return (
            <div className="Room">
                <h1>{this.props.name}</h1>            
            </div>
            );
    }
}

export default Room;