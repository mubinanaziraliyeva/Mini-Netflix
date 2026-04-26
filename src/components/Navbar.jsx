import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-black">
      <h1 className="text-red-600 text-3xl font-bold">NETFLIX</h1>
      <div className="flex gap-6">
        <Link to="/" className="text-white hover:text-gray-300">
          Bosh sahifa
        </Link>
        <Link to="/movies" className="text-white hover:text-gray-300">
          Filmlar
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
