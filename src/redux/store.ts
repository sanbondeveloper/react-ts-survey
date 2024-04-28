import { configureStore } from '@reduxjs/toolkit';

import surveyReducer from './slices/surveySlice';
import previewReducer from './slices/previewSlice';

const store = configureStore({
  reducer: {
    survey: surveyReducer,
    preview: previewReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
