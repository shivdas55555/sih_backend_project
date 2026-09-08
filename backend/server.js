const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const solutionRoutes = require('./routes/solutionRoutes');
const collaborationRoutes = require('./routes/collaborationRoutes');
const app = express();
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const mongoose = require('mongoose');

// Enable CORS for all origins in development/production (or specify your exact Netlify domain)
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://sihproject55555.netlify.app'
    ], // Allows all origins dynamically (including Netlify and localhost)
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get('/', (req, res) => {
  res.status(200).send('SIH Backend Server is active and running!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root health-check endpoint
app.get('/', (req, res) => {
  res.send('SIH Backend Server is active and running!');
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/solutions', solutionRoutes);
app.use('/api/collaborations', collaborationRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI,{family:4})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));