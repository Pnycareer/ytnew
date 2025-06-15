import { motion } from "framer-motion";

const PlaylistDownload = ({ handleDownloadPlaylist }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 mt-6">
    <motion.button
      onClick={handleDownloadPlaylist}
      className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      Download Full Playlist 🔽
    </motion.button>
  </motion.div>
);

export default PlaylistDownload;