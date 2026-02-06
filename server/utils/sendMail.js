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

  //  Logo path
  const logoPath = path.join(__dirname, "../assets/logo.png");

  const html = `
    <div style="font-family:Arial,sans-serif; line-height:1.6; padding: 10px;">
      
      <!-- Logo + Title -->
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
        <img src="cid:marineLogo" alt="Marine Logo" style="height:60px;" />
        <div>
          <h2 style="color:#0077b6; margin:0;">Donation Receipt</h2>
          <p style="margin:0; font-size:13px; color:#555;">
            Marine Biodiversity Conservation Trust
          </p>
        </div>
      </div>

      <hr style="border:none; border-top:1px solid #eee; margin: 12px 0;" />

      <h3 style="color:#0a3d62; margin-bottom: 6px;">Donation Successful</h3>

      <p>Dear <b>${name || "Donor"}</b>,</p>

      <p>
        Thank you for supporting <b>Marine Biodiversity Conservation Trust</b>. 
        Your generous contribution helps us protect and conserve marine ecosystems.
      </p>

      <div style="background:#f6fbff; border:1px solid #d9efff; padding:12px; border-radius:10px;">
        <p style="margin:0;"><b>Donation Amount:</b> ₹${amountInr}</p>
        <p style="margin:0;"><b>Payment ID:</b> ${paymentId}</p>
        <p style="margin:0;"><b>Order ID:</b> ${orderId}</p>
      </div>

      <h4 style="margin-top:16px; color:#0a3d62;">Trust Registration Details</h4>

      <div style="background:#fafafa; border:1px solid #eee; padding:12px; border-radius:8px;">
        <p style="margin:0;"><b>12A Registration No:</b> AAKTM4562BE20251</p>
        <p style="margin:0;"><b>80G Registration No:</b> AAKTM4562BF20261</p>
      </div>

      <p style="font-size:13px; color:#555; margin-top:15px;">
        This donation may be eligible for tax exemption under applicable sections
        of the Income Tax Act, subject to prevailing laws.
      </p>

      <p style="font-size:13px;color:#555;">
        For support, contact:
        <a href="mailto:worldmarinebiodiversity@gmail.com">
          worldmarinebiodiversity@gmail.com
        </a>
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
    attachments: [
      {
        filename: "logo.png",
        path: logoPath,
        cid: "marineLogo",
      },
    ],
  });
}

module.exports = { sendDonationReceiptMail };
