import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import BoardMenu from "./BoardMenu";
import GroupButtonManager from "./InterfaceGames/GroupButtonManager";
import Table from "../Table";
import { Carton, LastGame, Matrix, Round } from "../../types/game";
import { AppContextProps } from "../../types/appContext";
import { AppContext } from "../../context/AppContext";
import useArrayState from "../../hooks/useVectorState";
import { TableIndexProps } from "../../types/table";
import { useMatrixState } from "../../hooks/useMatrixState";
import { storageGame } from "../../utils/storageGame";
import { useNavigate } from "react-router-dom";
import CardWinRonda from "./InterfaceGames/CardWinRonda";
import { CardMessage } from "../CardMessage";
import CardConfirm, { useCardConfirmState } from "../CardConfirm";

const InterfaceGame: React.FC = () => {
  const navigate = useNavigate();
  const { array, setArray } = useArrayState<Carton>();
  const { stateGame } = useContext(AppContext) as AppContextProps;
  const rows = 5;
  const cols = 5;
  const { matrix } = useMatrixState<boolean>(rows, cols, false);
  const { setItem, getItem } = storageGame<number>("Select-board-game");
  const [stateIndexArr, setStateIndexArr] = useState<number>(0);
  const [round, setRound] = useState<Round>({
    number: 0,
    pattern: matrix,
  });
  const { array: arrayWin, setArray: setArrWin } = useArrayState<Carton>();
  const {
    array: arrayPatterns,
    setArray: setArrayPatterns,
    putElementArr: putArrayPatterns,
  } = useArrayState<Matrix<boolean>>();
  const isFirstRender = useRef(true);

  const [showMessageWin, setshowMessageWin] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showMessageText, setShowMessageText] = useState<{
    title: string;
    content: string;
  }>({ title: "", content: "" });

  const { appearWarn, setAppearWarn, messageWarn, setMessageWarn } =
    useCardConfirmState();

  useLayoutEffect(() => {
    let selecBoard: number | undefined = getItem();
    if (selecBoard != undefined) {
      setStateIndexArr(selecBoard);
    } else {
      setItem(stateIndexArr);
      selecBoard = stateIndexArr;
    }

    stateGame.restoreGame().then(() => {
      const cartons: Carton[] = stateGame.getCartons();
      const lastGame: LastGame = stateGame.getLastGame();
      setRound(lastGame.round)
      setArray(cartons);

      if (lastGame.resultCartons.length > 0 && selecBoard != undefined) {
        setArrayPatterns([...lastGame.resultCartons]);
        const collection: NodeListOf<HTMLDivElement> =
          document.querySelectorAll("#table > div");
        lastGame.resultCartons[selecBoard]
          .reduce((acc, row) => acc.concat(row), [])
          .forEach((e, i) => {
            if (e) {
              collection[i].classList.add("!bg-green-600");
              collection[i].classList.add("!text-white");
              return;
            }
            collection[i].classList.remove("!bg-green-600", "!text-white");
          });
        return;
      }

      const tempPatterns: Matrix<boolean>[] = [];
      cartons.forEach(() => {
        tempPatterns.push(
          Array.from({ length: rows }, () => Array(cols).fill(false))
        );
      });
      setArrayPatterns(tempPatterns);
    });
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    stateGame.setLastGame({
      round,
      resultCartons: arrayPatterns,
    });
    isWin();
  }, [arrayPatterns, round]);

  const isWin = () => {
    if (arrayPatterns.length === 0 || round.pattern.length === 0) {
      return;
    }
    const winPattern = round.pattern.reduce((acc, arr) => acc.concat(arr), []);
    const patternNow = arrayPatterns[stateIndexArr].reduce(
      (acc, arr) => acc.concat(arr),
      []
    );
    if (winPattern.length !== patternNow.length) {
      console.log("Aun no hay coincidencias del patrón");
      return;
    }
    if (
      !winPattern.every((e, i) => {
        if (!e) return true;
        if (e === patternNow[i]) {
          return true;
        }
      })
    ) {
      console.log("Aun no hay coincidencias del patrón");
      return;
    }
    setshowMessageWin(true);
    setArrWin([array[stateIndexArr]]);
  };

  const onClickCell = (e: any, { row, col }: TableIndexProps) => {
    const element = e.currentTarget as HTMLDivElement;
    const newPattern: Matrix<boolean> = arrayPatterns[stateIndexArr];
    newPattern[row][col] = !newPattern[row][col];
    putArrayPatterns(stateIndexArr, newPattern);
    element.classList.toggle("!bg-green-600");
    element.classList.toggle("!text-white");
    element.classList.toggle("element-pantern");
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
    array.forEach((c: Carton, index: number) => {
      if (c.id === id) {
        const collection: NodeListOf<HTMLDivElement> =
          document.querySelectorAll("#table > div");
        arrayPatterns[index]
          .reduce((acc, row) => acc.concat(row), [])
          .forEach((e, i) => {
            if (e) {
              collection[i].classList.add("!bg-green-600");
              collection[i].classList.add("!text-white");
              return;
            }
            collection[i].classList.remove("!bg-green-600", "!text-white");
          });
        setStateIndexArr(index);
        setItem(index);
      }
    });
  };

  const onClickNextRound = () => {
    const rounds: Round[] = stateGame.getRounds();
    rounds.forEach((r, i) => {
      if (r.number === round.number) {
        if (rounds.length <= i + 1) {
          stateGame.Finish();
          localStorage.clear();
          sessionStorage.clear();
          if (!showMessageWin) {
            setMessageWarn({
              ...messageWarn,
              title: "Fin del juego",
              content: "Esta ha sido la ultima ronda",
              onClickContinue: () => navigate("/"),
            });
            setAppearWarn(true);
            return;
          }
          navigate("/");
          return;
        }
        const tempPatterns: Matrix<boolean>[] = [];
        arrayPatterns.forEach(() => {
          tempPatterns.push(
            Array.from({ length: rows }, () => Array(cols).fill(false))
          );
        });
        setArrayPatterns(tempPatterns);
        document
          .querySelectorAll("#table > div")
          .forEach((e) => e.classList.remove("!bg-green-600", "!text-white"));
        setRound(rounds[i + 1]);
      }
    });
  };

  const onSearchFilter = (e: any): Carton[] => {
    const input: HTMLInputElement = e.currentTarget;
    const texts: number[] = input.value
      .split(",")
      .filter((e) => !isNaN(parseInt(e)))
      .map((e) => parseInt(e));

    return array.filter((e) => {
      const reduce = e.matrix.reduce((acc, arr) => acc.concat(arr), []);
      return texts.some((n) => reduce.some((m) => m === n));
    });
  };

  return (
    <section className="max-w-5xl h-full flex flex-col justify-between py-2 items-center gap-3">
      <GroupButtonManager
        numberGame={round.number}
        onClickNext={onClickNextRound}
        onSearchFilter={onSearchFilter}
        onClickHome={() => {
          localStorage.clear();
          sessionStorage.clear();
          navigate("/");
        }}
        onClickCardFilter={() => {

        }}
        selectedCard={stateIndexArr}
        onClickCardBoard={onClickElementsBoard}
      />
      <section className="w-full h-auto flex flex-col justify-center items-center gap-4 ">
        <h2 className="text-4xl font-K2D font-bold">
          N°{array[stateIndexArr]?.number}
        </h2>
        <Table
          fill={array[stateIndexArr]?.matrix}
          handleClickCell={onClickCell}
          classNameCell="hover:bg-green-500 hover:text-white transition-colors"
        />
      </section>
      <section className="w-full h-auto flex flex-col justify-center items-center gap-1 ">
        <h3 className="font-light font-K2D">Selecciona tu cartón</h3>
        <BoardMenu
          arr={array}
          onClickCard={onClickElementsBoard}
          selectedCard={stateIndexArr}
        />
      </section>
      {showMessageWin && (
        <CardWinRonda
          setShow={setshowMessageWin}
          arrWin={arrayWin}
          onClickNext={onClickNextRound}
          numberRonda={round.number}
          isfinish={
            stateGame.getRounds()[stateGame.getRounds().length - 1].number ===
            round.number
          }
        />
      )}
      {showMessage && (
        <CardMessage
          {...showMessageText}
          setShow={setShowMessage}
          classNameContainer="bg-orange-500"
        />
      )}
      {appearWarn && (
        <CardConfirm
          {...messageWarn}
          setShow={setAppearWarn}
          notButtonCancel={true}
          classNameContainer="h-[200px]"
        />
      )}
    </section>
  );
};

export default InterfaceGame;
