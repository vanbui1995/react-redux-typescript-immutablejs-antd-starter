import { createSelector } from 'reselect';
import { Record } from 'immutable';

import { RootState } from '../types';

const getAuth = (state: RootState) => {
  return state.auth;
};

const getAccessToken = createSelector(getAuth, auth => {
  return auth.accessToken;
});

const AuthSelectors = {
  getAccessToken,
};

export default AuthSelectors;
