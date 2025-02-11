"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";

// Define project details data for different properties
const projectDetailsData: Record<
  string,
  { label: string; value: string }[]
> = {
  "1": [
    { label: "Developer", value: "LuxeRealty Developers" },
    { label: "Architect", value: "John Smith & Associates" },
    { label: "Total Units", value: "50" },
    { label: "Property Type", value: "Residential" },
    { label: "Year Built", value: "2022" },
    { label: "Status", value: "Ready to Move" },
  ],
  "2": [
    { label: "Developer", value: "Skyline Builders" },
    { label: "Architect", value: "Michael Lee Designs" },
    { label: "Total Units", value: "120" },
    { label: "Property Type", value: "Luxury Villas" },
    { label: "Year Built", value: "2023" },
    { label: "Status", value: "Under Construction" },
  ],
  "3": [
    { label: "Developer", value: "GreenHorizon Estates" },
    { label: "Architect", value: "EcoDesign Studios" },
    { label: "Total Units", value: "80" },
    { label: "Property Type", value: "Eco-Friendly Homes" },
    { label: "Year Built", value: "2021" },
    { label: "Status", value: "Available" },
  ],
};

export default function ProjectDetails() {
  const params = useParams();
  const id = params.id as string; // Convert ID to string
  const projectDetails = projectDetailsData[id] || projectDetailsData["1"]; // Default to ID 1 if invalid

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section bg-white rounded-lg shadow-lg max-w-6xl mx-auto p-4 space-y-8"
    >
      <h2 className="text-2xl font-bold mb-4">Project Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projectDetails.map((detail, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex justify-between"
          >
            <span className="font-semibold">{detail.label}</span>
            <span className="text-gray-600">{detail.value}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
