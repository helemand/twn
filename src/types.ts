export type ImageType = {
  [key: string]: string;
};

export type Person = {
  body: string;
  image: ImageType;
  firstname: string;
  id: string;
  intro: string;
  sex: string;
  phone: string;
  personal_code: string | number;
  surname: string;
};

export type QueryResult = {
  list: Person[];
};

export type Fields = {
  [key: string]: string;
};

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export type SortColumn = keyof Person;

export enum Cell {
  ALIVE = "alive",
  GRAVE = "grave",
  NEUTRAL = "neutral",
}

export type Grid = Cell[][];
