// src/components/FloatingActions.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaHandsHelping, FaQuestionCircle } from "react-icons/fa";

export default function FloatingActions() {
  return (
    <div
      className="
        hidden md:flex               /* 🔹 hide on mobile, show from md+ */
        fixed right-4 top-1/2 -translate-y-1/2
        flex-col gap-4
        z-40
      "
    >
      {/* Marine Quiz */}
      <div className="relative group flex items-center justify-end animate-bounce">
        <div
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2
               rounded-full bg-white text-slate-900 shadow-2xl
               px-5 py-2 text-xs sm:text-sm font-semibold
               opacity-0 translate-x-2
               group-hover:opacity-100 group-hover:translate-x-0
               group-hover:-translate-y-1
               transition-all duration-200 ease-out
               flex items-center"
        >
          Marine Quiz
        </div>

        <Link
          to="/marine-quiz"
          className="h-12 w-12 rounded-full bg-teal-500 flex items-center justify-center
               shadow-2xl transform-gpu
               transition-transform duration-200 ease-out
               group-hover:-translate-y-1
               hover:brightness-110
               focus-visible:outline-none focus-visible:ring-2
               focus-visible:ring-offset-2 focus-visible:ring-teal-300 focus-visible:ring-offset-transparent"
          aria-label="Marine Quiz"
        >
          <FaQuestionCircle className="text-white text-lg" />
        </Link>
      </div>

      {/* Donate */}
      <div className="relative group flex items-center justify-end">
        <div
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2
                     rounded-full bg-white text-slate-900 shadow-2xl
                     px-5 py-2 text-xs sm:text-sm font-semibold
                     opacity-0 translate-x-2
                     group-hover:opacity-100 group-hover:translate-x-0
                     group-hover:-translate-y-1
                     transition-all duration-200 ease-out
                     flex items-center"
        >
          Contribute Now
        </div>
        <Link
          to="/donate"
          className="h-12 w-12 rounded-full bg-rose-500 flex items-center justify-center
                     shadow-2xl transform-gpu
                     transition-transform duration-200 ease-out
                     group-hover:-translate-y-1
                     hover:brightness-110
                     focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-offset-2 focus-visible:ring-rose-300 focus-visible:ring-offset-transparent"
          aria-label="Donate"
        >
          <FaHeart className="text-white text-lg" />
        </Link>
      </div>

      {/* Volunteer */}
      <div className="relative group flex items-center justify-end">
        <div
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2
                     rounded-full bg-white text-slate-900 shadow-2xl
                     px-5 py-2 text-xs sm:text-sm font-semibold
                     opacity-0 translate-x-2
                     group-hover:opacity-100 group-hover:translate-x-0
                     group-hover:-translate-y-1
                     transition-all duration-200 ease-out
                     flex items-center"
        >
          Volunteer
        </div>
        <Link
          to="/careers#volunteer"
          className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center
                     shadow-2xl transform-gpu
                     transition-transform duration-200 ease-out
                     group-hover:-translate-y-1
                     hover:brightness-110
                     focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-offset-2 focus-visible:ring-blue-300 focus-visible:ring-offset-transparent"
          aria-label="Volunteer"
        >
          <FaHandsHelping className="text-white text-lg" />
        </Link>
      </div>
    </div>
  );
}
