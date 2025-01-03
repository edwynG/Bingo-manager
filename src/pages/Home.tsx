import React, { useContext, useLayoutEffect, useState } from "react";
import { Button } from "../components/Button";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { AppContextProps } from "../types/appContext";
import { storageGame } from "../utils/storageGame";
import { LastGame } from "../types/game";
import { CardMessage } from "../components/CardMessage";

const Home: React.FC = () => {
  const { stateGame } = useContext(AppContext) as AppContextProps;
  const { setItem } = storageGame<number>("type");
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  useLayoutEffect(() => {
    stateGame.restoreGame();
  });
  return (
    <section className="w-full h-full flex flex-col justify-center items-center space-y-10">
      <section className="w-full h-full flex flex-col justify-center items-center gap-4">
        <h1 className="font-Kablammo text-6xl text-center">Bingo manager</h1>
        <section className="w-full flex flex-col justify-center items-center gap-2 space-y-3 mt-10">
          <Button
            text="Nueva partida"
            className="md:w-64  !bg-[#87A53A] hover:!bg-[#8FB432]  "
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              navigate("/newGames");
            }}
          />
          <Button
            text="Continuar"
            className="md:w-64 !bg-[#A8E01A] p-3 rounded-md hover:!bg-[#AEEC12] transition-colors "
            onClick={() => {
              const lastGame: LastGame = stateGame.getLastGame();
              const isNotSavedGame: boolean =
                lastGame.round.number <= 0 &&
                lastGame.resultCartons.length <= 0 &&
                lastGame.resultCartons.length <= 0;

              if (stateGame.isFinish() || isNotSavedGame) {
                setShowMessage(true);

                return;
              }
              setItem(3);
              navigate("/newGames");
            }}
          />
        </section>
      </section>
      <Footer />
      {showMessage && (
        <CardMessage
          title="No hay partida"
          content="No hay ninguna partida ha restaurar"
          classNameContainer="bg-orange-500"
          setShow={setShowMessage}
        />
      )}
    </section>
  );
};

export default Home;
