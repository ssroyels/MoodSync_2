import React, { useEffect, useState, useRef } from "react";
import { FaPlay } from "react-icons/fa";

const SuggestedMusic1 = ({ expression }) => {
  const [songs, setSongs] = useState([]);
  const [playingUrl, setPlayingUrl] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(
          `https://v1.nocodeapi.com/satyam88singh/spotify/ydfAheeOBfBczwCO/search?q=${expression}&type=track`
        );
        const data = await res.json();
        setSongs(data.tracks.items);
      } catch (err) {
        console.error("Error fetching songs:", err);
      }
    };

    if (expression) fetchSongs();
  }, [expression]);

  const handlePlay = (url) => {
    if (!url) return;
    if (playingUrl === url) {
      audioRef.current.pause();
      setPlayingUrl(null);
    } else {
      if (audioRef.current) audioRef.current.pause();
      setPlayingUrl(url);
      setTimeout(() => {
        audioRef.current.load();
        audioRef.current.play();
      }, 100);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {songs.map((track) => (
          <div
            key={track.id}
            className="bg-white text-black p-4 rounded-xl shadow-lg transition transform hover:scale-105"
          >
            <img
              src={track.album.images[0]?.url}
              alt={track.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p className="font-bold text-lg">{track.name}</p>
            <p className="text-sm text-gray-700 mb-2">
              {track.artists[0]?.name}
            </p>
            <button
              className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded"
              onClick={() => handlePlay(track.preview_url)}
              disabled={!track.preview_url}
            >
              <FaPlay className="inline mr-2" />
              {playingUrl === track.preview_url ? "Pause" : "Play Preview"}
            </button>
          </div>
        ))}
      </div>
      <audio ref={audioRef}>
        <source src={playingUrl || ""} type="audio/mpeg" />
      </audio>
    </>
  );
};

export default SuggestedMusic1;
