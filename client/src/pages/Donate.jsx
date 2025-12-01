// src/pages/Donate.jsx
import React, { useEffect, useState } from "react";
import { FaHandHoldingUsd, FaCheckCircle } from "react-icons/fa";

const RAZORPAY_KEY = "rzp_test_RPQrMz2geEuiTT";  // TODO: replace with live key for production

// Approximate conversion rates → INR (example values)
const FX_RATES = {
  INR: 1,
  USD: 83, // 1 USD ≈ 83 INR
  EUR: 90, // 1 EUR ≈ 90 INR
  GBP: 105, // 1 GBP ≈ 105 INR
  AED: 22.5, // 1 AED ≈ 22.5 INR
};

const CURRENCIES = [
  { code: "INR", label: "₹ INR – Indian Rupee" },
  { code: "USD", label: "$ USD – US Dollar" },
  { code: "EUR", label: "€ EUR – Euro" },
  { code: "GBP", label: "£ GBP – British Pound" },
  { code: "AED", label: "د.إ AED – UAE Dirham" },
];

export default function Donate() {
  const [currency, setCurrency] = useState("INR");
  const [amount, setAmount] = useState("");
  const [coverFees, setCoverFees] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
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

  const numericAmount = () => {
    const n = parseFloat(amount);
    return isNaN(n) ? 0 : n;
  };

  const convertedInr = () => {
    const base = numericAmount();
    const rate = FX_RATES[currency] || 1;
    let inr = base * rate;

    if (coverFees && inr > 0) {
      const feePercent = 0.022;
      const fixed = 3;
      inr = inr + inr * feePercent + fixed;
    }

    return Math.round(inr);
  };

  async function startRazorpayFrontEnd() {
    const inrAmount = convertedInr();
    if (!inrAmount || inrAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    try {
      // 1) Create order on backend (in INR)
      const createResp = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: inrAmount }),
      });

      const order = await createResp.json();
      if (!createResp.ok || !order.id) {
        console.error("Order creation failed:", order);
        alert("Failed to create order. Try again later.");
        setLoading(false);
        return;
      }

      // 2) Wait for Razorpay script
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

      // 3) Open Razorpay checkout
      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount, // from backend (paise)
        currency: order.currency || "INR",
        name: "Marine Biodiversity Conservation Trust",
        description: `Donation (${currency} → INR)`,
        order_id: order.id,
        notes: {
          source: "mbct-web",
          originalCurrency: currency,
          originalAmount: numericAmount(),
        },
        theme: { color: "#0077b6" },
        handler: async function (resp) {
          try {
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
              setAmount("");
            } else {
              alert("Payment verification failed. Please contact support.");
              console.error("Verify error:", verifyJson);
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
        alert(
          "Payment failed: " +
            (err.error?.description || "Unknown error occurred")
        );
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment flow error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const inr = convertedInr();
  const base = numericAmount();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#00121a] via-[#002b3a] to-[#00121a] text-sky-50 px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Hero */}
        <section className="text-center space-y-3">
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300">
            Donate
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Make a Gift to Protect Our Oceans
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-cyan-100">
            We accept donations from around the world. Choose your currency, and
            we’ll process the payment securely in INR via Razorpay.
          </p>
        </section>

        {/* Main donate card */}
        <section className="bg-white/5 rounded-2xl border border-white/10 shadow-xl p-6 md:p-7">
          <div className="space-y-5">
            {/* Currency + amount */}
            <div className="grid md:grid-cols-[1.1fr,0.9fr] gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-cyan-100 mb-1">
                    Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#001921] border border-white/15 text-sm md:text-base text-white"
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-cyan-100 mb-1">
                    Amount in {currency}
                  </label>
                  <input
                    value={amount}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (/^[0-9]*\.?[0-9]{0,2}$/.test(v) || v === "") {
                        setAmount(v);
                      }
                    }}
                    placeholder={currency === "INR" ? "500" : "25"}
                    inputMode="decimal"
                    className="w-full px-3 py-2 rounded-lg bg-transparent border border-white/15 text-sm md:text-base text-white"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs md:text-sm text-cyan-100">
                  <input
                    id="coverFees"
                    type="checkbox"
                    checked={coverFees}
                    onChange={() => setCoverFees((s) => !s)}
                    className="accent-[#00b4d8]"
                  />
                  <label htmlFor="coverFees">
                    Add a small amount to cover payment processing fees.
                  </label>
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-sm md:text-base text-cyan-100 space-y-3">
                <p className="font-semibold text-white">Summary of your gift</p>
                <p>
                  You are donating{" "}
                  <span className="font-semibold text-white">
                    {base > 0 ? `${base.toLocaleString()} ${currency}` : "—"}
                  </span>
                  .
                </p>
                <p>
                  This will be charged as approximately{" "}
                  <span className="font-semibold text-white">
                    {inr > 0 ? `₹${inr.toLocaleString()} INR` : "—"}
                  </span>{" "}
                  through Razorpay.
                </p>
                <p className="text-[11px] md:text-xs text-cyan-200">
                  Exchange rates are approximate and updated periodically. Final
                  charge may vary slightly based on your bank or card issuer.
                </p>
              </div>
            </div>

            <button
              onClick={startRazorpayFrontEnd}
              disabled={loading}
              className="mt-2 inline-flex items-center justify-center gap-2 w-full md:w-auto
                         bg-gradient-to-r from-[#00b4d8] to-[#0077b6]
                         px-5 py-2.5 rounded-lg text-sm md:text-base font-semibold text-white
                         shadow-md hover:opacity-95 disabled:opacity-60"
            >
              <FaHandHoldingUsd />
              {loading ? "Processing..." : "Donate securely"}
            </button>
          </div>
        </section>

        {/* Small reassurance / contact */}
        <section className="text-center text-xs md:text-sm text-cyan-200 space-y-1">
          <p>
            Payments are processed securely by Razorpay on behalf of Marine
            Biodiversity Conservation Trust (MBCT).
          </p>
          <p>
            For donation or CSR enquiries, email{" "}
            <a
              href="mailto:worldmarinebiodiversity@gmail.com"
              className="underline"
            >
              worldmarinebiodiversity@gmail.com
            </a>
            .
          </p>
        </section>
      </div>

      {/* Thank you overlay */}
      {showThanks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-sm text-center text-slate-900">
            <h3 className="text-xl font-bold mb-2">
              Thank you for your support
            </h3>
            <p className="mb-4 text-sm">
              Your donation helps us protect marine ecosystems and coastal
              communities. We truly appreciate your contribution.
            </p>
            <button
              onClick={() => setShowThanks(false)}
              className="px-4 py-2 rounded bg-[#00b4d8] text-white text-sm font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
