import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export default async function handler(req, res) {

  
const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});
console.log("GEMINI_API_KEY in handler:", process.env.GEMINI_API_KEY);  
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "`messages` must be an array" });
    }

    const result = await generateText({
      model: google("gemini-2.5-flash"),
      messages,
    });

    return res.status(200).json({ text: result.text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
