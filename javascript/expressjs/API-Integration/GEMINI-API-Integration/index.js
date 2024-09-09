import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";

import { GoogleGenerativeAI } from "@google/generative-ai"; // google gemini api module

configDotenv("");

//! get your own API key from https://aistudio.google.com/app/apikey
// once you have your own api key, create a .env file in the  directory of this project
//! i.e GEMINI-API-Integration/.env
//! add your api key to the .env file. i.e API_KEY=`your api key`
const genAI = new GoogleGenerativeAI(
  process.env.API_URL ||
    `get your own API key from https://aistudio.google.com/app/apikey`
);

// setting the model we want to use. in this case we are using //!`gemini-1.5-flash`
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// chat endpoint
app.post("/chat", async (req, res) => {
  let { prompt } = req.body;
  console.log("prompt:", prompt);
  const result = await model.generateContent(prompt); // fetching result from GEMINI API
  console.log("response:", result.response.text());
  res.send({ prompt, response: result.response.text() });
});

const port = "3000";
app.listen(port, () => console.log("started"));
