import { useEffect, useState, useRef } from 'react';
import { api } from "./api/api";
import './App.css';
import NavbarMenu from './components/NavbarMenu'
import CardMovie from './components/CardMovie'
import Carousel from 'react-bootstrap/Carousel';

const container = document.querySelector(".movie-scroll");
const btnLeft = document.querySelector(".scroll-btn.left");
const btnRight = document.querySelector(".scroll-btn.right");

const scrollAmount = 250; // px que vai rolar por clique

function App() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        api.get("/movies")
            .then((res) => setMovies(res.data))
            .catch(console.error);
    }, [])

    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (!scrollRef.current) return;

        const amount = direction === "left" ? -250 : 250;

        scrollRef.current.scrollBy({
            left: amount,
            behavior: "smooth",
        })
    }

    // const getButtons = () => {
    //     btnLeft.addEventListener("click", () => {
    //         container.scrollBy({
    //             left: -scrollAmount,
    //             behavior: "smooth",
    //         })
    //     })

    //     btnRight.addEventListener("click", () => {
    //         container.scrollBy({
    //             left: scrollAmount,
    //             behavior: "smooth",
    //         })
    //     })
    // }

    return (
        <div>
            <NavbarMenu />
            <Carousel className='height-carousel'>
                {movies.map((movie, i) => {
                    return (
                        <Carousel.Item>
                            <div key={i} className='carousel-item active'>
                                <img src={movie.poster_url} class="d-block w-100 height-carousel" alt="..." />
                                <Carousel.Caption>
                                    <h3 className='text-light shadow-sm'>{movie.description}</h3>
                                </Carousel.Caption>
                            </div>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
            <div className='container-fluid pt-3'>
                <h5 className='mt-2'>Mais populares</h5>
                <div className='row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-1 flex-nowrap position-relative overflow-x-scroll movie-scroll'>
                    
                    <button className="scroll-btn left btn btn-dark align-text-middle" onClick={() => scroll("left")}>
                        <i className="bi bi-arrow-left-short text-light"></i>
                    </button>

                    {movies.map((movie, i) => {
                        return (
                            <div key={i} className='col-12'>
                                <CardMovie movie={movie} />
                            </div>
                        )
                    })}

                    <button className="scroll-btn right btn btn-dark" onClick={() => scroll("right")}>
                        d
                    </button>
                </div>
            </div>
            {/* {getButtons()} */}
        </div>
    );
}

export default App;
