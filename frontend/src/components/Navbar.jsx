// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black bg-opacity-70 backdrop-blur-md text-white shadow-md">
      <div className="text-2xl font-bold text-purple-400">
        Mood<span className="text-white">Sync</span>
      </div>
      <ul className="flex gap-6 font-medium text-lg">
        <li><Link to="/" className="hover:text-purple-300 transition">Home</Link></li>
        <li><Link to="/facescan" className="hover:text-purple-300 transition">Face Scan</Link></li>
        <li><Link to="/library" className="hover:text-purple-300 transition">Library</Link></li>
        <li><Link to="/about" className="hover:text-purple-300 transition">About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
