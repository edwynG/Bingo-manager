import { Carton, Matrix } from "./game";

export interface SesionPatternProps {
  matrix: Matrix<Boolean>;
  numberCarton: number;
}

export interface SesionCreateBoard {
  stateArray: Carton[];
  selectBoard: number;
}
