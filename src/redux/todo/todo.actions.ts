import { createPayloadAction } from '../helpers';
import { StandardAction } from '../types';
import { TodoPayload } from './types';

export default class TodoAction {
  static TYPES = {
    // Async actions
    // -- Sign in
    FETCH: {
      START: 'todo/FETCH_START',
      SUCCESS: 'todo/FETCH_SUCCESS',
      FAILURE: 'todo/FETCH_FAILURE',
    },

    // -- Update whole todo
    UPDATE: {
      START: 'todo/UPDATE_START',
      SUCCESS: 'todo/UPDATE_SUCCESS',
      FAILURE: 'todo/UPDATE_FAILURE',
    },

    // -- Update partial todo
    UPDATE_PARTIAL: {
      START: 'todo/UPDATE_PARTIAL_START',
      SUCCESS: 'todo/UPDATE_PARTIAL_SUCCESS',
      FAILURE: 'todo/UPDATE_PARTIAL_FAILURE',
    },
    // Sync actions
  };

  static fetchTodo = (): StandardAction<TodoPayload> =>
    createPayloadAction(TodoAction.TYPES.FETCH.START);

  static fetchTodoSuccess = (
    todos: TodoPayload[],
  ): StandardAction<{ todos: TodoPayload[] }> =>
    createPayloadAction(TodoAction.TYPES.FETCH.SUCCESS, { todos });

  static fetchTodoError = (error?: string): StandardAction =>
    createPayloadAction(
      TodoAction.TYPES.FETCH.FAILURE,
      undefined,
      undefined,
      error,
    );

  static updateTodo = (
    todo: TodoPayload,
  ): StandardAction<{ todo: TodoPayload }> =>
    createPayloadAction(TodoAction.TYPES.UPDATE.START, { todo });

  static updateTodoSuccess = (
    todo: TodoPayload,
  ): StandardAction<{ todo: TodoPayload }> =>
    createPayloadAction(TodoAction.TYPES.UPDATE.SUCCESS, { todo });

  static updateTodoFailure = (error?: string): StandardAction =>
    createPayloadAction(
      TodoAction.TYPES.UPDATE.FAILURE,
      undefined,
      undefined,
      error,
    );

  static updatePartialTodo = (
    todo: TodoPayload,
  ): StandardAction<{ todo: TodoPayload }> =>
    createPayloadAction(TodoAction.TYPES.UPDATE_PARTIAL.START, { todo });

  static updatePartialTodoSuccess = (
    todo: TodoPayload,
  ): StandardAction<{ todo: TodoPayload }> =>
    createPayloadAction(TodoAction.TYPES.UPDATE_PARTIAL.SUCCESS, { todo });

  static updatePartialTodoFailure = (error?: string): StandardAction =>
    createPayloadAction(
      TodoAction.TYPES.UPDATE_PARTIAL.FAILURE,
      undefined,
      undefined,
      error,
    );
}
