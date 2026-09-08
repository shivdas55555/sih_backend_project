import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold tracking-wide text-blue-400">
        SIH Platform
      </Link>
      <div className="flex gap-6 font-medium">
        <Link to="/" className="hover:text-blue-300 transition">
          All Problems
        </Link>
        <Link to="/submit-problem" className="hover:text-blue-300 transition">
          Post a Problem
        </Link>
        <Link to="/collaborate" className="hover:text-blue-300 transition">
          Institute Collaboration
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
