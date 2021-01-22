/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';
import { ReduxModules } from 'enums';
import { AuthReducer } from 'redux/auth';
import { TodoReducer } from 'redux/todo';
import { CategoryReducer } from 'redux/category';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer() {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  return combineReducers({
    [ReduxModules.AUTH]: AuthReducer.getReducer,
    [ReduxModules.TODO]: TodoReducer.getReducer,
    [ReduxModules.CATEGORY]: CategoryReducer.getReducer,
  });
}
