import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { addPokemonList, setPokemonResetLoader } from "../../features/pokemonList/PokemonListActions";
import useFetch from "../../hooks/useFetch";
import PokemonCard from "../PokemonCard";
import PokemonListHeader from "../PokemonListHeader/PokemonListHeader";
import { Skeleton } from 'antd';
import Pagination from "../Pagination/Pagination";
import { API_CONSTANTS } from "../../utils/apiConstants";
import { pokemonResult } from "../../models/pokemonResult";
import { Pokemon } from "../../models/pokemon.model";


const PokemonList: React.FC<Pokemon> = () => {
  const dispatch: AppDispatch = useDispatch();
  const pokemonsInfo = useSelector((state: RootState) => state.pokemons);

  const {pokemonsList, loading, pokemonsListFiltered, currentPage, itemsPerPage, typeFilter, search} = pokemonsInfo;

    const {getData} = useFetch();

    const getPokemonList = async () => {
      const offset = (currentPage - 1) * itemsPerPage;
        const data:any = await getData({
            method:'get',
            url: `${API_CONSTANTS.baseUrl}?limit=${itemsPerPage}&offset=${offset}`
        });

        const pokemonPromises = data.results.map((pokemon: pokemonResult) => {
           return getData({
            method:'get',
            url: pokemon.url
          });
        });
        
        Promise.all(pokemonPromises).then(values => {
          dispatch(addPokemonList(values));
        })
        .catch(error => {
          console.error(error);
        });
    }

    useEffect(()=>{
        dispatch(setPokemonResetLoader(true));
      return () => {
        dispatch(addPokemonList([]));
      };
    },[])

    useEffect(()=>{
      dispatch(setPokemonResetLoader(true));
      getPokemonList(); 
    },[currentPage]); 

    
      
    return ( 
      <>
        <section >
          
          <PokemonListHeader />
          <div className="pokemon-wrap">
            {loading && (
                <> 
                  {loading}
                  <Skeleton active />
                </>
            )}

            {!loading && (
              <>
                {pokemonsListFiltered.length > 0 && (
                  <div className="pokemon-grid">
                    {pokemonsListFiltered.map((pokemon: any) => (
                      <PokemonCard
                        pokemon={pokemon}
                      />
                    ))}
                  </div> 
                )}
                
                {pokemonsListFiltered.length === 0 && (search !== '' || typeFilter !== '') &&  (
                  <p> No se encontraron Pokemons con los criterios de búsqueda </p>
                )}
                
                
                {pokemonsListFiltered.length === 0 && (search === '' && typeFilter === '') &&  (
                  <div className="pokemon-grid">
                    {pokemonsList?.map((pokemon: any) => (
                      <PokemonCard
                        pokemon={pokemon}
                      />
                    ))}
                  </div> 
                )}
                
              </>
            )}
          </div>

          <Pagination />

        </section>
      </> 
    );
}
 
export default PokemonList;