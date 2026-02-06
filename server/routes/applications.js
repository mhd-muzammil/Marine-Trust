const express = require("express");
const Application = require("../model/Application");
const { upload } = require("../middleware/upload");
const { sendApplicationEmail } = require("../utils/mailer");

const router = express.Router();


router.options("/apply", (_, res) => res.sendStatus(204));

router.post("/apply", upload.single("resume"), async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      roleId = "",
      roleTitle = "",
      category = "jobs",
    } = req.body || {};

    
    if (!name?.trim() || !phone?.trim() || !email?.trim()) {
      return res
        .status(400)
        .json({ ok: false, message: "Missing required fields." });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ ok: false, message: "Resume file is required." });
    }

    
    const appDoc = await Application.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      roleId,
      roleTitle,
      category,
      resume: {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
      },
    });

  
    const toList = [process.env.HR_EMAIL, process.env.CEO_EMAIL]
      .map((x) => (x || "").trim())
      .filter(Boolean);

    const subject = `New ${category} application: ${name} – ${
      roleTitle || "N/A"
    }`;

    const html = `
      <h2>New Candidate Application</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Role:</strong> ${roleTitle || "N/A"} (ID: ${roleId || "-"})</p>
      <p>Resume attached.</p>
      <hr/>
      <p>Application ID: ${appDoc._id}</p>
    `;

    let emailSent = false;

    if (!toList.length) {
      console.warn(
        "[MAIL] No HR_EMAIL / CEO_EMAIL configured. Skipping email send."
      );
    } else {
      try {
        await sendApplicationEmail({
          to: toList.join(","),
          subject,
          html,
          attachments: [
            {
              filename: req.file.originalname,
              content: req.file.buffer,
              contentType: req.file.mimetype,
            },
          ],
        });
        emailSent = true;
      } catch (mailErr) {
        console.error("[MAIL] Error while sending application email:", mailErr);
        
      }
    }

    return res.status(201).json({
      ok: true,
      emailSent,
      message: emailSent
        ? "Application received and emailed."
        : "Application saved, but email could not be sent. Contact admin.",
    });
  } catch (err) {
    console.error("Apply error (route level):", err);
    return res
      .status(500)
      .json({ ok: false, message: "Server error. Try again later." });
  }
});

module.exports = router;
