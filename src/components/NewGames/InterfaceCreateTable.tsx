import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import GroupButtonSetBoard from "./InterfaceCreateTable/GroupButtonSetBoard";
import RenderStartInterfce from "./InterfaceCreateTable/EmptyStartMessage";
import BoardMenu from "./BoardMenu";
import { Carton, Round } from "../../types/game";
import { GameStateContext } from "../../pages/NewGames";
import { AppContextProps, GameStateContextprops } from "../../types/appContext";
import useArrayState from "../../hooks/useVectorState";
import EditableBoard from "./InterfaceCreateTable/EditableBoard";
import { TableIndexProps } from "../../types/table";

import { useMatrixState } from "../../hooks/useMatrixState";
import { AppContext } from "../../context/AppContext";
import { storageGame } from "../../utils/storageGame";
import { SesionCreateBoard } from "../../types/sesion";
import { CardMessage } from "../CardMessage";

const InterfaceCreateTable: React.FC = () => {
  const { setState } = useContext(GameStateContext) as GameStateContextprops;
  const { array, pushElementArr, removeElementArr, putElementArr, setArray } =
    useArrayState<Carton>();
  const { setItem, getItem, deleteSesion } =
    storageGame<SesionCreateBoard>("stateArrayCartons");
  const { stateGame } = useContext(AppContext) as AppContextProps;
  const [stateIndexArr, setStateIndexArr] = useState<number>(-1);
  const row = 5;
  const col = 5;
  const { matrix, putMatrix, setMatrix, resetMatrix } = useMatrixState<number>(
    row,
    col,
    0
  );

  const [showMessage, setShowMessage] = useState(false);
  const [showMessageText, setShowMessageText] = useState<{
    title: string;
    content: string;
  }>({ title: "", content: "" });

  const buttonBack = () => {
    localStorage.clear();
    sessionStorage.clear();
    setState(0);
  };

  let isFirstRender = useRef(true);

  useLayoutEffect(() => {
    if (!getItem()) return;
    let { stateArray, selectBoard } = getItem() as SesionCreateBoard;
    if (stateArray.length === 0) {
      deleteSesion();
      return;
    }
    // Logica para mantener el estado de la sesion
    stateGame.restoreGame().then(() => {
      setArray(stateArray);
      setStateIndexArr(selectBoard);
      setMatrix(stateArray[selectBoard].matrix);
    });
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setItem({ stateArray: array, selectBoard: stateIndexArr });
    stateGame.setCartons(array);
    if (array[stateIndexArr]) {
      setMatrix(array[stateIndexArr].matrix)
    }

    // Condición para restablecer el estado del indice actual, colocandolo en -1 si el arreglo esta vacio y el indice esta en cero
    // -1 significa que no hay ningun carton seleccionado
    if (array.length === 0 && stateIndexArr == 0) {
      setStateIndexArr(-1);
      return;
    }
  }, [array]);

  const buttonStart = () => {
    if (array.length <= 0) {
      setShowMessageText({
        title: "Cree cartones",
        content: "No hay cartones para iniciar",
      });
      setShowMessage(true);
      localStorage.clear();
      return;
    }
    const round: Round = stateGame.getRounds()[0];
    stateGame.notFinish();
    stateGame.setLastGame({ round, resultCartons: [] }).then(() => setState(3));

  };

  const buttonDelete = () => {
    if (array.length <= 0) {
      setShowMessageText({
        title: "Sin cartones",
        content: "No hay cartones para eliminar",
      });
      setShowMessage(true);
      return;
    }
    removeElementArr(stateIndexArr);

    if (stateIndexArr <= 0 || array[stateIndexArr + 1]) {
      setStateIndexArr((prev) => prev);
      return;
    }

    setStateIndexArr((prev) => prev - 1);
  };

  const buttonAdd = () => {
    const carton: Carton = {
      id: Math.floor(Math.random() * 100 * (array.length + 1)),
      number: Math.floor(Math.random() * 100 * (array.length + 1)),
      matrix: Array.from({ length: row }, () => Array(col).fill(0)),
      rows: row,
      cols: col,
    };
    pushElementArr(carton);
    setStateIndexArr(array.length);
    resetMatrix();
  };

  const handleBoardFill = (e: any, { row, col }: TableIndexProps) => {
    const input: HTMLInputElement = e.target;
    const value: number = parseInt(input.innerText);
    if (isNaN(value)) {
      setShowMessageText({
        title: "Valor invalido",
        content: "El valor ingresado en el tablero no es un número",
      });
      setShowMessage(true);
      return;
    }
    putMatrix(row, col, value);
    putElementArr(stateIndexArr, { ...array[stateIndexArr], matrix: matrix });
  };

  const onClickElementsBoard = (_: any, id: number) => {
    const carton: Carton = array[stateIndexArr];
    if (carton.id === id) {
      setShowMessageText({
        title: "Seleccionado",
        content: "El carton esta seleccionado",
      });
      setShowMessage(true);
      return;
    }

    setMatrix(
      array.find((c: Carton, index: number) => {
        if (c.id === id) {
          setStateIndexArr(index);
          return c;
        }
      })?.matrix as any
    );
  };

  const onInputTitle = (e: any) => {
    const input: HTMLInputElement = e.target;
    const value: number = parseInt(input.innerText);
    if (isNaN(value)) {
      setShowMessageText({
        title: "Valor invalido",
        content: "El valor ingresado en el titulo no es un número",
      });
      setShowMessage(true);
      return;
    }

    if (value < 0) {
      setShowMessageText({
        title: "Valor invalido",
        content: "El valor ingresado debe ser positivo",
      });
      setShowMessage(true);
      return;
    }
    putElementArr(stateIndexArr, {
      ...array[stateIndexArr],
      number: value,
    });
  };

  return (
    <section className="max-w-5xl h-full flex flex-col justify-between gap-3 py-2 items-center">
      <GroupButtonSetBoard
        onClickAdd={buttonAdd}
        onClickStart={buttonStart}
        onClickDelete={buttonDelete}
        onClickBack={buttonBack}
      />

      {array.length != 0 && stateIndexArr != -1 ? (
        <EditableBoard
          number={array[stateIndexArr].number}
          handleBoardFill={handleBoardFill}
          fillBoard={matrix}
          onInputTitle={onInputTitle}
        />
      ) : (
        <RenderStartInterfce />
      )}
      <BoardMenu
        arr={array}
        onClickCard={onClickElementsBoard}
        selectedCard={stateIndexArr}
      />
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

export default InterfaceCreateTable;
