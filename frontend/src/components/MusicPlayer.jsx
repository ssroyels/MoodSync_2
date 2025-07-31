import React, { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

export default function MusicPlayer() {
  const [tracks, setTracks] = useState([]);
  const [playingUrl, setPlayingUrl] = useState(null);
  const audioRef = useRef(null);

  const fetchTracks = async () => {
    try {
      const res = await fetch(
        "https://v1.nocodeapi.com/satyam88singh/spotify/ydfAheeOBfBczwCO/search?q=doku&type=track"
      );
      const data = await res.json();
      const songData = data.tracks?.items || [];
      const filtered = songData.filter((track) => track.preview_url);
      setTracks(filtered);
    } catch (err) {
      console.error("Error fetching tracks:", err);
    }
  };

  const playPreview = (url) => {
    const audio = audioRef.current;

    if (playingUrl === url) {
      audio.pause();
      setPlayingUrl(null);
    } else {
      if (!audio.paused) audio.pause();
      setPlayingUrl(url);
      setTimeout(() => {
        audio.src = url;
        audio.play().catch((err) => console.error("Playback error:", err));
      }, 100);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">🎧 Music Player</h1>
      <button
        onClick={fetchTracks}
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
      >
        Load Songs
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="bg-gray-800 p-4 rounded-xl shadow-lg hover:scale-105 transition-all"
          >
            <img
              src={track.album.images[0]?.url}
              alt={track.name}
              className="rounded-lg mb-3"
            />
            <h2 className="text-lg font-semibold">{track.name}</h2>
            <p className="text-sm text-gray-400">{track.artists[0]?.name}</p>

            <button
              onClick={() => playPreview(track.preview_url)}
              className="mt-3 bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-2"
            >
              {playingUrl === track.preview_url ? <Pause size={18} /> : <Play size={18} />}
              {playingUrl === track.preview_url ? "Pause" : "Play"}
            </button>
          </div>
        ))}
      </div>

      <audio ref={audioRef} />
    </div>
  );
}
