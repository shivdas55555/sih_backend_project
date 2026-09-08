const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// ==========================================
// PUBLIC ROUTES (No Authentication Required)
// ==========================================

// 1. Get all tasks/problems
// GET /api/tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get single task/problem by ID
// GET /api/tasks/:id
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Create a new task/problem
// POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const { title, category, description, location, submittedBy } = req.body;

    if (!title || !category || !description) {
      return res
        .status(400)
        .json({ message: "Title, category, and description are required." });
    }

    const task = new Task({
      title,
      category,
      description,
      location: location || "Remote / General",
      submittedBy: submittedBy || "Anonymous Innovator",
    });

    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Update task/problem
// PUT /api/tasks/:id
router.put('/:id', async (req, res) => {
  try {
    const { title, description, status, category, location } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (category) task.category = category;
    if (location) task.location = location;

    await task.save();
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Delete task/problem
// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
