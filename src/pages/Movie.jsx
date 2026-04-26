import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "7a2500b77e88ac16b7c20cd7e4a2ef22";

function Movie() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
    )
      .then((res) => res.json())
      .then((data) => setFilm(data));
  }, [id]);

  if (!film) return <p className="text-white p-8">Yuklanmoqda...</p>;
  return (
    <div
      className="min-h-screen text-white flex items-end p-12"
      style={{
        background: `linear-gradient(to top, black, transparent), url(https://image.tmdb.org/t/p/original${film.backdrop_path}) center/cover`,
      }}
    >
      <div className="max-w-2xl">
        <h1 className="text-5xl font-bold mb-4">{film.title}</h1>
        <p className="text-gray-300 text-lg mb-4">{film.overview}</p>
        <p className="text-yellow-400 text-xl mb-2">
          ⭐ {film.vote_average.toFixed(1)}
        </p>
        <p className="text-gray-400">🗓 {film.release_date}</p>
      </div>
    </div>
  );
}

export default Movie;
