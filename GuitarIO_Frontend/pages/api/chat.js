import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Only POST allowed" });
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error("Missing GEMINI_API_KEY");
    return res.status(500).json({ error: "AI chat is not configured." });
  }

  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "`messages` must be an array" });
    }

    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const result = await generateText({
      model: google("gemini-2.5-flash"),
      messages,
    });

    return res.status(200).json({ text: result.text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Unable to generate a response right now." });
  }
}
