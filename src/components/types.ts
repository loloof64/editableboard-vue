export interface Cell {
  file: number;
  rank: number;
}

export interface Move {
  start: Cell;
  end: Cell;
}
