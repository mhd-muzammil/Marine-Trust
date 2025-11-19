// model/post.js
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 400 },
    body: { type: String, required: true },
    tags: [{ type: String }],
    likes: { type: Number, default: 0 }, // numeric like count
    ownerToken: { type: String, required: true }, // random token given to creator
    authorName: { type: String, default: "Anonymous" },
  },
  { timestamps: true }
);

module.exports = mongoose.models?.Post || mongoose.model("Post", PostSchema);
