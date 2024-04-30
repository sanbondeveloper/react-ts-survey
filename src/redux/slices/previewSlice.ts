import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import { AnswerType } from '../../types/answer';

export interface PreviewState {
  answers: {
    [questionId: number]: string | AnswerType[] | null | undefined;
  };
  errorId: number;
}

const initialState: PreviewState = {
  answers: {},
  errorId: -1,
};

export const previewSlice = createSlice({
  name: 'preview',
  initialState,
  reducers: {
    changeAnswer: (state, action: PayloadAction<{ questionId: number; answer: string | AnswerType[] | null }>) => {
      const { questionId, answer } = action.payload;

      state.answers[questionId] = answer;

      if (questionId === state.errorId) {
        state.errorId = -1;
      }
    },
    setErrorId: (state, action: PayloadAction<number>) => {
      state.errorId = action.payload;
    },
  },
});

export const { changeAnswer, setErrorId } = previewSlice.actions;

export const selectAnswers = (state: RootState) => state.preview.answers;

export const selectErrorId = (state: RootState) => state.preview.errorId;

export const selectIsError = createSelector(
  selectErrorId,
  (_, questionId: number) => questionId,
  (ErrorId: number, questionId: number) => ErrorId === questionId,
);

export default previewSlice.reducer;
