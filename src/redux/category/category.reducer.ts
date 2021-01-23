import { RecordOf, Record } from 'immutable';

import CategoryAction from './category.actions';
import { StandardAction } from '../types';
import { CategoryPayload, CategoryState } from './types';
import { generateIndexes, updateAndIndexingData } from 'redux/helpers';
import { ReduxCollections, ReduxCollectionType, ReduxModules } from 'enums';

const initData: CategoryState = {
  isFetching: false,
  error: null,
  categories: {},
  isUpdatingById: {},
  indexes: generateIndexes(ReduxModules.CATEGORY),
};

const initialState = Record(initData)(initData);

export default class CategoryReducer {
  static getReducer(
    state: RecordOf<CategoryState> = initialState,
    action: StandardAction,
  ): RecordOf<CategoryState> {
    // Handle add from other redux modules
    const Meta = action.meta as { collections?: ReduxCollectionType };
    const categoriesFromMeta = Meta?.collections?.[ReduxCollections.CATEGORY];
    if (categoriesFromMeta && categoriesFromMeta?.length) {
      return CategoryReducer.handleAddContinues(
        state,
        categoriesFromMeta || [],
      );
    }
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
        return updateAndIndexingData(
          action.payload?.categories,
          ReduxModules.CATEGORY,
          state,
        ).set('isFetching', false);

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
        return updateAndIndexingData(
          [action.payload?.category],
          ReduxModules.CATEGORY,
          state,
        ).setIn(['isUpdatingById', action.payload?.category._id], false);

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
          return updateAndIndexingData(
            [action.payload?.category],
            ReduxModules.CATEGORY,
            state,
            true,
          ).setIn(['isUpdatingById', action.payload?.category._id], false);
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
    categories: CategoryPayload[],
  ): RecordOf<CategoryState> => {
    return updateAndIndexingData(categories, ReduxModules.CATEGORY, state);
  };
}
