import OpenAI from "openai/index.mjs";
import express from "express";

const app = express();
app.use(express.json());

// get your own API key from openai developers platform
// url to openai developers platform
const apiKey = process.env.API_KEY;

const openai = new OpenAI({
  apiKey,
});

// Endpoint to chat with Chatgpt
app.post("/chat", async (req, res) => {
  let { message } = req.body;

  const completion = openai.chat.completions.create({
    messages: [
      {role:"system", content: "Your are a helpful bot"}, // tells the API what he his.
      {role:"user", content: message} // tells the api the user message
    ],
    model: "gpt-4",
  });
});

const port = "3000";
app.listen(port, () => console.log("started"));
     