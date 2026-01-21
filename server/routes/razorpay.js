const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Razorpay = require("razorpay");

const { sendDonationReceiptMail } = require("../utils/sendMail");

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

// ✅ POST /api/razorpay/verify + SEND EMAIL RECEIPT
router.post("/razorpay/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,

      // ✅ from FE (you must send these)
      donorName,
      donorEmail,
      amountInr,
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

    // ✅ Extra safety (optional but recommended):
    // Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    // ✅ Send receipt mail to donor
    await sendDonationReceiptMail({
      to: donorEmail || payment?.email,
      name: donorName || payment?.notes?.donorName,
      amountInr: amountInr || Math.round((payment.amount || 0) / 100),
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified ✅ Receipt sent to donor mail ✅",
      payment,
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
