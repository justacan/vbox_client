import React, { Component } from 'react';

import { Row, Col, Well, Table, Button, ButtonToolbar, Image, Alert } from 'react-bootstrap';

import './Vm.css';

class Vm extends Component {

    getBarColor() {
        return (this.props.data.status === 'Running') ? 'success' : 'warning';
    }

    prettyTime(timestring) {

        if(this.props.data.status !== "Running") {
            return '-';
        }

        var delta = Date.now() - Date.parse(timestring);

        var seconds = (delta / 1000).toFixed(0);
        var minutes = Math.floor(seconds / 60);
        var hours = "";
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes -= (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
        }

        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        if (hours !== "") {
            return hours + ":" + minutes + ":" + seconds;
        }
        return minutes + ":" + seconds;
    }

    showScreenshot() {
        if (this.props.screenshot === null) {
            return (<p><strong>Loading Screenshot...</strong></p>);
        }
         var screenshot = "data:image/png;base64, " + this.props.screenshot;
         return (<Image src={screenshot} responsive/>);
    }


    render() {

        var info = this.props.data;

        return (
            <div className="Vm">
                <Row>
                    <Col md={12}><h1>{this.props.name}</h1></Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ButtonToolbar style={{ marginBottom: '10px' }}>
                            <Button bsStyle="primary" bsSize="large" onClick={function(){this.props.actions(this.props.guid, 'start')}.bind(this)}>Start</Button>
                            <Button bsStyle="primary" bsSize="large" onClick={function(){this.props.actions(this.props.guid, 'stop')}.bind(this)}>Stop</Button>
                            <Button bsStyle="primary" bsSize="large" onClick={function(){this.props.actions(this.props.guid, 'reboot')}.bind(this)}>Reboot</Button>
                            {/*<Button bsStyle="info" bsSize="large" disabled>Snapshot</Button>*/}
                            {/*<Button bsStyle="danger" bsSize="large" disabled>Destroy</Button>*/}
                        </ButtonToolbar>
                    </Col>
                </Row>
                <Row>
                    <Col md={3} sm={12}>
                        <Alert bsStyle={this.getBarColor()}>
                            <span id="vm-status">{this.props.name} is <strong>{info.status}</strong></span>
                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <Well bsSize="small">
                            <Table condensed responsive>
                                <thead>
                                    <tr>
                                        <th colSpan={2} >VM Info</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Guest OS</td>
                                        <td>{info.guest_os}</td>
                                    </tr>
                                    <tr>
                                        <td>CPUs</td>
                                        <td>{info.cpus}</td>
                                    </tr>
                                    <tr>
                                        <td>Memory</td>
                                        <td>{info.memory}</td>
                                    </tr>
                                    <tr>
                                        <td>Uptime</td>
                                        <td>{this.prettyTime(info.uptime)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Well>
                    </Col>
                </Row>
                <Row>
                    <Col md={9}>
                        {this.showScreenshot()}
                    </Col>
                </Row>

            </div>
        );

    }
}

export default Vm;