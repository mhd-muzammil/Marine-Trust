import React, { useMemo, useState } from "react";
import { FaMapMarkerAlt, FaDonate, FaUsers, FaLeaf } from "react-icons/fa";

/**
 * Project.jsx
 * Project listing + detail modal page (copy-paste).
 *
 * Paste to: src/pages/Project.jsx
 *
 * Replace demo data & images with your real content or wire to an API.
 */

const DEMO_PROJECTS = [
  {
    id: "proj-reef-01",
    title: "Coral Reef Restoration — Lakshadweep",
    category: "Restoration",
    location: "Lakshadweep, India",
    coords: [11.053, 72.792],
    summary:
      "Restoring degraded reef areas using coral nurseries and community monitoring.",
    description:
      "We run coral nurseries where fragments are grown, monitored, and transplanted back to degraded reefs. Local fishers trained in monitoring and reef-safe livelihoods receive ongoing support.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    goal: 200000, // INR
    raised: 84000,
    volunteers: 120,
    status: "Active",
    impactPoints: [
      "Established 3 coral nurseries",
      "Transplanted 2,400 fragments",
      "Trained 120 local monitors",
    ],
  },
  {
    id: "proj-mangrove-02",
    title: "Mangrove Regeneration — Goa Coast",
    category: "Restoration",
    location: "Goa, India",
    coords: [15.4909, 73.8278],
    summary:
      "Community-led mangrove planting and tidal barrier restoration to reduce erosion.",
    description:
      "Working with coastal villages to plant mangrove seedlings, install sediment traps, and monitor survival rates. Program emphasises local stewardship and nursery training.",
    image:
      "https://media.istockphoto.com/id/1430223585/photo/%E0%B9%8D%E0%B9%8Dyoung-plant-mangrove-tree-of-mangrove-forest-mangrove-planting-activities-at-tropical.jpg?s=612x612&w=0&k=20&c=GH5VzlVs1N8zdnB2sCPqahMDSzYmJvcC-DzkPUvCumY=",
    goal: 120000,
    raised: 72000,
    volunteers: 240,
    status: "Active",
    impactPoints: [
      "Planted 12,450 seedlings",
      "Reduced erosion on priority beaches",
    ],
  },
  {
    id: "proj-cleanup-03",
    title: "Coastal Cleanups & Waste Education",
    category: "Awareness",
    location: "Kerala Coast",
    coords: [9.9312, 76.2673],
    summary:
      "Monthly cleanups combined with school workshops and waste diversion pilots.",
    description:
      "Monthly coastal cleanups that collect data on debris, paired with school workshops to teach waste segregation and recycling. Pilot program converts collected plastic into community benches.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    goal: 50000,
    raised: 36500,
    volunteers: 520,
    status: "Sustained",
    impactPoints: ["Cleaned 142 km of coastline", "Educated 3,200 students"],
  },
  {
    id: "proj-research-04",
    title: "Monitoring & Data Platform",
    category: "Research",
    location: "Nationwide",
    coords: [20.5937, 78.9629],
    summary:
      "Building a monitoring dashboard to centralize reef, mangrove and cleanup metrics.",
    description:
      "We aggregate field data, satellite inputs, and volunteer reports into a dashboard used by project managers to track success and publish transparent impact reports for donors.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    goal: 150000,
    raised: 45000,
    volunteers: 60,
    status: "Planning",
    impactPoints: ["Open-source dashboard", "Quarterly public reports"],
  },
];

function formatCurrencyINR(n) {
  return "₹" + Number(n).toLocaleString();
}

