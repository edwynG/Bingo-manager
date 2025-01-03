import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Button } from "../Button";
import Table from "../Table";
import { GameStateContext } from "../../pages/NewGames";
import { AppContextProps, GameStateContextprops } from "../../types/appContext";
import { TableIndexProps } from "../../types/table";
import { useMatrixState } from "../../hooks/useMatrixState";
import { AppContext } from "../../context/AppContext";
import { storageGame } from "../../utils/storageGame";
import { SesionPatternProps } from "../../types/sesion";
import { CardMessage } from "../CardMessage";

const InterfacePatternForGame: React.FC = () => {
  const { setState } = useContext(GameStateContext) as GameStateContextprops;
  const { stateGame } = useContext(AppContext) as AppContextProps;
  const { setItem, getItem, removeItem } =
    storageGame<SesionPatternProps>("pattern-game");
  const [numberCarton, setNumberCarton] = useState<number>(1);
  const row = 5;
  const col = 5;
  const { matrix, putMatrix, setMatrix, resetMatrix } = useMatrixState<boolean>(
    row,
    col,
    false
  );
  const [showMessage, setShowMessage] = useState(false);
  const [showMessageText, setShowMessageText] = useState<{
    title: string;
    content: string;
  }>({ title: "", content: "" });
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    // Logica para mantener el estado de la sesion
    const sesion = getItem() as SesionPatternProps;
    stateGame.restoreGame();
    if (!sesion) {
      console.warn("No se ha encontrado la sesión");
      return;
    }
    setNumberCarton(sesion.numberCarton);
    const matrix: boolean[][] = sesion.matrix as boolean[][];
    setMatrix(matrix);
    let arrPattern = matrix.reduce((acc, row) => acc.concat(row), []);
    document.querySelectorAll("#table > *").forEach((cell, i) => {
      if (!arrPattern[i]) return;
      cell.innerHTML = col
        ? " <span class='rounded-full p-4 bg-green-700 transition-all'></span>"
        : "";
    });
  }, []);

  useEffect(() => {
    // Evita renderizar en la primera carga para que no se remplace la logica de la sesion
    isFirstRender.current
      ? (isFirstRender.current = false)
      : setItem({ matrix, numberCarton });
  }, [numberCarton, matrix]);

  const handleContinue = () => {
    if (matrix.every((arr) => arr.every((e) => e === false))) {
      setShowMessageText({
        title: "Patrón vacío",
        content: "Tiene que indicar algún patrón para continuar",
      });
      setShowMessage(true);
      return;
    }
    document
      .querySelectorAll("#table > *")
      .forEach((cell) => (cell.innerHTML = ""));

    if (numberCarton <= stateGame.getNumberOfGames() - 1) {
      stateGame.setRoundPatternMatrix(numberCarton - 1, matrix);
      resetMatrix();
      setNumberCarton((prev) => prev + 1);
      return;
    }
    localStorage.clear();
    stateGame.setRoundPatternMatrix(numberCarton - 1, matrix);
    resetMatrix();
    setState(2);
  };

  const handlePanttren = (e: any, { row, col }: TableIndexProps) => {
    const element = e.currentTarget as HTMLDivElement;

    if (element.children.length == 0) {
      element.innerHTML =
        " <span class='rounded-full p-4 bg-green-700 transition-all'></span>";
      putMatrix(row, col, true);
      return;
    }
    putMatrix(row, col, false);
    element.innerHTML = "";
  };

  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-6">
      <section className="w-full h-auto  flex flex-col justify-center items-center gap-4">
        <h2 className="font-Kablammo text-5xl text-center pt-4">
          Ronda N°{numberCarton}
        </h2>
        <h3 className=" text-md text-center font-light">
          Realice el patrón que se necesita para ganar.
        </h3>
      </section>
      <section className="w-full h-auto  flex flex-col justify-center items-center gap-2 ">
        {<Table handleClickCell={handlePanttren} row={row} col={col} />}
      </section>
      <section className="w-full flex md:flex-wrap justify-center items-center gap-2 pt-5 flex-col md:flex-row">
        <Button
          text="Continuar"
          className="w-64 md:w-52 !bg-[#87A53A] hover:!bg-[#8FB432] "
          onClick={handleContinue}
        />
        <Button
          text="Cancelar"
          className="w-64 md:w-52 !bg-red-600 hover:!bg-red-500 transition-colors"
          onClick={() => {
            removeItem();
            setState(0);
          }}
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

export default InterfacePatternForGame;
