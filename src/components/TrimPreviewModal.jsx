import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const TrimPreviewModal = ({
  isOpen,
  onClose,
  videoUrl,
  trimStart,
  trimEnd,
  loopPreview,
}) => {
  const videoRef = React.useRef();

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoop = () => {
      if (video.currentTime >= trimEnd) {
        video.currentTime = trimStart;
        if (loopPreview) {
          video.play();
        } else {
          video.pause();
        }
      }
    };

    video.currentTime = trimStart;
    video.play();

    video.addEventListener("timeupdate", handleLoop);
    return () => video.removeEventListener("timeupdate", handleLoop);
  }, [isOpen, loopPreview, trimStart, trimEnd]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-2xl w-full relative"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-300 hover:text-white text-xl"
            >
              ✖
            </button>

            <video
              src={videoUrl}
              controls
              ref={videoRef}
              className="w-full rounded"
            />

            <p className="text-sm text-gray-400 mt-3 text-center">
              Playing from {trimStart}s to {trimEnd}s{" "}
              {loopPreview && "(Looping)"}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TrimPreviewModal;
