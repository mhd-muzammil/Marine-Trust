const nodemailer = require("nodemailer");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function sendDonationReceiptMail({
  to,
  name,
  amountInr,
  paymentId,
  orderId,
}) {
  if (!to) return;

  // ✅ Paths
  const logoPath = path.join(__dirname, "../assets/logo.png");
  const form12APath = path.join(__dirname, "../assets/12A.pdf");
  const form80GPath = path.join(__dirname, "../assets/80G.pdf");

  const html = `
    <div style="font-family:Arial,sans-serif; line-height:1.6; padding: 10px;">
      
      <!-- ✅ Logo + Title -->
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
        <img src="cid:marineLogo" alt="Marine Logo" style="height:60px; width:auto;" />
        <div>
          <h2 style="color:#0077b6; margin:0;">Donation Receipt</h2>
          <p style="margin:0; font-size:13px; color:#555;">
            Marine Biodiversity Conservation Trust
          </p>
        </div>
      </div>

      <hr style="border:none; border-top:1px solid #eee; margin: 12px 0;" />

      <h3 style="color:#0a3d62; margin-bottom: 6px;">✅ Donation Successful</h3>

      <p style="margin-top:0;">Dear <b>${name || "Donor"}</b>,</p>

      <p>
        Thank you for supporting <b>Marine Biodiversity Conservation Trust</b>. 
        Your contribution helps protect marine ecosystems 🌊🐢
      </p>

      <div style="background:#f6fbff; border:1px solid #d9efff; padding:12px; border-radius:10px;">
        <p style="margin:0;"><b>Donation Amount:</b> ₹${amountInr}</p>
        <p style="margin:0;"><b>Payment ID:</b> ${paymentId}</p>
        <p style="margin:0;"><b>Order ID:</b> ${orderId}</p>
      </div>

      <p style="font-size:13px; color:#555; margin-top:15px;">
        Attached: <b>12A</b> and <b>80G</b> trust documents (PDF).
      </p>

      <p style="font-size:13px;color:#555;">
        For support please contact:
        <a href="mailto:worldmarinebiodiversity@gmail.com">worldmarinebiodiversity@gmail.com</a>
      </p>

      <p style="font-size:12px; color:#777;">
        — Marine Biodiversity Conservation Trust
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"MBCT Donations" <${process.env.MAIL_USER}>`,
    to,
    subject: "Donation Receipt - Marine Biodiversity Conservation Trust",
    html,

    // ✅ Attach logo inline + PDFs
    attachments: [
      {
        filename: "logo.png",
        path: logoPath,
        cid: "marineLogo", // must match cid in <img src="cid:marineLogo" />
      },
      {
        filename: "MBCT_12A.pdf",
        path: form12APath,
      },
      {
        filename: "MBCT_80G.pdf",
        path: form80GPath,
      },
    ],
  });
}

module.exports = { sendDonationReceiptMail };
