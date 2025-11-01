import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    provider: {type: String, default: "local"},
    email: {type: String, required: true, unique: true},
    passwordHash: {type: String},
    name: { type: String, required: true },
    profileString: { type: String },
    refreshTokens: [{ type: String }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
