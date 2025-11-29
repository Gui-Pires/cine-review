import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { api } from "./api/api";
import './App.css';
import NavbarMenu from './components/NavbarMenu'
import CardMovie from './components/CardMovie'
import HorizontalController from "./components/HorizontalController";

function App() {
    // const [movies, setMovies] = useState([])
    const [carousel, setCarousel] = useState([])
    const [melhoresAvaliacoes, setMelhoresAvaliacoes] = useState([])
    const [descobrir, setDescobrir] = useState([])
    const [anos2000, setAnos2000] = useState([])

    useEffect(() => {
        // api.get("/movies")
        //     .then((res) => setMovies(res.data))
        //     .catch(console.error);

        api.get("/movies/?limit=5")
            .then((res) => setCarousel(res.data))
            .catch(console.error);

        api.get("/movies/?min_rating=8&limit=10")
            .then((res) => setMelhoresAvaliacoes(res.data))
            .catch(console.error);

        api.get("/movies/?min_rating=3&max_rating=8&limit=10")
            .then((res) => setDescobrir(res.data))
            .catch(console.error);
        
        api.get("/movies/?s_year=2000&e_year=2009")
            .then((res) => setAnos2000(res.data))
            .catch(console.error);
    }, [])

    return (
        <div>
            <NavbarMenu />
            <Carousel className='height-carousel'>
                {carousel.map((movie, i) => {
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
                title="Melhores Avaliações"
                items={melhoresAvaliacoes.map((m, i) => <CardMovie movie={m} key={i} />)}
            />

            <HorizontalController
                title="Para descobrir"
                items={descobrir.map((m, i) => <CardMovie movie={m} key={i} />)}
            />

            <HorizontalController
                title="Anos 2000"
                items={anos2000.map((m, i) => <CardMovie movie={m} key={i} />)}
            />

        </div>
    );
}

export default App;
