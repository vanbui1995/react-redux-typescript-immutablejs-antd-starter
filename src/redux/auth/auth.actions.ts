import { createPayloadAction } from '../helpers';
import { StandardAction } from '../types';
import { UserPayload } from './types';

export default class AuthAction {
  static TYPES = {
    // Async actions
    // -- Sign in
    SIGNIN: {
      START: 'auth/SIGNIN_START',
      SUCCESS: 'auth/SIGNIN_SUCCESS',
      FAILURE: 'auth/SIGNIN_FAILURE',
    },

    // -- Sign out
    SIGNOUT: {
      START: 'auth/SIGNOUT_START',
      SUCCESS: 'auth/SIGNOUT_SUCCESS',
      FAILURE: 'auth/SIGNOUT_FAILURE',
    },

    // -- Sign up
    SIGNUP: {
      START: 'auth/SIGNUP_START',
      SUCCESS: 'auth/SIGNUP_SUCCESS',
      FAILURE: 'auth/SIGNUP_FAILURE',
    },

    // Sync actions
  };

  static userSignUp = (
    email: string,
    password: string,
  ): StandardAction<UserPayload> =>
    createPayloadAction(AuthAction.TYPES.SIGNUP.START, { email, password });

  static userSignUpSuccess = (authUser: string): StandardAction<string> =>
    createPayloadAction(AuthAction.TYPES.SIGNUP.SUCCESS, authUser);

  static userSignUpError = (error?: string): StandardAction =>
    createPayloadAction(
      AuthAction.TYPES.SIGNUP.FAILURE,
      undefined,
      undefined,
      error,
    );

  static userSignIn = (
    email: string,
    password: string,
  ): StandardAction<UserPayload> =>
    createPayloadAction(AuthAction.TYPES.SIGNIN.START, { email, password });

  static userSignInSuccess = (authUser: string): StandardAction<string> =>
    createPayloadAction(AuthAction.TYPES.SIGNIN.SUCCESS, authUser);

  static userSignInError = (error?: string): StandardAction =>
    createPayloadAction(
      AuthAction.TYPES.SIGNIN.FAILURE,
      undefined,
      undefined,
      error,
    );

  static userSignOut = (): StandardAction<Record<string, unknown>> =>
    createPayloadAction(AuthAction.TYPES.SIGNOUT.START);

  static userSignOutSuccess = (): StandardAction<string> =>
    createPayloadAction(AuthAction.TYPES.SIGNOUT.SUCCESS);

  static userSignOutError = (error?: string): StandardAction =>
    createPayloadAction(
      AuthAction.TYPES.SIGNOUT.FAILURE,
      undefined,
      undefined,
      error,
    );

}
