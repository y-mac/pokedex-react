import { createReducer } from "@reduxjs/toolkit";
import { 
  addPokemonList, 
  filterPokemonList, 
  setCurrentPage,
  setFilterSearch,
  setFilterType,
  setPokemonDetail,
  setPokemonResetLoader
} from "./PokemonListActions"

const initialState: any = {
  pokemonsList: [],
  pokemonsListFiltered: [],
  currentPage: 1,
  itemsPerPage:50,
  loading: true,
  error: null,
  typeFilter: '',
  search: '',
  pokemonDetail: null
};


const pokemonListReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addPokemonList, (state, action) => {
      state.pokemonsList = action.payload;
      state.loading = false;
    })
    .addCase(filterPokemonList, (state, action) => {
      state.pokemonsListFiltered = action.payload;
      state.loading = false; 
    }) 
    .addCase(setCurrentPage, (state, action) => {
      state.currentPage = action.payload;
    }) 
    .addCase(setFilterSearch, (state, action) => {
      state.search = action.payload;
    })
    .addCase(setFilterType, (state, action) => {
      state.typeFilter = action.payload;
    }) 
    .addCase(setPokemonDetail, (state, action) => {
      state.pokemonDetail = action.payload;
      state.loading = false;
    }) 
    .addCase(setPokemonResetLoader, (state,action) => {
      state.loading = action.payload;
    }) 

});

export default pokemonListReducer;