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
  ModalHeader
} from "reactstrap";
import {connect} from "react-redux";

import CustomDropdown from "./Dropdown";
import {toggleAddRouteModal} from "../redux/reducers/ui/action";
import {getSalespersonByAgent, getUnassignedRoutes} from "../Utils";

// core components


class AddRoute extends React.Component {
  state = {
    salespersonData:[],
    salesperson:false,
    day:false,
    dayData:[]
  };

  componentDidMount = async() => {
    const salesperson = await getSalespersonByAgent('ySRNCA8E4hacmi9ZNsofSki5Uyv1');
    this.setState({
      salespersonData:salesperson,
    })
  };

  toggle = () => {
    this.props.toggle()
  };

  onSelectSalesperson = async(sp) => {
    //must call api to get remianing days
    console.log(sp.id);
    const res = await getUnassignedRoutes(sp.id);
    console.log(res,'RESULT')
    this.setState({
      salespersonID: sp.id,
      day:true
    })
  };

  onSelectDay = async(day) => {
    //must call api to get remianing days
    console.log(day.id);
    this.setState({
      selectedDay: day.id,
      day:true
    })
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} style={{marginBottom:0}}>
            <h3 className="mb-0">Assign new route</h3>
            <hr className="my-4" />
          </ModalHeader>
          <ModalBody style={{paddingTop: 0}}>
            <Form>
              <div className="pl-lg-4">

                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <div className="form-control-label">SALESPERSON</div>
                      <CustomDropdown data={this.props.salesperson} id="salesperson" initial="select" onSelect={this.onSelectSalesperson} disabled={!this.props.salesperson.length}/>
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <div className="form-control-label">DAY</div>
                      <CustomDropdown data={this.state.dayData} id="day" initial="select" onSelect={this.onSelectDay} disabled={!this.state.day}/>
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  modal: state.uiReducer.modal,
});

const bindAction = (dispatch) => ({
  toggle: () => dispatch(toggleAddRouteModal())
});

export default connect(
  mapStateToProps,
  bindAction
)(AddRoute);
