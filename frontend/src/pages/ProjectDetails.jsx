import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function ProjectDetails() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [id]);

  const fetchTasks = async () => {
    const { data } = await API.get(`/tasks?projectId=${id}`);
    setTasks(data);
  };

  const createTask = async () => {
    if (!title) return alert("Task title required");

    const { data } = await API.post("/tasks", {
      title,
      priority,
      dueDate,
      project: id
    });

    setTasks([...tasks, data]);
    setTitle("");
    setDueDate("");
  };

  const updateStatus = async (taskId, status) => {
    await API.put(`/tasks/${taskId}`, { status });
    fetchTasks();
  };

  const deleteTask = async (taskId) => {
    await API.delete(`/tasks/${taskId}`);
    setTasks(tasks.filter((t) => t._id !== taskId));
  };

  const isOverdue = (task) => {
    return (
      task.dueDate &&
      new Date(task.dueDate) < new Date() &&
      task.status !== "Done"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Project Tasks
        </h1>

        {/* Create Task Section */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">
            Add New Task
          </h2>

          <div className="grid md:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded"
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border p-2 rounded"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border p-2 rounded"
            />

            <button
              onClick={createTask}
              className="bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Task
            </button>

          </div>
        </div>

        {/* Task Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className={`p-6 rounded-xl shadow bg-white transition hover:shadow-lg ${
                isOverdue(task) ? "border-l-4 border-red-500" : ""
              }`}
            >

              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold">
                  {task.title}
                </h3>

                <span className={`text-sm px-2 py-1 rounded ${
                  task.priority === "High"
                    ? "bg-red-100 text-red-600"
                    : task.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}>
                  {task.priority}
                </span>
              </div>

              <p className="text-gray-600 mb-3">
                Status: <span className="font-medium">{task.status}</span>
              </p>

              {task.dueDate && (
                <p className="text-gray-500 text-sm mb-4">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">

                {task.status !== "In Progress" && (
                  <button
                    onClick={() =>
                      updateStatus(task._id, "In Progress")
                    }
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                  >
                    In Progress
                  </button>
                )}

                {task.status !== "Done" && (
                  <button
                    onClick={() =>
                      updateStatus(task._id, "Done")
                    }
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    Mark Done
                  </button>
                )}

                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
