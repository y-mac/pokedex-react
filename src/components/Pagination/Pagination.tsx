import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { setCurrentPage } from "../../features/pokemonList/PokemonListActions";

const Pagination: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();
    const pokemonsInfo = useSelector((state: RootState) => state.pokemons);
    const {currentPage, pokemonsListFiltered, itemsPerPage} = pokemonsInfo;

    const totalItems = pokemonsListFiltered.length > 0 ? pokemonsListFiltered.length : 200
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleSetPage = (page: number) => {
       dispatch(setCurrentPage(page));
    } 

    return ( 
      <div className="pagination">
        <button onClick={() => handleSetPage(1)} disabled={currentPage === 1}>Primera</button>
        <button 
         onClick={() => handleSetPage(currentPage - 1)} 
         disabled={currentPage === 1}
        >
          Anterior
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
          <button key={pageNumber} onClick={() => handleSetPage(pageNumber)}>{pageNumber}</button>
        ))}
        
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>Última</button>
      </div>
    );
}
 
export default Pagination;