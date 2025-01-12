import express from "express";
import mongoose from "mongoose";
import authRouter from "./routers/authRouter.js";
import dashboardRouter from "./routers/dashboardRouter.js";
import issueRouter from "./routers/issueRouter.js";
import feedbackRouter from "./routers/feedbackRouter.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose
  .connect('mongodb+srv://admin:sayak@cluster0.zyemj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(`MongoDB connection error: ${err}`));
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
app.use("/", dashboardRouter);
app.use("/", issueRouter);
app.use("/", feedbackRouter);

const PORT = 3000;

// Add error handling for port in use
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
        process.exit(1);
    } else {
        throw err;
    }
});