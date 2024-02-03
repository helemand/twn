import { GameState } from "../../store/gameSlice";
import { getCellColor } from "../../assets/utils/gameOfLifeUtils";
import { Cell, Grid } from "../../types";
import { useAppSelector } from "../../hooks/useAppSelector";
import "./index.scss";

interface GameProps {
  grid: Grid;
}

const GameOfLife: React.FC<GameProps> = ({ grid }) => {
  const state: GameState = useAppSelector((state) => state.game);

  return (
    <div className="game-container">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${state.gridWidth}, 12px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((cell: Cell, j) => (
            <div
              key={`${i}-${j}`}
              className="grid-cell"
              style={{
                backgroundColor: getCellColor(cell),
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameOfLife;
