import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { setFilterSearch, setFilterType, filterPokemonList, setPokemonResetLoader } from "../../features/pokemonList/PokemonListActions";
import useFetch from "../../hooks/useFetch";
import './PokemonListHeader.css';
import { API_CONSTANTS } from "../../utils/apiConstants";



const PokemonListHeader = () => {
  const dispatch: AppDispatch = useDispatch();
  const pokemonsInfo = useSelector((state: RootState) => state.pokemons);
  const { pokemonsList, typeFilter, search } = pokemonsInfo;


  const [types, setTypes] = useState([]);
  const { getData } = useFetch();

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response: any = await getData({
          method: 'get',
          url: `${API_CONSTANTS.typeUrl}`
        });
        console.log({ typesResponse: response });
        setTypes(response?.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTypes();
    return () => {
      setTypes([]);
      dispatch(setPokemonResetLoader(true));
      dispatch(filterPokemonList([]));
      handleTypeFilter("");
      handleSetSearch("");
    }
  }, []);


  const filteredPokemonsByName = pokemonsList.filter((pokemon: any) => {
    const lowerName = pokemon?.name?.toLowerCase();
    const lowerSearch = search?.toLowerCase();
    return lowerName?.includes(lowerSearch);
  });


  const filteredPokemonsByType = pokemonsList.filter((pokemon: any) => {
    // Buscamos si alguno de los tipos del Pokémon coincide con el filtro
    return pokemon?.types?.some((type: any) => type.type.name === typeFilter);
  });

  const filteredPokemonsByTypeAndName = pokemonsList.filter((pokemon: any) => {
    const lowerName = pokemon?.name?.toLowerCase();
    const lowerSearch = search?.toLowerCase();
    return lowerName?.includes(lowerSearch);
  }).filter((pokemon: any) => {
    // Buscamos si alguno de los tipos del Pokémon coincide con el filtro
    return pokemon?.types?.some((type: any) => type.type.name === typeFilter);
  });


  useEffect(() => {
    if (typeFilter === "" && search !== "") {
      dispatch(filterPokemonList(filteredPokemonsByName));
    } else if (typeFilter !== "" && search === "") {
      dispatch(filterPokemonList(filteredPokemonsByType));
    } else if (typeFilter !== "" && search !== "") {
      dispatch(filterPokemonList(filteredPokemonsByTypeAndName));
    } else {
      dispatch(filterPokemonList([]));
    }

  }, [typeFilter, search])

  const handleSetSearch = (text: string) => {
    dispatch(setFilterSearch(text));
  }

  const handleTypeFilter = (text: string) => {
    dispatch(setFilterType(text));
  }


  return (
    <>
      <header className="pokemon__header">
        <div className="form-group">
          <input
            type="text"
            placeholder="Buscar Por Nombre"
            onChange={(event) => handleSetSearch(event.target.value)}
            className="pokemon-txt"
          />
        </div>

        <div className="form-group">
          <select className="select-pokemon" value={typeFilter} onChange={(event) => handleTypeFilter(event.target.value)}>
            <option value="">All</option>
            {types?.map((type: any) => (
              <option key={type.name} value={type.name}>{type.name}</option>
            ))}
          </select>
        </div>
      </header>
    </>
  );
}

export default PokemonListHeader;