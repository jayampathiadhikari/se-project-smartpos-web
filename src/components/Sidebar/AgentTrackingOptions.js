import React from 'react';
import {
  Form, FormGroup,Button
} from 'reactstrap'
import {connect} from "react-redux";
import {setSimulation, setTrackingUser} from "../../redux/reducers/ui/action";
import CustomDropdown from "../Dropdown";
import {getSalespersonByAgent} from "../../Utils";


class TrackingOptions extends React.Component{
  state = {
    salesperson: false,
    track:false,
    salespersonData:[]
  };

  componentDidMount = async () => {
    const salesperson = await getSalespersonByAgent(this.props.user.uid);
    this.setState({
      salesperson:true,
      salespersonData:salesperson
    });
    console.log(salesperson);
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value)
  };


  onSelectSalesperson = async(sp) => {
    console.log(sp.id);
    this.setState({
      salespersonID: sp.id,
      track:true
    })
  };

  onTrack = () => {
    // this.props.setTrackingUser(this.state.salespersonID);
    // this.props.setSimulation(true);
    this.props.setTrackingUser(this.state.salespersonID);
  };

  render(){
    return(
      <div style={{padding:'5px',borderWidth:'0.5px'}}>
        <Form role="form" onSubmit={this.onSubmit}>
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
  user: state.AuthenticationReducer.user,
});

const bindAction = (dispatch) => ({
  setSimulation: (status) => dispatch(setSimulation(status)),
  setTrackingUser: (userID) => dispatch(setTrackingUser(userID)),
});

export default connect(
  mapStateToProps,
  bindAction
)(TrackingOptions);
