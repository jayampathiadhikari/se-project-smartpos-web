import { SET_SIMULATION,SET_TRACKING_USER } from '../../actionTypes';

const uiReducerDefaultState = {
  simulation:false,
  trackingUser : null,
};

export function uiReducer(state = uiReducerDefaultState, action) {
  switch (action.type) {
    case SET_SIMULATION:
      return {
        ...state,
        simulation: action.payload
      };
    case SET_TRACKING_USER:
      return {
        ...state,
        trackingUser: action.payload
      };
    default:
      return state;
  }
}