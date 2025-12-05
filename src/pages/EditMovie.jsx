import { Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import PageTransition from '../components/PageTransition';

function EditMovie() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [error, setError] = useState("");
    const [movie, setMovie] = useState(null);
    const [copy, setCopy] = useState(null);
    const [validated, setValidated] = useState(false)

    useEffect(() => {
        api.get(`/movies/${id}`)
            .then(res => {
                setMovie(res.data)
                setCopy(res.data)
            })
            .catch(console.error);
    }, [id])

    function validateUpdate() {
        const itemsCheck = ['title', 'director', 'genre', 
            'language', 'release_year', 'country', 'duration', 
            'trailer_url', 'poster_url', 'cast', 'description']

        const check = itemsCheck.reduce((initial, currentValue) => {
            return copy[currentValue] === movie[currentValue] && initial
        }, true)

        return check
    }

    const handleUpdate = async (e) => {
        const form = e.currentTarget;
        setValidated(true);
        if (form.checkValidity() === false) {
            e.stopPropagation();
            e.preventDefault();
            return
        }

        try {
            const res = await api.put(`/movies/${movie.id}`, copy);

            if (res.status === 200) {
                navigate(-1);
            }
        } catch (err) {
            setError(err.response.data.error);
        }
    }

    if (!movie) return <div className="text-center mt-5">Carregando...</div>

    return (
        <PageTransition>
            <div className="container mt-5">
                <Form onSubmit={handleUpdate} noValidate validated={validated}>
                    <div className="row">
                        <div className="col d-flex justify-content-between">
                            <div className='d-flex align-items-center mb-3'>
                                <button className="btn-backpage me-3" type='button' onClick={() => navigate(-1)}>
                                    <i className="bi bi-arrow-left"></i>
                                </button>
                                <h2>Editando {movie.title}</h2>
                            </div>
                            <Form.Group>
                                <Button variant="outline-success" type="submit" className='ms-3 mb-3'
                                    disabled={validateUpdate()}>
                                    Atualizar
                                </Button>
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <div className="row g-1">
                                <div className="col">
                                    <Form.Group className="mb-3">
                                        <Form.Label id="title">Title</Form.Label>
                                        <Form.Control id='movie-title' type="text" defaultValue={copy.title}
                                            placeholder="Title" aria-describedby="title" required minLength={3}
                                            onChange={(e) => setCopy({ ...copy, title: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label id="director">Diretor</Form.Label>
                                        <Form.Control id='movie-director' type="text" defaultValue={copy.director}
                                            placeholder="Diretor" aria-describedby="director" required minLength={3}
                                            onChange={(e) => setCopy({ ...copy, director: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label id="genre">Gênero</Form.Label>
                                        <Form.Control id='movie-genre' type="text" defaultValue={copy.genre}
                                            placeholder="Gênero" aria-describedby="genre" required minLength={3}
                                            onChange={(e) => setCopy({ ...copy, genre: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label id="language">Idioma</Form.Label>
                                        <Form.Control id='movie-language' type="text" defaultValue={copy.language}
                                            placeholder="Idioma" aria-describedby="language" required minLength={3}
                                            onChange={(e) => setCopy({ ...copy, language: e.target.value })} />
                                    </Form.Group>
                                </div>
                                <div className="col">
                                    <Form.Group className="mb-3">
                                        <Form.Label id="release_year">Ano</Form.Label>
                                        <Form.Control id='movie-release_year' type="date" defaultValue={copy.release_year}
                                            placeholder="Ano" aria-describedby="release_year" required minLength={3}
                                            onChange={(e) => setCopy({ ...copy, release_year: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label id="country">País</Form.Label>
                                        <Form.Control id='movie-country' type="text" defaultValue={copy.country}
                                            placeholder="País" aria-describedby="country" required minLength={3}
                                            onChange={(e) => setCopy({ ...copy, country: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label id="duration">Duração (minutos)</Form.Label>
                                        <Form.Control id='movie-duration' type="number" defaultValue={copy.duration}
                                            placeholder="Duração" aria-describedby="duration" required
                                            min={10} max={999} minLength={2} maxLength={3}
                                            onChange={(e) => setCopy({ ...copy, duration: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label id="trailer_url">URL do Trailer</Form.Label>
                                        <Form.Control id='movie-trailer_url' type="text" defaultValue={copy.trailer_url}
                                            placeholder="URL do Trailer" aria-describedby="trailer_url" required minLength={3}
                                            onChange={(e) => setCopy({ ...copy, trailer_url: e.target.value })} />
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <Form.Group className="mb-3">
                                <Form.Label id="poster_url">URL da Imagem</Form.Label>
                                <Form.Control id='movie-poster_url' type="text" defaultValue={copy.poster_url}
                                    placeholder="URL da Imagem" aria-describedby="poster_url" required minLength={3}
                                    onChange={(e) => setCopy({ ...copy, poster_url: e.target.value })} />
                            </Form.Group>
                            <img src={copy.poster_url} alt="" className='img-fluid rounded mb-3' />
                        </div>
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Label id="cast">Elenco</Form.Label>
                        <Form.Control id='movie-cast' type="text" defaultValue={copy.cast}
                            placeholder="Elenco" aria-describedby="cast" required minLength={3}
                            onChange={(e) => setCopy({ ...copy, cast: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label id="description">Descrição</Form.Label>
                        <Form.Control id='movie-description' as="textarea" defaultValue={copy.description}
                            placeholder="Descrição" aria-describedby="description" required minLength={3} rows={3}
                            onChange={(e) => setCopy({ ...copy, description: e.target.value })} />
                    </Form.Group>
                </Form>
                {error && <p className='text-danger text-center'>{error}</p>}
            </div>
        </PageTransition>
    )
}

export default EditMovie;