import {SET_SIMULATION, SET_TRACKING_USER, TOGGLE_MODAL} from "../../actionTypes";

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

export function toggleAddRouteModal() {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      payload: null
    });
  };
};

