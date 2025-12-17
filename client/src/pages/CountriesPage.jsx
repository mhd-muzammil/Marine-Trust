// src/pages/CountriesPage.jsx
import { Link } from "react-router-dom";
import { oceanCountries } from "../data/oceanCountries";

export default function CountriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-700 to-sky-500 text-white px-4 py-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Ocean Countries 🌍</h1>
        <p className="text-sky-100">
          Discover nations surrounded by seas and oceans.
        </p>
      </header>

      {/* Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {oceanCountries.map((country) => (
          <Link
            key={country.id}
            to={`/countries/${country.id}`}
            className="rounded-3xl overflow-hidden bg-sky-900/40 backdrop-blur shadow-md hover:bg-sky-900/60 transition"
          >
            <div className="w-full overflow-hidden rounded-t-3xl bg-sky-800">
              <img
                src={country.heroImage}
                alt={country.name}
                className="w-full h-48 object-fill rounded-t-xl"
              />
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs opacity-80 font-semibold">
                  {country.code}
                </span>
                <h3 className="text-lg font-semibold">{country.name}</h3>
                <span className="ml-auto text-xl">{country.flag}</span>
              </div>

              <p className="text-xs text-sky-100">{country.shortDescription}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Back button */}
      <div className="text-center mt-6">
        <Link
          to="/"
          className="px-4 py-2 rounded-full bg-white text-sky-800 text-sm font-semibold"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
