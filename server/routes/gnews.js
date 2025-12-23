const express = require("express");
const axios = require("axios");

const router = express.Router();

const MARINE_QUERY =
  "marine OR ocean OR coral OR reef OR fisheries OR plastic pollution OR biodiversity";

router.get("/gnews", async (req, res) => {
  try {
    const response = await axios.get("https://gnews.io/api/v4/search", {
      params: {
        q: MARINE_QUERY,
        lang: "en",
        max: 10,
        apikey: process.env.GNEWS_API_KEY,
      },
    });

    const filtered = response.data.articles.filter((a) => {
      const text = `${a.title} ${a.description}`.toLowerCase();
      return (
        text.includes("marine") ||
        text.includes("ocean") ||
        text.includes("sea") ||
        text.includes("coral") ||
        text.includes("reef") ||
        text.includes("plastic") ||
        text.includes("fisher")
      );
    });

    const clean = filtered.map((a) => ({
      title: a.title,
      summary: a.description,
      image: a.image,
      ogUrl: a.url,
      source: a.source.name,
      publishedAt: a.publishedAt,
    }));

    res.json(clean);
  } catch (err) {
    console.error("GNEWS ERROR:", err.message);
    res.status(500).json({ error: "GNews failed" });
  }
});

module.exports = router;
