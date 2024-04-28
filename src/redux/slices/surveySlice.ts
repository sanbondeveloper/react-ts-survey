import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

export interface SurveyState {
  title: string;
  description: string;
}

const initialState: SurveyState = {
  title: '',
  description: '',
};

export const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    changeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    changeDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
  },
});

export const { changeTitle, changeDescription } = surveySlice.actions;

export const selectTitle = (state: RootState) => state.survey.title;

export const selectDesc = (state: RootState) => state.survey.description;

export default surveySlice.reducer;
