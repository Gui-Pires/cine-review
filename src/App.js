import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import NavbarMenu from "./components/NavbarMenu";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import Me from './pages/Me'
import Auth from './pages/Auth'
import EditMovie from "./pages/EditMovie";
import Review from "./pages/Review";

function App() {
    return (
        <BrowserRouter>
            <NavbarMenu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/me" element={<Me />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/edit/:id" element={<EditMovie />} />
                <Route path="/review/:id" element={<Review />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
