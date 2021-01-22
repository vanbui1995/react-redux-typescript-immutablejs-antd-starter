import { createPayloadAction } from '../helpers';
import { StandardAction } from '../types';
import { CategoryPayload } from './types';

export default class CategoryAction {
  static TYPES = {
    // Async actions
    // -- Sign in
    FETCH: {
      START: 'category/FETCH_START',
      SUCCESS: 'category/FETCH_SUCCESS',
      FAILURE: 'category/FETCH_FAILURE',
    },

    // -- Update whole category
    UPDATE: {
      START: 'category/UPDATE_START',
      SUCCESS: 'category/UPDATE_SUCCESS',
      FAILURE: 'category/UPDATE_FAILURE',
    },

    // -- Update partial category
    UPDATE_PARTIAL: {
      START: 'category/UPDATE_PARTIAL_START',
      SUCCESS: 'category/UPDATE_PARTIAL_SUCCESS',
      FAILURE: 'category/UPDATE_PARTIAL_FAILURE',
    },
    // Sync actions
  };

  static fetchTodo = (): StandardAction<CategoryPayload> =>
    createPayloadAction(CategoryAction.TYPES.FETCH.START);

  static fetchTodoSuccess = (
    categorys: CategoryPayload[],
  ): StandardAction<{ categorys: CategoryPayload[] }> =>
    createPayloadAction(CategoryAction.TYPES.FETCH.SUCCESS, { categorys });

  static fetchTodoError = (error?: string): StandardAction =>
    createPayloadAction(
      CategoryAction.TYPES.FETCH.FAILURE,
      undefined,
      undefined,
      error,
    );

  static updateTodo = (
    category: CategoryPayload,
  ): StandardAction<{ category: CategoryPayload }> =>
    createPayloadAction(CategoryAction.TYPES.UPDATE.START, { category });

  static updateTodoSuccess = (
    category: CategoryPayload,
  ): StandardAction<{ category: CategoryPayload }> =>
    createPayloadAction(CategoryAction.TYPES.UPDATE.SUCCESS, { category });

  static updateTodoFailure = (error?: string): StandardAction =>
    createPayloadAction(
      CategoryAction.TYPES.UPDATE.FAILURE,
      undefined,
      undefined,
      error,
    );

  static updatePartialTodo = (
    category: CategoryPayload,
  ): StandardAction<{ category: CategoryPayload }> =>
    createPayloadAction(CategoryAction.TYPES.UPDATE_PARTIAL.START, {
      category,
    });

  static updatePartialTodoSuccess = (
    category: CategoryPayload,
  ): StandardAction<{ category: CategoryPayload }> =>
    createPayloadAction(CategoryAction.TYPES.UPDATE_PARTIAL.SUCCESS, {
      category,
    });

  static updatePartialTodoFailure = (error?: string): StandardAction =>
    createPayloadAction(
      CategoryAction.TYPES.UPDATE_PARTIAL.FAILURE,
      undefined,
      undefined,
      error,
    );
}
