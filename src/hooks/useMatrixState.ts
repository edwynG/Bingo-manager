import { useState } from "react";
import { Matrix } from "../types/game";

export const useMatrixState = <T>(
  rows: number,
  cols: number,
  initialValue: T
) => {
  const [matrix, setMatrix] = useState<Matrix<T>>(
    Array.from({ length: rows }, () => Array(cols).fill(initialValue))
  );

  const putMatrix = (row: number, col: number, value: T) => {
    setMatrix((prev) => {
      const newMatrix = [...prev];
      newMatrix[row][col] = value;
      return newMatrix;
    });
  };

  const updateMatrix = (matrix: Matrix<T>) => {
    setMatrix(() => {
      return matrix;
    });
  };

  const resetMatrix = () => {
    setMatrix(
      Array.from({ length: rows }, () => Array(cols).fill(initialValue))
    );
  };

  return { matrix, setMatrix: updateMatrix, putMatrix, resetMatrix };
};
