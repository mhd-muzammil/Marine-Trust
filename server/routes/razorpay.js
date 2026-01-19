const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Razorpay = require("razorpay");

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ POST /api/razorpay/create-order
router.post("/razorpay/create-order", async (req, res) => {
  try {
    const { amountInr, meta } = req.body;

    if (!amountInr || Number(amountInr) <= 0) {
      return res.status(400).json({ message: "Invalid amountInr" });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(Number(amountInr) * 100), // INR -> paise
      currency: "INR",
      receipt: `mbct_${Date.now()}`,
      notes: {
        ...meta,
        purpose: "donation",
        org: "MBCT",
      },
    });

    return res.status(200).json({ order });
  } catch (err) {
    console.error("Razorpay create-order error:", err);
    return res.status(500).json({
      message: "Failed to create order",
      error: err.message,
    });
  }
});

// ✅ POST /api/razorpay/verify
router.post("/razorpay/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderMeta,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Missing params" });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature ❌",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified ✅",
      orderMeta,
    });
  } catch (err) {
    console.error("Razorpay verify error:", err);
    return res.status(500).json({
      success: false,
      message: "Verification failed",
      error: err.message,
    });
  }
});

module.exports = router;
