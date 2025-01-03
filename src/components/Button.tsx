import React from "react";
import ButtonProps from "../types/Button";

export const Button: React.FC<ButtonProps> = ({ text, className, onClick }) => {
  const styleDefault: string =
    "w-52 h-13 p-3 hover:bg-[#8FB432] rounded-md bg-[#87A53A] transition-colors text-white font-bold shadow-lg";
  return (
    <button
      onClick={onClick}
      className={
        className == undefined
          ? styleDefault
          : "w-52 h-13 p-3 font-bold  bg-blue-600 text-white rounded-md shadow-lg " +
            className
      }
    >
      {text}
    </button>
  );
};
