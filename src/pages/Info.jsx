import React from 'react';

const Info = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-400">🎧 No Sound in Preview?</h1>
        <p className="text-lg text-gray-300">
          Don't stress it. Some previews won’t play audio because of browser restrictions — totally normal.
        </p>
        <p className="mt-4 text-lg text-green-400 font-semibold">
          ✅ The downloaded video will have full sound, no cap.
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2 text-purple-400">🚀 Downloading 4K or 8K?</h2>
          <p className="text-lg text-gray-300">
            High-res videos (like 4K or 8K) are chonky bois. They take a little extra time to process and download — that's normal too.
          </p>
          <p className="mt-4 text-yellow-400 font-semibold">
            ⚠️ Be patient. Bigger files = longer wait = better quality.
          </p>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Note : Just trust the genie. Your download will be crisp and complete. 💯
        </p>
      </div>
    </div>
  );
};

export default Info;
