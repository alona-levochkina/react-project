export type SquareValue = "X" | "O" | null;

export interface GameState {
  history: SquareValue[][];
  currentMove: number;
  xIsNext: boolean;
}

export type BoardPosition = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
