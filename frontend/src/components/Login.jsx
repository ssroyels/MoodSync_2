import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const SubmitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "https://moodsync-fgs9.onrender.com/User/login",
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("User", JSON.stringify(res.data.user));

        alert("User login Successfully!");
        console.log("User Login Successfully!");
        setEmail("");
        setPassword("");
        navigate("/Dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-900 via-black to-gray-900 text-white px-4">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src={
              "https://i.pinimg.com/originals/7c/d5/3d/7cd53d36d121d839da9600ca055b01db.gif"
            }
            alt="mood"
            className="w-20 h-20 rounded-full"
          />
        </div>
        <h2 className="text-3xl font-bold text-center mb-4">Welcome Back</h2>
        <p className="text-center text-gray-300 mb-6">Login to MoodSync</p>
        <form className="space-y-4" onSubmit={SubmitHandler}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition py-2 rounded-full font-semibold"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-400 hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
