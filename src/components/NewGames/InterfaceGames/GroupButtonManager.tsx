import React, { useState } from "react";
import { Button } from "../../Button";
import { GroupButtonManagerProps } from "../../../types/groupButton";
import CardSearch from "./CardSearch";
import CardConfirm, { useCardConfirmState } from "../../CardConfirm";

const GroupButtonManager: React.FC<GroupButtonManagerProps> = ({
  numberGame,
  onClickNext,
  onSearchFilter,
  onClickHome,
  selectedCard,
  onClickCardBoard,
}) => {
  const [appear, setAppear] = useState<boolean>(false);
  const { appearWarn, setAppearWarn, messageWarn, setMessageWarn } =
    useCardConfirmState();
  const setShowCardSearch = () => setAppear((prev) => !prev);

  return (
    <>
      <section className="w-full flex-wrap h-auto  flex justify-around items-center gap-3 py-2">
        <h3 className="font-bold text-xl font-K2D pr-3 text-center">
          Ronda N°{numberGame}
        </h3>
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
                d="M5 20v-9.15L2.2 13L1 11.4L12 3l4 3.05V4h3v4.35l4 3.05l-1.2 1.6l-2.8-2.15V20h-5v-6h-4v6zm5-9.975h4q0-.8-.6-1.313T12 8.2t-1.4.513t-.6 1.312"
              />
            </svg>
          }
          onClick={() => {
            setMessageWarn({
              ...messageWarn,
              title: "Menu principal",
              content: "¿Seguro que desea salir al menu?",
              onClickContinue: onClickHome,
            });
            setAppearWarn(true);
          }}
          className="!w-11  !h-12 flex justify-center items-center text-6xl !bg-[#87A53A] hover:!bg-[#8FB432] text-white right-0 m-4 fixed bottom-14 md:bottom-0 md:relative md:m-0"
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
                d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
              />
            </svg>
          }
          onClick={() => setAppear((prev) => !prev)}
          className="!w-11  !h-12 flex justify-center items-center text-6xl !bg-blue-600 hover:!bg-blue-500 text-white bottom-0 right-0 m-4 fixed md:relative md:m-0"
        />

        <Button
          text="Terminar"
          className="!bg-red-600 hover:!bg-red-500 text-white"
          onClick={() => {
            setMessageWarn({
              ...messageWarn,
              title: "Siguiente ronda",
              content: "¿Seguro que quiere terminar la ronda?",
              onClickContinue: onClickNext,
            });
            setAppearWarn(true);
          }}
        />
      </section>

      {appear && (
        <CardSearch
          setShow={setShowCardSearch}
          onClickCardBoard={onClickCardBoard}
          selectedCard={selectedCard}
          onSearchFilter={onSearchFilter}
        />
      )}
      {appearWarn && <CardConfirm {...messageWarn} setShow={setAppearWarn} />}
    </>
  );
};

export default GroupButtonManager;
