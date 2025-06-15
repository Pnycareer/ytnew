// File: pages/Home.jsx
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";

import URLInput from "./components/URLInput";
import VideoMeta from "./components/VideoMeta";
import FormatList from "./components/FormatList";
import TrimControls from "./components/TrimControls";
import PlaylistDownload from "./components/PlaylistDownload";
import Toast from "./components/Toast";
import TrimPreviewModal from "./components/TrimPreviewModal";

import {
  formatDuration,
  readableSize,
  secondsToHHMMSS,
} from "./utils/helpers";
import Info from "./pages/Info";

const Home = () => {
  const [url, setUrl] = useState("");
  const [formats, setFormats] = useState([]);
  const [meta, setMeta] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [status, setStatus] = useState("");
  const [toast, setToast] = useState(null);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [loopPreview, setLoopPreview] = useState(false);
  const [showTrimModal, setShowTrimModal] = useState(false);

  const videoRef = useRef(null);
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
    setSelectedFormat(null);
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

  const handleDownloadTrimmed = async () => {
    if (trimStart >= trimEnd) {
      setStatus("❌ Start time must be less than end time.");
      showToast("⚠️ Invalid trim range!");
      return;
    }
    setStatus("✂️ Trimming and downloading...");
    showToast("✂️ Bhai kam Start ho gya hai Thand Rakh Khudi download ho ga");
    try {
      const res = await axios.post(`${BASE_URL}/download/generate`, {
        url,
        quality: selectedFormat.format_id,
        title: meta.title,
        startTime: secondsToHHMMSS(trimStart),
        endTime: secondsToHHMMSS(trimEnd),
      });
      window.location.href = `${BASE_URL}${res.data.downloadUrl}`;
      setStatus("🎉 Trimmed download started!");
      setToast(null);
    } catch (err) {
      console.error(err);
      setStatus("❌ Trim + download failed. Sad reacts.");
      setToast(null);
    }
  };

  const handleDownloadPlaylist = () => {
    handleDownload(url, "playlist", "playlist_download");
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoop = () => {
      if (video.currentTime >= trimEnd) {
        video.currentTime = trimStart;
        video.play();
      }
    };

    if (loopPreview) {
      video.currentTime = trimStart;
      video.play();
      video.addEventListener("timeupdate", handleLoop);
    }

    return () => {
      video.removeEventListener("timeupdate", handleLoop);
    };
  }, [loopPreview, trimStart, trimEnd]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white flex flex-col">
      <header className="bg-black py-6 text-center shadow-md">
        <h1 className="text-3xl font-bold text-blue-400">📼 Video Genie</h1>
        <p className="text-sm text-gray-400 mt-1">"Khul Ja Sim Sim" for any video</p>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <URLInput url={url} setUrl={setUrl} onFetch={fetchFormats} status={status} />

        <Info/>

        <AnimatePresence>
          {status && <p className="text-center mt-4 text-yellow-400">{status}</p>}
        </AnimatePresence>

        {meta && <VideoMeta meta={{ ...meta, duration: formatDuration(meta.duration) }} />}

        {formats.length > 0 && !selectedFormat && (
          <FormatList
            formats={formats}
            setSelectedFormat={setSelectedFormat}
            readableSize={readableSize}
          />
        )}

        {selectedFormat && (
          <TrimControls
            selectedFormat={selectedFormat}
            trimStart={trimStart}
            trimEnd={trimEnd}
            setTrimStart={setTrimStart}
            setTrimEnd={setTrimEnd}
            handleDownloadTrimmed={handleDownloadTrimmed}
            showModal={() => setShowTrimModal(true)}
            videoRef={videoRef}
            formatDuration={formatDuration}
          />
        )}

        {playlist.length > 0 && <PlaylistDownload handleDownloadPlaylist={handleDownloadPlaylist} />}
      </main>

      <AnimatePresence>{toast && <Toast message={toast} />}</AnimatePresence>

      <TrimPreviewModal
        isOpen={showTrimModal}
        onClose={() => setShowTrimModal(false)}
        videoUrl={selectedFormat?.url}
        trimStart={trimStart}
        trimEnd={trimEnd}
        loopPreview={loopPreview}
      />

      <footer className="bg-black text-center py-4 text-sm text-gray-500">
        Made by Ap sab Ka Developer &nbsp;|&nbsp; All rights reserved for chaos.
      </footer>
    </div>
  );
};

export default Home;