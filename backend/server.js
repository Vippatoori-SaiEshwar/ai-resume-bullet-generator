const express = require("express");
const cors = require("cors");

// Fix for node-fetch v3 with CommonJS
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();

app.use(cors());
app.use(express.json());

// API key from environment variable
const API_KEY = process.env.API_KEY;

app.post("/generate", async (req, res) => {
  try {

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    const prompt = `Convert this into a professional resume bullet:\n${text}`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ]
        })
      }
    );

    const data = await response.json();

    // Safe response parsing
    const result =
      data?.choices?.[0]?.message?.content ||
      "AI failed to generate response.";

    res.json({ bullet: result });

  } catch (error) {

    console.error("Server error:", error);

    res.status(500).json({
      error: "Failed to generate bullet"
    });

  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});