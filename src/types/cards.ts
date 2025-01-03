import { Carton } from "./game";
import { Matrix } from "./game";
import { TableIndexProps } from "./table";

export interface CardSearchProps {
  setShow: (e: any) => void;
  onSearchFilter: (e: any) => Carton[];
  onClickCardBoard: (e: any, id: number) => void;
  selectedCard?: number;
}

export interface CardWinRondaProps {
  numberRonda: number;
  isfinish: boolean;
  onClickNext: (e: any) => void;
  arrWin: Carton[];
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface EditableBoardProps {
  number: number;
  handleBoardFill?: (e: any, position: TableIndexProps) => void;
  fillBoard: Matrix<any>;
  titleEditable?: boolean;
  onInputTitle?: (e: any) => void;
}

export interface CardMessageProps {
  title: string;
  content: any;
  classNameContainer?: string;
  classNameTitle?: string;
  classNameContent?: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CardConfirmProps {
  title: string;
  content: any;
  classNameContainer?: string;
  classNameTitle?: string;
  classNameContent?: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onClickContinue: (e: any) => void;
  notButtonCancel?: boolean;
}
