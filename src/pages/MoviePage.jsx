import { useParams, useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import PageTransition from "../components/PageTransition";
import Comment from "../components/Comments";

function MoviePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [comments, setComments] = useState(null);
    const [timeMovie, setTimeMovie] = useState()
    const [dateMovie, setDateMovie] = useState()
    const [lastUpdate, setLastUpdate] = useState()
    const authUser = localStorage.getItem('user')
    const jsonUser = authUser ? JSON.parse(authUser) : ''

    useEffect(() => {
        api.get(`/movies/${id}`)
            .then(res => setMovie(res.data))
            .catch(console.error);
        api.get(`/reviews/movie/${id}`)
            .then(res => setComments(res.data))
            .catch(console.error);
    }, [id]);

    useEffect(() => {
        if (!movie) return
        const hours = parseInt(movie.duration / 60)
        setTimeMovie(`${hours}h ${(movie.duration - (hours * 60))}m`)
        setDateMovie(new Date(movie.release_year).toLocaleDateString())
        setLastUpdate(new Date(movie.updatedAt).toLocaleDateString())
    }, [movie])

    if (!movie) return <div className="text-center mt-5">Carregando...</div>;

    return (
        <PageTransition>
            <div className="container py-4">
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center mb-3">
                                <button className="btn-backpage me-3" onClick={() => navigate(-1)}><i className="bi bi-arrow-left"></i></button>
                                <h2>{movie.title}</h2>
                            </div>
                            <div className={!authUser || !jsonUser ? 'd-none' : ''}>
                                <button className="btn btn-outline-warning ms-2" 
                                    onClick={() => navigate(`/edit/${movie.id}`)}><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-outline-primary ms-2" 
                                    onClick={() => navigate(`/review/${movie.id}`)}>Comentar</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p><strong>Diretor:</strong> {movie.director}</p>
                                <p><strong>Gênero:</strong> {movie.genre}</p>
                                <p><strong>Idioma:</strong> {movie.language}</p>
                                <p><strong>Duração:</strong> {timeMovie}</p>
                                <p><strong>Atualizado em:</strong> {lastUpdate}</p>
                            </div>
                            <div className="col">
                                <p><strong>Avaliação:</strong> {movie.rating.toFixed(1)} ⭐</p>
                                <p><strong>Votos:</strong> {movie.rating_count}</p>
                                <p><strong>Ano:</strong> {dateMovie}</p>
                                <p><strong>País:</strong> {movie.country}</p>
                                <a className="text-decoration-none" href={movie.trailer_url} target="_blank" rel="noreferrer">
                                    <p>Assistir ao trailer <i className="bi bi-link"></i></p>
                                </a>
                            </div>
                        </div>
                        <p><strong>Elenco:</strong> {movie.cast}</p>
                        <blockquote className="border-start border-3 border-primary-subtle ps-2">{movie.description}</blockquote>
                    </div>
                    <div className="col-12 col-lg-6">
                        <img src={movie.poster_url} alt={movie.title} className="img-fluid rounded mb-1" />
                    </div>
                </div>
                <h4 className="mt-3">Comentários</h4>
                {comments && comments.map((comment, i) => {
                    const dateReview = new Date(comment.createdAt).toLocaleDateString()
                    return (
                        <Comment comment={comment} dateReview={dateReview} key={i} />
                    )
                })}
            </div>
        </PageTransition>
    )
}

export default MoviePage;