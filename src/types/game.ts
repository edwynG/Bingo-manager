export type Matrix<T> = T[][];

export interface Carton {
  id: number;
  rows: number;
  cols: number;
  number: number;
  matrix: Matrix<number>;
}

export interface LastGame {
  round: Round;
  resultCartons: Matrix<boolean>[];
}

export interface Statistics {
  wins: number;
  losses: number;
  cartonsWon: Carton[];
  cartonsLost: Carton[];
  lastGame: LastGame;
}

export interface Round {
  number: number;
  pattern: Matrix<boolean>;
}

export interface Game {
  id: number;
  numberOfGames: number;
  rounds: Round[];
  cartons: Carton[];
  statistics: Statistics;
  finish: boolean;
}
