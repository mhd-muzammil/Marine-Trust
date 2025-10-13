import React from "react";
import UnderwaterScene from "../components/UnderwaterScene";
import ObjectivesZigzag from "../components/ObjectivesZigzag";
import Threats from "../components/Threats";
import CTA from "../components/CTA";

export default function Home() {
  return (
    <>
      {/* 👇 full-page animated background */}
      <UnderwaterScene />

      {/* 👇 page content (above background) */}
      <main className="relative z-10 text-white">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-xl">
            Marine Biodiversity{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-emerald-200">
              Conservation
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-sky-100/90">
            Dive into our mission to protect marine ecosystems, coral reefs,
            mangroves, and ocean life for future generations.
          </p>
          <a
            href="#objectives"
            className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 text-black font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            Explore Objectives ↓
          </a>
        </section>

        {/* Objectives */}
        <section id="objectives" className="bg-transparent py-20">
          <ObjectivesZigzag />
        </section>

        {/* Threats */}
        <section id="threats" className="bg-transparent py-20">
          <Threats />
        </section>

        {/* Call to Action */}
        <section id="cta" className="bg-transparent py-20">
          <CTA />
        </section>
      </main>
    </>
  );
}
