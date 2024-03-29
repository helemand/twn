import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./index.scss";
import {
  GameState,
  setGridHeight,
  setGridWidth,
  setSpeed,
  setLifeProbability,
  setPaused,
  setGrid,
  GameSpeed,
} from "../../store/gameSlice";
import Select from "../Select";
import { useAppSelector } from "../../hooks/useAppSelector";
import { populateInitialGrid } from "../../assets/utils";

interface GameInputsProps {
  onPauseResume: () => void;
  paused: boolean;
}

const GameInputs: React.FC<GameInputsProps> = ({ onPauseResume, paused }) => {
  const dispatch = useDispatch();
  const { gridHeight, gridWidth, speed, lifeProbability }: GameState =
    useAppSelector((state) => state.game);

  const [selectedWidth, setSelectedWidth] = useState<number>(gridWidth);
  const [selectedHeight, setSelectedHeight] = useState<number>(gridHeight);

  const handleGridWidthChange = (value: string) => {
    setSelectedWidth(Number(value));
  };

  const handleGridHeightChange = (value: string) => {
    setSelectedHeight(Number(value));
  };

  const handleSpeedChange = (value: string) => {
    dispatch(setSpeed(value as unknown as GameSpeed));
  };

  const handleProbabilityChange = (value: string) => {
    dispatch(setLifeProbability(Number(value)));
  };

  const handleApplyClick = () => {
    dispatch(setGridWidth(Number(selectedWidth)));
    dispatch(setGridHeight(Number(selectedHeight)));

    dispatch(
      setGrid(populateInitialGrid(gridHeight, gridWidth, lifeProbability)),
    );
    dispatch(setPaused(false));
  };

  const generateSelectOptions = (
    min: number,
    max: number,
    increment: number,
  ) => {
    const options = [];
    for (let i = min; i <= max; i += increment) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>,
      );
    }
    return options;
  };

  const generateSpeedOptions = () =>
    [GameSpeed.Normal, GameSpeed.Slow, GameSpeed.Fast].map((option) => (
      <option key={option} value={option}>
        {GameSpeed[option]}
      </option>
    ));

  return (
    <form className="game-form">
      <Select
        value={selectedWidth}
        onChange={handleGridWidthChange}
        options={generateSelectOptions(10, 80, 10)}
        label="Grid width"
      />
      <Select
        value={selectedHeight}
        onChange={handleGridHeightChange}
        options={generateSelectOptions(10, 50, 10)}
        label="Grid height"
      />
      <Select
        value={speed}
        onChange={handleSpeedChange}
        options={generateSpeedOptions()}
        label="Speed"
      />
      <Select
        value={lifeProbability}
        onChange={handleProbabilityChange}
        options={generateSelectOptions(10, 100, 10)}
        label="Initial life probability"
      />
      <div className="form-item">
        <button
          type="button"
          onClick={onPauseResume}
          className="form-button game-form-item"
        >
          {paused ? "Resume" : "Pause"}
        </button>
      </div>
      <div className="form-item">
        <button
          type="button"
          onClick={handleApplyClick}
          className="form-button game-form-item"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

export default GameInputs;
