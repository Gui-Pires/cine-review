const CardMovie = ({ movie }) => {
    return (
        <div class="card text-bg-dark height-card overflow-hidden">
            <img src={movie.poster_url} alt={movie.title} className="card-img object-fit-cover object-fit-sm-fill height-card" />
        </div>
    );
};

export default CardMovie;