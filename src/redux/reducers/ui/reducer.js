import { SET_SIMULATION } from '../../actionTypes';

const uiReducerDefaultState = {
  simulation:false
};

export function uiReducer(state = uiReducerDefaultState, action) {
  switch (action.type) {
    case SET_SIMULATION:
      return {
        ...state,
        simulation: action.payload
      };
    default:
      return state;
  }
}