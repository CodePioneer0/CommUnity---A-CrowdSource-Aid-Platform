import express from "express";
import mongoose from "mongoose";
import authRouter from "./routers/authRouter.js";
import dashboardRouter from "./routers/dashboardRouter.js";
import issueRouter from "./routers/issueRouter.js";
import feedbackRouter from "./routers/feedbackRouter.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS
app.use(cors());

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://admin:sayak@cluster0.zyemj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(`MongoDB connection error: ${err}`));

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

// Mount routers
app.use("/", authRouter);
app.use("/", dashboardRouter);
app.use("/", issueRouter);
app.use("/", feedbackRouter);

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
