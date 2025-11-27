// src/middleware/upload.js
const multer = require("multer");

// Allowed MIME types
const allowed = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  if (allowed.has(file.mimetype)) cb(null, true);
  else cb(new Error("Only PDF, DOC, or DOCX files are allowed."));
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = { upload };
