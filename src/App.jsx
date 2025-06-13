// === pages/index.js ===
import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [url, setUrl] = useState("");
  const [formats, setFormats] = useState([]);
  const [meta, setMeta] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [status, setStatus] = useState("");

  const api  = "https://www.api.pnycareer.com/"

  const fetchFormats = async () => {
    setStatus("Loading...");
    setMeta(null);
    setFormats([]);
    setPlaylist([]);
    try {
      const res = await axios.post("https://www.api.pnycareer.com/api/download/formats", { url });
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
      setStatus("Loaded ✅");
    } catch (err) {
      console.error(err);
      setStatus("Failed to load ❌");
    }
  };

  const handleDownload = async (videoUrl, quality, title) => {
    setStatus("Downloading...");
    try {
      const res = await axios.post("https://www.api.pnycareer.com/api/download/generate", {
        url: videoUrl,
        quality,
        title,
      });
      window.open(`https://www.api.pnycareer.com${res.data.downloadUrl}`, "_blank");
      setStatus("Download started ✅");
    } catch (err) {
      console.error(err);
      setStatus("Download failed ❌");
    }
  };

  const handleDownloadPlaylist = () => {
    handleDownload(url, "playlist", "playlist_download");
  };

  const formatDuration = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const readableSize = (b) => b ? `${(b / 1024 / 1024).toFixed(2)} MB` : "Unknown size";

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border border-gray-300 p-2 w-full"
      />
      <button onClick={fetchFormats} className="bg-blue-600 text-white px-4 py-2 rounded">
        Khul Ja Sim Sim
      </button>

      {meta && (
        <div className="border p-4 rounded shadow">
          <img src={meta.thumbnail} alt="thumbnail" className="rounded w-full max-h-64 object-cover" />
          <h2 className="text-xl font-bold mt-2">{meta.title}</h2>
          <p className="text-sm text-gray-600">Duration: {formatDuration(meta.duration)}</p>
        </div>
      )}

      {formats.length > 0 && (
        <div className="space-y-2">
          {formats.map((f) => (
            <div key={f.format_id} className="flex justify-between items-center border p-2 rounded">
              <div>
                <p className="font-semibold">
                  {f.resolution} ({f.ext}) {f.hasAudio && f.hasVideo ? "🔊" : f.hasVideo ? "🎥" : "🎵"}
                </p>
                <small className="text-xs text-gray-500">
                  {f.note} | {readableSize(f.filesize)}
                </small>
              </div>
              <button
                className="bg-green-600 text-white px-3 py-1 rounded"
                onClick={() => handleDownload(url, f.format_id, meta.title)}
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}

      {playlist.length > 0 && (
        <div className="space-y-3">
          <button
            onClick={handleDownloadPlaylist}
            className="bg-purple-700 text-white px-4 py-2 rounded"
          >
            Download Full Playlist 🔽
          </button>
          {playlist.map((video, idx) => (
            <div key={idx} className="border p-3 rounded shadow flex items-center space-x-4">
              <div className="flex-1">
                <h3 className="text-sm font-semibold">{video.title}</h3>
              </div>
              <button
                onClick={() => handleDownload(video.url, "best", video.title)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-center text-sm">{status}</p>
    </div>
  );
};

export default Home;