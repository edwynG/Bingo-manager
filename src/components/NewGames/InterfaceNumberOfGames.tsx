import React, { useContext, useRef, useState } from "react";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { GameStateContext } from "../../pages/NewGames";
import { AppContextProps, GameStateContextprops } from "../../types/appContext";
import { AppContext } from "../../context/AppContext";
import { Round } from "../../types/game";
import { CardMessage } from "../CardMessage";

const InterfaceNumberOfGames: React.FC = () => {
  const navigate = useNavigate();
  const { stateGame } = useContext(AppContext) as AppContextProps;
  const inputNumberRef = useRef<HTMLInputElement>(null);
  const { setState } = useContext(GameStateContext) as GameStateContextprops;
  const [showMessage, setShowMessage] = useState(false);
  const [showMessageText, setShowMessageText] = useState<{
    title: string;
    content: string;
  }>({ title: "", content: "" });

  const handleContinue = () => {
    try {
      if (!inputNumberRef.current) {
        throw new Error("El valor ingresado no es valido");
      }

      const value = parseInt(inputNumberRef.current.value);

      if (!isNaN(value) && value > 0) {
        const numberOfGames = inputNumberRef.current.value;
        stateGame.reset();
        stateGame.setNumberOfGames(parseInt(numberOfGames));
        let round: Round = { number: 0, pattern: [] };
        Array.from({ length: parseInt(numberOfGames) }).forEach((_, index) =>
          stateGame.addRound({ ...round, number: index + 1 })
        );
        localStorage.clear();
        setState(1);
        return;
      }

      throw new Error("El valor ingresado no es un número válido");
    } catch (error: any) {
      setShowMessageText({
        title: "Valor invalido",
        content: error.message,
      });
      setShowMessage(true);
    }
  };

  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-4">
      <section className="w-full h-auto  flex flex-col justify-center items-center gap-6">
        <h2 className="font-Kablammo text-5xl text-center ">
          Cantidad de rondas
        </h2>
        <p className="text-md text-center font-light">
          Debe indicar la cantidad de rondas que jugara en una partida.
        </p>
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-3 p-10">
        <input
          type="number"
          ref={inputNumberRef}
          className="w-52 md:w-64 p-3 rounded-md border border-gray-500 transition-colors focus:border-black outline-none focus:placeholder:text-black"
          placeholder="Ingrese un número"
          min="1"
          step="1"
        />
        <Button
          text="Continuar"
          className="md:w-64 !bg-[#87A53A] hover:!bg-[#8FB432] "
          onClick={handleContinue}
        />
        <Button
          text="Cancelar"
          className="md:w-64  !bg-red-600 hover:!bg-red-500 transition-colors"
          onClick={() => navigate("/")}
        />
      </section>
      {showMessage && (
        <CardMessage
          {...showMessageText}
          setShow={setShowMessage}
          classNameContainer="bg-orange-500"
        />
      )}
    </section>
  );
};

export default InterfaceNumberOfGames;
