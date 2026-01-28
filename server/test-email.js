// 1. Load environment variables first
require("dotenv").config();

// 2. Import your function (Adjust path if your file is named differently, e.g., './mailer.js')
const { sendDonationReceiptMail } = require("./utils/sendMail");

async function runTest() {
  console.log("🚀 Initiating Test...");

  await sendDonationReceiptMail({
    to: "zamil627810@gmail.com", // 👈 REPLACE with your email to check inbox
    name: "Ghost (Test)",
    amountInr: 100,
    paymentId: "PAY_TEST_123456",
    orderId: "ORDER_TEST_7890",
  });

  console.log("🏁 Test script finished.");
}

runTest();
