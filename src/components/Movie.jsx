import schedule from "./UI/img/schedule.png";

export default function Movie({ movie, onSelectMovie }) {
  return (
    <li
      onClick={() => {
        onSelectMovie(movie.filmId);
      }}
    >
      <img src={movie.posterUrl} alt={`${movie.nameRu} poster`} />
      <h3>{movie.nameRu}</h3>
      <div>
        <p>
          <span>
            <img src={schedule} alt='#' style={{ width: "18px" }} />
          </span>
          <span>{movie.year ? movie.year : "Неизвестен"}</span>
        </p>
      </div>
    </li>
  );
}
