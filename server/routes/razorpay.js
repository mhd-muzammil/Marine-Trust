const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Razorpay = require("razorpay");

const { sendDonationReceiptMail } = require("../utils/sendMail");


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


router.post("/razorpay/create-order", async (req, res) => {
  try {
    const { amountInr, meta } = req.body;

    if (!amountInr || Number(amountInr) <= 0) {
      return res.status(400).json({ message: "Invalid amountInr" });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(Number(amountInr) * 100), 
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


router.post("/razorpay/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      
      donorName,
      donorEmail,
      amountInr,
    } = req.body;

   
    console.log("🔍 Verify Route Hit. Payload:", {
      razorpay_payment_id,
      donorEmail, 
      donorName
    });

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing params" });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature ❌" });
    }

    
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    
    
    console.log("🔍 Razorpay Payment Details:", {
      email: payment.email, 
      contact: payment.contact,
      status: payment.status
    });

    
    const finalEmail = donorEmail || payment.email;

    if (!finalEmail) {
      console.error("❌ MAIL ERROR: No email found in Frontend payload OR Razorpay data. Receipt cannot be sent.");
    } else {
      console.log(`📧 Sending receipt to: ${finalEmail}`);
      
      try {
        await sendDonationReceiptMail({
          to: finalEmail,
          name: donorName || payment?.notes?.donorName || "Supporter",
          amountInr: amountInr || Math.round((payment.amount || 0) / 100),
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
        });
        console.log("✅ Mail function executed successfully.");
      } catch (mailError) {
        console.error("❌ Mailer crashed:", mailError.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified ✅",
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
