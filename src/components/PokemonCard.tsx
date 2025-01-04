import { Link } from "react-router-dom";
import { Card } from 'antd';
import { Pokemon } from "../models/pokemon.model";

type PokemonCardProps = {
    pokemon: Pokemon
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    const { Meta } = Card;
    return (
        <>
            <article className="pokemon-grid__item" key={pokemon.id}>
                <Link to={`/pokemon/${pokemon.id}`}>
                    <Card
                        hoverable
                        cover={<img alt={pokemon.name} src={pokemon?.sprites?.other?.home?.front_default} />}
                    >
                        <Meta title={pokemon.name} />
                    </Card>
                </Link>
            </article>
        </>
    );
}

export default PokemonCard;