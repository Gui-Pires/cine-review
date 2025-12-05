import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Carousel } from 'react-bootstrap';
import { api } from "../api/api";
import HorizontalController from "../components/HorizontalController";
import CardMovie from '../components/CardMovie'
import PageTransition from '../components/PageTransition';

function Home() {
    const navigate = useNavigate()
    const [exit, setExit] = useState(false)

    const [carousel, setCarousel] = useState([])
    const [melhoresAvaliacoes, setMelhoresAvaliacoes] = useState([])
    const [descobrir, setDescobrir] = useState([])
    const [anos2000, setAnos2000] = useState([])

    const handleClick = (value_id) => {
        setExit(true);

        setTimeout(() => {
            navigate(`/movies/${value_id}`);
        }, 300) // mesmo tempo da animação CSS
    }

    useEffect(() => {
        api.get("/movies/?limit=5")
            .then((res) => setCarousel(res.data))
            .catch(console.error);

        api.get("/movies/?min_rating=8&limit=20")
            .then((res) => setMelhoresAvaliacoes(res.data))
            .catch(console.error);

        api.get("/movies/?min_rating=3&max_rating=8&limit=20")
            .then((res) => setDescobrir(res.data))
            .catch(console.error);
        
        api.get("/movies/?s_year=2000&e_year=2010&limit=20")
            .then((res) => setAnos2000(res.data))
            .catch(console.error);
    }, [])

    return (
        <PageTransition>
            <Carousel className='height-carousel'>
                {carousel.map((movie, i) => {
                    return (
                        <Carousel.Item key={i} onClick={() => handleClick(movie.id)} className={exit ? "fade-exit-active" : ""}>
                            <div className='carousel-item active'>
                                <img src={movie.poster_url} className="d-block w-100 height-carousel" alt="..." />
                                <Carousel.Caption>
                                    <div className='bg-dark-4 p-2'>
                                        <span className='text-light'>{movie.description}</span>
                                    </div>
                                </Carousel.Caption>
                            </div>
                        </Carousel.Item>
                    )
                })}
            </Carousel>

            <div className='container-fluid'>
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
        </PageTransition>
    );
}

export default Home;