import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import NavbarMenu from "./components/NavbarMenu";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import Me from './pages/Me'
import Auth from './pages/Auth'

function App() {
    return (
        <BrowserRouter>
            <NavbarMenu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/me" element={<Me />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
