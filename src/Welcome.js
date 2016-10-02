import React, { Component } from 'react';


class Welcome extends Component {
    constructor(){
        super();
        this.state = {currentMessage: 0};
        this.messages = ["Welcome", "Goodbye"]
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
        return (<h1 onClick={this.clicked.bind(this)}>{this.getCurrentMessage()}</h1>);
    }
}

export default Welcome;