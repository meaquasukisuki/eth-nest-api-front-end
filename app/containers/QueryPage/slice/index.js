import { createSlice } from '@reduxjs/toolkit';

const querySlice = createSlice({
  name: 'eth-query',
  initialState: {
    queryField: {
      page: 1,
      limit: 10,
      callerAddress: '',
      calleeAddress: '',
      methodName: '',
    },
  },

  reducers: {
    queryFieldChange(state, action) {
      state.queryField = action.payload;
    },
    queryExternalDataStart(state, action) {
      //   appSlice.
    },
    userLoginSuccess(state, action) {
      state.loading = false;
      state.isLoggedIn = true;
      state.error = false;
      state.errorMessage = '';
      state.currentUserToken = action.payload;
    },
    userLoginFail(state, action) {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = true;
      if (action.payload) {
        state.errorMessage = action.payload;
      }
    },
    clearUserData(state, action) {
      state.userData = {
        username: '',
        password: '',
      };
    },
    setError(state, action) {
      state.error = true;
      state.errorMessage = action.payload;
    },
  },
});

export default querySlice;
