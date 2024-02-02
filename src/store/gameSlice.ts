import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Gamespeed = "normal" | "slow" | "fast";

export interface GameState {
  gridWidth: number;
  gridHeight: number;
  speed: Gamespeed;
  lifeProbability: number;
}

const initialState: GameState = {
  gridWidth: 70,
  gridHeight: 30,
  speed: "normal",
  lifeProbability: 50,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGridWidth: (state: GameState, action: PayloadAction<number>) => {
      state.gridWidth = action.payload;
    },
    setGridHeight: (state: GameState, action: PayloadAction<number>) => {
      state.gridHeight = action.payload;
    },
    setSpeed: (state: GameState, action: PayloadAction<Gamespeed>) => {
      state.speed = action.payload;
    },
    setLifeProbability: (state: GameState, action: PayloadAction<number>) => {
      state.lifeProbability = action.payload;
    },
  },
});

export const { setGridWidth, setGridHeight, setSpeed, setLifeProbability } =
  gameSlice.actions;
export default gameSlice.reducer;
