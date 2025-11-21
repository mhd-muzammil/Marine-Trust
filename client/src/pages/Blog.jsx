// src/pages/Blog.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaTag,
  FaCalendarAlt,
  FaUserCircle,
  FaClock,
  FaArrowRight,
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHandsHelping,
  FaPhone,
} from "react-icons/fa";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import successAnim from "../animations/success.json";

/* ---------------- Demo posts ---------------- */
const DEMO_POSTS = [
  {
    id: "p1",
    title: "10 Ways You Can Help Protect Coral Reefs",
    slug: "10-ways-protect-coral-reefs",
    excerpt:
      "Small steps add up. Practical, evidence-based actions to reduce reef damage, support restoration, and protect biodiversity for future generations.",
    author: "Priya R",
    date: "2025-08-12",
    category: "Conservation",
    tags: ["coral", "reef", "volunteer"],
    readTime: "6 min",
    hero: true,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "p2",
    title: "Community Workshops: Empowering Coastal Villages",
    slug: "community-workshops-coastal-villages",
    excerpt:
      "Training local communities in waste management and sustainable livelihoods to ensure long-term coastal resilience and local leadership.",
    author: "Ramesh S",
    date: "2025-07-18",
    category: "Community",
    tags: ["community", "workshop"],
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "p3",
    title: "How We Measure Success: Monitoring & Data",
    slug: "measure-success-monitoring-data",
    excerpt:
      "Metrics we track, visualization practices, and why transparent reporting matters for donors, partners and local stakeholders.",
    author: "Dr. A. Kumar",
    date: "2025-06-02",
    category: "Research",
    tags: ["monitoring", "data"],
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1610093641855-31ffd617a94a?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "p4",
    title: "Volunteer Spotlight: OceanCare Club",
    slug: "volunteer-spotlight-oceancare",
    excerpt:
      "Meet volunteers making measurable differences — their field stories, challenges and small wins that create large impacts.",
    author: "Team",
    date: "2025-05-14",
    category: "People",
    tags: ["volunteer", "story"],
    readTime: "3 min",
    image:
      "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1400&q=80",
  },
];

