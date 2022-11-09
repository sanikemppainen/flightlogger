const Movie=({ movie })=>{
    return(
        <li className="movie">
            <span>{movie.name}: {movie.rating}</span>
        </li>
    )
}
export default Movie