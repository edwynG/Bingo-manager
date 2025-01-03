import { Matrix } from "./game";
import { TableIndexProps } from "./table";

export interface EditableBoardProps {
  number: number;
  handleBoardFill?: (e: any, position: TableIndexProps) => void;
  fillBoard: Matrix<any>;
  titleEditable?: boolean;
  onInputTitle?: (e: any) => void;
}
