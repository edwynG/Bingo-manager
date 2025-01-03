import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Button } from "./Button";
import { CardConfirmProps } from "../types/cards";

export const useCardConfirmState = () => {
    const [appearWarn, setAppearWarn] = useState<boolean>(false);
    const [messageWarn, setMessageWarn] = useState<{
      title: string;
      content: string;
      onClickContinue: (e: any) => void;
    }>({
      title: "",
      content: "",
      onClickContinue: () => {},
    });
  
    return { appearWarn, messageWarn, setAppearWarn, setMessageWarn };
  };


const CardConfirm: React.FC<CardConfirmProps> = ({
  title,
  content,
  classNameContainer,
  classNameContent,
  classNameTitle,
  setShow,
  notButtonCancel = false,
  onClickContinue,
}) => {
  const ref = useRef(null);
  const time: number = 50;
  const timeEnd: number = 400;

  setTimeout(() => {
    const div: HTMLDivElement = ref.current as any;
    if (div) {
      div.classList.replace("opacity-0", "opacity-100");
    }
  }, time);

  const closeCard = () => {
    const div: HTMLDivElement = ref.current as any;
    if (div) {
      div.classList.replace("opacity-100", "opacity-0");
    }
    setTimeout(() => {
      setShow(false);
    }, timeEnd);
  };
  return ReactDOM.createPortal(
    <section
      className="fixed left-0 right-0 bottom-0 top-0 bg-[#00000032] opacity-0 transition-opacity duration-500 flex justify-center items-center"
      ref={ref}
    >
      <section
        className={`w-[280px] sm:w-[330px] h-[270px] sm:h-[220px] font-K2D !m-2 p-2 shadow-lg rounded-lg flex flex-col justify-center items-center gap-4 ${classNameContainer} bg-white duration-300`}
      >
        <h2 className={`text-2xl font-bold ${classNameTitle}`}>{title}</h2>
        <section
          className={`text-center font-light text-sm ${classNameContent}`}
        >
          {content}
        </section>
        <section className="flex gap-2 flex-wrap justify-center">
          <Button
            text="Continuar"
            onClick={(e) => {
              closeCard();
              setTimeout(() => onClickContinue(e), timeEnd-100);
            }}
            className="bg-blue-600 hover:bg-blue-500 sm:!w-36"
          />
          {!notButtonCancel && (
            <Button
              text="Cancelar"
              onClick={closeCard}
              className="bg-red-600 hover:bg-red-500 sm:!w-36"
            />
          )}
        </section>
      </section>
    </section>,
    document.getElementById("root") as any
  );
};

export default CardConfirm;
