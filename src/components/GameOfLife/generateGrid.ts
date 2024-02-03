import { Cell, Grid } from "../../types";
import { getAliveCellCount, traverseGrid } from "../../assets/utils";

const calculateAliveCellPercentage = (
  aliveCellCount: number,
  totalCells: number,
): number => {
  if (totalCells === 0) {
    return 0;
  }
  return Math.round((aliveCellCount / totalCells) * 100);
};

const generateEmptyGrid: (
  rows: number,
  cols: number,
  prevGrid: Grid,
) => Grid = (rows: number, cols: number, prevGrid: Grid) => {
  const nextGrid = Array.from({ length: rows }, () =>
    Array(cols).fill(Cell.NEUTRAL),
  );

  traverseGrid(prevGrid, (cell, x, y) => {
    if (cell === Cell.GRAVE) {
      nextGrid[x][y] = Cell.GRAVE;
    }
  });

  return nextGrid;
};

const generateGrid = (
  prevGrid: Grid,
  height: number,
  width: number,
  progressCallback: (a: number) => void,
) => {
  const nextGrid = generateEmptyGrid(height, width, prevGrid);

  traverseGrid(prevGrid, (cell, x, y) => {
    const neighbors = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ]
      .map(([a, b]) => prevGrid?.[x + a]?.[y + b])
      .filter((neighbour) => neighbour);

    const numAliveNeighbors = neighbors.filter(
      (neighbor) => neighbor === Cell.ALIVE,
    ).length;

    if (
      cell === Cell.ALIVE &&
      (numAliveNeighbors < 2 || numAliveNeighbors > 3)
    ) {
      nextGrid[x][y] = Cell.GRAVE;
    }

    if (
      cell === Cell.ALIVE &&
      (numAliveNeighbors === 3 || numAliveNeighbors === 2)
    ) {
      nextGrid[x][y] = Cell.ALIVE;
    }

    if (
      (cell === Cell.GRAVE || cell === Cell.NEUTRAL) &&
      numAliveNeighbors === 3
    ) {
      nextGrid[x][y] = Cell.ALIVE;
    }
  });

  const totalCells = height * width;
  const aliveCellCount = getAliveCellCount(nextGrid);

  progressCallback(calculateAliveCellPercentage(aliveCellCount, totalCells));

  return nextGrid;
};

export default generateGrid;
