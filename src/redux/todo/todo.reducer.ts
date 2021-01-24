import { RecordOf, Record } from 'immutable';

import TodoAction from './todo.actions';
import { StandardAction } from '../types';
import { TodoPayload, TodoState } from './types';
import { generateIndexes, updateAndIndexingData } from 'redux/helpers';
import { ReduxCollections, ReduxCollectionType, ReduxModules } from 'enums';
import { AuthAction } from 'redux/auth';

const initData: TodoState = {
  isFetching: false,
  error: null,
  todos: {},
  isUpdatingById: {},
  selectedCategory: 'beb0bac0-c850-449c-9271-e300a97b65d6',
  indexes: generateIndexes(ReduxModules.TODO),
};

const initialState = Record(initData)(initData);

export default class TodoReducer {
  static getReducer(
    state: RecordOf<TodoState> = initialState,
    action: StandardAction,
  ): RecordOf<TodoState> {
    // Handle add from other redux modules
    const Meta = action.meta as { collections?: ReduxCollectionType };
    const todosFromMeta = Meta?.collections?.[ReduxCollections.TODO];
    if (todosFromMeta && todosFromMeta?.length) {
      return TodoReducer.handleAddContinues(state, todosFromMeta || []);
    }
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
      case AuthAction.TYPES.SIGNOUT.SUCCESS:
        return initialState;
      default:
        return state;
    }
  }

  static handleFetch = (
    state: RecordOf<TodoState>,
    action: StandardAction<{ todos: TodoPayload[] }>,
  ): RecordOf<TodoState> => {
    switch (action.type) {
      case TodoAction.TYPES.FETCH.START:
        return state.set('isFetching', true).set('error', '');
      case TodoAction.TYPES.FETCH.SUCCESS:
        if (action.payload) {
          const newState = updateAndIndexingData<TodoPayload, TodoState>(
            action.payload.todos,
            ReduxModules.TODO,
            state,
          ).set('isFetching', false);
          return newState;
        }
        return state;
      case TodoAction.TYPES.FETCH.FAILURE:
        return state.set('isFetching', false).set('error', action.error);

      default:
        return state;
    }
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
        if (action.payload) {
          return updateAndIndexingData<TodoPayload, TodoState>(
            [action.payload.todo],
            ReduxModules.TODO,
            state,
          ).setIn(['isUpdatingById', action.payload?.todo._id], false);
        }
        return state;

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
        if (action.payload) {
          return updateAndIndexingData<TodoPayload, TodoState>(
            [action.payload.todo],
            ReduxModules.TODO,
            state,
            true,
          ).setIn(['isUpdatingById', action.payload?.todo._id], false);
        }
        return state;

      case TodoAction.TYPES.UPDATE_PARTIAL.FAILURE:
        return state
          .setIn(['isUpdatingById', action.payload?.todo._id], false)
          .set('error', action.error);

      default:
        return state;
    }
  };

  static handleAddContinues = (
    state: RecordOf<TodoState>,
    todos: TodoPayload[],
  ): RecordOf<TodoState> => {
    return updateAndIndexingData<TodoPayload, TodoState>(
      todos,
      ReduxModules.TODO,
      state,
    );
  };
}
