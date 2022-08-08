import { call, put, takeLatest } from 'redux-saga/effects';
import querySlice from '.';

import { makeRequest } from '../../../utils/request';

export function* queryExternalByInput(action) {
  const {
    page,
    limit,
    callerAddress,
    calleeAddress,
    methodName,
  } = action.payload;
  const queryField = {};
  try {
    if (callerAddress) {
      queryField.callerAddress = callerAddress;
    }
    if (calleeAddress) {
      queryField.calleeAddress = calleeAddress;
    }
    if (methodName) {
      queryField.methodName = methodName;
    }
    const { data } = yield call(
      makeRequest().post,
      `/local/queryTransactions/external/queryByInputFields`,
      queryField,
      {
        params: {
          page,
          limit,
        },
      },
    );
  } catch (err) {}
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchUser() {
  yield takeLatest(querySlice.actions.userLoginStart.type, login);
}
