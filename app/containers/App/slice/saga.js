import { call, put, takeLatest } from 'redux-saga/effects';

import history from 'utils/history';
import { makeRequest } from '../../../utils/request';
import appSlice from '.';

export function* login(action) {
  const userObject = action.payload;
  try {
    const { data } = yield call(makeRequest().post, 'auth/login', userObject);
    yield put(appSlice.actions.userLoginSuccess(data.cookie));
    yield put(appSlice.actions.clearUserData());
    history.push('/ethquery');
  } catch (err) {
    yield put(appSlice.actions.userLoginFail());
    yield put(appSlice.actions.clearUserData());
    history.push('/sorry');
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchUser() {
  yield takeLatest(appSlice.actions.userLoginStart.type, login);
}
