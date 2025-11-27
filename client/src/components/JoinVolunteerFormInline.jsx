// src/components/JoinVolunteerFormInline.jsx
import React, { useState } from "react";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import successAnim from "../animations/success.json";

export default function JoinVolunteerFormInline({
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

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Please enter your full name";
    if (!form.emailId.trim() || !/^\S+@\S+\.\S+$/.test(form.emailId)) {
      e.emailId = "Please enter a valid email";
    }
    return e;
  };

  const handleChange = (ev) => {
    const { name, value, type, checked } = ev.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

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
        confettiBlast();
        if (onSubmit) onSubmit(resp.data);
      } else {
        setDone(true);
        confettiBlast();
      }
    } catch (err) {
      setErrors({
        server: err?.response?.data?.message || "Server error. Try again.",
      });
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-full max-w-lg rounded-2xl bg-[#001921] border border-white/10 p-8 text-center shadow-xl">
          <Player
            autoplay
            loop={false}
            src={successAnim}
            style={{ height: "140px", width: "140px", margin: "0 auto" }}
          />

          <h3 className="text-2xl font-bold text-white mt-4 mb-2">
            You're in, thanks!
          </h3>

          <p className="text-cyan-200 text-sm leading-relaxed">
            We'll email next steps and volunteer opportunities soon.
          </p>
        </div>

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

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/8 bg-white/5 p-4 md:p-6">
      <h3 className="text-2xl font-semibold text-white mb-4">
        Join as a Volunteer
      </h3>

      <div className="space-y-4">
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
