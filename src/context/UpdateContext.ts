import React from "react";
import { createContext } from "react";

/*
Контекст нужен для обновления страницы
при обновлении информации о задаче через
переменную fetching и функцию setFetching
*/

export const UpdateContext = createContext({
  fetching: false,
  setFetching: (_value: boolean) => {},
});