/* ---------------- helpers ---------------- */
function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/* ---------------- Inline JoinVolunteerForm ----------------
   This is the form inlined so you don't need the separate file.
   It defaults to inline rendering and simple validation.
---------------------------------------------------------*/
// replace your existing JoinVolunteerFormInline with this clean version
function JoinVolunteerFormInline({
  apiBase = "http://localhost:5173/api",
  onSubmit,
}) {
  const [form, setForm] = useState({
    fullName: "",
    emailId: "",
    phone: "",
    location: "",
    role: "",
    availability: "",
    interestsCleanup: true,
    interestsRestoration: false,
    interestsEducation: false,
  });

  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  /* -----------------------------------------
    CONFETTI BLAST FUNCTION (4 sec)
  ----------------------------------------- */
  const confettiBlast = () => {
    const container = document.body;
    const colors = [
      "#00b4d8",
      "#0077b6",
      "#90e0ef",
      "#ffd166",
      "#06d6a0",
      "#ff6b6b",
    ];

    for (let i = 0; i < 150; i++) {
      const piece = document.createElement("div");
      piece.classList.add("confetti-piece");

      const size = Math.random() * 8 + 6;
      piece.style.width = `${size}px`;
      piece.style.height = `${size * 0.6}px`;

      piece.style.left = `${Math.random() * window.innerWidth}px`;
      piece.style.top = `${window.innerHeight * 0.2}px`;

      piece.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = `${Math.random() * 1 + 2}s`;

      container.appendChild(piece);

      setTimeout(() => piece.remove(), 3500);
    }
  };

  /* -----------------------------------------
    VALIDATION
  ----------------------------------------- */
  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Please enter your full name";
    if (!form.emailId.trim() || !/^\S+@\S+\.\S+$/.test(form.emailId))
      e.emailId = "Please enter a valid email";
    return e;
  };

  const handleChange = (ev) => {
    const { name, value, type, checked } = ev.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  /* -----------------------------------------
    SUBMIT
  ----------------------------------------- */
  const handleSubmit = async () => {
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    setBusy(true);
    setErrors({});

    try {
      const resp = await axios.post(apiBase + "/volunteer", form, {
        withCredentials: true,
      });

      if (resp?.data) {
        setDone(true);
        confettiBlast(); // 🔥 CONFETTI HERE
        if (onSubmit) onSubmit(resp.data);
      } else {
        // fallback
        setDone(true);
        confettiBlast(); // 🔥 CONFETTI HERE
      }
    } catch (err) {
      setErrors({
        server: err?.response?.data?.message || "Server error. Try again.",
      });
    } finally {
      setBusy(false);
    }
  };

  /* -----------------------------------------
    SUCCESS SCREEN
  ----------------------------------------- */
  if (done) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-full max-w-lg rounded-2xl bg-[#001921] border border-white/10 p-8 text-center shadow-xl">
          {/* LOTTIE ANIMATION */}
          <Player
            autoplay
            loop={false}
            src={successAnim}
            style={{ height: "140px", width: "140px", margin: "0 auto" }}
          />

          {/* Success Heading */}
          <h3 className="text-2xl font-bold text-white mt-4 mb-2">
            You're in thanks!
          </h3>

          {/* Subtext */}
          <p className="text-cyan-200 text-sm leading-relaxed">
            We'll email next steps and volunteer opportunities soon.
          </p>
        </div>

        {/* Confetti (unchanged) */}
        <style>{`
        .confetti-piece {
          position: absolute;
          width: 8px;
          height: 12px;
          opacity: 0.9;
          border-radius: 2px;
          animation: confetti-fall linear forwards;
        }

        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(350px) rotate(360deg); opacity: 0; }
        }
      `}</style>
      </div>
    );
  }




  /* -----------------------------------------
    FORM UI
  ----------------------------------------- */
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/8 bg-white/5 p-4 md:p-6">
      <h3 className="text-2xl font-semibold text-white mb-4">
        Join as a Volunteer
      </h3>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm text-cyan-200 mb-1">Full name</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="e.g. Priya R"
            className="w-full py-2 px-3 rounded-md bg-white/5 text-white placeholder:text-white/60 border border-white/10"
          />
          {errors.fullName && (
            <p className="text-rose-300 text-xs">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-cyan-200 mb-1">Email</label>
          <input
            name="emailId"
            type="email"
            value={form.emailId}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full py-2 px-3 rounded-md bg-white/5 text-white placeholder:text-white/60 border border-white/10"
          />
          {errors.emailId && (
            <p className="text-rose-300 text-xs">{errors.emailId}</p>
          )}
        </div>

        {/* Phone + Location */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-cyan-200 mb-1">
              Phone (optional)
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full py-2 px-3 rounded-md bg-white/5 text-white placeholder:text-white/60 border border-white/10"
            />
          </div>

          <div>
            <label className="block text-sm text-cyan-200 mb-1">
              City / Location
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Chennai"
              className="w-full py-2 px-3 rounded-md bg-white/5 text-white placeholder:text-white/60 border border-white/10"
            />
          </div>
        </div>

        {/* Role + Availability */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-cyan-200 mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full py-2 px-3 rounded-md bg-white/5 text-white border border-white/10"
            >
              <option value="">Select a role</option>
              <option>Beach Cleanup</option>
              <option>Reef Restoration</option>
              <option>Community Education</option>
              <option>Research Support</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-cyan-200 mb-1">
              Availability
            </label>
            <input
              name="availability"
              value={form.availability}
              onChange={handleChange}
              placeholder="Weekends, weekdays..."
              className="w-full py-2 px-3 rounded-md bg-white/5 text-white border border-white/10"
            />
          </div>
        </div>

        {/* Interests */}
        <div>
          <p className="text-sm text-cyan-200 mb-2">Interests</p>

          <div className="flex flex-col gap-2 text-white/90">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="interestsCleanup"
                checked={form.interestsCleanup}
                onChange={handleChange}
                className="accent-[#00b4d8]"
              />
              Beach cleanup
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="interestsRestoration"
                checked={form.interestsRestoration}
                onChange={handleChange}
                className="accent-[#00b4d8]"
              />
              Reef restoration
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="interestsEducation"
                checked={form.interestsEducation}
                onChange={handleChange}
                className="accent-[#00b4d8]"
              />
              Community education
            </label>
          </div>
        </div>

        {errors.server && (
          <p className="text-rose-300 text-sm">{errors.server}</p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={busy}
          className={`w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-[#00b4d8] to-[#0077b6] ${
            busy ? "opacity-60" : "hover:opacity-95"
          }`}
        >
          {busy ? "Submitting..." : "Submit"}
        </button>
      </div>

      {/* Confetti styles */}
      <style>{`
        .confetti-piece {
          position: absolute;
          width: 8px;
          height: 12px;
          opacity: 0.9;
          border-radius: 2px;
          animation: confetti-fall linear forwards;
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(350px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

/* ---------------- Component (page) ---------------- */
export default function Blog() {
  // states we actually use
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [activeTag, setActiveTag] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 6;

  // categories and tags (used in UI)
  const categories = useMemo(() => {
    const s = new Set(DEMO_POSTS.map((p) => p.category));
    return ["All", ...Array.from(s)];
  }, []);

  const allTags = useMemo(() => {
    const t = new Set();
    DEMO_POSTS.forEach((p) => p.tags.forEach((tag) => t.add(tag)));
    return Array.from(t);
  }, []);

  // filtered posts (uses query, category, activeTag)
  const filteredPosts = useMemo(() => {
    let arr = DEMO_POSTS.slice();
    if (category !== "All") arr = arr.filter((p) => p.category === category);
    if (activeTag) arr = arr.filter((p) => p.tags.includes(activeTag));
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
      );
    }
    // hero posts first, then newest
    arr.sort((a, b) =>
      a.hero ? -1 : b.hero ? 1 : new Date(b.date) - new Date(a.date)
    );
    return arr;
  }, [category, activeTag, query]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / perPage));
  const pagePosts = filteredPosts.slice((page - 1) * perPage, page * perPage);
  const hero = filteredPosts.find((p) => p.hero) || filteredPosts[0] || null;
  const popular = DEMO_POSTS.slice(0, 3);

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setActiveTag(null);
    setPage(1);
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-[#00121a] via-[#002b3a] to-[#00121a] text-sky-100 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
              Insights & Stories
            </h1>
            <p className="mt-2 text-cyan-200 max-w-2xl">
              Project updates, field stories, and research about marine
              conservation.
            </p>

            <div className="mt-6 flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-300" />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/8 placeholder:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div className="flex gap-3 items-center flex-wrap">
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(1);
                  }}
                  className="py-2 px-3 rounded bg-white/5 border border-white/8"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <button
                  onClick={clearFilters}
                  className="py-2 px-3 bg-transparent border border-white/10 rounded text-cyan-200 hover:bg-white/6"
                >
                  Reset
                </button>
              </div>
            </div>
          </header>

          {/* Layout */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {/* Hero */}
              {hero && (
                <article className="rounded-xl overflow-hidden shadow-2xl bg-white/5 border border-white/6">
                  <img
                    src={hero.image}
                    alt={hero.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://via.placeholder.com/1400x800?text=Image+Unavailable";
                    }}
                  />
                  <div className="p-6">
                    <div className="text-sm text-cyan-200 flex gap-3">
                      <span className="inline-flex items-center gap-1">
                        <FaTag /> {hero.category}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <FaCalendarAlt /> {formatDate(hero.date)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <FaUserCircle /> {hero.author}
                      </span>
                    </div>
                    <h2 className="mt-3 text-2xl font-bold">{hero.title}</h2>
                    <p className="mt-3 text-cyan-200">{hero.excerpt}</p>
                    <Link
                      to={`/blog/${hero.slug}`}
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white font-semibold shadow"
                    >
                      Read full story
                    </Link>
                  </div>
                </article>
              )}

              {/* Posts grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                {pagePosts.map((p) => (
                  <article
                    key={p.id}
                    className="rounded-lg overflow-hidden border border-white/6 bg-white/5 shadow hover:shadow-lg transition"
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-44 object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://via.placeholder.com/800x600?text=Image+Unavailable";
                      }}
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between text-xs text-cyan-200">
                        <span className="inline-flex items-center gap-1">
                          <FaTag /> {p.category}
                        </span>
                        <span>{formatDate(p.date)}</span>
                      </div>
                      <h4 className="mt-2 text-lg font-semibold">{p.title}</h4>
                      <p className="mt-2 text-cyan-200 text-sm">{p.excerpt}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <Link
                          to={`/blog/${p.slug}`}
                          className="text-sm inline-flex items-center gap-1 mt-3 text-white/90 bg-white/6 px-3 py-1 rounded hover:bg-white/10"
                        >
                          Read →
                        </Link>
                        <div className="text-xs text-cyan-300">
                          {p.readTime}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-cyan-200">
                  Showing <strong>{(page - 1) * perPage + 1}</strong> -{" "}
                  <strong>
                    {Math.min(page * perPage, filteredPosts.length)}
                  </strong>{" "}
                  of <strong>{filteredPosts.length}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1 rounded border border-white/6 bg-transparent disabled:opacity-40"
                  >
                    Prev
                  </button>

                  <div className="text-sm">
                    Page {page} / {totalPages}
                  </div>

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1 rounded border border-white/6 bg-transparent disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="p-4 rounded-lg bg-white/6 border border-white/8">
                <h4 className="font-semibold text-white mb-3">Popular</h4>
                <div className="space-y-3">
                  {popular.map((p) => (
                    <Link
                      key={p.id}
                      to={`/blog/${p.slug}`}
                      className="flex items-center gap-3 p-2 rounded hover:bg-white/5 transition"
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {p.title}
                        </div>
                        <div className="text-xs text-cyan-200">
                          {p.readTime}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/6 border border-white/8">
                <h4 className="font-semibold text-white mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setActiveTag(activeTag === t ? null : t);
                        setPage(1);
                      }}
                      className={`text-sm py-1 px-3 rounded-full border ${
                        activeTag === t
                          ? "bg-white/8 text-white border-white/12"
                          : "text-cyan-200 border-white/8 hover:bg-white/6"
                      }`}
                    >
                      #{t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inline volunteer form (directly in sidebar) */}
              <div className="p-0 max-w-[380px]">
                <JoinVolunteerFormInline
                  apiBase="http://localhost:5173/api"
                  onSubmit={(data) => console.log("Volunteer Joined:", data)}
                />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
