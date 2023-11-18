import { useEffect, useState } from "react";

const API_KEY = "5f2030de-3793-410d-8fd1-54bb92345941";
export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    callback?.();

    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${query}&page=1`,
          {
            method: "GET",
            signal: controller.signal,
            headers: {
              "X-API-KEY": API_KEY,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("something went wrong");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.films ? data.films : []);
        setError("");
        console.log(data);
      } catch (err) {
        console.log(err.message);
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
