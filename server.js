import express from "express";
import mongoose from "mongoose";
import authRouter from "./routers/authRouter.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());
// Middleware for serving static files
app.use(express.static("views"));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

// Mount the routers
app.use("/", authRouter);
app.get("/citizen_dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "citizen_dashboard.html"));
});

app.get("/authority_dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "authority_dashboard.html"));
});

app.get("/logout", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});
app.get("/citizen_dashboard/report", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "create_issue.html"));
});
app.get("/citizen_dashboard/view-upvote-issues", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "view_issues.html"));
});
app.get("/citizen_dashboard/track", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "track_performance.html"));
});
app.get("/citizen_dashboard/submit-feedback", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "view_feedback.html"));
});
app.get("/citizen_dashboard/chatbot", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "chatbot.html"));
});
app.get("/citizen_dashboard/view-authority-scores", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "view_score.html"));
});
app.get("/authority_dashboard/view-issues", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "view_issues.html"));
});
app.get("/authority_dashboard/view-feedback", (req, res) => { 
  res.sendFile(path.join(__dirname, "views", "view_feedback.html"));
});
app.get("/authority_dashboard/analyze-resolution", (req, res) => { 
  res.sendFile(path.join(__dirname, "views", "track_performance.html"));
});
app.get("/authority_dashboard/view-performance-scores", (req, res) => { 
  res.sendFile(path.join(__dirname, "views", "view_score.html"));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
