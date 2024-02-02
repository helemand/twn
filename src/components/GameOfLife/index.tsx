import { GameState } from "../../store/gameSlice";
import { getCellColor } from "../../assets/utils/gameOfLifeUtils";
import { Cell, Grid } from "../../types";
import { useAppSelector } from "../../hooks/useAppSelector";

interface GameProps {
  grid: Grid;
}

const GameOfLife: React.FC<GameProps> = ({ grid }) => {
  const state: GameState = useAppSelector((state) => state.game);

  return (
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
            style={{
              width: 12,
              height: 12,
              border: "1px solid rgb(58 61 87)",
              backgroundColor: getCellColor(cell),
            }}
          />
        ))
      )}
    </div>
  );
};

export default GameOfLife;
