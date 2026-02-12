import { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const { data } = await API.post("/auth/login", {
          email,
          password
        });
        login(data);
        navigate("/dashboard");
      } else {
        await API.post("/auth/register", {
          name,
          email,
          password
        });
        alert("Account created successfully!");
        setIsLogin(true);
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-100">

      {/* Left Branding */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-16">
        <div>
          <h1 className="text-5xl font-extrabold text-blue-700 mb-6 tracking-tight">
            Task Management System
          </h1>
          <p className="text-lg text-gray-600 max-w-md leading-relaxed">
            Organize projects. Track progress.
            Stay productive with a clean and powerful
            task management experience.
          </p>
        </div>
      </div>

      {/* Auth Card */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">

        <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 transition-all duration-300">

          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-full flex p-1 w-full">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                  isLogin
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-500"
                }`}
              >
                Sign In
              </button>

              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                  !isLogin
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-500"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </h2>

          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-200 p-3 rounded-xl mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-200 p-3 rounded-xl mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-200 p-3 rounded-xl mb-6 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>

        </div>
      </div>
    </div>
  );
}
