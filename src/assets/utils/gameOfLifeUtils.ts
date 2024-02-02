import { Cell, Grid } from "../../types";

export const getAliveCellCount = (grid: Grid) =>
  grid.flat().filter((cell) => cell === Cell.ALIVE).length;

export const getCellColor = (cell: Cell) =>
  ({
    [Cell.ALIVE]: "white",
    [Cell.GRAVE]: "#adf0d028",
    [Cell.NEUTRAL]: "#3a3d57",
  }[cell]);
