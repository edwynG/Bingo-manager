import React, { MutableRefObject, useRef } from "react";
import ReactDOM from "react-dom";
import BoardMenu from "../BoardMenu";

import { Carton } from "../../../types/game";
import useArrayState from "../../../hooks/useVectorState";
import { CardSearchProps } from "../../../types/cards";

const CardSearch: React.FC<CardSearchProps> = ({

  setShow = () => {},
  onSearchFilter = () => [],
  onClickCardBoard = () => {},
  selectedCard,
}) => {
  const { array, setArray } = useArrayState<Carton>();
  const ref: MutableRefObject<HTMLDivElement | undefined> = useRef();
  const time: number = 500;
  setTimeout(
    () => ref.current?.classList.replace("opacity-0", "opacity-100"),
    time - 400
  );

  const closeCard = (e: any) => {
    ref.current?.classList.replace("opacity-100", "opacity-0");
    setTimeout(() => setShow(e), time);
  };

  return ReactDOM.createPortal(
    <div
      className={` right-0 top-0 left-0 bottom-0 min-h-96 fixed bg-[#00000032] transition-opacity flex flex-col justify-center items-center opacity-0 p-4 duration-500 `}
      onClick={(e) => {
        if (ref.current === e.target) {
          closeCard(e);
        }
      }}
      ref={ref as any}
    >
      <section className="h-[300px] sm:h-[330px] w-full sm:w-[416px] rounded-md bg-white py-5 pt-10 flex flex-col items-center gap-5 z-10 relative">
        <div className="absolute w-auto h-auto right-0 top-0 m-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className="cursor-pointer p-1 hover:bg-[#00000032] transition-colors rounded-full text-lg"
            onClick={closeCard}
          >
            <path
              fill="currentColor"
              d="m8.382 17.025l-1.407-1.4L10.593 12L6.975 8.4L8.382 7L12 10.615L15.593 7L17 8.4L13.382 12L17 15.625l-1.407 1.4L12 13.41z"
            />
          </svg>
        </div>
        <input
          type="text"
          name="search"
          id="search"
          className="bg-[#00000021] rounded-sm outline-none px-2 py-2 w-[85%]"
          placeholder="Buscar numeros en tableros (N o 4, 32, 1,..., N)"
          onInput={(e: any) => {
            setArray(onSearchFilter(e));
          }}
        />

        {array.length === 0 ? (
          <span className="h-full flex justify-center items-center font-K2D font-bold">
            No hay coincidencias
          </span>
        ) : (
          <BoardMenu
            arr={array}
            onClickCard={(e, id) => {
              onClickCardBoard(e, id);
              closeCard(e);
            }}
            selectedCard={selectedCard}
            classNameContainer="border-none !flex-wrap !overflow-x-none overflow-y-auto shadow-none h-full justify-center !h-auto"
          />
        )}
      </section>
    </div>,
    document.getElementById("root") as any
  );
};

export default CardSearch;
