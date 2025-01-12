import express from 'express';
import Issue from '../models/issueModel.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const issueRouter = express.Router();

// Serve create_issue.html
issueRouter.get('/create_issue', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'create_issue.html'));
});

// Handle submission from create_issue.html
issueRouter.post('/create_issue', async (req, res) => {
  try {
    const { issueTitle, category, location, description } = req.body;
    await Issue.create({
      title: issueTitle,
      category,
      location,
      description
    });
    res.status(201).json({ message: 'Issue created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating issue' });
  }
});

// Serve view_issues.html
issueRouter.get('/view_issues', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'view_issues.html'));
});

// Return all issues as JSON
issueRouter.get('/api/issues', async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching issues' });
  }
});

issueRouter.get("/view_issue_details", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "view_issue_details.html"));
});

export default issueRouter;