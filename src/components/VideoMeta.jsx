const VideoMeta = ({ meta }) => (
  <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow">
    <img
      src={meta.thumbnail}
      alt="thumbnail"
      className="rounded w-full max-h-64 object-cover mb-3"
    />
    <h2 className="text-xl font-bold">{meta.title}</h2>
    <p className="text-sm text-gray-400">⏱ Duration: {meta.duration}</p>
  </div>
);

export default VideoMeta;