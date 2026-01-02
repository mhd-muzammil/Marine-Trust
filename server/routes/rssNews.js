const express = require("express");
const Parser = require("rss-parser");

const router = express.Router();
const parser = new Parser();

const FEEDS = [
  "https://news.mongabay.com/feed/?s=marine",
  "https://news.mongabay.com/feed/?s=ocean",
  "https://news.mongabay.com/feed/?s=coral",
  "https://news.mongabay.com/feed/?s=reef",
];


const MARINE_KEYWORDS = [
  "marine",
  "ocean",
  "sea",
  "coral",
  "reef",
  "biodiversity",
  "coastal",
  "fisheries",
  "plastic",
  "pollution",
  "whale",
  "shark",
  "mangrove",
  "seagrass",
];

router.get("/rss-news", async (req, res) => {
  try {
    let articles = [];

    for (const url of FEEDS) {
      const feed = await parser.parseURL(url);

      feed.items.forEach((item) => {
        const text = `${item.title} ${item.contentSnippet}`.toLowerCase();

        const isMarine = MARINE_KEYWORDS.some((k) => text.includes(k));

        if (isMarine) {
          articles.push({
            title: item.title,
            summary: item.contentSnippet,
            ogUrl: item.link,
            source: feed.title,
            publishedAt: item.pubDate,
          });
        }
      });
    }

    res.json(articles.slice(0, 20));
  } catch (err) {
    console.error("RSS ERROR:", err.message);
    res.status(500).json({ error: "RSS fetch failed" });
  }
});

module.exports = router;
