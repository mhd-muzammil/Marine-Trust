// src/components/HeroLottie.jsx
import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export default function HeroLottie() {
  return (
    <section className="relative min-h-[56vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0077b6] to-[#00b4d8]" />
      <div className="absolute inset-0 opacity-30">
        {/* Lottie player as background */}
        <Player
          autoplay
          loop
          src="https://www.vecteezy.com/video/55744378-overhead-stormy-ocean-waves-crashing-on-the-shore" // put lottie JSON in public/
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Protect Our Oceans
        </h1>
        <p className="mt-4">
          Join our work restoring reefs and protecting marine life.
        </p>
      </div>
    </section>
  );
}
