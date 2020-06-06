import React from "react";
import {connect} from 'react-redux';
import {
  withRouter
} from "react-router-dom";
import {checkAuthentication} from '../../Utils'

// reactstrap components
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col, Spinner
} from "reactstrap";

import {
  rememberMe,
  setAgentLogin,
  setExecutiveLogin,
  setUser,
  signOut
} from "../../redux/reducers/authentication/action";
import {toast, ToastContainer} from "react-toastify";


class Login extends React.Component {
  state = {
    alert: 'info',
    visible: false,
    processing: true,
    msg: null,

    email: '',
    password: '',
    remember: true,

  };

  componentDidMount() {
    if(this.props.remember){
      if(this.props.isExecutive){
        this.props.history.push('/executive/dashboard')
      }else{
        this.props.history.push('/agent/dashboard')
      }
    }
  }

  login = async () => {
    this.setState({
      visible: true
    });
    const res = await checkAuthentication(this.state.email, this.state.password);
    console.log(res,'login response');
    if (res.success) {
      this.props.setUser(res.user);
      if (res.type === 'exec') {
        this.setState({
          visible: false
        });
        this.props.setIsExecutive(true);
        setTimeout(() => {
          this.props.history.push('/executive/dashboard')
        }, 10);
      } else if (res.type === 'agent') {
        this.setState({
          visible: false
        });
        this.props.setIsAgent(true);
        setTimeout(() => {
          this.props.history.push('/agent/index');
        }, 10);
      } else {
        this.setState({
          visible: false
        });
        toast.error(` Login Failed, Check email or password`, {
          position: "bottom-left"
        });
      }
    } else {
      toast.error(` Login Failed, Check email or password`, {
        position: "bottom-left"
      });
      this.setState({
        visible: false
      });
    }
  };

  onChange = (e) => {
    const target = e.target;
    const value = target.name === 'remember' ? target.checked : target.value;
    if(target.name === 'remember'){
      if(target.checked){
        this.props.rememberMe(true)
      }else{
        this.props.rememberMe(false)
      }
    }
    this.setState({
      [target.name]: value
    })
  };


  render() {
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={10000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover/>
        <Alert color={this.state.alert} isOpen={this.state.visible}
               style={{position: 'fixed', left: '50%', top: '50%', zIndex: 999}}>
          {this.state.processing ? <Spinner style={{width: '3rem', height: '3rem'}}/> : this.state.msg}
        </Alert>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0 ">
            <CardHeader className="bg-transparent card-header">
              <div>
                <img
                  alt="..."
                  src={require("assets/img/brand/logo-pos-600.png")}
                  style={{width: '60%', height: '10%', margin: '0 auto', display: 'block'}}
                />
              </div>

            </CardHeader>
            <CardBody className="px-lg-5">
              <div className="text-center text-muted mb-4">
                <small>sign in with credentials</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83"/>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" name="email" type="email" autoComplete="new-email"
                           onChange={this.onChange}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open"/>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" name={"password"} type="password" autoComplete="new-password"
                           onChange={this.onChange}/>
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    name={"remember"}
                    id=" customCheckLogin"
                    type="checkbox"
                    onChange={this.onChange}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" onClick={this.login}>
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => {e.preventDefault(); this.props.history.push('/auth/forgotpassword')}}
              >
                <small>Forgot Password ?</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}


const mapStateToProps = (state) => ({
  loggedIn: state.AuthenticationReducer.signedIn,
  user: state.AuthenticationReducer.user,
  remember: state.AuthenticationReducer.remember,
  isExecutive: state.AuthenticationReducer.isExecutive,
  isAgent: state.AuthenticationReducer.isAgent
});

const bindAction = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  setIsExecutive: (status) => dispatch(setExecutiveLogin(status)),
  setIsAgent: (status) => dispatch(setAgentLogin(status)),
  signOut: () => dispatch(signOut()),
  rememberMe: (status) => dispatch(rememberMe(status)),
});

export default connect(
  mapStateToProps,
  bindAction
)(withRouter(Login));


