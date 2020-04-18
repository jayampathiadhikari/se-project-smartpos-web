import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  withRouter
} from "react-router-dom";

export default function (ComposedComponent) {
  class Authenticate extends React.Component {

    componentDidMount() {
      this._checkAndRedirect();
    }

    componentDidUpdate() {
      this._checkAndRedirect();
    }

    _checkAndRedirect() {
      const { isAuthenticated } = this.props;
      if (!isAuthenticated) {
        this.redirectToLogin();
      }
    }

    render() {
      return (
        <div>
          { this.props.isAuthenticated ? <ComposedComponent {...this.props} /> : null }
        </div>
      );
    }
    redirectToLogin = () => {
      this.props.history.push('/auth/login');
    };
  }

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.AuthenticationReducer.signedIn,
    };
  };

  const bindAction = (dispatch) => ({
  });

  return connect(
    mapStateToProps,
    bindAction
  )(withRouter(Authenticate));
}