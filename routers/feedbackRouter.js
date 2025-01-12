// filepath: routers/feedbackRouter.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feedbackRouter = express.Router();

feedbackRouter.get("/view_feedback", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "view_feedback.html"));
});

feedbackRouter.get("/track_performance", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "track_performance.html"));
});

feedbackRouter.get("/view_score", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "view_score.html"));
});

export default feedbackRouter;