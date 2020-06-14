import {MAP_RELOAD, SET_SIMULATION, SET_TRACKING_USER, TOGGLE_MODAL} from "../../actionTypes";

export function setSimulation() {
  return (dispatch) => {
    dispatch({
      type: SET_SIMULATION,
      payload: null
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

export function mapReload() {
  return (dispatch) => {
    dispatch({
      type: MAP_RELOAD,
      payload: null
    });
  };
};
