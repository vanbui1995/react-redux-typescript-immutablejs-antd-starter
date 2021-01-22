import { RecordOf, Record, merge } from 'immutable';

import CategoryAction from './category.actions';
import { StandardAction } from '../types';
import { CategoryPayload, CategoryState } from './types';
import { normalizeArr } from 'redux/helpers';
import { ReduxCollections, ReduxCollectionType } from 'enums';
import { TodoAction } from 'redux/todo';

const initData: CategoryState = {
  isFetching: false,
  error: null,
  categories: {},
  isUpdatingById: {},
};

const initialState = Record(initData)(initData);

export default class CategoryReducer {
  static getReducer(
    state: RecordOf<CategoryState> = initialState,
    action: StandardAction,
  ): RecordOf<CategoryState> {
    switch (action.type) {
      // Fetch
      case CategoryAction.TYPES.FETCH.START:
      case CategoryAction.TYPES.FETCH.SUCCESS:
      case CategoryAction.TYPES.FETCH.FAILURE:
        return CategoryReducer.handleFetch(state, action);

      // Update
      case CategoryAction.TYPES.UPDATE.START:
      case CategoryAction.TYPES.UPDATE.SUCCESS:
      case CategoryAction.TYPES.UPDATE.FAILURE:
        return CategoryReducer.handleUpdate(state, action);

      // Update Partial
      case CategoryAction.TYPES.UPDATE_PARTIAL.START:
      case CategoryAction.TYPES.UPDATE_PARTIAL.SUCCESS:
      case CategoryAction.TYPES.UPDATE_PARTIAL.FAILURE:
        return CategoryReducer.handleUpdatePartial(state, action);

      // Other modules
      // --> From Todo

      case TodoAction.TYPES.FETCH.SUCCESS:
        return CategoryReducer.handleAddContinues(state, action);

      // Sync actions
      default:
        return state;
    }
  }

  static handleFetch = (
    state: RecordOf<CategoryState>,
    action: StandardAction<{ categories }>,
  ): RecordOf<CategoryState> => {
    switch (action.type) {
      case CategoryAction.TYPES.FETCH.START:
        return state.set('isFetching', true).set('error', '');
      case CategoryAction.TYPES.FETCH.SUCCESS:
        return state
          .set('isFetching', false)
          .set(
            ReduxCollections.CATEGORY,
            normalizeArr<CategoryPayload>(action.payload?.categories),
          );

      case CategoryAction.TYPES.FETCH.FAILURE:
        return state.set('isFetching', false).set('error', action.error);

      default:
        return state;
    }
  };

  static handleUpdate = (
    state: RecordOf<CategoryState>,
    action: StandardAction<{ category: CategoryPayload }>,
  ): RecordOf<CategoryState> => {
    switch (action.type) {
      case CategoryAction.TYPES.UPDATE.START:
        return state
          .setIn(['isUpdatingById', action.payload?.category._id], true)
          .set('error', '');

      case CategoryAction.TYPES.UPDATE.SUCCESS:
        return state
          .setIn(['isUpdatingById', action.payload?.category._id], false)
          .setIn(
            ['categories', action.payload?.category._id],
            action.payload?.category,
          );

      case CategoryAction.TYPES.UPDATE.FAILURE:
        return state
          .setIn(['isUpdatingById', action.payload?.category._id], false)
          .set('error', action.error);
      default:
        return state;
    }
  };

  static handleUpdatePartial = (
    state: RecordOf<CategoryState>,
    action: StandardAction<{ category: CategoryPayload }>,
  ): RecordOf<CategoryState> => {
    switch (action.type) {
      case CategoryAction.TYPES.UPDATE_PARTIAL.START:
        return state
          .setIn(['isUpdatingById', action.payload?.category._id], true)
          .set('error', '');
      case CategoryAction.TYPES.UPDATE_PARTIAL.SUCCESS:
        if (action.payload) {
          const currentCategory = state.categories[action.payload.category._id];
          const mergedCategory = merge(
            currentCategory,
            action.payload.category,
          );
          return state
            .setIn(['isUpdatingById', action.payload?.category._id], false)
            .setIn(
              ['categories', action.payload?.category._id],
              mergedCategory,
            );
        }
        return state;

      case CategoryAction.TYPES.UPDATE_PARTIAL.FAILURE:
        return state
          .setIn(['isUpdatingById', action.payload?.category._id], false)
          .set('error', action.error);

      default:
        return state;
    }
  };

  static handleAddContinues = (
    state: RecordOf<CategoryState>,
    action: StandardAction<{}, { collections: ReduxCollectionType }>,
  ): RecordOf<CategoryState> => {
    const categories = action.meta?.collections[ReduxCollections.CATEGORY];
    if (categories?.length) {
      const currentCategories = state.categories;
      const mergedCategory = merge(currentCategories, normalizeArr(categories));
      return state.set(ReduxCollections.CATEGORY, mergedCategory);
    }
    return state;
  };
}
