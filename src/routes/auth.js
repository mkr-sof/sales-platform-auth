import express from "express";
import passport from "passport";
import {register, login, googleCallback, me} from "../controllers/authController.js";
import {verifyToken} from "../middlewares/authMiddleware.js";
import {validateBody} from "../middlewares/validate.js";
import {refreshToken, logout} from "../controllers/tokenController.js";
import {registerSchema, loginSchema} from "../validations/authValidation.js";

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);

router.post('/login', validateBody(loginSchema), 
    passport.authenticate('local', {session: false}),
    login
);

router.get('/google', 
    passport.authenticate('google', {scope: ["profile", "email"]})
);

router.get('/google/callback',
    passport.authenticate('google', {session: false}),
    googleCallback
);

router.post('/refresh', refreshToken);
router.post('/logout', logout);

router.get('/me', verifyToken, me);

export default router;