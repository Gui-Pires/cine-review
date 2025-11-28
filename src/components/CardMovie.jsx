const CardMovie = ({ movie }) => {
    return (
        <a href={`/movie/${movie.id}`}>
            <div className="card text-bg-dark card-size overflow-hidden">
                <img src={movie.poster_url} alt={movie.title} className="card-img object-fit-cover object-fit-sm-fill card-size" />
            </div>
        </a>
    );
};

export default CardMovie;