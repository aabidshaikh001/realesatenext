"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";

const mapData: Record<string, string> = {
  "1": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1758.1216101840746!2d79.42576950874726!3d28.368385392206713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDIxJzA2LjIiTiA3OcKwMjUnMzAuNyJF!5e0!3m2!1sen!2sin!4v1678375375837!5m2!1sen!2sin",
  "2": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23414.634580177582!2d-118.7798!3d34.0259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1678375375837",
  "3": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3125.477516761029!2d-106.8175!3d39.1911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1678375375837",
};

export default function MapComponent() {
  const params = useParams();
  const id = params.id as string;
  const googleMapUrl = mapData[id] || mapData["1"]; // Default to ID "1" if invalid

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section bg-white rounded-lg shadow-lg max-w-6xl mx-auto p-4 space-y-8"
    >
      <h2 className="text-2xl font-bold mb-4">Map</h2>
      <div className="rounded-lg overflow-hidden">
        <iframe
          src={googleMapUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </motion.section>
  );
}
