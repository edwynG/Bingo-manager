import StateGame from "../utils/stateGame.ts";

export interface AppContextProps {
  stateGame: StateGame;
}

export interface GameStateContextprops {
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
}
