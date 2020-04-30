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
  DropdownItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import {createUserWithEmail} from "../../Utils";
import CustomDropdown from "../../components/Dropdown";



const data = [
'Kegalle',
  'Colombo',
  'Adsdadfd',
  "asdasd"
];
class AddEmployeeEx extends React.Component {
  state = {
    region:null,
    agent:true
  };

  onSubmit = async(e) => {
    e.preventDefault();
    const userData = {};
    for(let i=0; i<6;i++){
      const attri = e.target[i].id;
      userData[attri] = e.target[i].value
    }
    console.log(userData);
    userData['region'] = this.state.region;
    userData['type'] = 'salesperson';
    // const res = await createUserWithEmail(userData);
    //console.log(res);
  };

  onSelectRegion = (region) => {
    this.setState({
      region: region,
    })
  };

  onSelectAgent = (agent) => {
    this.setState({
      agent: agent,
    })
  };
  onChange = () => {
    this.setState({
      agent:!this.state.agent
    })
  };

  render() {
    return (
      <>
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
                      Employee Type
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="3">
                          <FormGroup>
                            <div className="custom-control custom-control-alternative custom-radio mb-3">
                              <input
                                className="custom-control-input"
                                id="customRadio1"
                                name="custom-radio-1"
                                type="radio"
                                defaultChecked
                                onChange={this.onChange}
                              />
                              <label className="custom-control-label" htmlFor="customRadio1">
                                Agent
                              </label>
                            </div>
                          </FormGroup>
                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <div className="custom-control custom-control-alternative custom-radio mb-3">
                              <input
                                className="custom-control-input"
                                id="customRadio2"
                                name="custom-radio-1"
                                type="radio"
                                onChange={this.onChange}
                              />
                              <label className="custom-control-label" htmlFor="customRadio2">
                                Salesperson
                              </label>
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
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
                    <h6 className="heading-small text-muted mb-4">
                      Other
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="3">
                          <FormGroup>
                            <div
                              className="form-control-label"
                              htmlFor="region"
                              style={{marginBottom:'10px'}}
                            >Region</div>
                            <CustomDropdown data={data} id="region" onSelect={this.onSelectRegion}/>
                          </FormGroup>
                        </Col>
                        {
                          !this.state.agent ?
                            (
                              <Col md="3">
                                <FormGroup>
                                  <div
                                    className="form-control-label"
                                    htmlFor="region"
                                    style={{marginBottom:'10px'}}
                                  >Agent</div>
                                  <CustomDropdown data={data} id="agent" onSelect={this.onSelectAgent}/>
                                </FormGroup>
                              </Col>
                            ) : null
                        }
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <Row>
                      <Col md="10"/>
                      <Col md="2">
                        <Button className="my-4" color="primary" type="submit">
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

export default AddEmployeeEx;