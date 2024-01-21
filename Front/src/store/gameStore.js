import { createSlice, configureStore } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: { values: [], imageUrls: [] },
  reducers: {
    setGames(state, action) {
      state.values = action.payload;
    },
    setImageUrls(state, action) {
      state.imageUrls = action.payload;
    },
  },
});

export const gameActions = gameSlice.actions;

export const store = configureStore({
  reducer: gameSlice.reducer,
});
