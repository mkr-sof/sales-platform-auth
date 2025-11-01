import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {generateAccessToken, generateRefreshToken} from "../utils/token.js";

const {verify} = jwt;

export const refreshToken = async (req, res) => {
    const {token} = req.body;
    if (!token) return res.status(401).json({message: "Refresh token missing"});
        
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || !user.refreshTokens.includes(token)) {
            return res.status(401).json({message: "Invalid refresh token"});
        }

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        user.refreshtokens = user.refreshTokens.filter(t => t !== token);
        user.refreshTokens.push(newRefreshToken);
        await user.save();

        res.json({accessToken: newAccessToken, refreshToken: newRefreshToken});
    }catch (err) {
        return res.status(403).json({message: "Invalid or expired refresh token"});
    }
};

export const logout = async (req, res) => {
    const {token} = req.body;
    if (!token) return res.status(400).json({message: "Refresh token missing"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({message: "User not found"});

        user.refreshTokens = user.refreshTokens.filter(t => t !== token);
        await user.save();

        return res.json({message: "Logged out successfully"});
    }catch (err){
        return res.status(400).json({message: "Invalid or expired refresh token"});
    }
};