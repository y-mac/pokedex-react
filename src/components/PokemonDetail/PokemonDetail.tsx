import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { setPokemonDetail, setPokemonResetLoader } from "../../features/pokemonList/PokemonListActions";
import useFetch from "../../hooks/useFetch";
import { Skeleton } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import './PokemonDetail.css';
import { API_CONSTANTS } from "../../utils/apiConstants";


const PokemonDetail = () => {
    const dispatch: AppDispatch = useDispatch();
    const pokemonsInfo = useSelector((state: RootState) => state.pokemons);
    const { pokemonDetail, loading } = pokemonsInfo;
    const { id } = useParams();
    const { getData } = useFetch();
    const [currentPage, setCurrentPage] = useState(1);
    const movesPerPage = 12;
    const totalPages = Math.ceil(pokemonDetail?.moves?.length / movesPerPage);
    const paginatedMoves = pokemonDetail?.moves?.slice(
        (currentPage - 1) * movesPerPage,
        currentPage * movesPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getPokemonDetail = async () => {
        const detailData = await getData({
            method: 'get',
            url: `${API_CONSTANTS.baseUrl}/${id}`
        });
        dispatch(setPokemonDetail(detailData));
    }

    useEffect(() => {
        dispatch(setPokemonResetLoader(true));
        setTimeout(()=>{
            getPokemonDetail();
        },700)
        
        return () => {
            dispatch(setPokemonDetail(null));
        };
    }, [])



    return (

        <>
            {loading === true && (
                <div>
                  <Skeleton loading={loading} active />
                </div>
            )}

            {loading === false && (
                <div>
                    <header className="detail-header">
                      <Link to="/" className="homeLink"> <HomeFilled /> </Link> 
                      <h1> {pokemonDetail?.name} </h1>
                    </header>
                    <section className="details-wrapper">
                        <aside>
                            <figure>
                                <img src={pokemonDetail?.sprites?.other?.home?.front_default} alt={pokemonDetail?.name} />
                            </figure>
                        </aside>
                        <aside>
                            <div className="general-info">

                                <aside className="general-info-column">
                                    <h3 className="general-info__headline"> Height: </h3>
                                    <p>{pokemonDetail?.height} cm</p>
                                </aside>

                                <aside className="general-info-column">
                                    <h3 className="general-info__headline">Weight:</h3>
                                    <p>{pokemonDetail?.weight} Kg</p>
                                </aside>

                                <aside className="general-info-column">
                                    <h3 className="general-info__headline">Abilities:</h3>
                                    <ul>
                                        {pokemonDetail?.abilities?.map((ability: any) => (
                                            <li key={ability.ability.name}>{ability.ability.name}</li>
                                        ))}
                                    </ul>

                                </aside>

                                <aside className="general-info-column">
                                    <h3 className="general-info__headline"> Type(s): </h3>
                                    <ul>
                                        {pokemonDetail?.types?.map((type: any) => (
                                            <li key={type.type.slot}>{type.type.name}</li>
                                        ))}
                                    </ul>
                                </aside>
                            </div>
                        </aside>
                        <aside>
                            <h4> Stadistics: </h4>

                            <div className="stats-holder">
                                {pokemonDetail?.stats?.map((stat: any, index: number) => (
                                    <div key={index} className="stats-item">
                                        <label className="ability-name"> {stat.stat.name}: </label>
                                        <input type="range" min="0" max="100" value={stat.base_stat} id="myRange" />
                                        <p className="ability-number"> {stat.base_stat} </p>
                                    </div>
                                ))}
                            </div>
                        </aside>
                        <aside>
                            <h4> Move(s): </h4>
                            <ul className="move-list">
                                {paginatedMoves?.map((move: any) => (
                                    <li key={move.move.name}>{move.move.name}</li>
                                ))}
                            </ul>
                            <div>
                                <button onClick={() => handlePageChange(1)}>
                                    &lt; &lt;
                                </button>
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}> &lt; </button>
                                <span> {currentPage} of {totalPages}</span>
                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}> &gt; </button>
                                <button onClick={() => handlePageChange(totalPages)}>
                                    &gt; &gt;
                                </button>
                            </div>
                        </aside>
                    </section>
                </div>
            )}
        </>
    );
}

export default PokemonDetail;