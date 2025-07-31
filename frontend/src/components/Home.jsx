import React from 'react';
import { motion } from 'framer-motion';
import { FaHeadphones, FaMusic, FaSmile, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import excuse from "../music/Excuses.mp3"
import sidhu from "../music/295.mp3";
import jatt from "../music/Jatt Di Clip 2.mp3"
import pani from "../music/Paani Paani.mp3"
const Home = () => {
  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white min-h-screen">
      
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full px-6 py-4 bg-white/10 backdrop-blur-md flex justify-between items-center shadow-md sticky top-0 z-50"
      >
        <h1 className="text-2xl font-bold text-pink-500 flex items-center gap-2">
          <FaUserCircle /> MoodSync
        </h1>
        <div className="flex flex-wrap space-x-4 text-white/80 text-sm font-medium">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/about">About</Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
        >
          Your Mood. Your Music.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-white/70 mt-6 max-w-2xl mx-auto"
        >
          MoodSync detects your face and voice to deliver songs that match your vibe.
        </motion.p>
        <motion.div whileHover={{ scale: 1.1 }} className="mt-10 inline-block">
          <Link
            to="/login"
            className="bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 rounded-full text-white font-semibold shadow-lg hover:from-pink-700 hover:to-purple-700 transition-all"
          >
            Start Face Scan
          </Link>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="w-full py-16 px-6 bg-white/5 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            How MoodSync Works
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 text-white/80">
            {[
              {
                icon: <FaSmile size={28} />,
                step: "1. Detect Emotion",
                desc: "Your facial expressions and voice are analyzed using AI.",
              },
              {
                icon: <FaHeadphones size={28} />,
                step: "2. Understand Mood",
                desc: "We decode your mood using smart algorithms.",
              },
              {
                icon: <FaMusic size={28} />,
                step: "3. Play Music",
                desc: "Songs that match your emotions start playing instantly.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-lg"
              >
                <div className="mb-3 text-pink-500">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.step}</h3>
                <p className="text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Suggested Songs Section */}
     {/* Suggested Songs Section */}
{/* Suggested Songs Section */}
<section className="mt-10 px-4 md:px-16">
  <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">🎵 Suggested Songs</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {[
      {
        title: "Excuses",
        artist: "AP Dhillon",
        image: "https://c.saavncdn.com/890/Excuses-English-2021-20210930112054-500x500.jpg",
        audio: excuse, // dummy audio
      },
      {
        title: "295",
        artist: "Sidhu Moose Wala",
        image: "https://i1.sndcdn.com/artworks-zs1LZCGop7fKxviM-OwQ5zg-t1080x1080.jpg",
        audio: sidhu, // dummy audio
      },
      {
        title: "Jatt Di Clip 2",
        artist: "Singga",
        image: "https://lyricsgana.wordpress.com/wp-content/uploads/2019/12/singga_jatt_di_clip_2-1.jpg?w=1024",
        audio: jatt, // dummy audio
      },
      {
        title: "Pani Pani",
        artist: "Badshah & Aastha",
        image: "https://c.saavncdn.com/939/Paani-Paani-Hindi-2021-20210603103127-500x500.jpg",
        audio: pani, // dummy audio
      },
    ].map((song, index) => (
      <div
        key={index}
        className="bg-white/10 rounded-xl p-4 text-white shadow-lg hover:shadow-2xl transition duration-300 backdrop-blur-md"
      >
        <img src={song.image} alt={song.title} className="w-full h-48 object-cover rounded-lg mb-4" />
        <h3 className="text-lg font-semibold">{song.title}</h3>
        <p className="text-sm text-gray-300">{song.artist}</p>
        <audio controls className="w-full mt-2">
          <source src={song.audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    ))}
  </div>
</section>


      {/* Footer */}
      <footer className="w-full bg-white/5 border-t border-white/10 py-10 text-center text-white/70 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <h3 className="text-xl font-semibold text-pink-500">About MoodSync</h3>
          <p>
            MoodSync is a smart music platform that detects your mood through face and voice to suggest songs that resonate with your emotional state.
          </p>
          <p>
            Created with ❤️ by <span className="text-white font-semibold">Satyam Singh</span>, a passionate full-stack developer aiming to blend AI with emotion and music.
          </p>
          <p className="text-sm mt-4">© {new Date().getFullYear()} MoodSync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
