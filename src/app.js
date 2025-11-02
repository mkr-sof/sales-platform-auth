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
  await passportConfig(); 
})();

app.set('trust proxy', 1);
app.use(cors(
//   {
//   origin: "*", 
//   methods: ["GET", "POST"],
//   credentials: true
// }
));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("Sales Platform Auth Service is running"));

export default app;