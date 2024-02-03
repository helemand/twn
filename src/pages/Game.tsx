import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useInterval } from "usehooks-ts";
import GameInputs from "../components/GameInputs";
import ProgressBar from "../components/ProgressBar";
import { setPaused } from "../store/gameSlice";
import GameOfLife from "../components/GameOfLife";
import generateGrid from "../components/GameOfLife/generateGrid";
import { Cell, Grid } from "../types";
import { useAppSelector } from "../hooks/useAppSelector";

const populateInitialGrid: (
  rows: number,
  cols: number,
  probability: number,
) => Grid = (rows: number, cols: number, probability: number) =>
  Array.from({ length: rows }, () =>
    Array(cols)
      .fill(Cell.NEUTRAL)
      .map(() =>
        Math.random() > probability / 100 ? Cell.NEUTRAL : Cell.ALIVE,
      ),
  );

const Game = () => {
  const dispatch = useDispatch();
  const state = useAppSelector((s) => s.game);

  const [grid, setGrid] = useState(
    populateInitialGrid(
      state.gridHeight,
      state.gridWidth,
      state.lifeProbability,
    ),
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setGrid(
      populateInitialGrid(
        state.gridHeight,
        state.gridWidth,
        state.lifeProbability,
      ),
    );
  }, [state.gridHeight, state.gridWidth, state.lifeProbability]);

  const runSimulation = useCallback(
    () =>
      setGrid((prevGrid) =>
        generateGrid(prevGrid, state.gridHeight, state.gridWidth, setProgress),
      ),
    [state.gridHeight, state.gridWidth, setProgress],
  );

  useInterval(() => {
    if (state.paused) return;
    runSimulation();
  }, state.speed);

  const togglePause = () => {
    dispatch(setPaused(!state.paused));
  };

  return (
    <>
      <h1>Conways Game of Life</h1>
      <GameInputs onPauseResume={togglePause} paused={state.paused} />
      <ProgressBar percentage={progress} />
      <GameOfLife grid={grid} />
    </>
  );
};

export default Game;
