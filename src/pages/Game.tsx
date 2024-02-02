import { useState, useCallback, useEffect } from "react";
import GameInputs from "../components/GameInputs";
import ProgressBar from "../components/ProgressBar";
import { GameState } from "../store/gameSlice";
import { useInterval } from "usehooks-ts";
import GameOfLife from "../components/GameOfLife/index.tsx";
import generateGrid from "../components/GameOfLife/generateGrid.ts";
import { Cell, Grid } from "../types";
import { useAppSelector } from "../hooks/useAppSelector.ts";

const timeoutSpeed = {
  normal: 300,
  slow: 1000,
  fast: 100,
};

const populateInitialGrid: (
  rows: number,
  cols: number,
  probability: number
) => Grid = (rows: number, cols: number, probability: number) => {
  return Array.from({ length: rows }, () =>
    Array(cols)
      .fill(Cell.NEUTRAL)
      .map(() => {
        return Math.random() > probability / 100 ? Cell.NEUTRAL : Cell.ALIVE;
      })
  );
};

const Game = () => {
  const state: GameState = useAppSelector((state) => state.game);

  const [grid, setGrid] = useState(
    populateInitialGrid(
      state.gridHeight,
      state.gridWidth,
      state.lifeProbability
    )
  );
  const [progress, setProgress] = useState(100);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setGrid(
      populateInitialGrid(
        state.gridHeight,
        state.gridWidth,
        state.lifeProbability
      )
    );
  }, [state.gridHeight, state.gridWidth, state.lifeProbability]);

  useInterval(() => {
    if (paused) return;
    runSimulation(setProgress);
  }, timeoutSpeed[state.speed]);

  const runSimulation = useCallback(
    (setProgress: (a: number) => void) => {
      setGrid((prevGrid) =>
        generateGrid(prevGrid, state.gridHeight, state.gridWidth, setProgress)
      );
    },
    [state.gridHeight, state.gridWidth]
  );

  const togglePause = () => {
    setPaused((value) => !value);
  };

  return (
    <div className="container">
      <div className="inner">
        <h1>Conways Game of Life</h1>
        <GameInputs onPauseResume={togglePause} paused={paused} />
        <ProgressBar percentage={progress} />
        <GameOfLife grid={grid} />
      </div>
    </div>
  );
};

export default Game;
