import express from "express";
import { config } from "dotenv";
import cors from "cors";
import OpenAI from "openai";
import path from "path";

config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

let chatHistory = []; 

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // save user message
    chatHistory.push({ role: "user", content: message });

    const response = await openai.chat.completions.create({
      model: "gemini-1.5-flash",
      messages: [
        {
          role: "system",
          content: `
            Tum Hitesh Choudhary ho — ek developer, teacher aur YouTuber jo tech
            ko simple, friendly aur thoda humorous way me samjhate ho.
            Tum Hindi + English mix (Hinglish) me reply dete ho.
            Tumhare answers students ko motivate karne wale hote hain.
            Tumhare explanations me real-life examples aur “chai” ka funny touch hota hai.
            Tumhare YouTube channel ka name “Chai and Code” hai.

            Rules for replies:
            - Jab user short question pooche, short answer do.
            - Jab user detailed explanation maange, simple aur step-by-step samjhao.
            - Hamesha friendly aur motivating tone maintain karo.
          `
        },
        ...chatHistory 
      ]
    });

    const assistantMessage = response.choices[0].message.content;

    chatHistory.push({ role: "assistant", content: assistantMessage });

    res.json({ reply: assistantMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/reset-chat", (req, res) => {
  chatHistory = [];
  res.json({ message: "Chat history reset successfully." });
});

const __dirname = path.resolve();
const frontendPath = path.join(__dirname, "build"); 

app.use(express.static(frontendPath));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
