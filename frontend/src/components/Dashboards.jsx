import React, { useEffect, useState } from "react";
import { FaSearch, FaUserCircle, FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import SuggestedMusic from "./SuggestedMusic";

const Dashboard = () => {
  const [moodHistory, setMoodHistory] = useState([]);
  const [lastMood, setLastMood] = useState(null);

  const user = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://moodsync-fgs9.onrender.com/mood/history/${user.email}`, {
          withCredentials: true,
        })
        .then((res) => {
          const history = res.data.reverse();
          setMoodHistory(history);
          setLastMood(history[0]);
        })
        .catch((err) => {
          console.error("Failed to fetch mood history:", err);
        });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white font-sans">
      {/* Navbar */}
      <nav className="flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-black bg-opacity-30 backdrop-blur-md shadow-md gap-4">
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold tracking-wider"
        >
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent animate-pulse">
            MoodSync
          </span>
        </motion.h1>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search music..."
              className="w-full bg-gray-800 text-white rounded-full py-2 px-4 text-sm focus:outline-none border border-gray-600"
            />
            <FaSearch className="absolute right-4 top-3 text-gray-400 text-sm" />
          </div>
          <button className="bg-purple-700 hover:bg-purple-600 transition-all px-4 py-2 rounded-full">
            <FaPlay className="text-white" />
          </button>
          <div className="flex items-center gap-2 text-white text-sm font-medium">
            <FaUserCircle className="text-xl" />
            <span>{user?.username || "User"}</span>
          </div>
        </div>
      </nav>

      {/* Dashboard Section */}
      <main className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
          Welcome,{" "}
          <span className="text-purple-400">{user?.name || "Guest"}</span> 👋
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Last Detected Mood */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-[#1f1f1f] p-6 rounded-2xl shadow-lg text-center"
          >
            <h3 className="text-lg font-semibold mb-2">Last Detected Mood</h3>
            <div className="text-6xl mb-2">{lastMood?.emoji || "🤖"}</div>
            <p className="text-xl font-medium capitalize">
              {lastMood?.mood || "Unknown"}
            </p>
          </motion.div>

          {/* Face Detect Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#1f1f1f] p-6 rounded-2xl shadow-lg flex flex-col justify-center items-center"
          >
            <h3 className="text-lg font-semibold mb-4">Face Detection</h3>
            <Link
              to={"/FaceScan"}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-6 py-2 rounded-full hover:scale-105 transition-transform"
            >
              Scan Mood
            </Link>
          </motion.div>

          {/* Mood History */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#1f1f1f] p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-lg font-semibold mb-4">Mood History</h3>
            <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {moodHistory.length > 0 ? (
                moodHistory.map((entry, index) => (
                  <li
                    key={index}
                    className="flex justify-between text-sm border-b border-gray-600 pb-1"
                  >
                    <span>
                      {entry.emoji}{" "}
                      {new Date(entry.detectedAt).toLocaleDateString()}
                    </span>
                    <span className="capitalize">{entry.mood}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-400">No mood history available.</li>
              )}
            </ul>
          </motion.div>
        </div>

        {/* Suggested Music */}
        <section className="mt-8">
          <SuggestedMusic query={lastMood?.mood || "happy"} />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-10 px-6 bg-black bg-opacity-30 backdrop-blur-md text-center text-gray-400 border-t border-gray-700">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto space-y-6"
        >
          <h3 className="text-white text-2xl font-bold tracking-wide">
            About <span className="text-purple-400">MoodSync</span>
          </h3>
          <p className="text-base">
            MoodSync is your AI-powered emotional wellness companion. By
            analyzing your facial expressions, MoodSync understands your moods
            and helps you improve your day with personalized content, music, and
            more.
          </p>
          <p className="italic text-sm">
            Developed with ❤️ by{" "}
            <span className="text-white font-semibold">Satyam Singh</span> —
            2025
          </p>
        </motion.div>
      </footer>
    </div>
  );
};

export default Dashboard;
