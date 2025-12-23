import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/marine-news", async (req, res) => {
  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "marine biodiversity OR ocean conservation",
        language: "en",
        pageSize: 10,
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    const articles = response.data.articles.map((item) => ({
      title: item.title,
      summary: item.description,
      image: item.urlToImage,
      ogUrl: item.url,
      source: item.source.name,
      publishedAt: item.publishedAt,
    }));

    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "NewsAPI failed" });
  }
});

export default router;
