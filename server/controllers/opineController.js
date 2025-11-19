// controllers/opineController.js
const Post = require("../model/post");
const crypto = require("crypto");

function makeToken(len = 40) {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex")
    .slice(0, len);
}

exports.list = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const skip = (page - 1) * limit;
    const q = req.query.q ? String(req.query.q).trim() : null;

    const filter = {};
    if (q)
      filter.$or = [
        { title: new RegExp(q, "i") },
        { body: new RegExp(q, "i") },
        { tags: new RegExp(q, "i") },
      ];

    const [data, total] = await Promise.all([
      Post.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Post.countDocuments(filter),
    ]);

    res.json({ data, meta: { total, page, limit } });
  } catch (err) {
    console.error("opine.list", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const doc = await Post.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    console.error("opine.getOne", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, body, tags, authorName } = req.body;
    if (!title || !body)
      return res.status(400).json({ error: "Title and body are required" });

    const cleanTags = Array.isArray(tags)
      ? tags.map((t) => String(t).trim()).filter(Boolean)
      : typeof tags === "string"
      ? tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const ownerToken = makeToken(48);

    const p = await Post.create({
      title: String(title).trim(),
      body: String(body),
      tags: cleanTags,
      ownerToken,
      authorName: authorName || "Anonymous",
    });

    const obj = p.toObject();
    // include the ownerToken in response so frontend can store it
    obj.ownerToken = ownerToken;
    res.status(201).json(obj);
  } catch (err) {
    console.error("opine.create", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.like = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await Post.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    ).lean();
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    console.error("opine.like", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const provided =
      req.headers["x-owner-token"] ||
      req.body?.ownerToken ||
      req.query?.ownerToken;
    if (!provided)
      return res.status(401).json({ error: "Owner token required to delete" });

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Not found" });

    if (!post.ownerToken || String(post.ownerToken) !== String(provided)) {
      return res
        .status(403)
        .json({ error: "Only the post owner can delete this post" });
    }

    await post.remove();
    res.json({ success: true });
  } catch (err) {
    console.error("opine.remove", err);
    res.status(500).json({ error: "Server error" });
  }
};
