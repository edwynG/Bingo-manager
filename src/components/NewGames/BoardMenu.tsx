import React from "react";
import { BoardMenuProps } from "../../types/boardMenu";

const BoardMenu: React.FC<BoardMenuProps> = ({
  arr,
  onClickCard,
  selectedCard =-1,
  classNameCard = "",
  classNameContainer = "",
}) => {
  return (
    <section className={`w-[275px] sm:w-80 lg:w-96  h-20 flex items-center gap-2 shadow-2xl border px-4 border-green-500 sh rounded-md mx-4 font-light flex-nowrap overflow-hidden overflow-x-auto scrollbar-track-slate-100 scrollbar-thin scrollbar-thumb-rounded-full ${classNameContainer}`}>
      {arr.map((carton, index) => (
        <div
          className={`w-13 h-13 min-h-12 min-w-12 bg-neutral-400 rounded-md shadow-md flex justify-center items-center font-K2D font-bold cursor-pointer hover:text-white hover:bg-green-500 transition-colors duration-200 ${
            selectedCard === index ? "!bg-green-500 !text-white" : ""
          } ${classNameCard}`}
          key={carton.number}
          onClick={(e) => onClickCard(e, carton.id)}
        >
          {carton.number}
        </div>
      ))}
    </section>
  );
};

export default BoardMenu;
