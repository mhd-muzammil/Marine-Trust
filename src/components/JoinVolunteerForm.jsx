// src/components/JoinVolunteerForm.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHandsHelping,
  FaClock,
  FaPhone,
} from "react-icons/fa";

/**
 * JoinVolunteerForm with animated button -> confetti burst from button center.
 *
 * Usage:
 * <JoinVolunteerForm open={show} onClose={() => setShow(false)} onSubmit={(d)=>console.log(d)} />
 */

export default function JoinVolunteerForm({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "",
    availability: "",
    interestsCleanup: true,
    interestsRestoration: false,
    interestsEducation: false,
  });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false); // loader state
  const [done, setDone] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  const confettiLayerRef = useRef(null);

  useEffect(() => {
    if (!open) reset();
    else {
      // focus first input when opened
      setTimeout(() => {
        modalRef.current?.querySelector("input, select, button")?.focus();
      }, 80);
    }
  }, [open]);

  function reset() {
    setForm({
      name: "",
      email: "",
      phone: "",
      location: "",
      role: "",
      availability: "",
      interestsCleanup: true,
      interestsRestoration: false,
      interestsEducation: false,
    });
    setErrors({});
    setBusy(false);
    setDone(false);
  }

  if (!open) return null;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your full name";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Please enter a valid email";
    if (form.phone && !/^[\d +()-]{7,20}$/.test(form.phone))
      e.phone = "Phone looks invalid";
    if (!form.role) e.role = "Please select a volunteer role";
    return e;
  };

  const handleChange = (ev) => {
    const { name, value, type, checked } = ev.target;
    if (type === "checkbox") setForm((s) => ({ ...s, [name]: checked }));
    else setForm((s) => ({ ...s, [name]: value }));
  };

  // spawn confetti at (x,y) viewport coords
  function spawnConfettiAt(x, y, count = 28) {
    const container = confettiLayerRef.current;
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "cv-piece";
      const size = 6 + Math.round(Math.random() * 14);
      el.style.width = `${size}px`;
      el.style.height = `${Math.round(size * 0.6)}px`;
      el.style.left = `${x - size / 2}px`;
      el.style.top = `${y - size / 2}px`;
      const palette = [
        "#00b4d8",
        "#0077b6",
        "#90e0ef",
        "#ffd166",
        "#06d6a0",
        "#ff6b6b",
      ];
      el.style.background = palette[Math.floor(Math.random() * palette.length)];
      el.style.setProperty(
        "--dx",
        `${Math.round((Math.random() - 0.5) * 700)}px`
      );
      el.style.setProperty(
        "--dy",
        `${-(200 + Math.round(Math.random() * 700))}px`
      );
      el.style.setProperty("--rot", `${Math.round(Math.random() * 720)}deg`);
      container.appendChild(el);
      el.addEventListener("animationend", () => el.remove(), { once: true });
    }
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    // start loader animation
    setBusy(true);

    // get button center coordinates for confetti origin
    const btn = buttonRef.current;
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      cx = rect.left + rect.width / 2;
      cy = rect.top + rect.height / 2;
    }

    // small artificial delay for visual effect
    await new Promise((r) => setTimeout(r, 700));

    // spawn confetti
    spawnConfettiAt(cx, cy, 30);

    // show success state
    setBusy(false);
    setDone(true);

    // call parent's onSubmit
    try {
      onSubmit?.(form);
    } catch (err) {
      console.error(err);
    }

    // auto-close after a moment
    setTimeout(() => {
      setDone(false);
      onClose?.();
      reset();
    }, 1600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Volunteer form"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => onClose?.()}
      />

      {/* confetti layer */}
      <div
        ref={confettiLayerRef}
        className="pointer-events-none absolute inset-0 z-60 overflow-hidden"
        aria-hidden
      />

      {/* modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl z-50"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* left info */}
          <div className="hidden lg:flex flex-col justify-between p-6 bg-gradient-to-b from-[#002b3a] to-[#001921] text-sky-100">
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white flex items-center justify-center font-semibold">
                  VT
                </div>
                <div>
                  <div className="text-lg font-semibold">
                    Volunteer with Marine Trust
                  </div>
                  <div className="text-xs text-cyan-200">
                    Join monitoring, restoration & outreach
                  </div>
                </div>
              </div>

              <p className="text-cyan-100 leading-relaxed">
                Thank you for stepping forward. Volunteers do beach cleanups,
                nursery days, data monitoring and community outreach. We'll
                contact you with next steps.
              </p>

              <ul className="mt-4 space-y-2 text-sm text-cyan-200">
                <li className="flex items-start gap-2">
                  <FaHandsHelping className="mt-1 text-cyan-300" /> Hands-on
                  restoration & surveys
                </li>
                <li className="flex items-start gap-2">
                  <FaClock className="mt-1 text-cyan-300" /> Flexible weekday &
                  weekend slots
                </li>
                <li className="flex items-start gap-2">
                  <FaMapMarkerAlt className="mt-1 text-cyan-300" /> Local &
                  regional projects
                </li>
              </ul>
            </div>

            <div className="mt-6 text-xs text-cyan-300">
              <strong>Privacy:</strong> we only use your info to coordinate
              volunteer activities.
            </div>
          </div>

          {/* right: form */}
          <div className="bg-gradient-to-b from-purple-800 to-purple-700 p-6 md:p-8 relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold text-white">
                Join as a Volunteer
              </h3>
              <button
                onClick={() => onClose?.()}
                aria-label="Close"
                className="text-white/80 hover:text-white p-1 rounded"
              >
                <FaTimes />
              </button>
            </div>

            {/* success snapshot */}
            {done ? (
              <div className="relative z-10 flex flex-col items-center gap-3 py-8">
                <div className="rounded-full bg-white/90 w-20 h-20 flex items-center justify-center text-3xl animate-pop">
                  ✅
                </div>
                <div className="text-lg font-semibold text-white">
                  You're in — thanks!
                </div>
                <p className="text-sm text-white/80 text-center">
                  We'll email next steps and volunteer opportunities soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* name + email */}
                <div className="grid md:grid-cols-2 gap-3">
                  <label className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      className={`w-full pl-10 pr-3 py-2 rounded-lg bg-white/5 text-white placeholder:text-white/60 focus:outline-none ${
                        errors.name
                          ? "ring-2 ring-rose-400"
                          : "ring-1 ring-white/10"
                      }`}
                      required
                    />
                    {errors.name && (
                      <div className="text-rose-300 text-xs mt-1">
                        {errors.name}
                      </div>
                    )}
                  </label>

                  <label className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className={`w-full pl-10 pr-3 py-2 rounded-lg bg-white/5 text-white placeholder:text-white/60 focus:outline-none ${
                        errors.email
                          ? "ring-2 ring-rose-400"
                          : "ring-1 ring-white/10"
                      }`}
                      required
                    />
                    {errors.email && (
                      <div className="text-rose-300 text-xs mt-1">
                        {errors.email}
                      </div>
                    )}
                  </label>
                </div>

                {/* phone + location */}
                <div className="grid md:grid-cols-2 gap-3">
                  <label className="relative">
                    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Phone (optional)"
                      className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/5 text-white placeholder:text-white/60 ring-1 ring-white/10 focus:outline-none"
                    />
                    {errors.phone && (
                      <div className="text-rose-300 text-xs mt-1">
                        {errors.phone}
                      </div>
                    )}
                  </label>

                  <label className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
                    <input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="Your town / city"
                      className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/5 text-white placeholder:text-white/60 ring-1 ring-white/10 focus:outline-none"
                    />
                  </label>
                </div>

                {/* role + availability */}
                <div className="grid md:grid-cols-2 gap-3">
                  <label>
                    <select
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className={`w-full py-2 px-3 rounded-lg bg-white/5 text-white placeholder:text-white/60 focus:outline-none ${
                        errors.role
                          ? "ring-2 ring-rose-400"
                          : "ring-1 ring-white/10"
                      }`}
                      required
                    >
                      <option value="">Select a role</option>
                      <option>Beach Cleanup</option>
                      <option>Reef Restoration</option>
                      <option>Community Education</option>
                      <option>Research Support</option>
                    </select>
                    {errors.role && (
                      <div className="text-rose-300 text-xs mt-1">
                        {errors.role}
                      </div>
                    )}
                  </label>

                  <label>
                    <input
                      name="availability"
                      value={form.availability}
                      onChange={handleChange}
                      placeholder="Availability (weekends, weekdays, etc.)"
                      className="w-full py-2 px-3 rounded-lg bg-white/5 text-white placeholder:text-white/60 focus:outline-none ring-1 ring-white/10"
                    />
                  </label>
                </div>

                {/* interests */}
                <div className="flex flex-wrap gap-4 items-center">
                  <label className="inline-flex items-center gap-2 text-white/90">
                    <input
                      type="checkbox"
                      name="interestsCleanup"
                      checked={form.interestsCleanup}
                      onChange={handleChange}
                      className="accent-[#00b4d8] w-4 h-4"
                    />{" "}
                    Beach cleanup
                  </label>
                  <label className="inline-flex items-center gap-2 text-white/90">
                    <input
                      type="checkbox"
                      name="interestsRestoration"
                      checked={form.interestsRestoration}
                      onChange={handleChange}
                      className="accent-[#00b4d8] w-4 h-4"
                    />{" "}
                    Reef restoration
                  </label>
                  <label className="inline-flex items-center gap-2 text-white/90">
                    <input
                      type="checkbox"
                      name="interestsEducation"
                      checked={form.interestsEducation}
                      onChange={handleChange}
                      className="accent-[#00b4d8] w-4 h-4"
                    />{" "}
                    Community education
                  </label>
                </div>

                {/* submit */}
                <div className="pt-2">
                  <button
                    ref={buttonRef}
                    type="submit"
                    disabled={busy}
                    className={`relative w-full py-2 rounded-lg text-white font-semibold transition-transform transform ${
                      busy
                        ? "scale-95 opacity-90 pointer-events-none"
                        : "hover:scale-[1.02]"
                    } bg-gradient-to-r from-[#00b4d8] to-[#0077b6] flex items-center justify-center gap-3`}
                    aria-live="polite"
                    aria-busy={busy}
                  >
                    {/* Render spinner only when busy */}
                    {busy && <span className="spinner" aria-hidden />}

                    <span
                      className={`btn-text ${
                        busy ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      Join as Volunteer
                    </span>
                  </button>
                  {errors.submit && (
                    <div className="text-rose-300 text-sm mt-2">
                      {errors.submit}
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* styles (confetti + small spinner + pop) */}
      <style>{`
        /* confetti pieces: use CSS vars for direction */
        .cv-piece {
          position: absolute;
          border-radius: 2px;
          opacity: 0.95;
          will-change: transform, opacity;
          animation: cv-flight 1000ms forwards cubic-bezier(.2,.7,.2,1);
          z-index: 99999;
        }
        @keyframes cv-flight {
          0% {
            transform: translate3d(0,0,0) rotate(0deg) scale(1);
            opacity: 1;
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: translate3d(var(--dx, 0px), var(--dy, -400px), 0) rotate(var(--rot, 360deg)) scale(0.7);
            opacity: 0;
          }
        }

        /* tiny spinner */
        .spinner {
          display: inline-block;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 3px solid rgba(255,255,255,0.2);
          border-top-color: rgba(255,255,255,0.95);
          animation: spin 900ms linear infinite;
          margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .animate-pop { animation: pop-in 420ms cubic-bezier(0.2,0.9,0.3,1); }
        @keyframes pop-in {
          0% { transform: scale(0.6); opacity: 0 }
          70% { transform: scale(1.08); opacity: 1 }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
