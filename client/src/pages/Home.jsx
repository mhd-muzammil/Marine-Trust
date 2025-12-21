import { lazy, Suspense } from 'react';
import React from 'react';
const ObjectivesZigzag = lazy(() => import('../components/ObjectivesZigzag'));
const Threats = lazy(() => import('../components/Threats'));

export default function Home() {
  return (
    <>
      {/* 👇 page content (above background) */}
      <main className="relative z-10 text-white">
        {/* Hero Section */}
        <section
          className="relative min-h-screen flex flex-col items-center justify-center text-center px-6
             bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img-1.jpeg')" }}
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/45 pointer-events-none z-0" />

          {/* Content must be above the overlay */}
          <div className="relative z-10 max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-xl leading-tight">
              Marine Biodiversity{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-emerald-200">
                Conservation
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sky-100/90 mx-auto">
              Our oceans are the lungs of our planet. Let’s unite to protect
              marine life for today and for generations to come.
            </p>

            <a
              href="#objectives"
              className="mt-8 inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 
                  text-black font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              Explore Objectives ↓
            </a>
          </div>
        </section>

        {/* Objectives */}
        <Suspense
          fallback={<div className="text-center py-10">Loading...</div>}
        >
          <section id="objectives" className="bg-transparent py-20">
            <ObjectivesZigzag />
          </section>

          {/* Threats */}
          <section id="threats" className="bg-transparent">
            <Threats />
          </section>
        </Suspense>

        {/* Call to Action */}
        {/* <section id="cta" className="bg-transparent py-20">
          <CTA />
        </section> */}

        {/* JOIN CTA */}
        <section id="join" className="bg-cyan-500">
          <div className="max-w-4xl mx-auto px-6 py-12 text-center">
            <h3 className="text-2xl font-bold text-slate-900">
              Join the Movement
            </h3>
            <p className="mt-3 text-slate-600 text-lg font-semibold max-w-2xl mx-auto">
              Students, educators, and citizens become volunteers and ocean
              ambassadors. Together, we can protect marine life and inspire
              change.
            </p>

            <div className="mt-6 flex items-center justify-center gap-4">
              <a
                href="/blog"
                className="inline-block px-6 py-3 rounded-md bg-[#01607f] text-white font-medium hover:opacity-95 transition hover:bg-white hover:text-black"
              >
                Become a Volunteer
              </a>
              <a
                href="/donate"
                className="inline-block px-6 py-3 rounded-md border border-slate-200 text-white font-medium hover:bg-slate-50 transition hover:text-black"
              >
                Support Our Work
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
