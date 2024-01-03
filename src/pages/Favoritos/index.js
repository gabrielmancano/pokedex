import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import "./style.css";

export function Favoritos() {

    const [favoritesPokemon, setFavoritesPokemon] = useState([]);

    useEffect(() => {
        const listaDeFavotitos = JSON.parse(localStorage.getItem("@listapokemon"));

        if(favoritesPokemon.length > 0 ) {
            listaDeFavotitos.sort((a, b) => a.id - b.id);
        }

        setFavoritesPokemon(listaDeFavotitos);
    }, []);

    const deletePokemon = (id) => {
        let filteredPokemon = favoritesPokemon.filter((pokemonFiltrado) => pokemonFiltrado.id !== id);
        setFavoritesPokemon(filteredPokemon);
        localStorage.setItem("@listapokemon", JSON.stringify(filteredPokemon));
        toast.success("Pokemon successfully removed from list!")

    }

    const clearList = () => {
        setFavoritesPokemon([]);
        localStorage.setItem("@listapokemon", JSON.stringify([]));
    }


    if (favoritesPokemon.length < 1) {
        return (
            <div className="lista-vazia">
                <h1>Your list is empty!</h1>
                <Link to="/">
                    Back to all pokémon
                </Link>
            </div>
        )
    }

    return (
        <div className="container-favoritos">
            <div className="lista-favoritos">
                {
                    favoritesPokemon.map((pokemon) => (
                        <div
                            key={pokemon.id}
                            style={{ textDecoration: 'none', color: '#000' }}
                        >

                            <div
                                className="item-lista"
                            >
                                <img src={pokemon.sprites.other.dream_world.front_default} />
                                <div style={{ padding: '20px 5px 0 0', width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'end', height: '100%' }} >
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                                        <h3>{pokemon.name}</h3>
                                        <span>
                                            {
                                                pokemon.types.length > 1 ? `${pokemon.types[0].type.name} | ${pokemon.types[1].type.name} ` :
                                                    pokemon.types[0].type.name
                                            }
                                        </span>
                                    </div>
                                    <div className="button-area">
                                        <button className="delete-button"
                                            onClick={() => deletePokemon(pokemon.id)}
                                        >
                                            Delete
                                        </button>
                                        <button className="info-button">
                                            <Link style={{ textDecoration: 'none', color: '#FFF' }} to={`/pokemon/${pokemon.name}`}>
                                                Info
                                            </Link>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                    ))
                }

                    <div className="footer">
                        <Link to="/">
                    <button className="back-button">
                    Back to all pokemons
                    </button>
                    </Link>

                    {
                            favoritesPokemon.length > 2 && (
                        <button className="clear-button"
                            onClick={() => clearList()}
                        >
                            Clear favorites list
                        </button>

                            )
                        }
                    </div>
            </div>
        </div>
    )
}