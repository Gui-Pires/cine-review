import { Form, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../api/api";

function AddMovie() {
    const navigate = useNavigate()
    const [error, setError] = useState("");
    const [movie, setMovie] = useState({});
    const [validated, setValidated] = useState(false)

    const handleUpdate = async (e) => {
        const form = e.currentTarget;
        setValidated(true);
        if (form.checkValidity() === false) {
            e.stopPropagation();
            e.preventDefault();
            return
        }

        try {
            const res = await api.post(`/movies/`, movie);

            console.log(e, res)

            if (res.status === 200) {
                navigate(-1);
            }
        } catch (err) {
            setError(err.response.data.error);
        }
    }

    return (
        <div className="container mt-5">
            <Form onSubmit={handleUpdate} noValidate validated={validated}>
                <div className="row">
                    <div className="col d-flex justify-content-between">
                        <h2>Adicionando Filme</h2>
                        <Form.Group>
                            <Button variant="outline-success" type="submit" className='ms-3 mb-3'>
                                Adicionar
                            </Button>
                            <Button variant="outline-danger " type="button" className='ms-3 mb-3' onClick={() => navigate(-1)}>
                                Cancelar
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
                                    <Form.Control id='movie-title' type="text"
                                        placeholder="Title" aria-describedby="title" required minLength={3}
                                        onChange={(e) => setMovie({ ...movie, title: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label id="director">Diretor</Form.Label>
                                    <Form.Control id='movie-director' type="text"
                                        placeholder="Diretor" aria-describedby="director" required minLength={3}
                                        onChange={(e) => setMovie({ ...movie, director: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label id="genre">Gênero</Form.Label>
                                    <Form.Control id='movie-genre' type="text"
                                        placeholder="Gênero" aria-describedby="genre" required minLength={3}
                                        onChange={(e) => setMovie({ ...movie, genre: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label id="language">Idioma</Form.Label>
                                    <Form.Control id='movie-language' type="text"
                                        placeholder="Idioma" aria-describedby="language" required minLength={3}
                                        onChange={(e) => setMovie({ ...movie, language: e.target.value })} />
                                </Form.Group>
                            </div>
                            <div className="col">
                                <Form.Group className="mb-3">
                                    <Form.Label id="release_year">Ano</Form.Label>
                                    <Form.Control id='movie-release_year' type="date"
                                        placeholder="Ano" aria-describedby="release_year" required minLength={3}
                                        onChange={(e) => setMovie({ ...movie, release_year: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label id="country">País</Form.Label>
                                    <Form.Control id='movie-country' type="text"
                                        placeholder="País" aria-describedby="country" required minLength={3}
                                        onChange={(e) => setMovie({ ...movie, country: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label id="duration">Duração (minutos)</Form.Label>
                                    <Form.Control id='movie-duration' type="number"
                                        placeholder="Duração" aria-describedby="duration" required
                                        min={10} max={999} minLength={2} maxLength={3}
                                        onChange={(e) => setMovie({ ...movie, duration: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label id="trailer_url">URL do Trailer</Form.Label>
                                    <Form.Control id='movie-trailer_url' type="text"
                                        placeholder="URL do Trailer" aria-describedby="trailer_url" required minLength={3}
                                        onChange={(e) => setMovie({ ...movie, trailer_url: e.target.value })} />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <Form.Group className="mb-3">
                            <Form.Label id="poster_url">URL da Imagem</Form.Label>
                            <Form.Control id='movie-poster_url' type="text"
                                placeholder="URL da Imagem" aria-describedby="poster_url" required minLength={3}
                                onChange={(e) => setMovie({ ...movie, poster_url: e.target.value })} />
                        </Form.Group>
                        <img src={movie.poster_url} alt="" className='img-fluid rounded mb-3' />
                    </div>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label id="cast">Elenco</Form.Label>
                    <Form.Control id='movie-cast' type="text"
                        placeholder="Elenco" aria-describedby="cast" required minLength={3}
                        onChange={(e) => setMovie({ ...movie, cast: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label id="description">Descrição</Form.Label>
                    <Form.Control id='movie-description' as="textarea"
                        placeholder="Descrição" aria-describedby="description" required minLength={3} rows={3}
                        onChange={(e) => setMovie({ ...movie, description: e.target.value })} />
                </Form.Group>
            </Form>
            {error && <p className='text-danger text-center'>{error}</p>}
        </div>
    )
}

export default AddMovie;