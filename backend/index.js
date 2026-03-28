import express from 'express'
import dotenv from 'dotenv'
import authRoutes from "./routes/auth.routes.js"
import connectDB from './db.js';
import cors from 'cors'


const app = express();

dotenv.config()

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


app.use(express.json());




app.use("/api/auth", authRoutes);

connectDB();

const PORT = process.env.PORT || 1010;

app.listen(PORT, () => {
  console.log(`app running on PORT:${PORT}`);
});

