import {SET_SIGNIN_STATUS, SET_EXECUTIVE, SET_AGENT, SET_USER, SIGNOUT_USER, REMEMBER_ME, SET_TOKEN} from "../../actionTypes";

export function setSignInStatus(status) {
  return (dispatch) => {
    dispatch({
      type: SET_SIGNIN_STATUS,
      payload: status
    });
  };
};

export function setToken(token) {
  return (dispatch) => {
    dispatch({
      type: SET_TOKEN,
      payload: token
    });
  };
};

export function setExecutiveLogin(status) {
  return (dispatch) => {
    dispatch({
      type: SET_EXECUTIVE,
      payload: status
    });
  };
};

export function setAgentLogin(status) {
  return (dispatch) => {
    dispatch({
      type: SET_AGENT,
      payload: status
    });
  };
};

export function setUser(user) {
  return (dispatch) => {
    dispatch({
      type: SET_USER,
      payload: user
    });
  };
};

export function signOut() {
  return (dispatch) => {
    dispatch({
      type: SIGNOUT_USER,
    });
  };
};

export function rememberMe(payload) {
  return (dispatch) => {
    dispatch({
      type: REMEMBER_ME,
      payload
    });
  };
};
