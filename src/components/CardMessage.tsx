import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { CardMessageProps } from "../types/cards";

export const CardMessage: React.FC<CardMessageProps> = ({
  title,
  content,
  classNameContainer = "",
  classNameTitle = "",
  classNameContent = "",
  setShow,
}) => {
  const ref = useRef(null);
  const time: number = 4000;
  setTimeout(() => setShow(false), time);

  setTimeout(() => {
    const div: HTMLDivElement = ref.current as any;
    if (div) {
      div.classList.replace("opacity-100", "opacity-0");
    }
  }, time - 1000);

  setTimeout(() => {
    const div: HTMLDivElement = ref.current as any;
    if (div) {
      div.classList.replace("opacity-0", "opacity-100");
    }
  }, time - time);

  return ReactDOM.createPortal(
    <section
      ref={ref}
      className={`fixed w-64 h-28 font-K2D right-0 bottom-0 !m-2 p-2 shadow-lg rounded-lg flex flex-col justify-center text-white   items-center gap-2 transition-opacity opacity-0 duration-500 ${classNameContainer}`}
    >
      <h2 className={`text-2xl font-bold ${classNameTitle}`}>{title}</h2>
      <section className={`text-center font-light ${classNameContent}`}>{content}</section>
    </section>,
    document.getElementById("root") as any
  );
};
