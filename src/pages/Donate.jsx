import React, { useEffect, useState } from "react";
import {
  FaHandHoldingUsd,
  FaCheckCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";

/**
 * Donate.jsx
 * Enhanced frontend-only Razorpay-integrated donation page (copy-paste).
 *
 * IMPORTANT:
 * - Replace RAZORPAY_KEY with your public key (never put secret in frontend).
 * - This demo DOES NOT verify payment signature server-side.
 *   For production: create order server-side and verify signature on backend.
 */

const RAZORPAY_KEY = "rzp_test_RPQrMz2geEuiTT"; // <-- REPLACE

const TIERS = [
  {
    id: "supporter",
    label: "Supporter",
    amount: 100,
    desc: "Covers supplies for one coastal cleanup.",
  },
  {
    id: "protector",
    label: "Protector",
    amount: 500,
    desc: "Funds one community awareness workshop.",
  },
  {
    id: "champion",
    label: "Champion",
    amount: 2000,
    desc: "Supports reef restoration efforts.",
  },
];

const FAQs = [
  {
    q: "Where do donations go?",
    a: "All donations fund field work, community education, coral/mangrove restoration, and operational costs. We publish quarterly impact reports.",
  },
  {
    q: "Is my donation tax-deductible?",
    a: "If your country offers tax deductions for donations, we can issue receipts. Contact info@marinebiodiversity.org for paperwork.",
  },
  {
    q: "Can I set up a recurring donation?",
    a: "Yes — contact us for recurring setup (we support Stripe Subscriptions / Razorpay Subscriptions via backend).",
  },
];

export default function Donate() {
  const [selected, setSelected] = useState(null);
  const [custom, setCustom] = useState("");
  const [coverFees, setCoverFees] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState(null);

  // NEW: show/hide card modal state
  const [showCardModal, setShowCardModal] = useState(false);

  useEffect(() => {
    // load Razorpay script
    if (
      !document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      )
    ) {
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  function chooseTier(amount) {
    setSelected(amount);
    setCustom("");
  }
  function handleCustom(e) {
    const v = e.target.value;
    if (/^[0-9]*\.?[0-9]{0,2}$/.test(v) || v === "") {
      setCustom(v);
      setSelected(null);
    }
  }
  function displayAmount() {
    const amt = selected ?? (custom ? parseFloat(custom) : 0);
    return isNaN(amt) ? 0 : amt;
  }
  function toPaise(rupee) {
    let r = Number(rupee) || 0;
    if (coverFees && r > 0) {
      const feePercent = 0.022;
      const fixed = 3;
      r = r + r * feePercent + fixed;
    }
    return Math.round(r * 100);
  }

  async function startRazorpayFrontEnd(rupeeAmount) {
    const amountPaise = toPaise(rupeeAmount);
    if (amountPaise <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    setLoading(true);
    try {
      // 1) create order on server (send amount in rupees)
      const createResp = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: rupeeAmount }), // server will convert to paise
      });
  
      const order = await createResp.json();
      if (!createResp.ok || !order.id) {
        console.error("Order creation failed:", order);
        alert("Failed to create order. Try again later.");
        setLoading(false);
        return;
        
      }

      // 2) wait for Razorpay to be ready
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          let t = 0;
          const id = setInterval(() => {
            t++;
            if (window.Razorpay) {
              clearInterval(id);
              resolve();
            } else if (t > 40) {
              clearInterval(id);
              reject(new Error("Razorpay script failed to load"));
            }
          }, 100);
        });
      }

      // 3) open checkout with server created order
      const options = {
        key: RAZORPAY_KEY, // public key in your frontend
        amount: order.amount, // paise (from server)
        currency: order.currency,
        name: "Marine Biodiversity Org",
        description: "Donation",
        order_id: order.id,
        prefill: { name: "", email: "", contact: "" },
        notes: { demo: "backend integration" },
        theme: { color: "#0077b6" },
        handler: async function (resp) {
          // resp: { razorpay_payment_id, razorpay_order_id, razorpay_signature }
          try {
            // 4) Verify on backend
            const verifyResp = await fetch(
              "http://localhost:5000/verify-payment",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(resp),
              }
            );
            const verifyJson = await verifyResp.json();
            if (verifyResp.ok && verifyJson.success) {
              setShowThanks(true);
            } else {
              alert("Payment verification failed. Please contact support.");
              console.error("verify error:", verifyJson);
            }
          } catch (err) {
            console.error("Error verifying payment:", err);
            alert("Verification error occurred.");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (err) => {
        console.error("Payment failed:", err);
        alert("Payment failed: " + (err.error?.description || "Unknown error"));
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment flow error: " + err.message);
    } finally {
      setLoading(false);
    }
  }


  // quick impact numbers (static demo)
  const impact = {
    cleaned_km: 142,
    volunteers: 832,
    seedlings: 12450,
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#00121a] via-[#002b3a] to-[#00121a] text-sky-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* HERO */}
        <section className="grid md:grid-cols-2 gap-8 items-center mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Protect Our Oceans — Donate Today
            </h1>
            <p className="mt-4 text-sky-200 max-w-2xl">
              Join a community of donors who fund on-ground cleanup campaigns,
              reef restoration, community workshops and scientific monitoring.
              Even small monthly contributions add up to big impact.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() =>
                  document
                    .getElementById("donate-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-full bg-gradient-to-r from-[#00b4d8] to-[#0077b6] px-5 py-2 font-semibold shadow"
              >
                Donate Now
              </button>
              <a
                href="/about"
                className="px-4 py-2 border border-white/10 rounded"
              >
                Learn more
              </a>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{impact.cleaned_km} km</div>
                <div className="text-sm text-sky-200">Coastline cleaned</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{impact.volunteers}</div>
                <div className="text-sm text-sky-200">Active volunteers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{impact.seedlings}</div>
                <div className="text-sm text-sky-200">
                  Mangrove seedlings planted
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 p-4">
            <img
              src="https://images.unsplash.com/photo-1610093703375-6d8fd641294b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Coastal cleanup"
              className="w-full h-64 object-cover rounded-md"
            />
            <div className="mt-3 text-sm text-sky-200">
              Photo: community cleanup at sunrise
            </div>
          </div>
        </section>

        {/* PROGRESS BAR */}
        <section className="mb-8">
          <div className="bg-white/6 p-4 rounded-xl border border-white/8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Campaign progress</h3>
                <p className="text-sm text-sky-200">Goal: ₹500,000</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-semibold">₹287,500</div>
                <div className="text-sm text-sky-200">raised</div>
              </div>
            </div>

            <div
              className="mt-4 bg-white/10 rounded-full h-3 overflow-hidden"
              aria-hidden
            >
              <div
                className="h-full bg-gradient-to-r from-[#00b4d8] to-[#0077b6]"
                style={{ width: `${(287500 / 500000) * 100}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-sky-200">
              {Math.round((287500 / 500000) * 100)}% of goal
            </div>
          </div>
        </section>

        {/* DONATION + DETAILS */}
        <section
          id="donate-section"
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="md:col-span-2 bg-white/6 p-6 rounded-xl border border-white/8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Make a secure donation
            </h2>

            {/* tier cards */}
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              {TIERS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => chooseTier(t.amount)}
                  className={`p-4 rounded-lg text-left border ${
                    selected === t.amount
                      ? "border-[#00b4d8] bg-white/6"
                      : "border-white/8 bg-white/4"
                  } hover:scale-[1.01] transition`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-lg">{t.label}</div>
                      <div className="text-sm text-sky-200 mt-1">{t.desc}</div>
                    </div>
                    <div className="text-xl font-bold">₹{t.amount}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* custom & details */}
            <div className="grid md:grid-cols-2 gap-4 items-start">
              <div className="p-4 rounded-lg bg-white/5 border border-white/8">
                <label className="text-sm text-sky-200">
                  Custom amount (INR)
                </label>
                <div className="mt-2 flex">
                  <span className="inline-flex items-center px-3 bg-white/8 rounded-l">
                    ₹
                  </span>
                  <input
                    value={custom}
                    onChange={handleCustom}
                    placeholder="250"
                    className="w-full px-3 py-2 bg-transparent outline-none"
                    inputMode="decimal"
                  />
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm">
                  <input
                    id="coverfees"
                    type="checkbox"
                    checked={coverFees}
                    onChange={() => setCoverFees((s) => !s)}
                  />
                  <label htmlFor="coverfees" className="text-sky-200">
                    Add a small fee to cover processing costs
                  </label>
                </div>

                <div className="mt-4 text-sm text-sky-200">
                  <strong>Tip:</strong> Want a receipt? Provide your email after
                  payment (we'll contact you).
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/8">
                <h4 className="font-semibold mb-2">Secure payment</h4>
                <p className="text-sm text-sky-200 mb-2">
                  Payments processed by Razorpay. For production deployments we
                  verify payments on the server side.
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => startRazorpayFrontEnd(displayAmount())}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] px-4 py-2 rounded-lg font-semibold"
                    disabled={loading}
                  >
                    <FaHandHoldingUsd /> Donate with Razorpay
                  </button>

                  {/* MODIFIED: Card button opens card-payment modal */}
                  <button
                    onClick={() => setShowCardModal(true)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/8"
                  >
                    Card
                  </button>
                </div>

                <div className="mt-3 text-xs text-sky-200">
                  Refunds and queries: contact{" "}
                  <a
                    className="underline"
                    href="mailto:info@marinebiodiversity.org"
                  >
                    info@marinebiodiversity.org
                  </a>
                </div>
              </div>
            </div>

            {/* Impact details */}
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white/4 border border-white/8">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-[#00b4d8] mt-1" />
                  <div>
                    <div className="font-semibold">Transparent reporting</div>
                    <div className="text-sm text-sky-200">
                      Quarterly impact reports & project breakdowns.
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/4 border border-white/8">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-[#00b4d8] mt-1" />
                  <div>
                    <div className="font-semibold">Community-led</div>
                    <div className="text-sm text-sky-200">
                      We partner with local communities for lasting change.
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/4 border border-white/8">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-[#00b4d8] mt-1" />
                  <div>
                    <div className="font-semibold">Scientifically guided</div>
                    <div className="text-sm text-sky-200">
                      Restoration and monitoring follow best-practice methods.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-4">
            <div className="p-4 rounded-lg bg-white/6 border border-white/8">
              <h4 className="font-semibold mb-2">Quick facts</h4>
              <ul className="text-sm space-y-2 text-sky-200">
                <li>
                  <strong>Founded:</strong> 2016
                </li>
                <li>
                  <strong>Projects:</strong> 24 coastal restoration projects
                </li>
                <li>
                  <strong>Volunteers:</strong> 832 trained
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/6 border border-white/8">
              <h4 className="font-semibold mb-2">Recent donors</h4>
              <ul className="text-sm text-sky-200 space-y-2">
                <li>— A. Kumar — ₹500</li>
                <li>— OceanCare Club — ₹5,000</li>
                <li>— L. Fernandez — ₹1,000</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/6 border border-white/8">
              <h4 className="font-semibold mb-2">Visit us</h4>
              <div className="text-sm text-sky-200 flex items-center gap-2">
                <FaMapMarkerAlt />{" "}
                <span>Marine Hub, Portside Lane, Goa (example)</span>
              </div>
            </div>
          </aside>
        </section>

        {/* TESTIMONIALS + FAQ */}
        <section className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-white/6 border border-white/8">
            <h3 className="font-semibold mb-4">What donors say</h3>
            <blockquote className="text-sky-200 italic">
              “I love seeing monthly updates from the restoration team — great
              transparency and real results.” — Priya R.
            </blockquote>
            <blockquote className="text-sky-200 italic mt-4">
              “Their community workshops made a real difference in our village.”
              — Ramesh S.
            </blockquote>
          </div>

          <div className="p-6 rounded-xl bg-white/6 border border-white/8">
            <h3 className="font-semibold mb-4">FAQ</h3>
            <div className="space-y-3">
              {FAQs.map((f, i) => (
                <div
                  key={i}
                  className="bg-white/5 p-3 rounded-md border border-white/8"
                >
                  <button
                    onClick={() =>
                      setFaqOpenIndex(faqOpenIndex === i ? null : i)
                    }
                    className="w-full text-left flex justify-between items-center"
                    aria-expanded={faqOpenIndex === i}
                    aria-controls={`faq-${i}`}
                  >
                    <span className="font-medium">{f.q}</span>
                    <span className="text-sky-200">
                      {faqOpenIndex === i ? "−" : "+"}
                    </span>
                  </button>
                  {faqOpenIndex === i && (
                    <div id={`faq-${i}`} className="mt-2 text-sm text-sky-200">
                      {f.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT / FOOTER */}
        <footer className="py-8 border-t border-white/6 text-sky-200">
          <div className="max-w-4xl">
            <h4 className="font-semibold mb-2">Questions? Get in touch</h4>
            <div className="flex gap-3">
              <a
                href="mailto:info@marinebiodiversity.org"
                className="underline"
              >
                info@marinebiodiversity.org
              </a>
              <a href="/contact" className="underline">
                Contact form
              </a>
            </div>
            <div className="mt-4 text-xs">
              Security note: This demo uses frontend-only Razorpay checkout. For
              production you must implement backend order creation and signature
              verification to ensure payments are genuine.
            </div>
          </div>
        </footer>
      </div>

      {/* CARD PAYMENT MODAL (demo) */}
      {showCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-sky-200 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-2 text-black">
              Card payment (demo)
            </h3>
            <p className="text-lg text-neutral mb-4">
              This is a frontend-only simulated card flow for demo purposes.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-black text-lg block mb-1">
                  Card number
                </label>
                <input
                  className="w-full px-3 py-2 border rounded"
                  placeholder="4111 1111 1111 1111"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-black text-lg block mb-1">MM/YY</label>
                  <input
                    className="w-full px-3 py-2 border rounded"
                    placeholder="12/34"
                  />
                </div>
                <div style={{ width: 120 }}>
                  <label className="text-black text-lg block mb-1">CVC</label>
                  <input
                    className="w-full px-3 py-2 border rounded"
                    placeholder="123"
                  />
                </div>
              </div>
              <div>
                <label className="text-black text-lg block mb-1">
                  Name on card
                </label>
                <input
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  // simulate processing
                  setShowCardModal(false);
                  setShowThanks(true);
                }}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-black rounded"
              >
                Simulate Payment
              </button>
              <button
                onClick={() => setShowCardModal(false)}
                className="bg-slate-200 text-black text-lg font-semibold px-4 py-2 border rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* THANK YOU OVERLAY */}
      {showThanks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-8 shadow-xl max-w-md text-center text-slate-800">
            <h3 className="text-2xl font-bold mb-2">Thank you!</h3>
            <p className="mb-4">
              We received your donation (demo). We’ll email a receipt if you
              provided contact details during checkout.
            </p>
            <button
              onClick={() => setShowThanks(false)}
              className="px-4 py-2 rounded bg-[#00b4d8] text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

