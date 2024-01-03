import { Link } from "react-router-dom";

import "./style.css"

export function Header() {
    return (
        <header className="header">
            <Link to="/">
                <h1>
                    POKÉDEX.
                </h1>
            </Link>
            
            <Link to="/favoritos">
                <button>
                    My Pokémon
                </button>
            </Link>
        </header>
    )
}