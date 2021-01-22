import { all, call, fork, put, takeEvery, delay } from 'redux-saga/effects';
import { notification } from 'antd';

import AuthAction from './auth.actions';
import { AuthService } from '../../services/bioandme-service';
import { UserPayload } from './types';
import { StandardAction } from '../types';

const {
  userSignInSuccess,
  userSignOutSuccess,
  userSignUpSuccess,
  userSignUpError,
} = AuthAction;
const { SIGNIN, SIGNOUT, SIGNUP } = AuthAction.TYPES;

function* createUserWithEmailPassword(action: StandardAction<UserPayload>) {
  const { payload } = action;

  if (payload) {
    const { email, password } = payload;

    try {
      // const token = yield call(AuthService.signup, email, password);
      yield delay(2000);
      const token = 'mockToken';
      yield put(userSignUpSuccess(token));
    } catch (error) {
      yield put(userSignUpError(error.message));
      notification.error({
        message: error.message,
      });
    }
  }
}

function* signInUserWithEmailPassword(action: StandardAction<UserPayload>) {
  const { payload } = action;

  if (payload) {
    const { email, password } = payload;

    try {
      //  const token = yield call(AuthService.signup, email, password);
      yield delay(2000);
      const token = 'mockToken';
      yield put(userSignInSuccess(token));
    } catch (error) {
      notification.error({
        message: error,
      });
    }
  }
}

function* signOut() {
  try {
    yield call(AuthService.logout);
    yield put(userSignOutSuccess());
  } catch (error) {
    console.error(error);
    notification.error({
      message: error,
    });
  }
}

function* createUserAccount() {
  yield takeEvery(SIGNUP.START, createUserWithEmailPassword);
}

function* signInUser() {
  yield takeEvery(SIGNIN.START, signInUserWithEmailPassword);
}

function* signOutUser() {
  yield takeEvery(SIGNOUT.START, signOut);
}

export default function* AuthSaga(): Generator {
  yield all([fork(signInUser), fork(createUserAccount), fork(signOutUser)]);
}
