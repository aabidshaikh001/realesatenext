"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";

const localityData: Record<number, { description: string; features: { name: string; distance: string }[] }> = {
  1: {
    description:
      "This penthouse is located in an upscale area with excellent schools, luxury shopping centers, and fine dining options. The neighborhood is known for its security and greenery.",
    features: [
      { name: "Elite Schools", distance: "0.3 miles" },
      { name: "Luxury Shopping Malls", distance: "0.8 miles" },
      { name: "Private Hospitals", distance: "1.5 miles" },
      { name: "Recreational Parks", distance: "0.2 miles" },
      { name: "Metro Station", distance: "0.1 miles" },
      { name: "Fine Dining Restaurants", distance: "0.4 miles" },
    ],
  },
  2: {
    description:
      "The beachfront villa is situated in a prime coastal neighborhood, offering quick access to pristine beaches, high-end resorts, and yacht clubs.",
    features: [
      { name: "Beach Access", distance: "0.1 miles" },
      { name: "Luxury Resorts", distance: "0.5 miles" },
      { name: "Marine Hospital", distance: "2 miles" },
      { name: "Water Sports Club", distance: "0.3 miles" },
      { name: "Public Transport", distance: "0.5 miles" },
      { name: "Seafood Restaurants", distance: "0.2 miles" },
    ],
  },
  3: {
    description:
      "Nestled in the heart of the mountains, this retreat offers breathtaking views, access to ski resorts, and serene hiking trails.",
    features: [
      { name: "Ski Resorts", distance: "1.2 miles" },
      { name: "Mountain View Restaurants", distance: "0.7 miles" },
      { name: "Medical Clinic", distance: "2.5 miles" },
      { name: "Hiking Trails", distance: "0.1 miles" },
      { name: "Public Transport", distance: "0.6 miles" },
      { name: "Local Markets", distance: "1 mile" },
    ],
  },
};

export default function AboutLocality() {
  const params = useParams();
  const id = Number(params.id); // Convert string ID to number
  const locality = localityData[id] || localityData[1]; // Default to ID 1 if invalid


  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section bg-white rounded-lg shadow-lg max-w-6xl mx-auto p-4 space-y-8"
    >
      <h2 className="text-2xl font-bold mb-4">About Locality</h2>
      <p className="text-gray-600 mb-4">{locality.description}</p>
      <h3 className="text-xl font-semibold mb-2">Nearby Amenities</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {locality.features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <span className="font-semibold">{feature.name}</span>
            <span className="text-gray-600">{feature.distance}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
