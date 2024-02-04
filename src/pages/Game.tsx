import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useInterval } from "usehooks-ts";
import GameInputs from "../components/GameInputs";
import ProgressBar from "../components/ProgressBar";
import { setGrid, setPaused } from "../store/gameSlice";
import GameOfLife from "../components/GameOfLife";
import generateGrid from "../components/GameOfLife/generateGrid";
import { useAppSelector } from "../hooks/useAppSelector";
import { populateInitialGrid } from "../assets/utils";

const Game = () => {
  const dispatch = useDispatch();
  const state = useAppSelector((s) => s.game);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    dispatch(
      setGrid(
        populateInitialGrid(
          state.gridHeight,
          state.gridWidth,
          state.lifeProbability,
        ),
      ),
    );
  }, [dispatch, state.gridHeight, state.gridWidth, state.lifeProbability]);

  const runSimulation = useCallback(
    () =>
      dispatch(
        setGrid(
          generateGrid(
            state.grid,
            state.gridHeight,
            state.gridWidth,
            setProgress,
          ),
        ),
      ),
    [dispatch, state.grid, state.gridHeight, state.gridWidth],
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
      <GameOfLife grid={state.grid} />
    </>
  );
};

export default Game;
