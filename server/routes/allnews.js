const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/all-news", async (req, res) => {
  try {
    const rssRes = await axios.get("http://localhost:5173/api/rss-news");
    const gnewsRes = await axios.get("http://localhost:5173/api/gnews");

    const combined = [...rssRes.data, ...gnewsRes.data];

  
    const unique = Array.from(
      new Map(combined.map((item) => [item.ogUrl, item])).values()
    );

    res.json(unique.slice(0, 20));
  } catch (error) {
    console.error("HYBRID ERROR:", error.message);
    res.status(500).json({ error: "Hybrid news failed" });
  }
});

module.exports = router;
