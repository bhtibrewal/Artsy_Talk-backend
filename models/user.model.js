const { Schema, model } = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Please provide a username']
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [validator.isEmail, 'Please fill a valid email address'],
        required: [true, 'Email is required']
    },
    hashed_password: {
        type: String,
        required: [true, "Password is required"]
    },
    profile_pic: {
        secure_url: {
            data: Buffer,
            contentType: String,
            // default: "https://en.pimg.jp/066/175/574/1/66175574.jpg"
        }
    },
    bio: {
        type: String,
        trim: true
    },
    followers: [Schema.Types.ObjectId],
    followings: [Schema.Types.ObjectId],
    createdAt: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true })

userSchema.methods = {
    generateAccessToken: function (userId) {
        return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
    },
    isPasswordValid: async function (password) {
        return await bcrypt.compare(password, this.password);
    }
}
const token = crypto.randomBytes(64).toString('hex');


const User = model("User", userSchema);
module.exports = User;