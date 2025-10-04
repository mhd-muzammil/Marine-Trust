import React from "react";

export default function CTA() {
  return (
    <section
      id="get-involved"
      className="py-16"
      style={{
        backgroundImage: "linear-gradient(90deg,#0077b6 0%, #00b4d8 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold">
          Join us to protect marine biodiversity
        </h2>
        <p className="mt-4">
          Volunteer, donate or spread awareness — every action counts. Help us
          preserve oceans for future generations.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="/volunteer"
            className="transform transition duration-200 hover:scale-110 btn btn-neutral"
          >
            Volunteer
          </a>
          <a
            href="/donate"
            className="transform transition duration-200 hover:scale-110 btn btn-accent"
          >
            Donate
          </a>
        </div>
      </div>
    </section>
  );
}
