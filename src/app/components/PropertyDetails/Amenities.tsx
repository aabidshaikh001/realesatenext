"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Droplet, // For pool or water-related amenities
  Dumbbell, // For gym/fitness center
  Building, // For rooftop terrace or building-related amenities
  ShieldCheck, // For security
  ParkingSquare, // For parking
  Home, // For smart home technology
  Dog, // For pet-friendly
  Sun, // For beach access or outdoor amenities
  Key, // For concierge or access services
  Coffee, // For spa or relaxation services
  Mountain, // For mountain views
  TreePine, // For nature-related amenities
  Snowflake, // For winter sports
  BatteryCharging, // For solar power
} from "lucide-react";

// Define amenities with their icons
const amenitiesData: Record<string, { name: string; icon: React.ReactNode }[]> = {
  "1": [
    { name: "Swimming Pool", icon: <Droplet className="h-5 w-5 text-red-500 mr-2" /> },
    { name: "Fitness Center", icon: <Dumbbell className="h-5 w-5 text-red-500 mr-2" /> },
    { name: "Rooftop Terrace", icon: <Building className="h-5 w-5 text-red-500 mr-2" /> },
    { name: "24/7 Security", icon: <ShieldCheck className="h-5 w-5 text-red-500 mr-2" /> },
    { name: "Private Parking", icon: <ParkingSquare className="h-5 w-5 text-red-500 mr-2" /> },
    { name: "Smart Home Technology", icon: <Home className="h-5 w-5 text-red-500 mr-2" /> },
    { name: "Pet-Friendly", icon: <Dog className="h-5 w-5 text-red-500 mr-2" /> },
  ],
  "2": [
    { name: "Private Beach Access", icon: <Sun className="h-5 w-5 text-red-500 mr-2" /> },
    { name: "Infinity Pool", icon: <Droplet className="h-5 w-5 text-red-500 mr-2" /> },
    { name: "Luxury Spa", icon: <Coffee className="h-5 w-5 text-red-500 mr-2" /> },
    { name: "24/7 Concierge", icon: <Key className="h-5 w-5 text-red-500 mr-2" /> },
  ],
  "3": [
    { name: "Mountain View Balcony", icon: <Mountain className="h-5 w-5 text-red-500 mr-2" /> },
    { name: "Hiking Trails", icon: <TreePine className="h-5 w-5 text-red-500 mr-2" /> },
    { name: "Eco-Friendly Architecture", icon: <Building className="h-5 w-5 text-red-500 mr-2" /> },
    { name: "Solar Power", icon: <BatteryCharging className="h-5 w-5 text-red-500 mr-2" /> },
    { name: "Winter Sports Facilities", icon: <Snowflake className="h-5 w-5 text-red-500 mr-2" /> },
  ],
};


export default function Amenities() {
  const params = useParams();
  const id = params.id as string;
  const amenities = amenitiesData[id] || amenitiesData["1"]; // Default to ID 1 if invalid

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section bg-white rounded-lg shadow-lg max-w-6xl mx-auto p-4 space-y-8"
    >
      <h2 className="text-2xl font-bold mb-4">Amenities</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {amenities.map((amenity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center"
          >
            {amenity.icon}
            <span>{amenity.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
