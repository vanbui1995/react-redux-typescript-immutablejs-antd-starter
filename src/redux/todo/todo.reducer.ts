import { RecordOf, Record, merge } from 'immutable';

import TodoAction from './todo.actions';
import { StandardAction } from '../types';
import { TodoPayload, TodoState } from './types';
import { normalizeArr } from 'redux/helpers';
import { current } from '@reduxjs/toolkit';

const initData: TodoState = {
  isFetching: true,
  error: null,
  todos: {},
  isUpdatingById: {},
};

const initialState = Record(initData)(initData);

export default class TodoReducer {
  static getReducer(
    state: RecordOf<TodoState> = initialState,
    action: StandardAction,
  ): RecordOf<TodoState> {
    switch (action.type) {
      // Fetch
      case TodoAction.TYPES.FETCH.START:
      case TodoAction.TYPES.FETCH.SUCCESS:
      case TodoAction.TYPES.FETCH.FAILURE:
        return TodoReducer.handleFetch(state, action);

      // Update
      case TodoAction.TYPES.UPDATE.START:
      case TodoAction.TYPES.UPDATE.SUCCESS:
      case TodoAction.TYPES.UPDATE.FAILURE:
        return TodoReducer.handleUpdate(state, action);

      // Update Partial
      case TodoAction.TYPES.UPDATE_PARTIAL.START:
      case TodoAction.TYPES.UPDATE_PARTIAL.SUCCESS:
      case TodoAction.TYPES.UPDATE_PARTIAL.FAILURE:
        return TodoReducer.handleUpdatePartial(state, action);

      // Sync actions

      default:
        return state;
    }
  }

  static handleFetch = (
    state: RecordOf<TodoState>,
    action: StandardAction<{ todos }>,
  ): RecordOf<TodoState> => {
    switch (action.type) {
      case TodoAction.TYPES.FETCH.START:
        return state.set('isFetching', true).set('error', '');
      case TodoAction.TYPES.FETCH.SUCCESS:
        return state
          .set('isFetching', false)
          .set('todos', normalizeArr<TodoPayload>(action.payload?.todos));

      case TodoAction.TYPES.FETCH.FAILURE:
        return state.set('isFetching', false).set('error', action.error);

      default:
        return state;
    }
    return state;
  };

  static handleUpdate = (
    state: RecordOf<TodoState>,
    action: StandardAction<{ todo: TodoPayload }>,
  ): RecordOf<TodoState> => {
    switch (action.type) {
      case TodoAction.TYPES.UPDATE.START:
        return state
          .setIn(['isUpdatingById', action.payload?.todo._id], true)
          .set('error', '');

      case TodoAction.TYPES.UPDATE.SUCCESS:
        return state
          .setIn(['isUpdatingById', action.payload?.todo._id], false)
          .setIn(['todos', action.payload?.todo._id], action.payload?.todo);

      case TodoAction.TYPES.UPDATE.FAILURE:
        return state
          .setIn(['isUpdatingById', action.payload?.todo._id], false)
          .set('error', action.error);
      default:
        return state;
    }
  };

  static handleUpdatePartial = (
    state: RecordOf<TodoState>,
    action: StandardAction<{ todo: TodoPayload }>,
  ): RecordOf<TodoState> => {
    switch (action.type) {
      case TodoAction.TYPES.UPDATE_PARTIAL.START:
        return state
          .setIn(['isUpdatingById', action.payload?.todo._id], true)
          .set('error', '');
      case TodoAction.TYPES.UPDATE_PARTIAL.SUCCESS:
        const currentTodo = state.todos[action.payload?.todo._id || 0];
        const mergedTodo = merge(currentTodo, action.payload?.todo || {});
        return state
          .setIn(['isUpdatingById', action.payload?.todo._id], false)
          .setIn(['todos', action.payload?.todo._id], mergedTodo);

      case TodoAction.TYPES.UPDATE_PARTIAL.FAILURE:
        return state
          .setIn(['isUpdatingById', action.payload?.todo._id], false)
          .set('error', action.error);

      default:
        return state;
    }

    return state;
  };
}
