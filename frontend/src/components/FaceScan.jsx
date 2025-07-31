import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { FaRedo, FaPlay } from "react-icons/fa";
import SuggestedMusic1 from "./SuggestedMusic1";

const Navbar = ({ username }) => (
  <div className="bg-gradient-to-r from-purple-900 to-indigo-700 text-white py-4 px-6 shadow-xl flex justify-between items-center">
    <h1 className="text-2xl font-bold tracking-wide animate-pulse">
      🎵 MoodSync
    </h1>
    <div className="flex items-center gap-2">
      <span className="font-medium text-lg">Welcome,</span>
      <span className="bg-white text-indigo-700 font-semibold px-3 py-1 rounded-full">
        {username || "User"}
      </span>
    </div>
  </div>
);

const Footer = () => (
  <footer className="mt-10 bg-gray-900 text-gray-300 py-6 text-center">
    <p>&copy; {new Date().getFullYear()} MoodSync. All rights reserved.</p>
  </footer>
);

const FaceScan = () => {
  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const [expression, setExpression] = useState(null);

  const [scanning, setScanning] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(
        `${MODEL_URL}/tiny_face_detector`
      );
      await faceapi.nets.faceLandmark68Net.loadFromUri(
        `${MODEL_URL}/face_landmark_68`
      );
      await faceapi.nets.faceExpressionNet.loadFromUri(
        `${MODEL_URL}/face_expression`
      );
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch(() => {
          setExpression("Webcam access denied");
        });
    };

    loadModels()

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!scanning) return;

    const detectExpression = () => {
      intervalRef.current = setInterval(async () => {
        if (!videoRef.current) return;

        const result = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        if (result?.expressions) {
          const maxExp = Object.entries(result.expressions).reduce((a, b) =>
            a[1] > b[1] ? a : b
          );
          const detectedMood = maxExp[0];
          setExpression(detectedMood);
          setScanning(false);
          await saveExpressionToDB(detectedMood);
          await fetchSongsFromSpotify(detectedMood);
          clearInterval(intervalRef.current);
        } else {
          setExpression("No face detected");
        }
      }, 2000);
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("playing", detectExpression);
    }

    return () => {
      videoRef.current?.removeEventListener("playing", detectExpression);
      clearInterval(intervalRef.current);
    };
  }, [scanning]);

  const saveExpressionToDB = async (mood1) => {
    try {
      await axios.post(
        "https://moodsync-2-ydgo.onrender.com/mood/save",
        {
          userId: user?.email,
          mood: mood1,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Failed to save expression:", err);
    }
  };

  const handleRescan = () => {
    setExpression(null);

    setScanning(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Navbar username={user?.username} />

      <div className="text-center mt-6 px-4">
        <h2 className="text-3xl font-bold mb-4 animate-fade-in">
          🎭 Face Expression Detection
        </h2>
        <video
          ref={videoRef}
          autoPlay
          muted
          width="720"
          height="560"
          className="mx-auto rounded-xl shadow-lg border-4 border-indigo-700"
        />
        <p className="mt-6 text-lg">
          Detected Expression:{" "}
          <span className="text-yellow-400 font-semibold text-xl">
            {expression}
          </span>
        </p>

        {!scanning && (
          <button
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 inline-flex items-center gap-2"
            onClick={handleRescan}
          >
            <FaRedo /> Scan Again
          </button>
        )}

        {expression && (
          <div className="mt-10 px-2 md:px-6">
            <h3 className="text-2xl font-semibold mb-6 underline decoration-indigo-500">
              🎧 Suggested Songs for Mood:{" "}
              <span className="text-indigo-400">{expression}</span>
            </h3>
            <SuggestedMusic1 expression={expression} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FaceScan;
