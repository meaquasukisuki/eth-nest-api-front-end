/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const initialState = {
  loading: false,
  error: false,
  currentUserToken: '',
  isLoggedIn: false,
  userData: {
    username: '',
    password: '',
  },
  errorMessage: '',
};

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectErrorMessage = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.errorMessage,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectUserdata = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData,
  );

const makeSelectLogin = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUserToken && globalState.isLoggedIn,
  );

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectErrorMessage,
  makeSelectLocation,
  makeSelectUserdata,
  makeSelectLogin,
};
