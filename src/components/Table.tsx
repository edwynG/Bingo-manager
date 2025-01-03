import TableProps, { TableIndexProps } from "../types/table.ts";

const Table: React.FC<TableProps> = ({
  handleClickCell = () => {},
  handleInputCell = () => {},
  classNameGrid = "",
  classNameCell = "",
  clasNameCellCenter = "",
  contentEditable = false,
  contentCellCenter = "",
  row = 5,
  col = 5,
  fill = [],
}) => {
  const elements = fill.reduce((acc, arr) => acc.concat(arr), []);
  return (
    <div
      id="table"
      className={
        "grid grid-cols-5 grid-rows-5  w-64 h-64 items-center justify-items-center shadow-xl md:w-80 md:h-80  " +
        classNameGrid
      }
    >
      {Array.from({ length: row * col }).map((_, index) => {
        let position: TableIndexProps = {
          row: Math.floor(index / col),
          col: index % col,
        };
        if (index === 12) {
          return (
            <div
              key={index}
              id={index + ""}
              className={
                "w-full h-full bg-black border border-black flex justify-center font-bold font-K2D items-center cursor-pointer outline-none " +
                clasNameCellCenter
              }
            >
              {contentCellCenter}
            </div>
          );
        }
        return (
          <div
            key={index}
            id={index + ""}
            className={
              "w-full h-full bg-gray-300 border border-black flex justify-center items-center cursor-pointer outline-none " +
              classNameCell
            }
            onClick={(e: any) => handleClickCell(e, position)}
            onInput={(e: any) => handleInputCell(e, position)}
            contentEditable={contentEditable}
          >
            {elements.length != 0 ? elements[index] : ""}
          </div>
        );
      })}
    </div>
  );
};

export default Table;
