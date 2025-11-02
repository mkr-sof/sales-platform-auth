import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import passport from "passport";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
const app = express();
import passportConfig from './configs/passport.js';
(async () => {
  await passportConfig(); // move top-level await inside async IIFE
})();


app.use(cors({
  origin: "http://localhost:5000", // only this frontend can call API
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("Sales Platform Auth Service is running"));

export default app;