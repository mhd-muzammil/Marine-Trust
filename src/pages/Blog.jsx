import React, { useMemo, useState } from "react";
import { FaSearch, FaTag, FaCalendarAlt, FaUserCircle } from "react-icons/fa";

// Demo posts with unique Unsplash images
const DEMO_POSTS = [
  {
    id: "p1",
    title: "10 Ways You Can Help Protect Coral Reefs",
    slug: "10-ways-protect-coral-reefs",
    excerpt:
      "Small steps add up. Learn practical, evidence-based actions you can take to reduce reef damage and support restoration.",
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
      "Our community training sessions build local capacity for waste management and sustainable livelihoods.",
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
      "Data-driven restoration — the metrics we track and why transparent reporting matters for donors and stakeholders.",
    author: "Dr. A. Kumar",
    date: "2025-06-02",
    category: "Research",
    tags: ["monitoring", "data"],
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1610093641855-31ffd617a94a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJlYWNoJTIwY2xlYW51cHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "p4",
    title: "Volunteer Spotlight: OceanCare Club",
    slug: "volunteer-spotlight-oceancare",
    excerpt:
      "Meet the volunteers making a measurable difference — their stories, challenges and wins from the field.",
    author: "Team",
    date: "2025-05-14",
    category: "People",
    tags: ["volunteer", "story"],
    readTime: "3 min",
    image:
      "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1400&q=80",
  },
];

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

export default function Blog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [activeTag, setActiveTag] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const categories = useMemo(() => {
    const set = new Set(DEMO_POSTS.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const allTags = useMemo(() => {
    const t = new Set();
    DEMO_POSTS.forEach((p) => p.tags.forEach((tag) => t.add(tag)));
    return Array.from(t);
  }, []);

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
    arr.sort((a, b) =>
      a.hero ? -1 : b.hero ? 1 : new Date(b.date) - new Date(a.date)
    );
    return arr;
  }, [category, activeTag, query]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / perPage));
  const pagePosts = filteredPosts.slice((page - 1) * perPage, page * perPage);
  const hero = filteredPosts.find((p) => p.hero) || filteredPosts[0] || null;

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setActiveTag(null);
    setPage(1);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#00121a] via-[#002b3a] to-[#00121a] text-sky-100 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
            Insights & Stories
          </h1>
          <p className="mt-2 text-cyan-200 max-w-2xl">
            Read project updates, field stories, and research about marine
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
                  <a
                    href={`/blog/${hero.slug}`}
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white font-semibold shadow"
                  >
                    Read full story
                  </a>
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
                    <a
                      href={`/blog/${p.slug}`}
                      className="text-sm inline-flex items-center gap-1 mt-3 text-white/90 bg-white/6 px-3 py-1 rounded hover:bg-white/10"
                    >
                      Read →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
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
          </aside>
        </div>
      </div>
    </main>
  );
}
