import { Carton } from "./game";

export interface BoardMenuProps {
  arr: Carton[];
  onClickCard: (e: any, idCard: any) => void;
  selectedCard?: number;
  classNameContainer?: string;
  classNameCard?: string;

}
