import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

/**
 * Contact page: realistic underwater scene + map + attractive contact card
 *
 * Put this file at src/pages/Contact.jsx and import via routing.
 * Place any hero/poster images (optional) in public/ if you want them.
 *
 * Notes:
 * - This uses inline SVG animation (no external libs).
 * - Map uses Google Maps iframe by default (simple). See below for Leaflet option.
 * - Respects prefers-reduced-motion (animations will pause).
 */

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);

    // Prepare template parameters from your existing form state
    const templateParams = {
      from_name: form.name || "Anonymous",
      from_email: form.email || "no-reply@example.com",
      message: form.message || "(no message)",
    };

    try {
      // Replace the 3 placeholders below with your real EmailJS values:
      // 1) SERVICE_ID (looks like "service_xxxxxx")
      // 2) TEMPLATE_ID (looks like "template_xxxxxx")
      // 3) PUBLIC_KEY (looks like "public_xxxxxx")
      const SERVICE_ID = "service_fxelr11";
      const TEMPLATE_ID = "template_frl91q5";
      const PUBLIC_KEY = "x1Dm4a9WCoTnedaYR";

      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );
      console.log("EmailJS result:", result);
      setSending(false);
      alert("Thanks — your message was sent!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setSending(false);
      alert("Sorry — failed to send message. Please try again later.");
    }
  }


    return (
        <main className="relative min-h-screen bg-gradient-to-b from-[#001726] via-[#002a45] to-[#000814] overflow-hidden text-sky-100">
            {/* ====== LIGHT RAYS (subtle) ====== */}
            <div className="absolute inset-0 pointer-events-none">
                <svg
                    className="absolute left-0 top-0 w-full h-full"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <defs>
                        <radialGradient id="g1" cx="20%" cy="10%" r="60%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#g1)" />
                </svg>
            </div>

            {/* ====== BUBBLES (animated circles) ====== */}
            <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                {/* multiple bubble elements with staggered durations & positions */}
                <circle r="6" cx="12%" cy="100%" fill="#ffffff" fillOpacity="0.08">
                    <animate
                        attributeName="cy"
                        values="100%;-10%"
                        dur="12s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="opacity"
                        values="0.08;0.22;0"
                        dur="12s"
                        repeatCount="indefinite"
                    />
                </circle>
                <circle r="4" cx="25%" cy="100%" fill="#ffffff" fillOpacity="0.06">
                    <animate
                        attributeName="cy"
                        values="100%;-8%"
                        dur="10s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="opacity"
                        values="0.06;0.18;0"
                        dur="10s"
                        repeatCount="indefinite"
                    />
                </circle>
                <circle r="8" cx="78%" cy="100%" fill="#ffffff" fillOpacity="0.05">
                    <animate
                        attributeName="cy"
                        values="100%;-12%"
                        dur="18s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="opacity"
                        values="0.05;0.2;0"
                        dur="18s"
                        repeatCount="indefinite"
                    />
                </circle>
                <circle r="5" cx="55%" cy="100%" fill="#ffffff" fillOpacity="0.06">
                    <animate
                        attributeName="cy"
                        values="100%;-10%"
                        dur="13s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="opacity"
                        values="0.06;0.2;0"
                        dur="13s"
                        repeatCount="indefinite"
                    />
                </circle>
            </svg>

            {/* ====== FISH silhouettes swimming (animateMotion) ====== */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden="true"
            >
                <g fill="#ffffff" fillOpacity="0.06">
                    {/* fish 1 */}
                    <path d="M0,10 C8,2 28,2 36,10 C28,18 8,18 0,10 Z">
                        <animateMotion dur="22s" repeatCount="indefinite">
                            <mpath href="#fishPath1" />
                        </animateMotion>
                    </path>
                    {/* fish 2 (smaller) */}
                    <path
                        d="M0,6 C5,1 18,1 23,6 C18,11 5,11 0,6 Z"
                        transform="scale(1.2)"
                    >
                        <animateMotion dur="28s" repeatCount="indefinite" begin="4s">
                            <mpath href="#fishPath2" />
                        </animateMotion>
                    </path>

                    {/* motion paths (off-screen to off-screen) */}
                    <path
                        id="fishPath1"
                        d="M-200,120 C200,80 800,40 1400,120"
                        fill="none"
                        stroke="none"
                    />
                    <path
                        id="fishPath2"
                        d="M-300,240 C160,200 760,160 1600,240"
                        fill="none"
                        stroke="none"
                    />
                </g>
            </svg>

            {/* ====== SWAYING CORAL (bottom left + right) - decorative ====== */}
            <svg
                className="absolute bottom-0 left-6 w-40 h-40 md:w-60 md:h-60"
                viewBox="0 0 100 100"
                aria-hidden="true"
            >
                <g fill="#00b4d8" fillOpacity="0.12" transform="translate(10,10)">
                    <g>
                        <path d="M10,90 C12,60 22,50 30,40 C36,32 40,16 44,12 C48,8 52,10 58,18 C64,26 70,40 68,58 C66,76 50,90 10,90 Z">
                            <animateTransform
                                attributeName="transform"
                                attributeType="XML"
                                type="rotate"
                                values="-3;3;-3"
                                dur="4s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <path
                            d="M30,92 C34,74 42,64 50,56 C56,49 62,38 66,30 C70,22 74,20 78,24 C82,28 84,36 82,46 C80,56 70,84 30,92 Z"
                            fillOpacity="0.08"
                        >
                            <animateTransform
                                attributeName="transform"
                                attributeType="XML"
                                type="rotate"
                                values="3;-3;3"
                                dur="5.5s"
                                repeatCount="indefinite"
                            />
                        </path>
                    </g>
                </g>
            </svg>

            <svg
                className="absolute bottom-0 right-6 w-40 h-40 md:w-60 md:h-60"
                viewBox="0 0 100 100"
                aria-hidden="true"
            >
                <g fill="#0077b6" fillOpacity="0.12" transform="translate(10,10)">
                    <path d="M12,90 C18,62 32,48 44,36 C52,26 62,18 70,20 C78,22 82,32 80,44 C78,56 62,78 12,90 Z">
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="rotate"
                            values="2;-2;2"
                            dur="5s"
                            repeatCount="indefinite"
                        />
                    </path>
                </g>
            </svg>

            {/* ====== PAGE CONTENT (center) ====== */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-sky-200 drop-shadow-lg">
                        Reach Out — Dive In
                    </h1>
                    <p className="mt-3 text-sky-100 max-w-2xl mx-auto">
                        We’re here to collaborate, answer questions, and get things done for
                        the ocean. Send a message or find us on the map.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* ---- Left: Map (spans two rows on large screens) ---- */}
                    <div className="lg:col-span-2">
                        {/* Modern framed map card */}
                        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-tr from-slate-900/60 to-slate-800/30">
                            {/* Map header */}
                            <div className="px-6 py-4 flex items-center justify-between bg-white/5">
                                <div>
                                    <h3 className="text-lg font-semibold text-sky-100">
                                        Our Location
                                    </h3>
                                    <p className="text-sm text-sky-200/80">
                                        Marine Biodiversity Trust — Chennai Office
                                    </p>
                                </div>
                                <div className="text-sm text-sky-200/80">
                                    Open: Mon–Fri • 9am–5pm
                                </div>
                            </div>

                            {/* Google Maps iframe (simple) */}
                            <div className="w-full h-80 md:h-96">
                                {/* 
                  Replace the src below with your place or coordinates.
                  Example coordinates used: Chennai (13.0827,80.2707).
                  If you prefer Leaflet or a Maps JavaScript API with marker, see notes below.
                */}
                                <iframe
                                    title="Marine Biodiversity Trust Location"
                                    className="w-full h-full border-0"
                                    loading="lazy"
                                    src={`https://www.google.com/maps?q=13.0827,80.2707&z=13&output=embed`}
                                    allowFullScreen
                                />
                            </div>

                            {/* map footer */}
                            <div className="px-6 py-3 flex items-center justify-between bg-white/3">
                                <div className="text-sm text-sky-200/80 flex items-center gap-2">
                                    <FaMapMarkerAlt /> 123 Ocean Road, Chennai
                                </div>
                                <div className="text-sm text-sky-200/80">
                                    Directions • Contact • Hours
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ---- Right: Contact card ---- */}
                    <aside className="lg:col-span-1">
                        <div className="rounded-3xl bg-white/5 backdrop-blur-md p-6 shadow-2xl border border-white/10">
                            <h3 className="text-2xl font-bold text-sky-100 mb-2">
                                Contact Us
                            </h3>
                            <p className="text-sky-200/80 mb-4">
                                Have questions or partnership ideas? Send us a message.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-sm text-sky-200/80">Name</label>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="mt-1 w-full rounded-lg bg-white/5 border border-white/8 px-3 py-2 placeholder-sky-400 text-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
                                        placeholder="Your name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-sky-200/80">Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="mt-1 w-full rounded-lg bg-white/5 border border-white/8 px-3 py-2 placeholder-sky-400 text-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-sky-200/80">Message</label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        className="mt-1 w-full rounded-lg bg-white/5 border border-white/8 px-3 py-2 placeholder-sky-400 text-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400 h-28"
                                        placeholder="Tell us about your idea..."
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="w-full inline-flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-[#00b4d8] to-[#0077b6] px-4 py-2 font-semibold text-white shadow-lg hover:scale-[1.02] transition"
                                >
                                    {/* simple spinner */}
                                    <svg
                                        className={`w-5 h-5 text-white ${sending ? "animate-spin" : "opacity-0"
                                            }`}
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="white"
                                            strokeWidth="3"
                                            strokeOpacity="0.25"
                                            fill="none"
                                        ></circle>
                                        <path
                                            d="M22 12a10 10 0 0 1-10 10"
                                            stroke="white"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            fill="none"
                                        ></path>
                                    </svg>
                                    <span>{sending ? "Sending..." : "Send Message"}</span>
                                </button>

                                <div className="mt-4 text-sm text-sky-200/80">
                                    Prefer email?{" "}
                                    <a
                                        className="underline"
                                        href="mailto:info@marinebiodiversity.org"
                                    >
                                        info@marinebiodiversity.org
                                    </a>
                                </div>
                            </form>

                            <hr className="my-5 border-white/6" />

                            <div className="flex items-center justify-between text-sky-200/90">
                                <div className="flex items-center gap-3">
                                    <FaPhone /> <span className="text-sm">+91 98765 43210</span>
                                </div>
                                <div className="flex gap-3 text-xl">
                                    <a
                                        className="hover:text-white/90"
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FaFacebook />
                                    </a>
                                    <a
                                        className="hover:text-white/90"
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FaInstagram />
                                    </a>
                                    <a
                                        className="hover:text-white/90"
                                        href="https://linkedin.com"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FaLinkedin />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Accessibility: respect reduced motion - pause animations via CSS prefers-reduced-motion (optional) */}
            <style>{`
        @media (prefers-reduced-motion: reduce) {
          svg * { animation: none !important; }
        }
      `}</style>
        </main>
    );
}
