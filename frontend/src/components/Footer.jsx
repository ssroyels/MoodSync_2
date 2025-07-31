const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16 px-6 py-10 text-center border-t border-gray-800">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-2 text-purple-400">MoodSync</h3>
        <p className="text-gray-400 mb-4">
          MoodSync detects your emotion and plays music accordingly using face detection and voice recognition.
        </p>
        <p className="text-sm text-gray-500">Created by <span className="text-white font-semibold">Satyam Singh</span> © 2025</p>
      </div>
    </footer>
  );
};

export default Footer;