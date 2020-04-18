import { SET_SIGNIN_STATUS } from '../../actionTypes';

const authReducerDefaultState = {
  authToken: 'akilaakilaakila',
  loading: false,
  signedIn: false
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
        signedIn: !state.signedIn
      };
    default:
      return state;
  }
}