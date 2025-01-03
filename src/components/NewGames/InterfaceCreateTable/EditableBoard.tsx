import React from "react";
import Table from "../../Table";
import { EditableBoardProps } from "../../../types/editableBoard";

const EditableBoard: React.FC<EditableBoardProps> = ({
  number,
  handleBoardFill = () => {},
  fillBoard = [],
  titleEditable = true,
  onInputTitle = () => {},
}) => {
  return (
    <section className="w-full h-auto flex flex-col justify-around items-center gap-4">
      <div className="w-full h-auto flex flex-col justify-center items-center gap-2">
        <h2 className="text-4xl font-K2D font-extrabold">
          N°
          <span onInput={onInputTitle} contentEditable={titleEditable}>
            {number}
          </span>
        </h2>
        <p className="font-light text-center">
          Complete su carton selecionando cada celda.
        </p>
      </div>
      <Table
        contentEditable={true}
        handleInputCell={handleBoardFill}
        fill={fillBoard}
      />
    </section>
  );
};

export default EditableBoard;
