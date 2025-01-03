import { configureStore } from "@reduxjs/toolkit";
import pokemonListReducer from "../features/pokemonList/PokemonListReducer";

export const store = configureStore({
  reducer: {
    pokemons: pokemonListReducer,
  }
}) 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;