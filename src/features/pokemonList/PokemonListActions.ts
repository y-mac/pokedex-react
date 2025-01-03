import { createAction } from "@reduxjs/toolkit";

export const addPokemonList = createAction<any>("pokemon/add");
export const filterPokemonList = createAction<any>("pokemon/filter");
export const setCurrentPage = createAction<number>("pokemon/currentPage");
export const setFilterSearch = createAction<string>("pokemon/filterSearch");
export const setFilterType = createAction<string>("pokemon/filterType"); 
export const setPokemonDetail = createAction<any>("pokemon/detail");
export const setPokemonResetLoader = createAction<any>("pokemon/reset");
