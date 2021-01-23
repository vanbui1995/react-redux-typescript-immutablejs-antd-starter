import { RecordOf, Record } from 'immutable';

import AuthAction from './auth.actions';
import { StandardAction } from '../types';
import { AuthState } from './types';

export const initData: AuthState = {
  accessToken: null,
  error: '',
  isSigningIn: false,
  isSigningUp: false,
  isSigningOut: false,
};

const initialState = Record(initData)(initData);

export default class AuthReducer {
  static getReducer(
    state: RecordOf<AuthState> = initialState,
    action: StandardAction,
  ): RecordOf<AuthState> {
    switch (action.type) {
      // Sign Up
      case AuthAction.TYPES.SIGNUP.START:
      case AuthAction.TYPES.SIGNUP.SUCCESS:
      case AuthAction.TYPES.SIGNUP.FAILURE:
        return AuthReducer.handleSignUp(state, action);

      // Sign In
      case AuthAction.TYPES.SIGNIN.START:
      case AuthAction.TYPES.SIGNIN.SUCCESS:
      case AuthAction.TYPES.SIGNIN.FAILURE:
        return AuthReducer.handleSignIn(state, action);

      // Sign Out
      case AuthAction.TYPES.SIGNOUT.START:
      case AuthAction.TYPES.SIGNOUT.SUCCESS:
      case AuthAction.TYPES.SIGNOUT.FAILURE:
        return AuthReducer.handleSignOut(state, action);

      // Sync actions

      default:
        return state;
    }
  }

  static handleSignUp = (
    state: RecordOf<AuthState>,
    action: StandardAction<{ user: string }>,
  ): RecordOf<AuthState> => {
    if (action.payload) {
      switch (action.type) {
        case AuthAction.TYPES.SIGNUP.START:
          return state.set('isSigningUp', true).set('error', '');

        case AuthAction.TYPES.SIGNUP.SUCCESS:
          return state
            .set('isSigningUp', false)
            .set('accessToken', action.payload.user);

        case AuthAction.TYPES.SIGNUP.FAILURE:
          return state.set('isSigningUp', false).set('error', action.error);

        default:
          return state;
      }
    }

    return state;
  };

  static handleSignIn = (
    state: RecordOf<AuthState>,
    action: StandardAction<string>,
  ): RecordOf<AuthState> => {
    if (action.payload) {
      switch (action.type) {
        case AuthAction.TYPES.SIGNIN.START:
          return state.set('isSigningIn', true).set('error', '');

        case AuthAction.TYPES.SIGNIN.SUCCESS:
          return state
            .set('isSigningIn', false)
            .set('accessToken', action.payload);

        case AuthAction.TYPES.SIGNIN.FAILURE:
          return state.set('isSigningIn', false).set('error', action.error);

        default:
          return state;
      }
    }

    return state;
  };

  static handleSignOut = (
    state: RecordOf<AuthState>,
    action: StandardAction<undefined>,
  ): RecordOf<AuthState> => {
    switch (action.type) {
      case AuthAction.TYPES.SIGNOUT.START:
        return state.set('isSigningOut', true).set('error', '');

      case AuthAction.TYPES.SIGNOUT.SUCCESS:
        return state.set('isSigningOut', false).set('accessToken', null);

      case AuthAction.TYPES.SIGNOUT.FAILURE:
        return state.set('isSigningOut', false).set('error', action.error);

      default:
        return state;
    }
  };
}
