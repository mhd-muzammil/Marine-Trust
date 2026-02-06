import { lazy, Suspense } from "react";
import React from "react";
import { useEffect } from "react";
const ObjectivesZigzag = lazy(() => import("../components/ObjectivesZigzag"));
const Threats = lazy(() => import("../components/Threats"));
import { Link } from "react-router-dom";
import VolunteerList from "../components/VolunteerList";

// import CTA from '../components/CTA';

export default function Home() {
useEffect(() => {
  // Title
  document.title = "Marine Biodiversity Conservation | Protect Ocean Life";

  // Meta description
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }
  meta.setAttribute(
    "content",
    "Marine conservation and biodiversity focused on protecting marine life, species, coral, coastal and ecosystems for future generations and local communities",
  );

  // ✅ Canonical
  let canonical = document.querySelector("link[rel='canonical']");
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = "https://www.marinebiodiversityconservation.com/";
}, []);
  
  return (
    /* 👇 1. Added a strict wrapper div to contain ALL overflow */
    <div className="w-full overflow-x-hidden relative">
      <main className="relative z-10 text-white">
        {/* Hero Section */}
        <section
          className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-6
              bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img-1.jpeg')" }}
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/45 pointer-events-none z-0" />

          {/* Content must be above the overlay */}
          <div className="relative z-10 max-w-5xl mx-auto w-full">
            {/* 👇 2. Fixed Typography: 'text-7xl' was too big for tablets. 
                   Scaled down to 4xl (mobile) -> 6xl (tablet) -> 7xl (desktop) */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-xl leading-tight break-words">
              Marine Biodiversity{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-emerald-200 block md:inline">
                Conservation
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sky-100/90 mx-auto text-base md:text-lg">
              Our oceans are the lungs of our planet. Let’s unite to protect
              marine life for today and for generations to come.
            </p>

            <Link
              to="/countries"
              className="mt-8 inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 text-black font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              Explore More ↓
            </Link>
          </div>
        </section>

        {/* Objectives */}
        <Suspense
          fallback={<div className="text-center py-10">Loading...</div>}
        >
          <section
            id="objectives"
            className="bg-transparent py-20 overflow-hidden"
          >
            <ObjectivesZigzag />
          </section>

          {/* Threats */}
          <section id="threats" className="bg-transparent overflow-hidden">
            <Threats />
          </section>
          <VolunteerList />
         
        </Suspense>

        {/* JOIN CTA */}
        <section id="join" className="bg-cyan-500 w-full overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 py-12 text-center">
            <h3 className="text-2xl font-bold text-slate-900">
              Join the Movement
            </h3>
            <p className="mt-3 text-slate-600 text-lg font-semibold max-w-2xl mx-auto">
              Students, educators, and citizens become volunteers and ocean
              ambassadors. Together, we can protect marine life and inspire
              change.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/blog"
                className="inline-block px-6 py-3 rounded-md bg-[#01607f] text-white font-medium hover:opacity-95 transition hover:bg-white hover:text-black"
              >
                Become a Volunteer
              </Link>
              <Link
                to="/donate"
                className="inline-block px-6 py-3 rounded-md border border-slate-200 text-white font-medium hover:bg-slate-50 transition hover:text-black"
              >
                Support Our Work
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
