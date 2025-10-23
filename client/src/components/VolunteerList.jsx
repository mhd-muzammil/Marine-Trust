import React, { useEffect, useState } from "react";

export default function VolunteerList({ open, onClose }) {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  // mock volunteer data
  const MOCK_VOLUNTEERS = [
    {
      name: "Ananya R",
      role: "Field Coordinator",
      location: "Goa",
      joined: "2 days ago",
    },
    {
      name: "Rahul K",
      role: "Beach Cleanup Lead",
      location: "Kerala",
      joined: "5 days ago",
    },
    {
      name: "Sneha V",
      role: "Community Educator",
      location: "Lakshadweep",
      joined: "1 week ago",
    },
    {
      name: "Amit S",
      role: "Data Analyst",
      location: "Mumbai",
      joined: "2 weeks ago",
    },
    {
      name: "Nisha L",
      role: "Marine Biologist",
      location: "Chennai",
      joined: "3 weeks ago",
    },
    {
      name: "Karthik G",
      role: "Volunteer Trainer",
      location: "Goa",
      joined: "1 month ago",
    },
    {
      name: "Divya M",
      role: "Waste Management Advisor",
      location: "Pondicherry",
      joined: "1 month ago",
    },
    {
      name: "Arjun P",
      role: "Reef Restoration Assistant",
      location: "Lakshadweep",
      joined: "2 months ago",
    },
    {
      name: "Meera J",
      role: "Coral Nursery Support",
      location: "Andaman",
      joined: "2 months ago",
    },
    {
      name: "Ravi T",
      role: "Public Awareness Manager",
      location: "Chennai",
      joined: "3 months ago",
    },
    {
      name: "Leena C",
      role: "Photographer",
      location: "Goa",
      joined: "3 months ago",
    },
    {
      name: "Prakash B",
      role: "Community Liaison",
      location: "Kerala",
      joined: "4 months ago",
    },
    {
      name: "Harini D",
      role: "Marine Science Intern",
      location: "Mumbai",
      joined: "4 months ago",
    },
  ];

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    // simulate API
    setTimeout(() => {
      setVolunteers(MOCK_VOLUNTEERS);
      setLoading(false);
    }, 800);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* modal */}
      <div className="relative z-10 w-full max-w-3xl bg-white/95 rounded-xl shadow-2xl overflow-hidden text-slate-900">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Our Volunteers 🌊</h2>
          <button
            onClick={onClose}
            className="text-sm px-3 py-1 rounded border border-slate-200 hover:bg-slate-100"
          >
            Close
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-auto">
          {loading ? (
            <p className="text-center text-slate-500">Loading volunteers...</p>
          ) : (
            <ul className="space-y-3">
              {volunteers.map((v, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between bg-white/60 p-3 rounded-lg shadow-sm hover:bg-cyan-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white flex items-center justify-center rounded-full font-semibold">
                      {v.name
                        .split(" ")
                        .map((s) => s[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <h4 className="font-semibold">{v.name}</h4>
                      <p className="text-sm text-slate-600">{v.role}</p>
                    </div>
                  </div>

                  <div className="text-right text-xs text-slate-500">
                    <div>{v.location}</div>
                    <div>{v.joined}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="px-6 py-3 border-t text-sm text-center text-slate-500">
          Showing {volunteers.length} active volunteers 🐚
        </div>
      </div>
    </div>
  );
}
