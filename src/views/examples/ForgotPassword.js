import React from "react";
import {connect} from 'react-redux';
import {
  withRouter
} from "react-router-dom";


// reactstrap components
import {
  Alert,
  Button,
  Card,
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

import {toast, ToastContainer} from "react-toastify";
import FIREBASE from "../../firebase";


class ForgotPassword extends React.Component {
  state = {
    alert: 'info',
    visible: false,
    processing: true,
    msg: null,

    email: '',


  };

  onChange = (e) => {
    const target = e.target;
    const value = target.name === 'remember' ? target.checked : target.value;
    this.setState({
      [target.name]: value
    })
  };

  resend = () => {
    FIREBASE.auth().sendPasswordResetEmail(this.state.email).then(() => {
      toast.success(' Password reset email sent. Check your email')
    }).catch(()=>{
      toast.error(` Something went wrong`, {
        position: "bottom-left",
        autoClose: false
      });
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
            <CardBody className="px-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Enter your email</small>
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
                <div className="text-center">
                  <Button className="my-4" color="primary" onClick={this.resend}>
                    Reset Password
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
                onClick={e => {e.preventDefault(); this.props.history.push('auth/login')}}
              >
                <small>Go to Login</small>
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
  user: state.AuthenticationReducer.user
});

const bindAction = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  bindAction
)(withRouter(ForgotPassword));


