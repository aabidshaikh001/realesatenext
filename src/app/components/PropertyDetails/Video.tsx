"use client";

import { useParams } from "next/navigation";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

const videoData: Record<string, string> = {
  "1": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "2": "https://www.youtube.com/embed/3JZ_D3ELwOQ",
  "3": "https://www.youtube.com/embed/tgbNymZ7vqY",
};

export default function VideoPlayer() {
  const params = useParams();
  const videoId = params.id as keyof typeof videoData;
  const videoSrc = videoData[videoId] || "https://www.youtube.com/embed/defaultVideoId";

  return (
    <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="section bg-white rounded-lg shadow-lg max-w-6xl mx-auto p-4 space-y-8"
  >
    <h2 className="text-2xl font-bold mb-4">Video</h2>
      <div className="relative max-w-3xl w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg bg-black">
        <iframe
          src={videoSrc}
          title="Dynamic Video Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full object-cover"
        ></iframe>
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-opacity duration-300 cursor-pointer">
          <div className="bg-white p-3 rounded-full shadow-md">
            <Play className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
