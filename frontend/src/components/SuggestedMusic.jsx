import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Search } from "lucide-react";

const SuggestedMusic = ({ query }) => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [playingUrl, setPlayingUrl] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(
          `https://v1.nocodeapi.com/satyam88singh/spotify/ydfAheeOBfBczwCO/search?q=${query || "top"}&type=track`
        );
        const data = await res.json();
        setSongs(data.tracks?.items || []);
      } catch (err) {
        console.error("Error fetching songs:", err);
      }
    };
    fetchSongs();
  }, [query]);

  const handlePlay = (url) => {
    const audio = audioRef.current;
    if (!url) return;

    if (playingUrl === url) {
      audio.pause();
      setPlayingUrl(null);
    } else {
      if (audio && !audio.paused) audio.pause();
      setPlayingUrl(url);
      setTimeout(() => {
        audio.load();
        audio.play().catch((err) => {
          console.error("Audio playback error:", err);
        });
      }, 100);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    try {
      const res = await fetch(
        `https://v1.nocodeapi.com/satyam88singh/spotify/ydfAheeOBfBczwCO/search?q=${searchTerm}&type=track`
      );
      const data = await res.json();
      setSongs(data.tracks?.items || []);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[#0f0f0f] text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">🎧 Suggested Music</h2>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
        <input
          type="text"
          placeholder="Search songs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 rounded-md bg-zinc-800 text-white focus:outline-none border border-zinc-600"
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Search size={18} /> Search
        </button>
      </div>

      {/* Songs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {songs.map((track) => (
          <div
            key={track.id}
            onClick={() => handlePlay(track.preview_url)}
            className={`bg-zinc-900 p-4 rounded-xl shadow-md hover:scale-105 transition-all duration-300 cursor-pointer ${
              playingUrl === track.preview_url ? "ring-2 ring-green-400" : ""
            }`}
          >
            <img
              src={track.album.images[0]?.url}
              alt={track.name}
              className="rounded-md w-full h-48 object-cover mb-3"
            />
            <h3 className="text-lg font-semibold">{track.name}</h3>
            <p className="text-sm text-zinc-400">
              {track.artists?.map((a) => a.name).join(", ")}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePlay(track.preview_url);
              }}
              className={`mt-4 w-full py-2 rounded flex items-center justify-center gap-2 ${
                track.preview_url
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
              disabled={!track.preview_url}
            >
              {playingUrl === track.preview_url ? (
                <>
                  <Pause size={18} /> Pause
                </>
              ) : (
                <>
                  <Play size={18} /> Play
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Audio Player (Hidden) */}
      <audio ref={audioRef}>
        <source src={playingUrl || ""} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default SuggestedMusic;

