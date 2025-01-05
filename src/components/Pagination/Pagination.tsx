import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { setCurrentPage } from "../../features/pokemonList/PokemonListActions";
import './Pagination.css';
import { FastBackwardOutlined, FastForwardOutlined, StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";

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
        <button onClick={() => handleSetPage(1)} disabled={currentPage === 1}>
          <FastBackwardOutlined />
        </button>
        <button 
         onClick={() => handleSetPage(currentPage - 1)} 
         disabled={currentPage === 1}
        >
          <StepBackwardOutlined />
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
          <button 
           key={pageNumber} 
           onClick={() => handleSetPage(pageNumber)}
           className={pageNumber === currentPage ? 'number-btn current': 'number-btn'}
          >
            {pageNumber}
          </button>
        ))}
        
        <button 
         onClick={() => handleSetPage(currentPage + 1)} 
         disabled={currentPage === totalPages}
        > 
          <StepForwardOutlined /> 
        </button>
        <button 
         onClick={() => handleSetPage(totalPages)} 
         disabled={currentPage === totalPages}
        > 
          <FastForwardOutlined /> 
        </button>
      </div>
    );
}
 
export default Pagination;