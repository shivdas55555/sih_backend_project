// 1. MUST BE AT LINE 1: Force IPv4 for Render networking
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import Models
const Problem = require('./models/Task');
const Solution = require('./models/Solution');
const Collaboration = require('./models/Collaboration');

const app = express();

// 2. CORS Middleware
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://sihproject55555.netlify.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Health Check Route
app.get('/', (req, res) => {
  res.status(200).send('SIH Backend API (No Auth) is active and running!');
});

// --- API ROUTES ---

// A. PROBLEMS
// Post a new problem
app.post('/api/problems', async (req, res) => {
  try {
    const { title, description, category, submittedBy } = req.body;
    const problem = await Problem.create({ title, description, category, submittedBy });
    res.status(201).json({ message: 'Problem submitted successfully', problem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all problems
app.get('/api/problems', async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    res.status(200).json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// B. SOLUTIONS
// Submit a solution for a specific problem
app.post('/api/solutions', async (req, res) => {
  try {
    const { problemId, solutionText, githubLink, submittedBy } = req.body;
    const solution = await Solution.create({ problemId, solutionText, githubLink, submittedBy });
    res.status(201).json({ message: 'Solution submitted successfully', solution });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get solutions for a specific problem
app.get('/api/solutions/:problemId', async (req, res) => {
  try {
    const solutions = await Solution.find({ problemId: req.params.problemId });
    res.status(200).json(solutions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// C. INSTITUTE COLLABORATION
// Submit institute collaboration request
app.post('/api/collaborations', async (req, res) => {
  try {
    const { instituteName, contactEmail, collaborationDetails, problemId } = req.body;
    const collaboration = await Collaboration.create({
      instituteName,
      contactEmail,
      collaborationDetails,
      problemId
    });
    res.status(201).json({ message: 'Collaboration request registered!', collaboration });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all collaboration requests
app.get('/api/collaborations', async (req, res) => {
  try {
    const collaborations = await Collaboration.find().sort({ createdAt: -1 });
    res.status(200).json(collaborations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Database Connection
mongoose
  .connect(process.env.MONGO_URI, { family: 4 })
  .then(() => console.log('MongoDB connected successfully via IPv4'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
