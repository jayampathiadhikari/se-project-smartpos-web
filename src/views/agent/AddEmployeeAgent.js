import React from "react";
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
  Alert
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import {createUserWithEmail} from "../../Utils";
import {connect} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import {toast, ToastContainer} from "react-toastify";

class AddEmployeeAgent extends React.Component {
  constructor(props){
    super(props);
    this.validator = new SimpleReactValidator({
      validators: {
        phone: {  // name the rule
          message: 'The :attribute must be a valid phone number of type (0XXXXXXXXX) ',
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val,/^([0])\d{9}$/)
          },
        },
        nic: {  // name the rule
          message: 'The :attribute must be of type (XXXXXXXXXV) ',
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val,/^(\d{9})?([V]$)/)
          },
        }
      }
    });
  }

  state = {
    alert:'info',
    visible: false,
    processing:true,
    disabled: false,
    msg:null,

    firstName: '',
    lastName: '',
    email: '',
    nic: '',
    phoneNumber: '',
    address: '',
  };

  onChangeInput = (e) => {
    const target = e.target;
    const value = target.value;
    console.log(value);
    this.setState({
      [target.id]: value
    })
  };

  onSubmit = async(e) => {
    e.preventDefault();
    if(this.validator.allValid()){
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
      const {uid,region} = this.props.user;
      userData['region'] = region;
      userData['type'] = 'salesperson';
      userData['supervisorUid'] = uid;
      console.log(userData);
      const res = await createUserWithEmail(userData);
      if(res.success){
        toast.success(` New employee added successfully `);
        this.setState({
          alert:'info',
          visible: false,
          disabled: false
        })

      }else{
        toast.error(` Employee adding Failed, \n ${res.error}`, {
          position: "bottom-left",
          autoClose: false
        });
        this.setState({
          alert:'info',
          visible: false,
          disabled: false
        })
      }


    }else{
      toast.error(` Check the form data`, {
        position: "bottom-left",
        autoClose: false
      });
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    return (
      <>
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
        <Alert color={this.state.alert} isOpen={this.state.visible} style={{position:'fixed',left:'43%',top:'43%',zIndex:999}}>
          {<Spinner style={{ width: '3rem', height: '3rem' }} />}
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
                              onChange = {this.onChangeInput}
                            />
                            <div className="text-warning mb-4 ml-2">
                              <small>{this.validator.message('first name', this.state.firstName, 'alpha')}</small>
                            </div>
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
                              onChange = {this.onChangeInput}
                            />
                            <div className="text-warning mb-4 ml-2">
                              <small>{this.validator.message('last name', this.state.lastName, 'alpha')}</small>
                            </div>
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
                              onChange = {this.onChangeInput}
                            />
                            <div className="text-warning mb-4 ml-2">
                              <small>{this.validator.message('email', this.state.email, 'email')}</small>
                            </div>
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
                              onChange = {this.onChangeInput}
                            />
                            <div className="text-warning mb-4 ml-2">
                              <small>{this.validator.message('nic', this.state.nic, 'nic')}</small>
                            </div>
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
                              onChange = {this.onChangeInput}
                            />
                            <div className="text-warning mb-4 ml-2">
                              <small>{this.validator.message('phone number', this.state.phoneNumber, 'phone')}</small>
                            </div>
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
                              onChange = {this.onChangeInput}
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


const mapStateToProps = (state) => ({
  user: state.AuthenticationReducer.user,
});

const bindAction = (dispatch) => ({});

export default connect(
  mapStateToProps,
  bindAction
)(AddEmployeeAgent);
