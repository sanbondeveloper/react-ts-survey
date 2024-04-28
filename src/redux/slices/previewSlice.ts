import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

export interface PreviewState {
  something: number[];
}

const initialState: PreviewState = {
  something: [],
};

export const previewSlice = createSlice({
  name: 'preview',
  initialState,
  reducers: {
    something: (state, action: PayloadAction<number>) => {
      state.something.push(action.payload);
    },
  },
});

export const { something } = previewSlice.actions;

export const selectOrder = (state: RootState) => state.preview.something;

export default previewSlice.reducer;
