import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_KEY = "7a2500b77e88ac16b7c20cd7e4a2ef22";

function Movies() {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [janrlar, setJanrlar] = useState([]);
  const [janr, setJanr] = useState("");
  const [search, setSearch] = useState("");

  // useEffect dan oldin — shu qatorni qo'shing
  const YASHIRIN_JANRLAR = [10749];

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setJanrlar(data.genres));
  }, []);

  useEffect(() => {
    const url = search
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}&page=${page}`
      : janr
        ? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${janr}&page=${page}&include_adult=false`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}&include_adult=false`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!data.results) return; // ← qo'shing
        const tozaFilmlar = data.results.filter((film) => film.adult === false);
        setFilms(tozaFilmlar);
      });
  }, [janr, page, search]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">🎬 Mashhur filmlar</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        placeholder="Filmlarni qidirish..."
        className="w-full max-w-md px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/30 outline-none mb-8 border border-white/20"
      />

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => {
            setJanr("");
            setPage(1);
          }}
          className={`px-4 py-1 rounded-full text-sm font-semibold transition ${janr === "" ? "bg-red-600" : "bg-white/20 hover:bg-white/30"}`}
        >
          Hammasi
        </button>
        {janrlar
          .filter((j) => !YASHIRIN_JANRLAR.includes(j.id))
          .map((j) => (
            <button
              key={j.id}
              onClick={() => {
                setJanr(j.id);
                setPage(1);
              }}
              className={`px-4 py-1 rounded-full text-sm font-semibold transition ${janr === j.id ? "bg-red-600" : "bg-white/20 hover:bg-white/30"}`}
            >
              {j.name}
            </button>
          ))}
      </div>
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
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-6 py-2 bg-red-600 text-white rounded disabled:opacity-50"
        >
          ← Oldingi
        </button>
        <span className="text-white text-xl">{page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="px-6 py-2 bg-red-600 text-white rounded"
        >
          Keyingi →
        </button>
      </div>
    </div>
  );
}

export default Movies;
