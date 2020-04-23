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
import axios from 'axios';
// react component that copies the given text inside your clipboard
//import { CopyToClipboard } from "react-copy-to-clipboard";
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
  Col
} from "reactstrap";
// core components
import Header from "components/Headers/UserHeader.js";

class Icons extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
            profile:[],
            username: '',
            firstname: '',
            lastname:'',
            gender:'',
            dob:'',
            street:'',
            city:'',
            state:'',
            auth:[]
        }
    }

    componentDidMount() {

        axios.get(`https://se-smartpos-backend.herokuapp.com/employee/profile`).then((result) => {
            this.setState({
                profile: result.data
            })
        })

        axios.get(`https://se-smartpos-backend.herokuapp.com/employee/auth`).then((result) => {
            this.setState({
                auth: result.data
            })
        })
    }

    onSubmitEdit = (e) => {
        console.log('this.state', this.state)
        axios.post(`https://se-smartpos-backend.herokuapp.com/deposit`, this.state).then((res) => {
            console.log(res)
            alert(res.data.message)

        })
    }


  render() {
    var {profile,auth} =this.state
    console.log('auth',auth);
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>

          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">My account</h3>
                </Col>

              </Row>
            </CardHeader>
            <CardBody>
              <Form>
                <h6 className="heading-small text-muted mb-4">
                  User information
                </h6>
                {profile && (profile).map((profileObj) => {

                                        return (<div>


                <div className="pl-lg-4">

                {auth && (auth).map((authObj) => {

                                              return (<div>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Username
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={authObj.username}
                          id="input-username"
                          placeholder="Username"
                          type="text"
                          onChange={e => {
                                this.setState({ username: e.target.value })
                            }}
                        />
                      </FormGroup>
                    </Col>

                  </Row>
                  </div>
                  )})}
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-first-name"
                        >
                          First name
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={profileObj.first_name}
                          id="input-first-name"
                          placeholder="First name"
                          type="text"
                          onChange={e => {
                                this.setState({ firstname: e.target.value })
                            }}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          Last name
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={profileObj.last_name}
                          id="input-last-name"
                          placeholder="Last name"
                          type="text"
                          onChange={e => {
                                this.setState({ lastname: e.target.value })
                            }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Gender
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={profileObj.gender}
                          id="gender"
                          placeholder="Gender"
                          type="text"
                          onChange={e => {
                                this.setState({ gender: e.target.value })
                            }}
                        />
                      </FormGroup>
                    </Col>

                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Date Of Birth
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={profileObj.date_of_birth}
                          id="input-dob"
                          placeholder="DOB"
                          type="text"
                          onChange={e => {
                                this.setState({ dob: e.target.value })
                            }}
                        />
                      </FormGroup>
                    </Col>

                  </Row>
                </div>
                <hr className="my-4" />
                {/* Address */}
                <h6 className="heading-small text-muted mb-4">
                  Living information
                </h6>
                <div className="pl-lg-4">

                  <Row>
                  <Col lg="4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-street"
                      >
                        Street
                      </label>
                      <Input
                        className="form-control-alternative"
                        defaultValue={profileObj.street}
                        id="input-street"
                        placeholder="Street"
                        type="text"
                        onChange={e => {
                              this.setState({ street: e.target.value })
                          }}
                      />
                    </FormGroup>
                  </Col>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-city"
                        >
                          City
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={profileObj.city}
                          id="input-city"
                          placeholder="City"
                          type="text"
                          onChange={e => {
                                this.setState({ city: e.target.value })
                            }}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-country"
                        >
                          Country
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={profileObj.state}
                          id="input-country"
                          placeholder="Country"
                          type="text"
                          onChange={e => {
                                this.setState({ state: e.target.value })
                            }}
                        />
                      </FormGroup>
                    </Col>

                  </Row>
                </div>
                </div>
                )})}


                <Button
                  color="info"
                  href="/admin/edit"
                  onClick={this.onSubmitEdit}

                >
                  Edit
                </Button>
              </Form>
            </CardBody>
          </Card>
          </Row>
        </Container>
      </>
    );
  }
}

export default Icons;
