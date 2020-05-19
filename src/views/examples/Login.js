import React from "react";
import { connect } from 'react-redux';
import {
  withRouter
} from "react-router-dom";
import {checkAuthentication } from '../../Utils'

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
  Col
} from "reactstrap";

import {setAgentLogin, setExecutiveLogin, setSignInStatus, setUser} from "../../redux/reducers/authentication/action";


class Login extends React.Component {
  state = {
    email:'',
    password:'',
    remember: true,
    visible:false
  };

  login = async() => {
    const res = await checkAuthentication(this.state.email,this.state.password);
    console.log(res);
    if(res.success){
      this.props.setUser(res.user);
      if(res.type === 'exec'){
        this.props.setIsExecutive(true);
        setTimeout(()=>{this.props.history.push('/executive/dashboard')},100);
      }else if(res.type === 'agent'){
        console.log('AGENT');
        this.props.setIsAgent(true);
        setTimeout(()=>{this.props.history.push('/agent/index');},100);
      }
      console.log(res.type);
    }else{
      this.showAlert()
    }
    // this.checkForAuthentication(this.state.email,this.state.password)
  };

  onChange = (e) => {
    const target = e.target;
    const value = target.name === 'remember' ? target.checked : target.value;
    console.log(value);
    this.setState({
      [target.name]:value
    })
  };

  checkForAuthentication = (email,password) => {
    console.log('inside');
    if(email==='jayampathiadhikari@gmail.com' && password==='Windows8#'){
      this.props.setLogin(true);
      setTimeout(()=>{this.props.history.push('/admin/dashboard');},500);
    }else{
      this.showAlert()
    }
  };

  showAlert = ()=>{
    this.setState({visible:true},()=>{
      window.setTimeout(()=>{
        this.setState({visible:false})
      },2000)
    });
  };

  render() {
    return (
      <>
        <Alert color="warning" isOpen={this.state.visible} style={{position:'absolute',left:'43%',top:500,zIndex:999}}>
          Wrong Email or Password !
        </Alert>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0 ">
            <CardHeader className="bg-transparent card-header">
              <div>
                <img
                  alt="..."
                  src={require("assets/img/brand/logo-pos-600.png")}
                  style={{width:'60%',height:'10%',margin: '0 auto',display:'block'}}
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
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" name="email" type="email" autoComplete="new-email" onChange={this.onChange}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" name={"password"} type="password" autoComplete="new-password" onChange={this.onChange} />
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
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Create new account</small>
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
});

const bindAction = (dispatch) => ({
  setUser:(user) => dispatch(setUser(user)),
  setLogin: (status) => dispatch(setSignInStatus(status)),
  setIsExecutive: (status) => dispatch(setExecutiveLogin(status)),
  setIsAgent: (status) => dispatch(setAgentLogin(status)),
});

export default connect(
  mapStateToProps,
  bindAction
)(withRouter(Login));


