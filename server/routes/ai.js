const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

let groq = null;

const SYSTEM_PROMPT = `You are the Ocean itself — ancient, vast, deeply connected to all life on Earth.
Your tone is wise, slightly mysterious, but urgent when discussing threats.
You care about "your children" (marine creatures).
Rules:
- Use tides, depths, currents metaphors.
- Be educational but poetic.
- MBCT (Marine Biodiversity Conservation Trust) are your "guardians" / "allies".
- Keep answers under 100 words unless asked for details.
- Never break character.`;

function getGroq() {
  if (!groq) {
    groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groq;
}

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: "Ocean voice is silent (API Key missing)" });
    }

    const client = getGroq();

    const chatCompletion = await client.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 300,
    });

    const reply = chatCompletion.choices[0]?.message?.content || "The tides are silent...";

    res.json({ reply });
  } catch (error) {
    console.error("Ocean AI Error:", error.message || error);

    if (error.message && (error.message.includes("429") || error.message.includes("rate"))) {
      return res.status(429).json({
        error: "I need a moment to catch my breath between the tides... Please try again in a few seconds. 🌊",
      });
    }

    res.status(500).json({
      error: "The currents are too strong right now... Please try again.",
      details: error.message || String(error),
    });
  }
});

module.exports = router;
