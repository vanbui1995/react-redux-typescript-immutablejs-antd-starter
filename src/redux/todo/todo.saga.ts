import { ReduxCollections, ReduxCollectionType } from 'enums';
import { all, fork, takeEvery, put, delay } from 'redux-saga/effects';
import { TodoAction, TodoUtils } from '.';
import { TodoPayload } from './types';

function* fetchTodoSaga() {
  try {
    // Mock call API
    delay(1000);
    const todosFromBE: TodoPayload[] = [
      {
        _id: 'beb0bac0-c850-449c-9271-e300a97b65d6',
        name: 'Check task progress',
        checked: false,
        categoryId: 'beb0bac0-c850-449c-9271-e300a97b65d6',
        category: {
          _id: 'beb0bac0-c850-449c-9271-e300a97b65d6',
          name: 'Daily',
          isDeleted: false,
        },
      },
    ];

    const { todos, categories } = TodoUtils.prepareDataFromBE(todosFromBE);
    const collection: ReduxCollectionType = {
      [ReduxCollections.CATEGORY]: categories,
    };
    yield put(TodoAction.fetchTodoSuccess(todos, collection));
  } catch (error) {
    console.log({ error });
  }
}

function* watchFetchTodo() {
  yield takeEvery(TodoAction.TYPES.FETCH.START, fetchTodoSaga);
}

export default function* TodoSaga() {
  yield all([fork(watchFetchTodo)]);
}
