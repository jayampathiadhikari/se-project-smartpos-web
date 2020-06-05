import {SET_SIGNIN_STATUS, SET_AGENT, SET_EXECUTIVE, SET_USER, SIGNOUT_USER, REMEMBER_ME} from '../../actionTypes';
const authReducerDefaultState = {
  loading: false,
  signedIn: false,
  isExecutive:false,
  isAgent:false,
  user: null,
  remember: false
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
        isExecutive: action.payload,
        signedIn: true
      };
    case SET_AGENT:
      return {
        ...state,
        isAgent: action.payload,
        signedIn: true
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case SIGNOUT_USER:
      return {
        ...state,
        user: null,
        signedIn: false,
        isExecutive: false,
        isAgent: false,
        remember: false
      };
    case REMEMBER_ME:
      return {
        ...state,
        remember: action.payload
      };
    default:
      return state;
  }
}