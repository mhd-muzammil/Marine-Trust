import React from 'react';
import useGetVolunteers from '../hooks/useGetVolunteers';

export default function VolunteerList({ open, onClose }) {
  const { volunteers, loading, error } = useGetVolunteers(open);

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
        {/* header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Our Volunteers 🌊</h2>
          <button
            onClick={onClose}
            className="text-sm px-3 py-1 rounded border border-slate-200 hover:bg-slate-100"
          >
            Close
          </button>
        </div>

        {/* content */}
        <div className="p-6 max-h-[70vh] overflow-auto">
          {loading ? (
            <p className="text-center text-slate-500">Loading volunteers...</p>
          ) : error ? (
            <p className="text-center text-red-500">
              Failed to load volunteers: {error}
            </p>
          ) : volunteers.length === 0 ? (
            <p className="text-center text-slate-500">No volunteers found.</p>
          ) : (
            <ul className="space-y-3">
              {volunteers.map((v) => (
                <li
                  key={v._id || v.emailId}
                  className="flex items-center justify-between bg-white/60 p-3 rounded-lg shadow-sm hover:bg-cyan-50 transition"
                >
                  <div className="flex items-center gap-3">
                    {/* initials avatar */}
                    <div className="w-10 h-10 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white flex items-center justify-center rounded-full font-semibold">
                      {(v.fullName || 'U N')
                        .split(' ')
                        .map((s) => s[0])
                        .slice(0, 2)
                        .join('')}
                    </div>

                    {/* info */}
                    <div>
                      <h4 className="font-semibold">{v.fullName}</h4>
                      <p className="text-sm text-slate-600">{v.phone}</p>
                    </div>
                  </div>

                  <div className="text-right text-xs text-slate-500">
                    <div>{v.location}</div>
                    {v.createdAt && (
                      <div>{new Date(v.createdAt).toLocaleDateString()}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* footer */}
        <div className="px-6 py-3 border-t text-sm text-center text-slate-500">
          Showing {volunteers.length} active volunteers 🐚
        </div>
      </div>
    </div>
  );
}
