export default function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <button
        className='btn-delete'
        onClick={() => onDeleteWatched(movie.kinopoiskId)}
      >
        X
      </button>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>

      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.rating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
