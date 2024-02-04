import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Grid } from "../types";
import { populateInitialGrid } from "../assets/utils";

export type Gamespeed = "normal" | "slow" | "fast";

export const TimeoutSpeed = {
  normal: 60,
  slow: 200,
  fast: 30,
};

export interface GameState {
  grid: Grid;
  gridWidth: number;
  gridHeight: number;
  speed: Gamespeed;
  lifeProbability: number;
  paused: boolean;
}

const initialState: GameState = {
  grid: populateInitialGrid(30, 70, 50),
  gridWidth: 70,
  gridHeight: 30,
  speed: "normal",
  lifeProbability: 50,
  paused: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGrid: (state: GameState, action: PayloadAction<Grid>) => {
      state.grid = action.payload;
    },
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
    setPaused: (state: GameState, action: PayloadAction<boolean>) => {
      state.paused = action.payload;
    },
  },
});

export const {
  setGrid,
  setGridWidth,
  setGridHeight,
  setSpeed,
  setLifeProbability,
  setPaused,
} = gameSlice.actions;
export default gameSlice.reducer;
