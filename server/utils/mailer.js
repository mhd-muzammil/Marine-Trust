// src/utils/mailer.js
const nodemailer = require("nodemailer");

function createTransport() {
  const options = {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false, // STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };

  console.log("[MAIL] Creating transport with:", {
    host: options.host,
    port: options.port,
    user: options.auth.user,
    from: process.env.FROM_EMAIL,
  });

  return nodemailer.createTransport(options);
}

async function sendApplicationEmail({ to, subject, html, attachments = [] }) {
  const transporter = createTransport();

  console.log("[MAIL] Sending to:", to, "subject:", subject);

  try {
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      html,
      attachments,
    });

    console.log("[MAIL] Sent OK. MessageId:", info.messageId);
    return info;
  } catch (err) {
    // 🔥 print as much detail as possible
    console.error("[MAIL] Error sending email:");
    console.error(" message:", err.message);
    if (err.response) console.error(" response:", err.response);
    if (err.responseCode) console.error(" code:", err.responseCode);
    throw err;
  }
}

module.exports = { sendApplicationEmail };
