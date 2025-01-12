// filepath: routers/authRouter.js
import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authRouter = express.Router();

authRouter.route("/register").get(getRegister).post(postRegister);
authRouter.route("/login").get(getLogin).post(postLogin);

function getRegister(req, res) {
    res.sendFile(path.join(__dirname, "../views", "register.html"));
}

async function postRegister(req, res) {
    try {
        const { name, email, username, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, username, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ status: 1, message: "User created successfully", redirectUrl: "/login" });
    } catch (error) {
        res.status(500).json({ status: 0, error: "Error creating user" });
    }
}

function getLogin(req, res) {
    res.sendFile(path.join(__dirname, "../views", "login.html"));
}

async function postLogin(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ status: 0, error: "Invalid username or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: 0, error: "Invalid username or password" });
        }
        res.status(200).json({ status: 1, message: `Welcome ${user.role}`, redirectUrl: user.role === 'citizen' ? '/citizen_dashboard' : '/authority_dashboard' });
    } catch (error) {
        res.status(500).json({ status: 0, error: "Error logging in" });
    }
}

export default authRouter;