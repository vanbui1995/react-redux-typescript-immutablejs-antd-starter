/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from 'redux/auth/auth.reducer';
import TodoReducer from 'redux/todo/todo.reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer() {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  return combineReducers({
    auth: AuthReducer.getReducer,
    todos: TodoReducer.getReducer,
  });
}
