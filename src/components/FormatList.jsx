import { motion } from "framer-motion";

const FormatList = ({ formats, setSelectedFormat, readableSize }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 grid gap-3">
    {formats.map((f) => (
      <motion.div
        key={f.format_id}
        className="flex justify-between items-center bg-gray-700 p-3 rounded"
        whileHover={{ scale: 1.01 }}
      >
        <div>
          <p className="font-semibold">
            🎞 {f.resolution} ({f.ext}) {f.hasAudio && f.hasVideo ? "🎧+🎥" : f.hasVideo ? "🎥" : "🎧"}
          </p>
          <p className="text-sm text-gray-300">
            {f.note} | {readableSize(f.filesize)}
          </p>
        </div>
        <motion.button
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedFormat(f)}
        >
          ✂️ Katna Hai Ya 📥 Lena Hai
        </motion.button>
      </motion.div>
    ))}
  </motion.div>
);

export default FormatList;