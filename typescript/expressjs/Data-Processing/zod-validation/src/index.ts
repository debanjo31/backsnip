// src/index.ts
import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import authRouter from './routes/authRoute';
// 
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configure and use CORS
const corsOption = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOption));

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});