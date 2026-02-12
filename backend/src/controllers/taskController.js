const Task = require("../models/Task");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, project } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      project,
      assignedTo: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Tasks By Project
exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.query;

    const tasks = await Task.find({ project: projectId });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, assignedTo: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      assignedTo: req.user.id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

