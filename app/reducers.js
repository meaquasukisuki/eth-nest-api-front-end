/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import appSlice from './containers/App/slice';
import languageSlice from './containers/LanguageProvider/slice';
import { queryApi } from './api/api';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: appSlice.reducer,
    [queryApi.reducerPath]: queryApi.reducer,
    language: languageSlice.reducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
