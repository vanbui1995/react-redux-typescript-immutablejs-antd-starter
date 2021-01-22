import { createSelector } from 'reselect';

import { RootState } from '../types';

export default class AuthSelectors {
  static getAuth(state: RootState) {
    return state.auth;
  }

  static getAccessToken = createSelector(AuthSelectors.getAuth, auth => {
    return auth.accessToken;
  });
}
