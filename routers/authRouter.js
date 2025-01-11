import express from "express";
import UserModel from "../models/userModel.js";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authRouter = express.Router();

authRouter.route("/register").get(getSignUp).post(postSignUp);
authRouter.route("/login").get(getLogin).post(postLogin);
authRouter.get("/logout", handleLogout);

function getSignUp(req, res) {
  const projectRoot = path.join(__dirname, "..");
  res.sendFile(path.join(projectRoot, "views", "register.html"));
}

async function postSignUp(req, res) {
  try {
    let dataObj = req.body;
    let user = await UserModel.create(dataObj);
    if (user) {
      // Send a JSON response with status and redirect URL
      res.status(201).json({
        status: 1,
        message: "User created successfully",
        redirectUrl: "/login",
      });
    } else {
      res.status(400).json({
        status: 0,
        error: "Failed to create user",
      });
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      status: 0,
      error: "Error creating user",
    });
  }
}
function getLogin(req, res) {
  const projectRoot = path.join(__dirname, "..");
  res.sendFile(path.join(projectRoot, "views", "login.html"));
}
async function postLogin(req, res) {
  try {
    const { username, password, role } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(401).json({
        status: 0,
        error: "User not found",
      });
    }

    if (user.password === password && user.role === role) {
      // Create a session object with user data
      req.session = {
        isLoggedIn: true,
        username: user.username,
        role: user.role,
        name: user.name,
      };

      res.status(200).json({
        status: 1,
        message: "Login successful",
        user: {
          name: user.name,
          username: user.username,
          role: user.role,
        },
        redirectUrl:
          user.role === "citizen"
            ? "/citizen_dashboard"
            : "/authority_dashboard",
      });
    } else {
      res.status(401).json({
        status: 0,
        error: "Invalid credentials",
      });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      status: 0,
      error: "Server error",
    });
  }
}

async function handleLogout(req, res) {
  try {
    // Clear the session
    req.session = null;

    res.status(200).json({
      status: 1,
      message: "Logged out successfully",
      redirectUrl: "/login",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      status: 0,
      error: "Error during logout",
    });
  }
}

export default authRouter;
