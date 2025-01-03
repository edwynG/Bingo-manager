import React, { createContext, useLayoutEffect, useState } from "react";
import Footer from "../components/Footer";
import InterfaceNumberOfGames from "../components/NewGames/InterfaceNumberOfGames";
import InterfacePatternForGame from "../components/NewGames/InterfacePatternForGame";
import InterfaceCreateTable from "../components/NewGames/InterfaceCreateTable";
import { GameStateContextprops } from "../types/appContext";
import InterfaceGame from "../components/NewGames/InterfaceGame";
import  { storageGame } from "../utils/storageGame";

const RenderTypeInterface: React.FC<{ type: number }> = ({ type }) => {
  switch (type) {
    case 1:
      return <InterfacePatternForGame />;

    case 2:
      return <InterfaceCreateTable />;
    case 3:
      return <InterfaceGame />;

    default:
      return <InterfaceNumberOfGames />;
  }
};

export const GameStateContext = createContext<
  GameStateContextprops | undefined
>(undefined);

const NewGames: React.FC = () => {
  const { setItem, getItem } = storageGame<number>("type");
  const [type, settype] = useState(() => {
    const savedType = getItem();
    return savedType !== null ? savedType : 0;
  });

  useLayoutEffect(() => {
    setItem(type !== undefined ? type : 0);
  }, [type]);

  return (
    <GameStateContext.Provider value={{ state: type, setState: settype }}>
      <section className="w-full h-full flex flex-col justify-center items-center gap-6 px-2">
        <RenderTypeInterface type={type !== undefined ? type : 0} />
        <Footer />
      </section>
    </GameStateContext.Provider>
  );
};

export default NewGames;
