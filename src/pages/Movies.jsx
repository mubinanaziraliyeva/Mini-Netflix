import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_KEY = "7a2500b77e88ac16b7c20cd7e4a2ef22";

function Movies() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`,
    )
      .then((res) => res.json())
      .then((data) => setFilms(data.results));
  }, []);

  return (
    <div className="min-h-screen bg-black-text-white p-8">
      <h1 className="text-4xl font-bold mb-8">🎬 Mashhur filmlar</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {films.map((film) => (
          <Link to={`/movie/${film.id}`} key={film.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
              alt={film.title}
              className="rounded-lg hover:scale-105 transition cursor-pointer"
            />
            <p className="mt-2 font-semibold">{film.title}</p>
            <p className="text-yellow-400">⭐ {film.vote_average.toFixed(1)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Movies;
