// src/components/About.jsx

import React from 'react';
import { motion } from 'framer-motion';
import satyam from "../assets/satyam.jpeg"

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6 flex flex-col items-center justify-center">
      <motion.img
        src={satyam} // Put your image in public folder and rename accordingly
        alt="Satyam Singh"
        className="w-40 h-40 rounded-full border-4 border-white shadow-lg mb-6 object-cover"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      />

      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mb-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        About <span className="text-yellow-400">Satyam Singh</span>
      </motion.h1>

      <motion.p
        className="text-md md:text-lg text-center max-w-3xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        I am <b>Satyam Singh</b>, a passionate full-stack developer with a love for turning innovative ideas into reality.
        With strong command over the MERN stack and modern tools like <b>TensorFlow.js</b> and <b>Spotify API</b>, I create
        interactive, intelligent, and real-time web applications. My focus is always on user-centric design, performance,
        and meaningful functionality.
      </motion.p>

      <motion.div
        className="bg-white/10 rounded-xl p-6 shadow-xl backdrop-blur-sm max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        <h2 className="text-2xl font-semibold mb-3 text-yellow-300">What is MoodSync?</h2>
        <p className="text-base leading-relaxed">
          <b>MoodSync</b> is an intelligent emotion-based music application that reads your facial expressions using
          <b> face-api.js</b> and voice commands to understand how you feel. Based on the detected mood—like happy, sad, or neutral—
          it fetches songs using the Spotify API and plays music to match or uplift your emotions.
          It’s more than just a music player; it’s an emotional companion powered by modern AI.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
