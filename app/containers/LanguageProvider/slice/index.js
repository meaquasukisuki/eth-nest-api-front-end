import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_LOCALE } from '../../../i18n';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    locale: DEFAULT_LOCALE,
  },
  reducers: {
    changeLocale(state, action) {
      state.locale = action.payload;
    },
  },
});

export default languageSlice;
