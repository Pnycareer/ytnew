import { motion } from "framer-motion";

const Toast = ({ message }) => (
  <motion.div
    key="toast"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 30 }}
    transition={{ duration: 0.4 }}
    className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50"
  >
    {message}
  </motion.div>
);

export default Toast;