import { SET_SIMULATION, SET_TRACKING_USER } from "../../actionTypes";

export function setSimulation(status) {
  return (dispatch) => {
    dispatch({
      type: SET_SIMULATION,
      payload: status
    });
  };
};

export function setTrackingUser(userid) {
  return (dispatch) => {
    dispatch({
      type: SET_TRACKING_USER,
      payload: userid
    });
  };
};