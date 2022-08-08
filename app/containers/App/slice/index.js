import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'global',
  initialState: {
    loading: false,
    error: false,
    currentUserToken: '',
    isLoggedIn: false,
    userData: {
      username: '',
      password: '',
    },
    errorMessage: '',
  },

  reducers: {
    userDataChange(state, action) {
      state.userData = action.payload;
    },
    userLoginStart(state, action) {
      state.loading = true;
      state.userData = action.payload;
      state.isLoggedIn = false;
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

export default appSlice;
