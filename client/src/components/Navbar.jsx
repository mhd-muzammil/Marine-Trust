import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.jfif"; // optional: if you have logo in src/assets; else use <span> emoji

export default function Navbar() {
  return (
    <div className="navbar bg-sky-600 text-white px-6 shadow-md">
      <div className="flex-1 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
          <img src={Logo} alt="logo" className="w-10 h-10 object-cover" />
        </div>
        <Link
          to="/"
          className="flex items-center text-2xl font-bold leading-none"
        >
          Marine Biodiversity
        </Link>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/blog">Volunteer</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <a href="/donate"  className="transform transition duration-200 hover:scale-110 btn btn-accent ml-3">
          Donate
        </a>
      </div>
    </div>
  );
}
