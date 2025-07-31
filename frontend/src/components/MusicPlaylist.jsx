// MusicPlaylist.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

const musicDB = [
  {
    title: "Happy Vibes",
    mood: "happy",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    image: "https://i.imgur.com/zl0RZ2b.jpg"
  },
  {
    title: "Sad Symphony",
    mood: "sad",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    image: "https://i.imgur.com/j7gYz0p.jpg"
  },
  {
    title: "Neutral Flow",
    mood: "neutral",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    image: "https://i.imgur.com/zZ7YoY5.jpg"
  },
  {
    title: "Angry Beats",
    mood: "angry",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    image: "https://i.imgur.com/Mnuw7VW.jpg"
  }
];

const MusicPlaylist = ({ mood, search }) => {
  const filtered = musicDB.filter((item) => {
    if (search) return item.title.toLowerCase().includes(search.toLowerCase());
    return item.mood === mood;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {filtered.map((track, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          <img src={track.image} alt={track.title} className="w-full h-48 object-cover" />
          <div className="p-4 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">{track.title}</h3>
              <p className="text-sm text-gray-400 capitalize">{track.mood}</p>
            </div>
            <audio controls src={track.url} className="h-10" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MusicPlaylist;


