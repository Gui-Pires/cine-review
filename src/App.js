import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import NavbarMenu from "./components/NavbarMenu";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";

function App() {
    return (
        <BrowserRouter>
            <NavbarMenu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies/:id" element={<MoviePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
