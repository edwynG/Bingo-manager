import React, { useState } from "react";
import { Button } from "../../Button";

import { GroupButtonSetBoardProps } from "../../../types/groupButton";
import CardConfirm from "../../CardConfirm";

const GroupButtonSetBoard: React.FC<GroupButtonSetBoardProps> = ({
  onClickAdd,
  onClickDelete,
  onClickStart,
  onClickBack,
}) => {
  const [appearWarn, setAppearWarn] = useState<boolean>(false);
  const [messageWarn, setMessageWarn] = useState<{
    title: string;
    content: string;
    onClickContinue: (e:any) => void;
  }>({
    title: "",
    content: "",
    onClickContinue: () => {},
  });
  return (
    <section className="w-full h-auto flex flex-wrap-reverse justify-center items-center gap-3 py-2">
      <Button
        text={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z"
            />
          </svg>
        }
        className=" !w-11  !h-12 flex justify-center items-center !text-6xl !bg-red-600 hover:!bg-red-500 text-white bottom-0 right-0 m-4 fixed md:relative md:m-0"
        onClick={()=>{
          setMessageWarn({
            ...messageWarn,
            title: "Regresar",
            content: "¿Seguro desea regresar?",
            onClickContinue: onClickBack,
          });
          setAppearWarn(true);
        }}
      />
      <Button
        text={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 21q-.425 0-.712-.288T11 20v-7H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7V4q0-.425.288-.712T12 3t.713.288T13 4v7h7q.425 0 .713.288T21 12t-.288.713T20 13h-7v7q0 .425-.288.713T12 21"
            ></path>
          </svg>
        }
        className=" !w-11  !h-12 flex justify-center items-center text-2xl !bg-blue-600 hover:!bg-blue-500 text-white"
        onClick={onClickAdd}
      />
      <Button
        text={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21z"
            />
          </svg>
        }
        className="flex justify-center items-center text-xl !bg-red-600 hover:!bg-red-500 text-white !w-11 !h-12"
        onClick={()=>{
          setMessageWarn({
            ...messageWarn,
            title: "Eliminar carton",
            content: "¿Seguro que desea eliminar el carton?",
            onClickContinue: onClickDelete,
          });
          setAppearWarn(true);
        }}
      />
      <Button text="Comenzar" onClick={onClickStart} />
      {appearWarn && <CardConfirm {...messageWarn} setShow={setAppearWarn} />}
    </section>
  );
};

export default GroupButtonSetBoard;
