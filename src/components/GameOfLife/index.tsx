import { cellColors } from "../../assets/utils";
import { Grid } from "../../types";
import { useAppSelector } from "../../hooks/useAppSelector";
import "./index.scss";

interface GameProps {
  grid: Grid;
}

const GameOfLife: React.FC<GameProps> = ({ grid }) => {
  const state = useAppSelector((s) => s.game);

  return (
    <div className="game-container">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${state.gridWidth}, 1fr)`,
        }}
      >
        {grid.map((rows, i) =>
          rows
            .map((cell, j) => ({ cell, key: `${i}-${j}` }))
            .map(({ cell, key }) => (
              <div
                key={key}
                className="grid-cell"
                style={{
                  backgroundColor: cellColors[cell],
                }}
              />
            )),
        )}
      </div>
    </div>
  );
};

export default GameOfLife;
