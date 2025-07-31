import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OTPVerify = () => {
  const [otp, setOtp] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    const mouseMoveHandler = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMoveHandler);
    return () => window.removeEventListener("mousemove", mouseMoveHandler);
  }, []);

  const handleVerify = async () => {
    const signupData = JSON.parse(localStorage.getItem("UserData"));

    if (!signupData || !signupData.email) {
      alert("Signup data not found. Please signup again.");
      navigate("/signup");
      return;
    }

    try {
      const response = await axios
        .post(
          "https://moodsync-fgs9.onrender.com/User/verifyOtp",
          {
            email: signupData.email,
            otp,
          },
          { withCredentials: true }
        )
        .then(() => {
          alert("✅ Account created successfully!");
          // console.log("User created:", response.data);
          localStorage.removeItem("UserData");
          navigate("/login");
        });
    } catch (error) {
      console.error("❌ OTP Verification Error:", error);
      alert(
        error.response?.data?.msg || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center transition-all duration-500 overflow-hidden ${
        darkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"
      }`}
      style={{
        backgroundPosition: `${mousePos.x / 60}px ${mousePos.y / 60}px`,
      }}
    >
      {/* Toggle */}
      <div className="absolute top-5 right-5 z-50">
        <button
          onClick={toggleDarkMode}
          className="text-xl p-2 rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 transition"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>
      </div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-purple-500 opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${4 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* OTP Card */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 z-10">
        <h2 className="text-2xl font-bold text-center text-purple-600 dark:text-purple-400">
          Verify OTP
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Please enter the 6-digit code sent to your email.
        </p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 rounded-md border bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:outline-none"
        />
        <button
          onClick={handleVerify}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-full font-semibold transition"
        >
          Verify & Continue
        </button>
      </div>
    </div>
  );
};

export default OTPVerify;
