import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dashboardRouter = express.Router();

dashboardRouter.get("/citizen_dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "citizen_dashboard.html"));
});

dashboardRouter.get("/authority_dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "authority_dashboard.html"));
});

// Add a route for the chatbot
dashboardRouter.get("/citizen_dashboard/chatbot", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "chatbot.html"));
});

export default dashboardRouter;