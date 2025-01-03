import { Link } from "react-router-dom";
import { Card } from 'antd';


interface sprites {
    back_default: string,
    back_female: string,
    back_shiny: string,
    back_shiny_female: string,
    front_default: string,
    front_female: string,
    front_shiny: string,
    front_shiny_female: string
}

interface pokemon {
    id: string;
    name: string;
    types: { type: { name: string } }[];
    sprites: sprites;
}

type PokemonCardProps = {
    pokemon: pokemon
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    const { Meta } = Card;
    return (
        <>
            <article className="pokemon-grid__item" key={pokemon.id}>
                <Link to={`/pokemon/${pokemon.id}`}>
                    <Card
                        hoverable
                        cover={<img alt={pokemon.name} src={pokemon?.sprites?.front_default} />}
                    >
                        <Meta title={pokemon.name} />
                    </Card>
                </Link>
            </article>
        </>
    );
}

export default PokemonCard;