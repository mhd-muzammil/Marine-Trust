// src/components/JoinVolunteerForm.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
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
 * JoinVolunteerForm (wired to backend OTP flow)
 *
 * Props:
 *  - open (bool)
 *  - onClose (fn)
 *  - onSubmit (fn) -> called after successful registration with saved volunteer data
 *  - apiBase (string, optional) -> e.g. "http://localhost:5000/api/volunteer"
 *
 * Backend endpoints used:
 *  POST {apiBase}/send-otp       { email }
 *  POST {apiBase}/register       { name, email, phone, location, role, availability, interests..., otp }
 *
 * Install: npm install axios
 */

export default function JoinVolunteerForm({
  open,
  onClose,
  onSubmit,
  // apiBase = process.env.REACT_APP_API_BASE ||
    // "http://localhost:5000/api/volunteer",
}) {
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
  const [busy, setBusy] = useState(false); // generic loader state
  const [done, setDone] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [serverMsg, setServerMsg] = useState("");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    let timer;
    if (otpCooldown > 0) {
      timer = setTimeout(() => setOtpCooldown((s) => s - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCooldown]);

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
    setOtp("");
    setOtpSent(false);
    setServerMsg("");
    setOtpCooldown(0);
  }

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

  // 1) Send OTP to email
  const sendOtp = async () => {
    setErrors({});
    const e = {};
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) {
      e.email = "Please provide a valid email to receive OTP";
      setErrors(e);
      return;
    }
    setBusy(true);
    setServerMsg("");
    try {
      const res = await axios.post(`${apiBase}/send-otp`, {
        email: form.email,
      });
      if (res.data?.success) {
        setOtpSent(true);
        setOtpCooldown(60); // 60s cooldown for resend
        setServerMsg("OTP sent to your email. Check spam if you don't see it.");
      } else {
        setServerMsg(res.data?.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      setServerMsg(err?.response?.data?.message || "Error sending OTP");
    } finally {
      setBusy(false);
    }
  };

  // 2) Verify OTP and register volunteer
  const verifyAndRegister = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    if (!otp || !/^\d{4,6}$/.test(otp)) {
      setErrors((s) => ({
        ...s,
        submit: "Please enter the OTP sent to your email",
      }));
      return;
    }
    setBusy(true);
    setServerMsg("");
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.location,
        role: form.role,
        availability: form.availability,
        interestsCleanup: !!form.interestsCleanup,
        interestsRestoration: !!form.interestsRestoration,
        interestsEducation: !!form.interestsEducation,
        otp,
      };
      const res = await axios.post(`${apiBase}/register`, payload);
      if (res.data?.success) {
        // visual success
        const btn = buttonRef.current;
        let cx = window.innerWidth / 2;
        let cy = window.innerHeight / 2;
        if (btn) {
          const rect = btn.getBoundingClientRect();
          cx = rect.left + rect.width / 2;
          cy = rect.top + rect.height / 2;
        }
        // small delay for UX
        await new Promise((r) => setTimeout(r, 250));
        spawnConfettiAt(cx, cy, 36);
        setDone(true);
        setServerMsg(res.data.message || "Registered successfully");

        // call parent's onSubmit with server response (if any)
        try {
          onSubmit?.(res.data); // res.data could include saved volunteer
        } catch (err) {
          console.warn("onSubmit handler threw:", err);
        }

        setTimeout(() => {
          setDone(false);
          onClose?.();
          reset();
        }, 1400);
      } else {
        setErrors((s) => ({
          ...s,
          submit: res.data?.message || "Verification failed",
        }));
      }
    } catch (err) {
      console.error(err);
      setErrors((s) => ({
        ...s,
        submit: err?.response?.data?.message || "Verification error",
      }));
    } finally {
      setBusy(false);
    }
  };

  // If user wants to resend OTP
  const resendOtp = async () => {
    if (otpCooldown > 0) return;
    await sendOtp();
  };

  if (!open) return null;

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
                  <FaClock className="mt-1 text-cyan-300" /> Flexible weekday
                  &amp; weekend slots
                </li>
                <li className="flex items-start gap-2">
                  <FaMapMarkerAlt className="mt-1 text-cyan-300" /> Local &amp;
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
              <>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-4"
                  noValidate
                >
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

                  {/* OTP area */}
                  <div className="mt-2">
                    {!otpSent ? (
                      <button
                        ref={buttonRef}
                        onClick={sendOtp}
                        disabled={busy}
                        className={`relative w-full py-2 rounded-lg text-white font-semibold transition-transform transform ${
                          busy
                            ? "scale-95 opacity-90 pointer-events-none"
                            : "hover:scale-[1.02]"
                        } bg-gradient-to-r from-[#00b4d8] to-[#0077b6] flex items-center justify-center gap-3`}
                        aria-live="polite"
                        aria-busy={busy}
                      >
                        {busy && <span className="spinner" aria-hidden />}
                        <span className="btn-text">
                          {busy ? "Sending..." : "Send OTP"}
                        </span>
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            name="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="flex-1 py-2 px-3 rounded-lg bg-white/5 text-white placeholder:text-white/60 focus:outline-none ring-1 ring-white/10"
                          />
                          <button
                            onClick={resendOtp}
                            disabled={otpCooldown > 0 || busy}
                            className="py-2 px-3 rounded-lg bg-white/10 text-white/90 disabled:opacity-40"
                          >
                            {otpCooldown > 0
                              ? `Resend (${otpCooldown}s)`
                              : "Resend"}
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            ref={buttonRef}
                            onClick={verifyAndRegister}
                            disabled={busy}
                            className={`relative w-full py-2 rounded-lg text-white font-semibold transition-transform transform ${
                              busy
                                ? "scale-95 opacity-90 pointer-events-none"
                                : "hover:scale-[1.02]"
                            } bg-gradient-to-r from-[#06d6a0] to-[#00b894] flex items-center justify-center gap-3`}
                            aria-live="polite"
                            aria-busy={busy}
                          >
                            {busy && <span className="spinner" aria-hidden />}
                            <span className="btn-text">
                              {busy ? "Submitting..." : "Verify & Submit"}
                            </span>
                          </button>

                          <button
                            onClick={() => {
                              setOtpSent(false);
                              setOtp("");
                              setServerMsg("");
                            }}
                            className="py-2 px-3 rounded-lg border border-white/20 text-white/90"
                          >
                            Edit details
                          </button>
                        </div>
                      </div>
                    )}
                    {errors.submit && (
                      <div className="text-rose-300 text-sm mt-2">
                        {errors.submit}
                      </div>
                    )}
                    {serverMsg && (
                      <div className="text-sm mt-2 text-white/80">
                        {serverMsg}
                      </div>
                    )}
                  </div>
                </form>
              </>
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
