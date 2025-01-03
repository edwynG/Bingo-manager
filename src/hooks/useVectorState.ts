import { useState } from "react";

const useArrayState = <T>() => {
  const [array, setArray] = useState<T[]>([]);

  const push = (value: T): void => {
    setArray([...array, value]);
  };

  const remove = (index: number): T => {
    const newArray = [...array];
    const old: T = newArray.splice(index, 1).pop() as T;
    setArray(newArray);
    return old;
  };
  
  const put = (index: number, value: T): T => {
    const newArray = [...array];
    const old: T = newArray.splice(index, 1, value).pop() as T;
    setArray(newArray);
    return old;
  };

  const update = (arr:T[]): void => {
    setArray(arr);
  }
  return { array, pushElementArr: push, removeElementArr: remove , putElementArr: put, setArray: update};
};

export default useArrayState;
