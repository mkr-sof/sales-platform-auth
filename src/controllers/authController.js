import bcrypt from "bcryptjs";
import User from "../models/User.js";
import {generateAccessToken, generateRefreshToken} from "../utils/token.js";
import {sanitizeBody} from "../utils/sanitizeBody.js";

export const register = async (req, res) => {
    try {
        const { email, password, name } = sanitizeBody(req.body);
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "User already exists" });

        const passwordHash = await bcrypt.hash(password, 12);
        const user = await User.create({ email, passwordHash, name });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshTokens.push(refreshToken);
        await user.save();

        res.status(201).json({ accessToken, refreshToken, user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res, info) => {
    try {
        const { email, password } = sanitizeBody(req.body);


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: info?.message || "User not found" });
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            return res.status(401).json({ message: info?.message || "Invalid credentials" });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        if (!user.refreshTokens) user.refreshTokens = [];
        user.refreshTokens.push(refreshToken);
        await user.save();

        return res.json({ accessToken, refreshToken, 
        user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      } });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const googleCallback = async (req, res) => {
    const accessToken = generateAccessToken(req.user);
    const refreshToken = generateRefreshToken(req.user);
    res.json({ accessToken, refreshToken, user: req.user });
}

export const me = async (req, res) => {
    res.json(req.user);
};