import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/dashboard")
      .then((res) => setData(res.data))
      .catch(() => alert("Failed to load dashboard"));
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Dashboard Overview
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500">Total Projects</p>
            <h2 className="text-4xl font-bold mt-2 text-blue-600">
              {data.totalProjects}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500">Total Tasks</p>
            <h2 className="text-4xl font-bold mt-2 text-green-600">
              {data.totalTasks}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500">Overdue Tasks</p>
            <h2 className="text-4xl font-bold mt-2 text-red-600">
              {data.overdueTasks}
            </h2>
          </div>

        </div>

        {/* Status & Priority Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Status Card */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-6">
              Tasks by Status
            </h3>

            <div className="space-y-4">
              {Object.entries(data.tasksByStatus).map(([status, count]) => (
                <div key={status} className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-700">{status}</span>
                  <span className="font-bold text-lg">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Card */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-6">
              Tasks by Priority
            </h3>

            <div className="space-y-4">
              {Object.entries(data.tasksByPriority).map(([priority, count]) => (
                <div key={priority} className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-700">{priority}</span>
                  <span className="font-bold text-lg">{count}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
