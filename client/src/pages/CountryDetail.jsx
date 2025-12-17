// src/pages/CountryDetail.jsx
import { useParams, Link } from "react-router-dom";
import { oceanCountries } from "../data/oceanCountries";

export default function CountryDetail() {
  const { id } = useParams();
  const country = oceanCountries.find((c) => c.id === id);

  if (!country) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-sky-900 text-white">
        <p className="text-lg mb-3">Country Not Found</p>
        <Link to="/countries" className="underline text-sky-300">
          Back to Countries
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-700 to-sky-500 text-white pb-10">
      {/* Top Bar */}
      <header className="flex items-center gap-3 px-4 py-3">
        <Link to={-1} className="text-2xl">
          ←
        </Link>
        <h1 className="text-xl font-semibold">{country.name}</h1>
      </header>

      <main className="px-4 space-y-6">
        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <img
            src={country.heroImage}
            alt={country.name}
            className="w-full h-48 md:h-64 object-cover"
          />
        </div>

        {/* Flag + Name */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-sky-900 flex items-center justify-center text-3xl mb-2">
            {country.flag}
          </div>
          <h2 className="text-2xl font-bold mb-1">{country.name}</h2>
          <p className="text-sm text-sky-100 max-w-xl">
            {country.shortDescription}
          </p>
        </div>

        <hr className="border-sky-300/40" />

        {/* Ocean Facts */}
        <section>
          <h3 className="text-lg font-semibold mb-2">
            🌊 Ocean Facts & Famous Shores
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-sky-100">
            {country.oceanFacts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </section>

        {/* Join the Movement Button */}
        <div className="flex justify-center mt-6">
          <Link
            to="/careers#volunteer"
            className="px-6 py-3 bg-white text-sky-700 font-semibold rounded-full shadow-md hover:bg-sky-100 transition"
          >
            Join the Movement
          </Link>
        </div>

        {/* Biodiversity */}
        <section>
          <h3 className="text-lg font-semibold mb-2">
            🌿 Contribution to Marine Biodiversity
          </h3>
          <p className="text-sm text-sky-100">{country.biodiversityText}</p>
        </section>

        <p className="mt-4 text-center text-sm font-semibold text-sky-100">
          💧 Let's Protect Our Oceans Together!
        </p>
      </main>
    </div>
  );
}
