"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";

// Define project data with unique IDs
const projectData: Record<string, { name: string; description: string; details: string }> = {
  "1": {
    name: "Skyline Residences",
    description:
      "This luxurious penthouse is part of the prestigious Skyline Residences project, offering unparalleled views of the city skyline and top-notch amenities.",
    details:
      "Skyline Residences features state-of-the-art architecture, sustainable design elements, and a range of lifestyle amenities that set a new standard for urban living.",
  },
  "2": {
    name: "Oceanfront Villas",
    description:
      "Oceanfront Villas is a breathtaking beachfront development that offers stunning views of the sea and a private, tranquil environment.",
    details:
      "Designed with a focus on luxury and privacy, Oceanfront Villas provide modern designs, exclusive amenities, and direct access to pristine beaches.",
  },
  "3": {
    name: "Mountain Retreat",
    description:
      "Nestled in the heart of the mountains, this project offers serene living with panoramic views and access to nature trails.",
    details:
      "Mountain Retreat is perfect for those seeking peace and quiet, featuring eco-friendly designs and breathtaking landscapes.",
  },
};

export default function AboutProject() {
  const params = useParams();
  const id = params.id as string; // Ensure the ID is treated as a string
  const project = projectData[id] || projectData["1"]; // Default to project 1 if the ID is invalid

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section bg-white rounded-lg shadow-lg max-w-6xl mx-auto p-4 space-y-8"
    >
      <h2 className="text-2xl font-bold mb-4">About Project - {project.name}</h2>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <p className="text-gray-600">{project.details}</p>
    </motion.section>
  );
}
