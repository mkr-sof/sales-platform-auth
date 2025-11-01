import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({message: "Authorization header missing"});

    const token = header.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({message: "User not found"});
        req.user = user;
        next();
    }catch (err){
        return res.status(401).json({message: "Invalid or expired token"});
    }
};