// src/components/VolunteerModal.jsx
import React, { useEffect } from "react";

/**
 * VolunteerModal props:
 *  - open (bool)
 *  - onClose (fn)
 *  - project (object)
 *  - fetchVolunteers (optional fn(projectId) -> Promise<array>)
 */
export default function VolunteerModal({
  open,
  onClose,
  project,
  fetchVolunteers,
}) {
  const [loading, setLoading] = React.useState(false);
  const [volunteers, setVolunteers] = React.useState([]);

  useEffect(() => {
    if (!open) return;
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const list = fetchVolunteers
          ? await fetchVolunteers(project?.id)
          : [
              {
                name: "Ananya R",
                role: "Field Coordinator",
                date: "2 days ago",
              },
              {
                name: "Rahul K",
                role: "Nursery Volunteer",
                date: "5 days ago",
              },
              {
                name: "SeaSupport LLC",
                role: "Corporate Sponsor",
                date: "1 month ago",
              },
            ];
        if (mounted) setVolunteers(list);
      } catch (err) {
        console.error(err);
        if (mounted) setVolunteers([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    function onEsc(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onEsc);
    return () => {
      mounted = false;
      window.removeEventListener("keydown", onEsc);
    };
  }, [open, project, fetchVolunteers, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-3xl bg-white/95 rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between px-6 py-4 border-b">
          <h3 className="text-lg md:text-xl font-bold">
            {project?.title || "Volunteer Details"}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900"
          >
            Close
          </button>
        </div>

        <div className="md:flex">
          <div className="md:w-2/3">
            <div className="w-full h-44 md:h-56 bg-slate-200">
              {project?.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://via.placeholder.com/1200x500?text=Image+Unavailable";
                  }}
                />
              )}
            </div>
            <div className="p-6">
              <p className="text-slate-700 leading-relaxed">
                {project?.description ||
                  "Working with local communities to restore ecosystems, run training and field monitoring."}
              </p>
              <ul className="mt-4 list-disc list-inside text-slate-700">
                <li>Training & nursery support</li>
                <li>Field monitoring & data collection</li>
                <li>Community awareness & capacity building</li>
              </ul>
              <div className="mt-6 text-sm text-slate-600">
                <strong>Project status:</strong>{" "}
                <span className="text-emerald-600">Active</span>
              </div>
            </div>
          </div>

          <div className="md:w-1/3 border-l p-6 bg-white/5">
            <div className="space-y-4 text-sm text-slate-700">
              <div>
                <div className="text-xs text-slate-500">Location</div>
                <div className="font-semibold">
                  {project?.location || "Unknown"}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Funding</div>
                <div className="font-semibold">
                  {project?.fundingRaised
                    ? `₹${project.fundingRaised.toLocaleString()} raised`
                    : "—"}
                </div>
                <div className="text-xs text-slate-400">
                  {project?.fundingGoal
                    ? `Goal: ₹${project.fundingGoal?.toLocaleString()}`
                    : ""}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Volunteers</div>
                <div className="font-semibold">
                  {project?.volunteersCount ?? volunteers.length}
                </div>
              </div>
              <div>
                <button
                  onClick={() =>
                    (window.location.href = `/donate?project=${
                      project?.id || ""
                    }`)
                  }
                  className="w-full px-4 py-2 rounded bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white font-semibold"
                >
                  Donate to this project
                </button>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Recent volunteers</h4>
              <div className="space-y-3 max-h-44 overflow-auto">
                {loading ? (
                  <div className="text-sm text-slate-500">
                    Loading volunteers…
                  </div>
                ) : volunteers.length === 0 ? (
                  <div className="text-sm text-slate-500">
                    No volunteers yet — be the first!
                  </div>
                ) : (
                  volunteers.map((v, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-white/3 p-2 rounded"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white flex items-center justify-center font-semibold">
                          {v.name
                            .split(" ")
                            .map((s) => s[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">
                            {v.name}
                          </div>
                          <div className="text-xs text-slate-500">{v.role}</div>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        {v.date || "recent"}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t text-right">
          <button onClick={onClose} className="px-4 py-2 rounded border">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
