import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { api } from "./api/api";
import './App.css';
import NavbarMenu from './components/NavbarMenu'
import CardMovie from './components/CardMovie'
import HorizontalController from "./components/HorizontalController";

function App() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        api.get("/movies")
            .then((res) => setMovies(res.data))
            .catch(console.error);
    }, [])

    return (
        <div>
            <NavbarMenu />
            <Carousel className='height-carousel'>
                {movies.map((movie, i) => {
                    return (
                        <Carousel.Item key={i}>
                            <div className='carousel-item active'>
                                <img src={movie.poster_url} className="d-block w-100 height-carousel" alt="..." />
                                <Carousel.Caption>
                                    <div className='card bg-dark-4'>
                                        <span className='text-light'>{movie.description}</span>
                                    </div>
                                </Carousel.Caption>
                            </div>
                        </Carousel.Item>
                    )
                })}
            </Carousel>

            <HorizontalController
                title="Mais populares"
                items={movies.map((m, i) => <CardMovie movie={m} key={i} />)}
            />

            <HorizontalController
                title="Recomendados"
                items={movies.map((m, i) => <CardMovie movie={m} key={i} />)}
            />
        </div>
    );
}

export default App;
