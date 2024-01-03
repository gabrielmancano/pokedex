import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

import "./style.css";

export function PokemonCard({ pokemon }) {
    const [pokemonToShow, setPokemonToShow] = useState({});
    const [pokemonImage, setPokemonImage] = useState("");

    useEffect(() => {
        async function loadPokemon() {
            const response = await api.get(`/${pokemon.name}`)
            setPokemonToShow(response.data);
            setPokemonImage(response.data.sprites.front_default);
        }

        loadPokemon();
    }, []);


    return (
        <Link to={`/pokemon/${pokemon.name}`} className="pokemon-card">
            <div className="pokemon-info">
                <span style={{ fontSize: '14px'}}>#{pokemonToShow.id}</span>
                <h3>{pokemonToShow.name}</h3>
            </div>
                <img src={pokemonImage} />
        </Link>
    );
}