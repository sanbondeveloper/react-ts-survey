import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import { QuestionType } from '../../types/question';

export interface SurveyState {
  title: string;
  description: string;
  questions: QuestionType[];
}

const initialState: SurveyState = {
  title: '',
  description: '',
  questions: [],
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
    addQuestion: (state, action: PayloadAction<number>) => {
      const newId = action.payload;

      state.questions.push({
        id: newId,
        title: '',
        type: 'SHORT',
        options: [{ id: 1, value: '옵션 1' }],
        required: false,
        isFocus: true,
      });
    },
    copyQuestion: (state, action: PayloadAction<{ newId: number; copiedId: number }>) => {
      const { newId, copiedId } = action.payload;
      const index = state.questions.findIndex((question) => question.id === copiedId);
      const copiedQuestion = state.questions[index];

      state.questions.splice(index + 1, 0, { ...copiedQuestion, id: newId });
    },
    removeQuestion: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const newQuestions = state.questions.filter((question) => question.id !== id);

      state.questions = newQuestions;
    },
    toggleRequired: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const question = state.questions.find((question) => question.id === id);

      if (question) {
        question.required = !question.required;
      }
    },
    changeQuestionTitle: (state, action: PayloadAction<{ id: number; title: string }>) => {
      const { id, title } = action.payload;
      const question = state.questions.find((question) => question.id === id);

      if (question) question.title = title;
    },
    changeQuestionType: (state, action: PayloadAction<{ id: number; type: QuestionType['type'] }>) => {
      const { id, type } = action.payload;
      const question = state.questions.find((question) => question.id === id);

      if (question) question.type = type;
    },
  },
});

export const {
  changeTitle,
  changeDescription,
  addQuestion,
  copyQuestion,
  removeQuestion,
  toggleRequired,
  changeQuestionTitle,
  changeQuestionType,
} = surveySlice.actions;

export const selectTitle = (state: RootState) => state.survey.title;

export const selectDesc = (state: RootState) => state.survey.description;

export const selectQuestions = (state: RootState) => state.survey.questions;

export const selectQuestionIds = createSelector(selectQuestions, (questions) =>
  questions.map((question) => question.id),
);

export default surveySlice.reducer;
