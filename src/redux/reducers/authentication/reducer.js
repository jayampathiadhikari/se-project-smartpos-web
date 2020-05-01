import { SET_SIGNIN_STATUS, SET_AGENT, SET_EXECUTIVE } from '../../actionTypes';

const authReducerDefaultState = {
  authToken: 'akilaakilaakila',
  loading: false,
  signedIn: false,
  isExecutive:false,
  isAgent:false
};

export function AuthenticationReducer(state = authReducerDefaultState, action) {
  switch (action.type) {
    // case SET_SIGNIN_STATUS:
    //   return {
    //     ...state,
    //     signedIn: action.payload
    //   };
    case SET_SIGNIN_STATUS:
      return {
        ...state,
        signedIn: action.payload
      };
    case SET_EXECUTIVE:
      return {
        ...state,
        isExecutive: action.payload
      };
    case SET_AGENT:
      return {
        ...state,
        isAgent: action.payload
      };
    default:
      return state;
  }
}