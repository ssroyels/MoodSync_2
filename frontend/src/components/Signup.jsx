import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://moodsync-fgs9.onrender.com/User/register", { username, email, password },{ withCredentials: true
})
      .then(() => {
        // ✅ Correct way to store multiple values in localStorage
        localStorage.setItem("UserData", JSON.stringify({ email, username }));

        setEmail("");
        setUsername("");
        setPassword("");

        alert("OTP sent to your email"); // Simulated
        navigate("/verify-otp");
      })
      .catch((err) => {
        console.error("Signup error:", err);
        alert("Signup failed. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-900 via-black to-gray-900 text-white px-4">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="https://cdn.dribbble.com/userupload/25126157/file/original-b4e375e11656bdb2c9aec5333f82acaa.gif"
            alt="mood"
            className="w-20 h-20 rounded-full"
          />
        </div>
        <h2 className="text-3xl font-bold text-center mb-4">Create Account</h2>
        <p className="text-center text-gray-300 mb-6">Join MoodSync Today</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition py-2 rounded-full font-semibold"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
