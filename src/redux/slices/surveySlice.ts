import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import { QuestionType } from '../../types/question';

export interface SurveyState {
  title: string;
  description: string;
  questions: QuestionType[];
  focusId: number;
}

const initialState: SurveyState = {
  title: '',
  description: '',
  questions: [],
  focusId: -1,
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
        hasEtc: false,
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

      if (!question) return;

      question.type = type;

      if (type !== 'RADIO' && type !== 'CHECKBOX') {
        question.hasEtc = false;
      }
    },
    addOption: (state, action: PayloadAction<{ id: number; newOptionId: number }>) => {
      const { id, newOptionId } = action.payload;
      const question = state.questions.find((question) => question.id === id);

      if (question) {
        const index = question.options.length;
        question.options.push({ id: newOptionId, value: `옵션 ${index + 1}` });
      }
    },
    toggleEtcOption: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const question = state.questions.find((question) => question.id === id);

      if (question) {
        question.hasEtc = !question.hasEtc;
      }
    },
    removeOption: (state, action: PayloadAction<{ id: number; optionId: number }>) => {
      const { id, optionId } = action.payload;
      const question = state.questions.find((question) => question.id === id);

      if (question) {
        const newOptions = question.options.filter((option) => option.id !== optionId);

        question.options = newOptions;
      }
    },
    changeOptionValue: (state, action: PayloadAction<{ id: number; optionId: number; value: string }>) => {
      const { id, optionId, value } = action.payload;
      const question = state.questions.find((question) => question.id === id);

      if (!question) return;

      question.options = question.options.map((option) => (option.id === optionId ? { ...option, value } : option));
    },
    updateFocus: (state, action: PayloadAction<number>) => {
      state.focusId = action.payload;
    },
    moveQuestion: (state, action: PayloadAction<{ srcIdx: number; dstIdx: number }>) => {
      const { srcIdx, dstIdx } = action.payload;
      const newQuestions = [...state.questions];
      const srcQuestion = newQuestions.splice(srcIdx, 1)[0];

      newQuestions.splice(dstIdx, 0, srcQuestion);

      state.questions = newQuestions;
    },
    moveOption: (state, action: PayloadAction<{ id: number; srcIdx: number; dstIdx: number }>) => {
      const { id, srcIdx, dstIdx } = action.payload;
      const question = state.questions.find((question) => question.id === id);

      if (question) {
        const newOptions = [...question.options];
        const srcOption = newOptions.splice(srcIdx, 1)[0];

        newOptions.splice(dstIdx, 0, srcOption);

        question.options = newOptions;
      }
    },
    initQuestions: (state, action: PayloadAction<QuestionType[]>) => {
      state.questions = action.payload;
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
  addOption,
  toggleEtcOption,
  removeOption,
  changeOptionValue,
  updateFocus,
  moveQuestion,
  moveOption,
  initQuestions,
} = surveySlice.actions;

export const selectTitle = (state: RootState) => state.survey.title;

export const selectDesc = (state: RootState) => state.survey.description;

export const selectQuestions = (state: RootState) => state.survey.questions;

export const selectQuestionIds = createSelector(selectQuestions, (questions) =>
  questions.map((question) => question.id),
);

export const selectFocusId = (state: RootState) => state.survey.focusId;

export const selectIsFocus = createSelector(
  selectFocusId,
  (_, questionId: number) => questionId,
  (focusId: number, questionId: number) => focusId === questionId,
);

export default surveySlice.reducer;
