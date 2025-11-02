import passport from "passport";
import {Strategy as LocalStrategy}  from "passport-local";
import {Strategy as GoogleStrategy}  from "passport-google-oauth20";
import bcrypt from "bcryptjs";
import User from "../models/User.js";


export default async function passportConfig() {

passport.use(new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password"
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({email});
            if (!user) return done(null, false, {message: "User not found"});

            const isValid = await bcrypt.compare(password, user.passwordHash);
            if (!isValid) return done(null, false, {message: "Invalid credentials"});
            
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({email: profile.emails[0].value});
            if (!user) {
                user = await User.create({
                    provider: "google",
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    profilePicture: profile.photos[0].value,
                })
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
    ));

}