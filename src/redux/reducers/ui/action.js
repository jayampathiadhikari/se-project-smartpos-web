import { SET_SIMULATION } from "../../actionTypes";

export function setSimulation(status) {
  return (dispatch) => {
    dispatch({
      type: SET_SIMULATION,
      payload: status
    });
  };
};