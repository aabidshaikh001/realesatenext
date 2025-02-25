"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

export default function VideoPlayer() {
  const params = useParams();
  const id = params.id as string;

  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        // Replace with actual API endpoint
        const response = await fetch(`https://realestateapi-x9de.onrender.com/api/properties/${id}`); // Replace with your API endpoint
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();

        // Extract video URL from API response
        setVideoSrc(data.video || "https://www.youtube.com/embed/defaultVideoId");
      } catch (err) {
        setError("Error fetching video.");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Loading video...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!videoSrc) return <p className="text-center text-gray-600">No video available.</p>;

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
          title="Property Video"
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
