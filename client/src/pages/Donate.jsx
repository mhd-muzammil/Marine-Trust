// src/pages/Donate.jsx
import React, { useEffect, useState } from "react";
import { FaHandHoldingUsd, FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";

/**
 * Simplified Donate page — updated colors & text
 * - Replace RAZORPAY_KEY with your public key
 * - Backend endpoints remain the same: POST /create-order and POST /verify-payment
 */

const RAZORPAY_KEY = "rzp_test_RPQrMz2geEuiTT"; // <-- replace with your public key

const TIERS = [
  { id: "supporter", label: "Supporter", amount: 100, desc: "Help provide supplies for a beach cleanup." },
  { id: "protector", label: "Protector", amount: 500, desc: "Fund a local community workshop." },
  { id: "champion", label: "Champion", amount: 2000, desc: "Power a reef restoration day." },
];

export default function Donate() {
  const [selected, setSelected] = useState(TIERS[0].amount);
  const [custom, setCustom] = useState("");
  const [coverFees, setCoverFees] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  // simple demo impact
  const impact = {
    cleaned_km: 142,
    volunteers: 832,
    seedlings: 12450,
  };

  useEffect(() => {
    // ensure Razorpay script present (idempotent)
    if (!document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const displayAmount = () => {
    if (custom && custom.trim() !== "") {
      const n = parseFloat(custom);
      return isNaN(n) ? 0 : n;
    }
    return selected || 0;
  };

  const toPaise = (rupee) => {
    let r = Number(rupee) || 0;
    if (coverFees && r > 0) {
      const feePercent = 0.022;
      const fixed = 3;
      r = r + r * feePercent + fixed;
    }
    return Math.round(r * 100);
  };

  async function startRazorpayFrontEnd(rupeeAmount) {
    const amountPaise = toPaise(rupeeAmount);
    if (amountPaise <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    setLoading(true);
    try {
      // 1) create order on server
      const createResp = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: rupeeAmount }), // server converts to paise
      });
      const order = await createResp.json();
      if (!createResp.ok || !order.id) {
        console.error("Order creation failed:", order);
        alert("Failed to create order. Try again later.");
        setLoading(false);
        return;
      }

      // wait if Razorpay not yet loaded
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

      // 3) open checkout
      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount, // paise from server
        currency: order.currency || "INR",
        name: "Marine Biodiversity Org",
        description: "Donation",
        order_id: order.id,
        prefill: { name: "", email: "", contact: "" },
        notes: { source: "web" },
        theme: { color: "#0077b6" },
        handler: async function (resp) {
          try {
            // 4) verify on backend
            const verifyResp = await fetch("http://localhost:5000/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(resp),
            });
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#00121a] via-[#002b3a] to-[#00121a] text-neutral-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero */}
        <section className="text-center">
          <h1 className="text-4xl font-extrabold text-neutral-50">Help Protect Our Coastal Seas</h1>
          <p className="mt-2 text-neutral-300">
            Your support funds cleanups, restoration and community programs — small gifts create big change.
          </p>
        </section>

        {/* Compact card with tiers and simple form */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/8 shadow-sm">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-neutral-50 mb-3">Choose an amount</h2>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {TIERS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelected(t.amount);
                      setCustom("");
                    }}
                    className={`rounded-lg p-3 text-left border transition ${
                      selected === t.amount && !custom ? "border-[#00b4d8] bg-white/6" : "border-white/8 bg-transparent"
                    }`}
                  >
                    <div className="font-semibold text-neutral-50">{t.label}</div>
                    <div className="text-neutral-300 text-sm mt-1">₹{t.amount}</div>
                    <div className="text-xs text-neutral-400 mt-1">{t.desc}</div>
                  </button>
                ))}
              </div>

              <label className="text-sm text-neutral-300">Or enter a custom amount (INR)</label>
              <div className="mt-2 flex gap-2">
                <span className="inline-flex items-center px-3 bg-white/8 rounded-l text-neutral-50">₹</span>
                <input
                  value={custom}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (/^[0-9]*\.?[0-9]{0,2}$/.test(v) || v === "") {
                      setCustom(v);
                      if (v !== "") setSelected(null);
                    }
                  }}
                  placeholder="250"
                  className="flex-1 px-3 py-2 bg-transparent outline-none rounded-r border border-white/10 text-neutral-50"
                  inputMode="decimal"
                />
              </div>

              <div className="mt-3 flex items-center gap-2 text-sm text-neutral-300">
                <input id="coverFees" type="checkbox" checked={coverFees} onChange={() => setCoverFees((s) => !s)} />
                <label htmlFor="coverFees">Add a small fee to cover processing costs</label>
              </div>

              <div className="mt-4 text-sm text-neutral-300">
                <strong className="text-neutral-50">Amount:</strong> <span className="text-neutral-50">₹{displayAmount().toLocaleString()}</span>{" "}
                <span className="text-neutral-400">({coverFees ? "includes small processing fee" : "no fees added"})</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-50 mb-3">Secure Checkout</h3>
              <p className="text-sm text-neutral-300 mb-4">
                Fast, secure payments processed via Razorpay. You will get a receipt if you provide email during checkout.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => startRazorpayFrontEnd(displayAmount())}
                  disabled={loading}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] px-4 py-2 rounded-lg font-semibold shadow"
                >
                  <FaHandHoldingUsd /> {loading ? "Processing..." : "Give Now"}
                </button>
              </div>

              <div className="mt-6">
                <div className="text-sm font-semibold mb-2 text-neutral-50">Why your gift matters</div>
                <ul className="text-sm text-neutral-300 space-y-2">
                  <li className="flex items-start gap-2"><FaCheckCircle className="mt-1 text-[#00b4d8]" /> Transparent impact reporting</li>
                  <li className="flex items-start gap-2"><FaCheckCircle className="mt-1 text-[#00b4d8]" /> Community-led restoration</li>
                  <li className="flex items-start gap-2"><FaCheckCircle className="mt-1 text-[#00b4d8]" /> Science-backed methods</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Impact + donors compact */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg bg-white/6 border border-white/8">
            <h4 className="font-semibold mb-2 text-neutral-50">Impact</h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-2xl font-bold text-neutral-50">{impact.cleaned_km}</div>
                <div className="text-sm text-neutral-300">km cleaned</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-50">{impact.volunteers}</div>
                <div className="text-sm text-neutral-300">volunteers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-50">{impact.seedlings}</div>
                <div className="text-sm text-neutral-300">seedlings</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white/6 border border-white/8">
            <h4 className="font-semibold mb-2 text-neutral-50">Recent donors</h4>
            <ul className="text-sm text-neutral-300 space-y-2">
              <li> - Ram Kumar - ₹500</li>
              <li> - David Raj - ₹5,000</li>
              <li> - Kingston - ₹1,000</li>
            </ul>
          </div>
        </section>

        {/* Short FAQ */}
        <section className="p-4 rounded-lg bg-white/6 border border-white/8">
          <button onClick={() => setFaqOpen((s) => !s)} className="w-full text-left flex justify-between items-center py-2 text-neutral-50">
            <span className="font-semibold">FAQ</span>
            <span className="text-neutral-300">{faqOpen ? "−" : "+"}</span>
          </button>
          {faqOpen && (
            <div className="mt-3 text-sm text-neutral-300 space-y-2">
              <div>
                <strong>Where do donations go?</strong>
                <p>Field work, community education, restoration and monitoring — we publish quarterly impact reports.</p>
              </div>
              <div>
                <strong>Is my donation tax-deductible?</strong>
                <p>Contact us at <a className="underline text-neutral-200" href="mailto:info@marinebiodiversity.org">info@marinebiodiversity.org</a> for a receipt.</p>
              </div>
            </div>
          )}
        </section>

        {/* Footer / contact */}
        <footer className="text-center text-neutral-300 text-sm">
          <div className="mb-2">Questions? <a className="underline text-neutral-200" href="mailto:info@marinebiodiversity.org">info@marinebiodiversity.org</a></div>
          <div className="text-xs">Note: For production, your backend must create the Razorpay order and verify the payment signature.</div>
        </footer>
      </div>

      {/* Thank you overlay */}
      {showThanks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-sm text-center text-slate-900">
            <h3 className="text-xl font-bold mb-2">Thank you!</h3>
            <p className="mb-4">We received your donation (demo). We'll email a receipt if you provided contact details.</p>
            <button onClick={() => setShowThanks(false)} className="px-4 py-2 rounded bg-[#00b4d8] text-white">Close</button>
          </div>
        </div>
      )}
    </main>
  );
}
