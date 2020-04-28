import React from "react";
import { connect } from 'react-redux';
import {
  withRouter
} from "react-router-dom";

class ResetPassword extends React.Component{
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const email = query.get('email');
    console.log(email)//123
  }
  render() {
    return(null)
  }

}
export default withRouter(ResetPassword);