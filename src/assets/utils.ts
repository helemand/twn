import { Cell, Grid } from "../types";

export const convertPersonalCodeToDate = (personalCode: string) => {
  const genderDigit = parseInt(personalCode.charAt(0), 10);
  const year = parseInt(personalCode.substring(1, 3), 10);
  const month = personalCode.substring(3, 5);
  const day = personalCode.substring(5, 7);

  const centuryOffsets: Record<number, number> = {
    1: 1800,
    2: 1800,
    3: 1900,
    4: 1900,
    5: 2000,
    6: 2000,
  };

  const fullYear = centuryOffsets[genderDigit] + year;

  return [fullYear, month, day].join(".");
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  const countryCode = phoneNumber.substring(0, 4);
  const remainingDigits = phoneNumber.substring(4);

  return `${countryCode} ${remainingDigits}`;
};

export const reverseDateFormat = (inputDate: string) => {
  const parts = inputDate.split(".");

  const [year, month, day] = parts;
  return `${day}.${month}.${year}`;
};

export const traverseGrid = (
  grid: Grid,
  cb: (cell: Cell, i: number, j: number) => void,
) => {
  grid.forEach((rows, i) => {
    rows.forEach((cell, j) => {
      cb(cell, i, j);
    });
  });
};

export const getAliveCellCount = (grid: Grid) =>
  grid.flat().filter((cell) => cell === Cell.ALIVE).length;

export const cellColors = {
  [Cell.ALIVE]: "white",
  [Cell.GRAVE]: "#adf0d028",
  [Cell.NEUTRAL]: "#3a3d57",
};

export const populateInitialGrid: (
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
