import React, { Component } from 'react';

import { Nav , NavItem } from 'react-bootstrap';


class MainNav extends Component {
    constructor(props) {
        super(props);     
        this.state = {activeKey: props.activeKey};
    }

    handleSelect(eventKey, event) {
        this.setState({activeKey: eventKey});
        this.props.changeVm(eventKey);
        // console.log(eventKey);
        
    }

    render() {
        // console.log(this.props);
        var items = this.props.items.map(function(item){
            return <NavItem key={item.guid} eventKey={item.guid} >{item.name}</NavItem>
        });

        return ( <Nav bsStyle="pills" stacked activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>
                {items}
            </Nav> );
    }
}

export default MainNav;