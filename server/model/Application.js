// src/models/Application.js
const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    roleId: { type: String, default: "" }, // from frontend job.id
    roleTitle: { type: String, default: "" }, // from frontend job.title
    category: {
      type: String,
      enum: ["jobs", "internships", "trainee"],
      default: "jobs",
    },
    // Resume metadata (file itself is in memory/email, not on disk)
    resume: {
      originalName: String,
      mimeType: String,
      size: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", ApplicationSchema);
