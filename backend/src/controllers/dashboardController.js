const Project = require("../models/Project");
const Task = require("../models/Task");
const mongoose = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalProjects = await Project.countDocuments({ owner: userId });
    const totalTasks = await Task.countDocuments({ assignedTo: userId });

    const tasksByStatus = await Task.aggregate([
    { $match: { assignedTo: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const tasksByPriority = await Task.aggregate([
    { $match: { assignedTo: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: "$priority", count: { $sum: 1 } } }
    ]);

    const overdueTasks = await Task.countDocuments({
      assignedTo: userId,
      dueDate: { $lt: new Date() },
      status: { $ne: "Done" }
    });

    const formatData = (data, defaultKeys) => {
    const result = {};
    defaultKeys.forEach(key => result[key] = 0);

    data.forEach(item => {
        result[item._id] = item.count;
    });

    return result;
    };

    res.json({
    totalProjects,
    totalTasks,
    tasksByStatus: formatData(tasksByStatus, ["Todo", "In Progress", "Done"]),
    tasksByPriority: formatData(tasksByPriority, ["Low", "Medium", "High"]),
    overdueTasks
    });


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
