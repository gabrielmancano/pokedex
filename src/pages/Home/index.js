import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PokemonCard } from "../../components/PokemonCard";
import axios from "axios";

import "./style.css";

export function Home() {
    const [allPokemons, setAllPokemons] = useState([]);
    const [baseURL, setBaseURL] = useState('https://pokeapi.co/api/v2/pokemon/?limit=18');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPokemons() {
            const response = await axios.get(baseURL);

            setAllPokemons(response.data.results);
        }
        loadPokemons();
        setLoading(false);
    }, [baseURL]);

    async function loadNextPokemons() {
        const response = await axios.get(baseURL);

        setBaseURL(response.data.next);
        window.scrollTo(0, 0);
    }

    async function loadPrevPokemons() {
        const response = await axios.get(baseURL);

        if (!response.data.previous)
            return;

        setBaseURL(response.data.previous);
        window.scrollTo(0, 0);
    }


    return (
        <div className="container-pagina">
        <div className="container-lista-pokemons">
            <div className="lista-pokemons">
                {
                    allPokemons.map(
                        (pokemon) =>
                            <PokemonCard key={pokemon.name} pokemon={pokemon} />
                    )
                }

            </div>
        </div>
                <div className="area-buttons">
                    <button onClick={loadPrevPokemons}> Prev</button>
                    <button onClick={loadNextPokemons} >Next </button>
                </div>
        </div>
    )
}