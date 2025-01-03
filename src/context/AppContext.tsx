import React, { createContext, ReactNode } from "react";
import { AppContextProps } from "../types/appContext";
import StateGame from "../utils/stateGame";

const AppContext = createContext<AppContextProps | undefined>(undefined);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const stateGame: StateGame = new StateGame();
  return (
    <AppContext.Provider value={{ stateGame }}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppProvider };
