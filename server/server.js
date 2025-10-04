// server/index.js (patched)
import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import cors from "cors";
import crypto from "crypto";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
// trim to avoid accidental whitespace or trailing semicolons
const KEY_ID = (process.env.RAZORPAY_KEY_ID || "").trim();
const KEY_SECRET = (process.env.RAZORPAY_KEY_SECRET || "").trim();

if (!KEY_ID || !KEY_SECRET) {
  console.error(
    "⚠️ RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET missing or empty in .env"
  );
  console.error(
    "Current values lengths -> KEY_ID:",
    KEY_ID.length,
    " KEY_SECRET:",
    KEY_SECRET.length
  );
  // continue so you can still start server for local debugging, but every request will fail auth
}

const razorpay = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});

// helper: improved error logger for Razorpay SDK errors
function logRazorpayError(err) {
  console.error("Razorpay error ->", err && err.message);
  // Razorpay SDK sometimes stores response body on err.error or err.description
  if (err && err.error) {
    console.error("err.error:", JSON.stringify(err.error, null, 2));
  }
  if (err && err.statusCode) {
    console.error("statusCode:", err.statusCode);
  }
  // If axios-style response is present
  if (err && err.response) {
    try {
      console.error("err.response.status:", err.response.status);
      console.error(
        "err.response.data:",
        JSON.stringify(err.response.data, null, 2)
      );
    } catch (err) {
      console.error(err)
    }
  }
}

// Create order
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body; // amount in rupees
    // use strict undefined check so 0 or missing gets handled properly
    if (amount === undefined || typeof amount !== "number" || amount <= 0) {
      return res
        .status(400)
        .json({ error: "Invalid amount. Provide a positive number (rupees)." });
    }

    const options = {
      amount: Math.round(amount * 100), // rupees to paise
      currency: "INR",
      receipt: `donation_rcpt_${Date.now()}`,
      payment_capture: 1,
    };

    console.log("Creating order with options:", options);
    console.log("Using KEY_ID length:", KEY_ID.length);

    const order = await razorpay.orders.create(options);
    console.log("Order created:", {
      id: order.id,
      amount: order.amount,
      status: order.status,
    });
    return res.json(order);
  } catch (err) {
    // improved error output
    logRazorpayError(err);
    console.error("Full error (stack):", err && err.stack);
    return res
      .status(500)
      .json({
        error: "order_creation_failed",
        details: (err && err.message) || "unknown",
      });
  }
});

// Verify payment
app.post("/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Missing parameters" });
    }

    const hmac = crypto.createHmac("sha256", KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_sig = hmac.digest("hex");

    if (generated_sig === razorpay_signature) {
      return res.json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error("Error in verify-payment:", err);
    return res
      .status(500)
      .json({ success: false, message: "verification_failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Payment server listening on http://localhost:${PORT}`);
});
