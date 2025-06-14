import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [url, setUrl] = useState("");
  const [formats, setFormats] = useState([]);
  const [meta, setMeta] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [status, setStatus] = useState("");
  const [toast, setToast] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const showToast = (msg) => {
    setToast(msg);
    if (window.navigator.vibrate) window.navigator.vibrate(100);
  };

  const fetchFormats = async () => {
    setStatus("🔍 Searching for treasure...");
    setMeta(null);
    setFormats([]);
    setPlaylist([]);
    try {
      const res = await axios.post(`${BASE_URL}/download/formats`, { url });
      if (res.data.type === "single") {
        setMeta({
          title: res.data.title,
          thumbnail: res.data.thumbnail,
          duration: res.data.duration,
        });
        setFormats(res.data.formats);
      } else if (res.data.type === "playlist") {
        setPlaylist(res.data.playlist);
      }
      setStatus("✅ Full Jalwa Incoming!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to load. RIP.");
    }
  };

  const handleDownload = async (videoUrl, quality, title) => {
    setStatus("📥 Downloading... Sit tight!");
    showToast("📥 Your download is starting. Check your browser’s downloads!");

    try {
      const res = await axios.post(`${BASE_URL}/download/generate`, {
        url: videoUrl,
        quality,
        title,
      });

      // Use redirect-style download
      window.location.href = `${BASE_URL}${res.data.downloadUrl}`;

      setStatus("🎉 Download started. Lelo Bhai!");
      setToast(null);
    } catch (err) {
      console.error(err);
      setStatus("❌ Download failed. Sad reacts only.");
      setToast(null);
    }
  };

  const handleDownloadPlaylist = () => {
    handleDownload(url, "playlist", "playlist_download");
  };

  const formatDuration = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const readableSize = (b) =>
    b ? `${(b / 1024 / 1024).toFixed(2)} MB` : "Unknown size";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white flex flex-col">
      <header className="bg-black py-6 text-center shadow-md">
        <h1 className="text-3xl font-bold text-blue-400">📼 Video Genie</h1>
        <p className="text-sm text-gray-400 mt-1">
          "Khul Ja Sim Sim" for any video
        </p>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <motion.input
            type="text"
            placeholder="Paste YouTube Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-500 border border-gray-600"
            whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
          />

          <motion.button
            onClick={fetchFormats}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, rotate: -2 }}
            animate={{
              boxShadow: status.includes("Searching")
                ? "0 0 20px rgba(59, 130, 246, 0.8)"
                : "none",
            }}
          >
            🔓 Khul Ja Sim Sim
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {status && (
            <motion.p
              key={status}
              className="text-center mt-4 text-yellow-400"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              {status}
            </motion.p>
          )}
        </AnimatePresence>

        {meta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 p-4 bg-gray-800 rounded-lg shadow"
          >
            <img
              src={meta.thumbnail}
              alt="thumbnail"
              className="rounded w-full max-h-64 object-cover mb-3"
            />
            <h2 className="text-xl font-bold">{meta.title}</h2>
            <p className="text-sm text-gray-400">
              ⏱ Duration: {formatDuration(meta.duration)}
            </p>
          </motion.div>
        )}

        {formats.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 grid gap-3"
          >
            {formats.map((f) => (
              <motion.div
                key={f.format_id}
                className="flex justify-between items-center bg-gray-700 p-3 rounded"
                whileHover={{ scale: 1.01 }}
              >
                <div>
                  <p className="font-semibold">
                    🎞 {f.resolution} ({f.ext}){" "}
                    {f.hasAudio && f.hasVideo
                      ? "🎧+🎥"
                      : f.hasVideo
                      ? "🎥"
                      : "🎧"}
                  </p>
                  <p className="text-sm text-gray-300">
                    {f.note} | {readableSize(f.filesize)}
                  </p>
                </div>
                <motion.button
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    handleDownload(url, f.format_id, meta.title)
                  }
                >
                  Lelo Bhai 📦
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {playlist.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3 mt-6"
          >
            <motion.button
              onClick={handleDownloadPlaylist}
              className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Download Full Playlist 🔽
            </motion.button>
            {playlist.map((video, idx) => (
              <motion.div
                key={idx}
                className="border p-3 rounded shadow flex items-center space-x-4 bg-gray-700"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{video.title}</h3>
                </div>
                <motion.button
                  onClick={() =>
                    handleDownload(video.url, "best", video.title)
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  whileTap={{ scale: 0.95 }}
                >
                  Download 🎬
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-black text-center py-4 text-sm text-gray-500">
        Made with 🤪 by Ap sab Ka Developer &nbsp;|&nbsp; All rights reserved for chaos.
      </footer>
    </div>
  );
};

export default Home;
