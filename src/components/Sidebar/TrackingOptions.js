import React from 'react';
import {
  Form, FormGroup,Button
} from 'reactstrap'
import {setSignInStatus} from "../../redux/reducers/authentication/action";
import {connect} from "react-redux";
import {setSimulation, setTrackingUser} from "../../redux/reducers/ui/action";
import {regions} from "../../constants";
import CustomDropdown from "../Dropdown";
import {getAgentsByRegion,getSalespersonByAgent} from "../../Utils";

const types =[
  {name:'salesperson',id:1}
];

class TrackingOptions extends React.Component{
  state = {
    region:false,
    agent:false,
    salesperson: false,
    track:false,
    agents:false,
    agentsData:[],
    salespersonData:[]
  };

  onChange = (e) => {
    const target = e.target;
    const value = target.name;
    console.log(value);
    this.setState({
      [target.name]:true
    })
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value)
  };

  onSelectType = (type) => {
    if (type.id === 1){
      this.setState({
        region:true
      })
    }
  };
  onSelectRegion = async (region) => {
    const agents = await getAgentsByRegion(region.name);
    this.setState({
      agents:true,
      agentsData:agents
    });
  };

  onSelectAgent = async (agent) => {
    const salesperson = await getSalespersonByAgent(agent.id);
    this.setState({
      salesperson:true,
      salespersonData:salesperson
    });
  };

  onSelectSalesperson = async(sp) => {
    console.log(sp.id);
    this.setState({
      salespersonID: sp.id,
      track:true
    })
  };

  onTrack = () => {
    this.props.setTrackingUser(this.state.salespersonID);
    this.props.setSimulation(true);
  };

  render(){
    return(
      <div style={{padding:'5px',borderWidth:'0.5px'}}>
        <Form role="form" onSubmit={this.onSubmit}>
          <FormGroup>
            <div className="navbar-heading text-muted">Type</div>
            <CustomDropdown data={types} id="type" initial="type" onSelect={this.onSelectType} disabled={false}/>
          </FormGroup>
          <FormGroup>
            <div className="navbar-heading text-muted">Region</div>
            <CustomDropdown data={regions} id="region" initial="region" onSelect={this.onSelectRegion} disabled={!this.state.region}/>
          </FormGroup>
          <FormGroup>
            <div className="navbar-heading text-muted">Agent</div>
            <CustomDropdown data={this.state.agentsData} id="agent" initial="agent" onSelect={this.onSelectAgent} disabled={!this.state.agents}/>
          </FormGroup>
          <FormGroup>
            <div className="navbar-heading text-muted">Salesperson</div>
            <CustomDropdown data={this.state.salespersonData} id="salesperson" initial="salesperson" onSelect={this.onSelectSalesperson} disabled={!this.state.salesperson}/>
          </FormGroup>
          <div className="text-center">
            <Button className="my-4" color="primary" type={"submit"} disabled={!this.state.track} onClick={this.onTrack}>
              Track
            </Button>
          </div>
        </Form>

      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  loggedIn: state.AuthenticationReducer.signedIn,
});

const bindAction = (dispatch) => ({
  setLogin: (status) => dispatch(setSignInStatus(status)),
  setSimulation: (status) => dispatch(setSimulation(status)),
  setTrackingUser: (userID) => dispatch(setTrackingUser(userID)),
});

export default connect(
  mapStateToProps,
  bindAction
)(TrackingOptions);
