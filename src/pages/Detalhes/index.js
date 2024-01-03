import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api";
import { toast } from 'react-toastify';

import "./style.css"

export function Detalhes() {
    const { name } = useParams();

    const [pokemon, setPokemon] = useState({});
    const [pokemonImage, setPokemonImage] = useState();
    const [pokemonType, setPokemonType] = useState("");
    const [loading, setLoading] = useState(true);

    const [pokemonVariationImg, setPokemonVariationImg] = useState();
    const [pokemonShinyVariationImg, setPokemonShinyVariationImg] = useState();
    const [pokemonMoves, setPokemonMoves] = useState([]);


    useEffect(() => {
        async function loadPokemon() {
            const response = await api.get(`/${name}`);
            setPokemon(response.data);
            setPokemonImage(response.data.sprites.other.dream_world.front_default);
            setPokemonType(
                response.data.types.length > 1 ? `${response.data.types[0].type.name} | ${response.data.types[1].type.name} ` :
                    response.data.types[0].type.name
            );

            setPokemonVariationImg(response.data.sprites.front_default);
            setPokemonShinyVariationImg(response.data.sprites.front_shiny);
            setPokemonMoves(response.data.moves);
        }

        loadPokemon();
        setLoading(false);
    }, []);

    const salvarPokemon = () => {
        const listaFavoritos = localStorage.getItem("@listapokemon");
        let pokemonSalvos = JSON.parse(listaFavoritos) || [];

        const pokemonJaEstaNaLista = pokemonSalvos.some((pokemonSalvo) => pokemonSalvo.id === pokemon.id);

        if (pokemonJaEstaNaLista) {
            toast.error("Pokemon is already on your favorites list!");
            return;
        }

        pokemonSalvos.push(pokemon);
        localStorage.setItem("@listapokemon", JSON.stringify(pokemonSalvos));
        toast.success("Pokemon saved successfully!");
    }


    if (loading) {
        return (
            <div
                style={{ display: 'flex', height: 'calc(90vh - 60px)', justifyContent: 'center', alignItems: 'center' }}
            >
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div className="detalhes">
            <div className="info">
                <div>
                    <h2 style={{ color: '#383838' }}>
                        #{pokemon.id < 100 ? `0${pokemon.id}` : pokemon.id}
                    </h2>
                    <h1>
                        {pokemon.name}.
                    </h1>
                    <h3 style={{ color: '#383838' }}>
                        {pokemonType}
                    </h3>

                    <span style={{ position: 'relative', top: 120, fontFamily: 'sans-serif', fontSize: '14px' }}>
                        {pokemon.height / 10}m / {pokemon.weight}kg
                    </span>
                </div>
                <img className="detalhes-img" src={pokemonImage} />
            </div>

            <div className="detalhes-buttons">
                <button onClick={salvarPokemon} >Save to favorites</button>
                <Link to="/">
                    <button style={{ marginTop: '5px' }} >
                        Back to all pokemons
                    </button>
                </Link>
            </div>

            <div className="variations-hr">
                <hr />
                <p>Variations</p>
                <hr />
            </div>

            <div className="variations">
                <div>
                    <img src={pokemonVariationImg} />
                    <span>Normal</span>
                </div>
                <div>
                    <img src={pokemonShinyVariationImg} />
                    <span>Shiny</span>
                </div>
            </div>

            <div className="variations-hr">
                <hr />
                <p>Moves</p>
                <hr />
            </div>

            <div className="moves">
                <div className="moves-grid">
                    {
                        pokemonMoves.map((item) => <div key={item.move.name} className="move-name">
                            <span>{item.move.name}</span>
                        </div>
                        )
                    }
                </div>
            </div>

        </div>
    )
}