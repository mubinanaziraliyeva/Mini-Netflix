import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div
        className="h-screen flex flex-col justify-center items-center text-center"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.5), black), url('https://wallpapercave.com/wp/wp1816312.jpg') center/cover",
        }}
      >
        <h1 className="text-6xl font-bold mb-4">Cheksiz kino olami</h1>
        <p className="text-xl text-gray-300 mb-8">
          Eng yaxshi filmlar bir joyda
        </p>
        <Link
          to="/movies"
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py3 rounded text-xl transition"
        >
          Filmlarni ko'rish ▶
        </Link>
      </div>
    </div>
  );
}

export default Home;
