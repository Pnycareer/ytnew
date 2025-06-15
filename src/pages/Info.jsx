import React from 'react';

const Info = () => {
  return (
    <div className="h-auto bg-black text-white flex items-center justify-center p-4 mt-20">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-400">🎧 No Sound in Preview?</h1>
        <p className="text-lg text-gray-300">
          Don't trip. If you can't hear any sound while previewing the video — it's all good. Some browsers block audio autoplay or limit audio playback in previews.
        </p>
        <p className="mt-4 text-lg text-green-400 font-semibold">
          ✅ Once you download the  video, the audio will be fully intact and working.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          (Pro tip: Just download it. Trust the process.)
        </p>
      </div>
    </div>
  );
};

export default Info;
