const TrimControls = ({
  selectedFormat,
  trimStart,
  trimEnd,
  setTrimStart,
  setTrimEnd,
  handleDownloadTrimmed,
  showModal,
  videoRef,
  formatDuration,
}) => (
  <div className="mt-6 bg-gray-800 p-4 rounded shadow">
    <video
      src={selectedFormat.url}
      controls
      ref={videoRef}
      className="w-full rounded"
      onLoadedMetadata={() => {
        const duration = videoRef.current?.duration;
        setTrimEnd(duration);
      }}
    ></video>

    <div className="my-4 space-y-4">
      <div>
        <label className="block text-sm mb-1 text-white">
          Start Time: {formatDuration(trimStart)}
        </label>
        <input
          type="range"
          min={0}
          max={videoRef.current?.duration || 100}
          value={trimStart}
          onChange={(e) => {
            const val = Number(e.target.value);
            setTrimStart(val);
            if (videoRef.current) videoRef.current.currentTime = val;
          }}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm mb-1 text-white">
          End Time: {formatDuration(trimEnd)}
        </label>
        <input
          type="range"
          min={0}
          max={videoRef.current?.duration || 100}
          value={trimEnd}
          onChange={(e) => {
            const val = Number(e.target.value);
            setTrimEnd(val);
            if (videoRef.current) videoRef.current.currentTime = val;
          }}
          className="w-full"
        />
      </div>
    </div>

    <div className="flex gap-2">
      <button
        onClick={showModal}
        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
      >
        👀 Preview Trimmed Video
      </button>

      <button
        onClick={handleDownloadTrimmed}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Lelo Bhai 📥📦
      </button>
    </div>
  </div>
);

export default TrimControls;