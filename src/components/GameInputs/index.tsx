import React, { useState } from "react";
import "./index.scss";
import {
  GameState,
  setGridHeight,
  setGridWidth,
  setSpeed,
  setLifeProbability,
  setPaused,
} from "../../store/gameSlice";

import { useDispatch } from "react-redux";
import Select from "../Select";
import { useAppSelector } from "../../hooks/useAppSelector";

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

  const handleGridWidthChange = (value: number) => {
    setSelectedWidth(value);
  };

  const handleGridHeightChange = (value: number) => {
    setSelectedHeight(value);
  };

  const handleSpeedChange = (value: string) => {
    dispatch(setSpeed(value as "normal" | "slow" | "fast"));
  };

  const handleProbabilityChange = (value: number) => {
    dispatch(setLifeProbability(value));
  };

  const handleApplyClick = () => {
    dispatch(setGridWidth(Number(selectedWidth)));
    dispatch(setGridHeight(Number(selectedHeight)));
    dispatch(setPaused(false));
  };

  const generateSelectOptions = (
    min: number,
    max: number,
    increment: number
  ) => {
    const options = [];
    for (let i = min; i <= max; i += increment) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const generateSpeedOption = () => {
    return ["normal", "slow", "fast"].map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };

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
        options={generateSpeedOption()}
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
