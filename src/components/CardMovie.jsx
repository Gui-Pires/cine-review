import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CardMovie ({ movie }) {
    const navigate = useNavigate();
    const [exit, setExit] = useState(false);

    const handleClick = () => {
        setExit(true);

        setTimeout(() => {
            navigate(`/movies/${movie.id}`);
        }, 300) // mesmo tempo da animação CSS
    }

    return (
        <div className={`card text-bg-dark overflow-hidden card-size p-0 ${exit ? "fade-exit-active" : ""}`} href="#"
        onClick={() => handleClick()}>
            <img src={movie.poster_url} alt={movie.title} className="card-img object-fit-cover object-fit-sm-fill card-size" />
        </div>
    )
}

export default CardMovie;