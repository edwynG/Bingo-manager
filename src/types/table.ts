import { ReactNode } from "react";
import { Matrix } from "./game";

 export interface TableIndexProps {
  row: number;
  col: number;
}

interface TableProps {
  handleClickCell?: (e: any, position: TableIndexProps ) => void;
  handleInputCell?: (e: any, position: TableIndexProps) => void;
  classNameCell?: string;
  classNameGrid?: string;
  clasNameCellCenter?: string;
  contentEditable?: boolean;
  contentCellCenter?: ReactNode | string;
  row?: number;
  col?: number;
  fill?:Matrix<any>
}
export default TableProps;
