import { motion } from "framer-motion";

const URLInput = ({ url, setUrl, onFetch, status }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="space-y-4"
  >
    <motion.input
      type="text"
      placeholder="Paste YouTube , Facebook , Instagram, Ticktock Url"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-500 border border-gray-600"
      whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
    />

    <motion.button
      onClick={onFetch}
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
);

export default URLInput;