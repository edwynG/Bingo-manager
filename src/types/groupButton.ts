import { Carton } from "./game";

export interface GroupButtonSetBoardProps {
  onClickAdd: (e: any) => void;
  onClickDelete: (e: any) => void;
  onClickStart: (e: any) => void;
  onClickBack: (e: any) => void;
}

export interface GroupButtonManagerProps {
  numberGame: number;
  onClickNext: (e?: any) => void;
  onSearchFilter: (e?: any) => Carton[];
  onClickHome: (e?: any) => void;
  onClickCardFilter: (e: any) => void;
  selectedCard: number;
  onClickCardBoard: (e: any, id: number) => void;
}
