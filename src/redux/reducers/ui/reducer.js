import { SET_SIMULATION,SET_TRACKING_USER,TOGGLE_MODAL } from '../../actionTypes';

const uiReducerDefaultState = {
  simulation:false,
  trackingUser : null,
  modal:false
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
    case TOGGLE_MODAL:
      return {
        ...state,
        modal:!state.modal
      };
    default:
      return state;
  }
}