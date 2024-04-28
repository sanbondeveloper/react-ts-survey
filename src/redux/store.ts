import { configureStore } from '@reduxjs/toolkit';

import surveyReducer from './slices/surveySlice';

const store = configureStore({
  reducer: {
    survey: surveyReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
