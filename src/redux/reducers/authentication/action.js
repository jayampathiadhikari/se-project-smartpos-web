import { SET_SIGNIN_STATUS, SET_EXECUTIVE, SET_AGENT } from "../../actionTypes";

export function setSignInStatus(status) {
  return (dispatch) => {
    dispatch({
      type: SET_SIGNIN_STATUS,
      payload: status
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