import React, { MutableRefObject, useRef } from "react";
import ReactDOM from "react-dom";
import BoardMenu from "../BoardMenu";
import { Button } from "../../Button";
import { CardWinRondaProps } from "../../../types/cards";

const CardWinRonda: React.FC<CardWinRondaProps> = ({
  numberRonda,
  isfinish = false,
  onClickNext = (_: any) => {},
  arrWin = [],
  setShow = () => {},
}) => {
  const ref: MutableRefObject<HTMLDivElement | undefined> = useRef();
  const time: number = 500;

  setTimeout(
    () => ref.current?.classList.replace("opacity-0", "opacity-100"),
    time - 400
  );
  return ReactDOM.createPortal(
    <section
      className={`left-0 right-0 top-0 bottom-0 min-h-[500px] fixed  bg-[#00000032] transition-opacity flex flex-col justify-center items-center opacity-0  duration-350 z-40 overflow-auto`}
      ref={ref as any}
    >
      <section className="bg-white h-72 w-[270px] sm:w-[340px] rounded-md flex flex-col justify-center items-center gap-4 p-2 m-2">
        <h2 className="text-xl sm:text-2xl  font-Kablammo">
          Ha ganado la ronda #{numberRonda}
        </h2>
        {isfinish && (
          <h6 className="font-K2D font-light text-[10px] sm:text-[12px]">
            Esta ha sido la ultima ronda, ¡¡Felicidades!!
          </h6>
        )}
        <div className=" w-full min-h-16 flex justify-center items-center">
          <BoardMenu
            arr={arrWin}
            onClickCard={() => {}}
            classNameContainer="border-none !flex-wrap !overflow-x-none overflow-y-auto shadow-none h-full justify-center !h-auto"
          />
        </div>

        <Button
          text={isfinish ? "Salir" : "Siguiente"}
          className=" !bg-[#87A53A] hover:!bg-[#8FB432] text-white"
          onClick={(e) => {
            ref.current?.classList.replace("opacity-100", "opacity-0");
            setTimeout(() => {
              onClickNext(e);
              setShow(false);
            }, time);
          }}
        />
      </section>
    </section>,
    document.getElementById("root") as any
  );
};

export default CardWinRonda;
