"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Bed, Bath, ChevronDown, ChevronUp  } from "lucide-react";

type FloorPlan = {
  name: string;
  image: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
};

const propertyFloorPlans: Record<string, FloorPlan[]> = {
  "1": [
    { name: "First Floor", image: "https://i.pinimg.com/736x/f3/f3/a9/f3f3a9db1d5430b2d29490437982aea8.jpg", area: "1,200 sq ft", bedrooms: 2, bathrooms: 2 },
    { name: "Second Floor", image: "https://i.pinimg.com/1200x/40/0f/e4/400fe4dbc3905cf61f0b82b3e0258d3c.jpg", area: "1,500 sq ft", bedrooms: 3, bathrooms: 2 },
  ],
  "2": [
    { name: "First Floor", image: "https://www.maramani.com/cdn/shop/products/ID_13218_-_floor_plan_Maramani.jpg?v=1663322476&width=1800", area: "1,800 sq ft", bedrooms: 4, bathrooms: 3 },
  ],
  "3": [
    { name: "Ground Floor", image: "https://i.pinimg.com/736x/f3/f3/a9/f3f3a9db1d5430b2d29490437982aea8.jpg", area: "1,000 sq ft", bedrooms: 1, bathrooms: 1 },
    { name: "Top Floor", image: "https://i.pinimg.com/1200x/40/0f/e4/400fe4dbc3905cf61f0b82b3e0258d3c.jpg", area: "2,000 sq ft", bedrooms: 5, bathrooms: 4 },
  ],
};

export default function FloorPlanAndUnits() {
  const params = useParams();
  const propertyId = params.id as string;
  const floorPlans = propertyFloorPlans[propertyId] || [];

  // Set the first floor plan as initially expanded
  const [expandedId, setExpandedId] = useState<number>(0);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? -1 : id); // Collapse if already expanded, otherwise expand
  };

  if (floorPlans.length === 0) {
    return <p className="text-center text-gray-600">No floor plans available for this property.</p>;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section bg-white rounded-lg shadow-lg max-w-6xl mx-auto p-4 space-y-8"
    >
      <h2 className="text-2xl font-bold mb-4">Floor Plans</h2>
      <div className="space-y-4">
        {floorPlans.map((plan, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleExpand(index)}
              className="w-full flex justify-between items-center bg-gray-100 px-4 py-3 text-left"
            >
              <span className="font-medium">{plan.name}</span>
              <span className="text-sm flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Bed className="w-4 h-4 text-gray-500" /> {plan.bedrooms} Bedroom
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="w-4 h-4 text-gray-500" /> {plan.bathrooms} Bathroom
                </span>
              </span>
              {expandedId === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-700" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-700" />
                )}
            </button>
            <AnimatePresence>
              {expandedId === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4"
                >
                  <Image
                    src={plan.image}
                    alt={plan.name}
                    width={800}
                    height={600}
                    className="rounded-lg mb-4"
                  />
                  <p className="text-gray-600">Area: {plan.area}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
