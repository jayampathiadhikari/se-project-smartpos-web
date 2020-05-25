/*!
=========================================================
* Argon Dashboard React - v1.1.0
=========================================================
* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import FIREBASE from "../../firebase";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Spinner,
  DropdownItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu, Alert
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import {createUserWithEmail, getCurrentAgentData} from "../../Utils";
import CustomDropdown from "../../components/Dropdown";
import {getCurrentExecData,getAgentsByRegion} from "../../Utils";


const data = [
  {name:'Kegalle',id:'1'},
  {name:'Colombo',id:'2'},
  {name:'abcd',id:'3'},
  {name:'abcd',id:'4'},
];
const agentData = [
  {name:'abcd',id:'1'},
  {name:'abcd',id:'2'},
  {name:'abcd',id:'3'},
  {name:'abcd',id:'4'},
];
class AddEmployeeAgent extends React.Component {
  state = {
    alert:'info',
    visible: false,
    processing:true,
    disabled: false,
    msg:null
  };

  onSubmit = async(e) => {
    e.preventDefault();
    this.setState({
      visible:true,
      disabled:true
    });

    const userData = {};
    for(let i=0; i<6;i++){
      if(e.target != null){
        const attri = e.target[i].id;
        userData[attri] = e.target[i].value
      }else{
        break
      }
    }
    const {uid,region} = await getCurrentAgentData();
    userData['region'] = region;
    userData['type'] = 'salesperson';
    userData['supervisorUid'] = uid;
    console.log(userData);
    const res = await createUserWithEmail(userData);
    if(res.success){
      this.setState({
        alert:'success',
        processing:false,
        msg: 'SUCCESS !'
      })
    }else{
      this.setState({
        alert:'danger',
        processing:false,
        msg: 'FAILED ! '.concat(res.error)
      })
    }
    window.setTimeout(()=>{
      this.setState({
        alert:'info',
        visible: false,
        disabled: false
      })
    },1500);
    console.log(res);
  };

  render() {
    return (
      <>
        <Alert color={this.state.alert} isOpen={this.state.visible} style={{position:'fixed',left:'43%',top:'43%',zIndex:999}}>
          {this.state.processing ? <Spinner style={{ width: '3rem', height: '3rem' }} /> : this.state.msg}

        </Alert>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Add Employee</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="firstName"
                            >
                              First name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="firstName"
                              type="text"
                              required={true}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="lastName"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="lastName"
                              type="text"
                              required={true}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="email"
                              type="email"
                              required={true}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="nic"
                            >
                              NIC
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="nic"
                              type="text"
                              required={true}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="phoneNumber"
                            >
                              Mobile
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="phoneNumber"
                              type="text"
                              required={true}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="address"
                              type="text"
                              required={true}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <Row>
                      <Col md="10"/>
                      <Col md="2">
                        <Button className="my-4" color="primary" type="submit" disabled={this.state.disabled}>
                          Add User
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default AddEmployeeAgent;