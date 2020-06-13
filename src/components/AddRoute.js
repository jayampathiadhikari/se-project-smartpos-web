import React from "react";
import {
  Button,
  FormGroup,
  Form,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader, Input
} from "reactstrap";
import {connect} from "react-redux";

import CustomDropdown from "./Dropdown";
import {mapReload, toggleAddRouteModal} from "../redux/reducers/ui/action";
import {getSalespersonByAgent, getUnassignedRoutes, createNewRoute, getDistrictId} from "../Utils";
import {toast, ToastContainer} from "react-toastify";

// core components


class AddRoute extends React.Component {
  state = {
    salespersonData: [],
    salesperson: false,
    day: false,
    dayData: []
  };

  componentDidMount = async () => {
    const salesperson = await getSalespersonByAgent(this.props.user.uid);
    this.setState({
      salespersonData: salesperson,
    })
  };

  toggle = () => {
    this.props.toggle()
  };

  onSelectSalesperson = async (sp) => {
    //must call api to get remianing days
    console.log(sp.id);
    const res = await getUnassignedRoutes(sp.id);
    console.log(res, 'UNSASSIGENED DATES');
    this.setState({
      salespersonID: sp.id,
      day: true,
      dayData: res.data
    });
  };

  onSelectDay = async (day) => {
    //must call api to get remianing days
    this.setState({
      selectedDay: day.id,
      day: true
    })
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const userData = {};
    userData["route_name"] = this.state.route_name;
    userData["salesperson_id"] = this.state.salespersonID;
    userData["day_id"] = this.state.selectedDay;
    userData["district_id"] = getDistrictId(this.props.user.region);
    console.log(userData,this.props.selectedShops);
    const res = await createNewRoute(this.props.selectedShops, userData);
    console.log(res,'NEW ROUTE')
    if(res.data.success){
      toast.success(` New employee added successfully `);
      this.props.mapReload();
    }else{
      toast.error(` Route adding Failed,}`, {
        position: "bottom-left",
        autoClose: false
      });
    }
    //should re render the data source
  };

  onChange = (e) => {
    const target = e.target;
    const value = target.value;
    this.setState({
      [target.id]: value
    })
  };

  render() {
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover/>
        <Modal isOpen={this.props.modal} toggle={this.toggle}>
          <Form onSubmit={this.onSubmit}>
            <ModalHeader toggle={this.toggle} style={{marginBottom: 0}}>
              <h3 className="mb-0">Assign new route</h3>
              <hr className="my-4"/>
            </ModalHeader>
            <ModalBody style={{paddingTop: 0}}>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <div className="form-control-label">SALESPERSON</div>
                      <CustomDropdown data={this.props.salesperson} id="salesperson" initial="select"
                                      onSelect={this.onSelectSalesperson} disabled={!this.props.salesperson.length}/>
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <div className="form-control-label">DAY</div>
                      <CustomDropdown data={this.state.dayData} id="day" initial="select" onSelect={this.onSelectDay}
                                      disabled={!this.state.day}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="route_name"
                      >
                        ROUTE NAME
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="route_name"
                        type="text"
                        required={true}
                        onChange={this.onChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">Add</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  modal: state.uiReducer.modal,
  user: state.AuthenticationReducer.user,
});

const bindAction = (dispatch) => ({
  toggle: () => dispatch(toggleAddRouteModal()),
  mapReload: () => dispatch(mapReload()),
});

export default connect(
  mapStateToProps,
  bindAction
)(AddRoute);
