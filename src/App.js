import React, { Component } from 'react';
import './App.css';


import { Col, Grid, Row, Panel } from 'react-bootstrap';
import MainNav from './Nav';
import Vm from './Vm';
import Axios from 'axios';

class App extends Component {
  constructor() {
    super();   

    this.state = { selectedVm: 0, vms: [], selectedVmInfo: null, initLoad: true, selectedVmScreenshot: null};
    this.url = "http://192.168.1.121:3000";

  }

  componentDidMount() {
    var self = this;
    this.request = Axios
      .get(this.url + "/instances")
      .then(function (results) {
        self.setState({vms: results.data})
        if (self.state.initLoad) {
          self.setState({initLoad: false});
          self.getSelectedVmInfo(self.getSelectedVm().guid);      
        }
      });
  }

  componentWillUnmount() {
    this.request.abort();
  }

  getSelectedVm() {    
    return this.state.vms[this.state.selectedVm];
  }

  getSelectedVmInfo(guid) {
    var self = this; 
    
    Axios.get(this.url + "/instances/" + guid).then(function (results) {        
        self.setState({selectedVmInfo: results.data.vm});
      });
  }

  setSelectedVm(guid) {

    var self = this;
    // this.setState({getVmScreenshot: null});
    this.state.vms.forEach(function (vm, index) {
      if (vm.guid === guid) {
        self.setState({ selectedVm: index });
        self.getVmScreenshot(guid);
        self.getSelectedVmInfo(guid);               
      }
    });

  }

  preformVmAction(guid, action) {
    Axios.post(this.url + "/instances/" + guid + "/" + action)
    .then(function (response) {
    }).catch(function (error) {
    });
  }

  getVmScreenshot(guid) {
    var self = this;    

    Axios.get(this.url + "/instances/" + guid + "/screenshot").then(function (results) {
        self.setState({selectedVmScreenshot: results.data.screenshot});
      });
  }

  showVM() {

    var vm = this.getSelectedVm();
    
    // console.log(this.state);

    if (this.state.selectedVmInfo === null) {
      
      return (<h2>Loading {vm.name}....</h2>);
    }     

    return ( <Vm name={vm.name} guid={vm.guid} data={this.state.selectedVmInfo} actions={this.preformVmAction.bind(this)} screenshot={this.state.selectedVmScreenshot}></Vm> );

  }


  render() {

    if (this.state.vms.length === 0) {
      return (<div className="App"><h1>Loading...</h1></div>);
    }    

    var vm = this.getSelectedVm();   


    return (
      <div className="App">
         <Grid fluid>
           <Row>
            <Col md={2}><MainNav items={this.state.vms} changeVm={this.setSelectedVm.bind(this) } activeKey={vm.guid}/></Col>
            <Col md={10}>
              <Row>
                <Col md={12}>
                  <Panel>{this.showVM()}</Panel>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
