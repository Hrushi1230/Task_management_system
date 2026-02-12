import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await API.get("/projects");
    setProjects(data);
  };

  const createProject = async () => {
    if (!title) return alert("Title required");

    const { data } = await API.post("/projects", {
      title,
      description,
    });

    setProjects([...projects, data]);
    setTitle("");
    setDescription("");
  };

  const deleteProject = async (id) => {
    await API.delete(`/projects/${id}`);
    setProjects(projects.filter((p) => p._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Projects
        </h1>

        {/* Create Project Card */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">
            Create New Project
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded"
            />

            <button
              onClick={createProject}
              className="bg-blue-600 text-white rounded px-4 hover:bg-blue-700"
            >
              Add Project
            </button>
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {project.title}
              </h3>

              <p className="text-gray-600 mb-4">
                {project.description || "No description"}
              </p>

              <div className="flex justify-between items-center">
                <Link
                  to={`/projects/${project._id}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  View Tasks →
                </Link>

                <button
                  onClick={() => deleteProject(project._id)}
                  className="text-red-500 hover:text-red-700 font-medium"
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
