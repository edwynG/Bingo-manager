const sesionGame = <T>(item: string) => {
  const setItem = (value: T): void =>
    sessionStorage.setItem(item, JSON.stringify(value));

  const getItem = (): T | undefined => {
    const itemLocal = sessionStorage.getItem(item);
    if (itemLocal) {
      return JSON.parse(itemLocal) as T;
    }
    return undefined;
  };

  const removeItem = (): void => sessionStorage.removeItem(item);
  const deleteSesion = (): void => sessionStorage.removeItem(item);
  return { setItem, getItem, removeItem, deleteSesion };
};

export const storageGame = <T>(item: string) => {
  const setItem = (value: T): void =>
    localStorage.setItem(item, JSON.stringify(value));

  const getItem = (): T | undefined => {
    const itemLocal = localStorage.getItem(item);
    if (itemLocal) {
      return JSON.parse(itemLocal) as T;
    }
    return undefined;
  };

  const removeItem = (): void => localStorage.removeItem(item);
  const deleteSesion = (): void => localStorage.removeItem(item);
  return { setItem, getItem, removeItem, deleteSesion };
};

export default sesionGame;
