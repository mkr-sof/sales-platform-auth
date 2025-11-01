import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
// console.log("Connecting to MongoDB with URL:", MONGO_URL);
mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) =>{
        console.error("Failed to connect to MongoDB", err);
    });