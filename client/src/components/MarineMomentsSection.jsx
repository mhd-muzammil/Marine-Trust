import React from "react";

import SeaTurtle from "../assets/marine-moments/seaTurtle.mp4";

// 🔁 Add more imports as you add more images

// If your video is hosted somewhere (backend / YouTube / S3, etc.)
const MARINE_MOMENTS = [
  {
    id: 1,
    type: "video",
    src: SeaTurtle,
    title: "Supporting Local Fishers",
    description:
      "Volunteers helping coastal fishers with safe and sustainable practices.",
  },
  
];

const MarineMomentsSection = () => {
  return (
    <section
      id="marine-moments"
      className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="inline-block rounded-full bg-blue-50 px-4 py-1 text-xl sm:text-sm font-semibold tracking-wide text-sky-700 mb-3">
            Marine Moments
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            A THOUSAND MILE&apos;S BEGIN WITH A SINGLE STEP
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-600">
            Capturing every act of kindness 
            from helping fishers and guiding
            coastal communities to rescuing marine life and protecting our seas.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {MARINE_MOMENTS.map((item) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/80 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="relative w-full h-56 sm:h-64 overflow-hidden">
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    controls
                  />
                )}

                {/* subtle gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
              </div>

              <div className="flex-1 flex flex-col p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-3 flex-1">
                  {item.description}
                </p>

                <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-teal-500" />
                    {item.type === "image" ? "Photo" : "Video"}
                  </span>
                  <span className="uppercase tracking-wide text-[0.65rem]">
                    MBCT • IMPACT
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarineMomentsSection;
