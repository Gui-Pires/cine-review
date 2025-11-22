import { useEffect, useState } from 'react';
import { api } from "./api/api";
import './App.css';
import NavbarMenu from './components/NavbarMenu'
import CardMovie from './components/CardMovie'

function App() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        api.get("/movies")
            .then((res) => setMovies(res.data))
            .catch(console.error);
    }, [])

    return (
        <div>
            <NavbarMenu />
            <div className='container-fluid pt-3'>
                <h5 className='mt-2'>Mais populares</h5>
                <div className='row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-1'>
                    {movies.map((movie, i) => {
                        return (
                            <div key={i} className='col-12'>
                                <CardMovie movie={movie} />
                            </div>
                        )
                    })}
                </div>
                <h5 className='mt-4'>Mais populares</h5>
                <div className='row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-1'>
                    {movies.map((movie, i) => {
                        return (
                            <div key={i} className='col-12 mb-2 mb-lg-3'>
                                <CardMovie movie={movie} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