export default function Project() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = useMemo(() => {
    const c = new Set(DEMO_PROJECTS.map((p) => p.category));
    return ["All", ...Array.from(c)];
  }, []);

  const filtered = useMemo(() => {
    let arr = DEMO_PROJECTS.slice();
    if (filter !== "All") arr = arr.filter((p) => p.category === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
    }
    return arr;
  }, [filter, query]);

  const totals = useMemo(() => {
    const raised = DEMO_PROJECTS.reduce((s, p) => s + (p.raised || 0), 0);
    const goal = DEMO_PROJECTS.reduce((s, p) => s + (p.goal || 0), 0);
    const volunteers = DEMO_PROJECTS.reduce(
      (s, p) => s + (p.volunteers || 0),
      0
    );
    return { raised, goal, volunteers };
  }, []);

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#00121a] via-[#002b3a] to-[#00121a] text-sky-100 p-6">
            <div className="max-w-6xl mx-auto">
                {/* header */}
                <header className="mb-8 grid md:grid-cols-2 gap-6 items-center">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white">Our Projects</h1>
                        <p className="mt-2 text-cyan-200 max-w-xl">
                            Active restoration, research, and community programs protecting
                            coastal ecosystems. Explore current projects, progress and how you
                            can help.
                        </p>

                        <div className="mt-4 flex gap-3 items-center">
                            <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-2 rounded">
                                <FaDonate className="text-cyan-300" />
                                <div>
                                    <div className="text-sm text-cyan-200">Total raised</div>
                                    <div className="font-semibold">
                                        {formatCurrencyINR(totals.raised)}
                                    </div>
                                </div>
                            </div>

                            <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-2 rounded">
                                <FaUsers className="text-cyan-300" />
                                <div>
                                    <div className="text-sm text-cyan-200">Volunteers</div>
                                    <div className="font-semibold">{totals.volunteers}</div>
                                </div>
                            </div>

                            <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-2 rounded">
                                <FaLeaf className="text-cyan-300" />
                                <div>
                                    <div className="text-sm text-cyan-200">Projects</div>
                                    <div className="font-semibold">{DEMO_PROJECTS.length}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-3">
                            <input
                                placeholder="Search projects, location..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-white/5 border border-white/8 placeholder:text-cyan-200"
                            />
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="px-3 py-2 rounded bg-white/5 border border-white/8"
                            >
                                {categories.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </header>

                {/* grid */}
                <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((p) => {
                        const percent = Math.min(
                            100,
                            Math.round(((p.raised || 0) / (p.goal || 1)) * 100)
                        );
                        return (
                            <article
                                key={p.id}
                                className="rounded-lg overflow-hidden border border-white/8 bg-white/5 shadow hover:shadow-lg transition"
                            >
                                <div className="relative">
                                    <img
                                        src={p.image}
                                        alt={p.title}
                                        className="w-full h-44 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src =
                                                "https://via.placeholder.com/800x450?text=Image+Unavailable";
                                        }}
                                    />
                                    <div className="absolute top-3 left-3 bg-white/6 px-2 py-1 rounded text-xs text-cyan-100">
                                        {p.category}
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{p.title}</h3>
                                    <p className="mt-2 text-sm text-cyan-200">{p.summary}</p>

                                    <div className="mt-3">
                                        <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-[#00b4d8] to-[#0077b6]"
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs text-cyan-200 mt-2">
                                            <div>{percent}% funded</div>
                                            <div>
                                                {formatCurrencyINR(p.raised)} of{" "}
                                                {formatCurrencyINR(p.goal)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between gap-3">
                                        <div className="text-sm text-cyan-200">
                                            <FaMapMarkerAlt className="inline mr-1" />
                                            {p.location}
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSelectedProject(p)}
                                                className="px-3 py-1 rounded bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white text-sm"
                                            >
                                                View
                                            </button>
                                            <a
                                                href="#donate"
                                                className="px-3 py-1 rounded border border-white/8 text-sm text-cyan-100"
                                            >
                                                Donate
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </section>

                {/* CTA */}
                <section className="mt-10 rounded-lg bg-gradient-to-r from-[#003444] to-[#002b3a] p-6 shadow-lg border border-white/8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-semibold">Want to support our work?</h3>
                        <p className="text-cyan-200 mt-1">
                            Choose a project above and make a donation to amplify impact —
                            every contribution counts.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <a
                            href="/donate"
                            className="px-4 py-2 rounded bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white font-semibold"
                        >
                            Donate Now
                        </a>
                        <a
                            href="/contact"
                            className="px-4 py-2 rounded border border-white/8 text-cyan-200"
                        >
                            Contact Us
                        </a>
                    </div>
                </section>

                {/* project detail modal */}
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                        <div className="bg-white rounded-xl max-w-3xl w-full overflow-auto p-6 text-slate-800">
                            <div className="flex justify-between items-start gap-4">
                                <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="text-slate-600"
                                >
                                    Close
                                </button>
                            </div>

                            <img
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                className="w-full h-56 object-cover rounded mt-4"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src =
                                        "https://via.placeholder.com/1400x600?text=Image+Unavailable";
                                }}
                            />

                            <div className="mt-4 grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-slate-700">
                                        {selectedProject.description}
                                    </p>

                                    <ul className="mt-4 list-disc ml-5 text-slate-700">
                                        {selectedProject.impactPoints.map((it, idx) => (
                                            <li key={idx}>{it}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-white/5 p-4 rounded border border-white/8">
                                    <div className="text-sm text-slate-600">Location</div>
                                    <div className="font-semibold">
                                        {selectedProject.location}
                                    </div>

                                    <div className="mt-4">
                                        <div className="text-sm text-slate-600">Funding</div>
                                        <div className="font-semibold">
                                            {formatCurrencyINR(selectedProject.raised)} raised
                                        </div>
                                        <div className="text-sm text-slate-600">
                                            {formatCurrencyINR(selectedProject.goal)} goal
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="text-sm text-slate-600">Volunteers</div>
                                        <div className="font-semibold">
                                            {selectedProject.volunteers}
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <a
                                            href="#donate"
                                            className="w-full inline-block text-center px-4 py-2 rounded bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white font-semibold"
                                        >
                                            Donate to this project
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h4 className="font-semibold">
                                    Project status:{" "}
                                    <span className="text-cyan-600">
                                        {selectedProject.status}
                                    </span>
                                </h4>
                                <div className="mt-2 text-sm text-slate-600">
                                    For more details or partner inquiries,{" "}
                                    <a href="/contact" className="underline">
                                        contact us
                                    </a>
                                    .
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
