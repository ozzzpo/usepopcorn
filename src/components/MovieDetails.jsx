import { useEffect, useRef, useState } from "react";
import StarRating from "./UI/StarRating";
import Loader from "./UI/Loader";
import { useKey } from "../utils/hooks/useKey";
const API_KEY = "5f2030de-3793-410d-8fd1-54bb92345941";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);

  const isWatched = watched
    .map((movie) => movie.kinopoiskId)
    .includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.kinopoiskId === selectedId
  )?.userRating;

  const {
    genres,
    year,
    nameRu: title,
    posterUrl: poster,
    filmLength: runtime,
    ratingKinopoisk,
    description: plot,
  } = movie;

  const handleAdd = () => {
    const newWatchedMovie = {
      kinopoiskId: selectedId,
      title,
      year,
      poster,
      rating: Number(ratingKinopoisk),
      userRating,
      runtime: runtime,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  useKey("Escape", onCloseMovie);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const res = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/${selectedId}`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    };
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Фильм | ${title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);
  console.log();
  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Постер фильма ${movie.title}`} />

            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {year} &bull; {runtime} мин
              </p>
              <p>
                {genres
                  ?.map((genreObj) => (genreObj = genreObj.genre))
                  .join(", ")}
              </p>
              <p>
                Рейтинг на кинопоиске: {ratingKinopoisk}
                <span>⭐</span>
              </p>
            </div>
          </header>

          <section>
            <div className='rating'>
              {!isWatched ? (
                <>
                  <StarRating
                    starClassName='stars'
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                    defaultRating={userRating}
                  />
                  {userRating > 0 && (
                    <button className='btn-add' onClick={handleAdd}>
                      Добавить
                    </button>
                  )}
                </>
              ) : (
                <p>
                  Ваша оценка этому фильму: {watchedUserRating} <span>🌟</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
          </section>
        </>
      )}
    </div>
  );
}
