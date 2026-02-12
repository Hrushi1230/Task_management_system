import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const navLinkStyle = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600 transition";

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Left - Logo */}
        <div className="flex items-center gap-8">
          <Link
            to="/dashboard"
            className="text-2xl font-bold text-blue-600 tracking-tight"
          >
            Task Management System
          </Link>

          <div className="hidden md:flex gap-6 text-sm">
            <Link
              to="/dashboard"
              className={navLinkStyle("/dashboard")}
            >
              Dashboard
            </Link>

            <Link
              to="/projects"
              className={navLinkStyle("/projects")}
            >
              Projects
            </Link>
          </div>
        </div>

        {/* Right - User Section */}
        <div className="flex items-center gap-4">

          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-800">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500">
              {user?.email}
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}
