import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Gamespeed = "normal" | "slow" | "fast";

const timeoutSpeed = {
  normal: 300,
  slow: 1000,
  fast: 100,
};

export interface GameState {
  gridWidth: number;
  gridHeight: number;
  speed: number;
  lifeProbability: number;
  paused: boolean;
}

const initialState: GameState = {
  gridWidth: 70,
  gridHeight: 30,
  speed: timeoutSpeed.normal,
  lifeProbability: 50,
  paused: false,
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
      state.speed = timeoutSpeed[action.payload];
    },
    setLifeProbability: (state: GameState, action: PayloadAction<number>) => {
      state.lifeProbability = action.payload;
    },
    setPaused: (state: GameState, action: PayloadAction<boolean>) => {
      state.paused = action.payload;
    },
  },
});

export const {
  setGridWidth,
  setGridHeight,
  setSpeed,
  setLifeProbability,
  setPaused,
} = gameSlice.actions;
export default gameSlice.reducer;
