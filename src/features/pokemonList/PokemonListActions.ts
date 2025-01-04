import { createAction } from "@reduxjs/toolkit";
import { Pokemon } from "../../models/pokemon.model";

export const addPokemonList = createAction<Pokemon[]>("pokemon/add");
export const filterPokemonList = createAction<Pokemon[]>("pokemon/filter");
export const setCurrentPage = createAction<number>("pokemon/currentPage");
export const setFilterSearch = createAction<string>("pokemon/filterSearch");
export const setFilterType = createAction<string>("pokemon/filterType"); 
export const setPokemonDetail = createAction<Pokemon | unknown>("pokemon/detail");
export const setPokemonResetLoader = createAction<boolean>("pokemon/reset");
