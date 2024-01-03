import { Link } from "react-router-dom";

import "./style.css";

export function Erro(){
    return(
        <div className="pagina-erro">
            <h1>404</h1>
            <span>Page not found...</span>
            <Link to="/">Return to Home page</Link>
        </div>
    )
}