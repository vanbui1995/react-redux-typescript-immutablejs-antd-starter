import { all } from 'redux-saga/effects';
import { AuthSaga } from './auth';
import { TodoSaga } from './todo';

export default function* RootSaga() {
  yield all([AuthSaga(), TodoSaga()]);
}
