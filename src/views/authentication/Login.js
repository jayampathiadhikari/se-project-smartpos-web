import React from "react";
import {connect} from 'react-redux';
import {
  withRouter
} from "react-router-dom";
import {checkAuthentication,getToken} from '../../Utils'

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
  signOut,
  setToken
} from "../../redux/reducers/authentication/action";
import {toast, ToastContainer} from "react-toastify";
import SimpleReactValidator from 'simple-react-validator';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.validator = new SimpleReactValidator();
  }
  state = {
    alert: 'info',
    visible: false,
    processing: true,
    msg: null,

    email: '',
    password: '',
    remember: false,

  };

  componentDidMount() {
    console.log(this.validator);
    if(this.props.remember){
      if(this.props.isExecutive){
        this.props.history.push('/executive/dashboard')
      }else if(this.props.isAgent){
        this.props.history.push('/agent/dashboard')
      }
    }
  };

  login = async (e) => {
    e.preventDefault();
    if (this.validator.allValid()) {
      this.setState({
        visible: true
      });
      let userData = {};
      for(let i=0; i<2;i++){
        const attri = e.target[i].id;
        userData[attri] = e.target[i].value
      }
      console.log(userData,'USERDATA');
      const res = await checkAuthentication(userData.email, userData.password);
      console.log(res,'RESULT');
      if (res.success) {
        this.props.setUser(res.user);
        const result = await getToken(res.user.uid);
        if(result.success){
          this.props.setToken('Bearer '+ result.data[0].token);
          if (res.type === 'exec') {
            this.setState({
              visible: false
            });
            this.props.setIsExecutive(true);
            this.props.rememberMe(this.state.remember);
            setTimeout(() => {
              this.props.history.push('/executive/dashboard')
            }, 10);
          } else if (res.type === 'agent') {
            this.setState({
              visible: false
            });
            this.props.setIsAgent(true);
            this.props.rememberMe(this.state.remember);
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
        }else{
          toast.error(` Login Failed`, {
            position: "bottom-left"
          });
          this.setState({
            visible: false
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
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }


  };

  onChange = (e) => {

    const target = e.target;
    const value = target.name === 'remember' ? target.checked : target.value;
    console.log(value);
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
               style={{position: 'fixed', left: '46.8%', top: '46.8%', zIndex: 999}}>
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
              <Form role="form" onSubmit={this.login}>
                <FormGroup className="mb-3" >
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83"/>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" id="email" name="email" onChange={this.onChange}/>
                  </InputGroup>
                  <div className="text-warning mb-4 ml-2">
                    <small>{this.validator.message('email', this.state.email, 'email')}</small>
                  </div>
                </FormGroup>
                <FormGroup >
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open"/>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" id="password" type="password"
                            />
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
                  <Button className="my-4" color="primary" type="submit">
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
  setToken:(token) => dispatch(setToken(token)),
});

export default connect(
  mapStateToProps,
  bindAction
)(withRouter(Login));


