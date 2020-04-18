import { SET_SIGNIN_STATUS } from "../../actionTypes";

export function setSignInStatus(status) {
  return (dispatch) => {
    dispatch({
      type: SET_SIGNIN_STATUS,
      payload: status
    });
  };
};