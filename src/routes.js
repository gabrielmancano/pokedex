import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Detalhes } from './pages/Detalhes';
import { Header } from './components/Header';
import { Erro } from './pages/Erro';
import { Favoritos } from './pages/Favoritos';

function RoutesApp() {
    return (
        <BrowserRouter>
        <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pokemon/:name" element={<Detalhes />} />
                <Route path="/favoritos" element={<Favoritos />} />

                <Route path="*" element={<Erro />} />
            </Routes>
            </BrowserRouter>
    )
}

export default RoutesApp;