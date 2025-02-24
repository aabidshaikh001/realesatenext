"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Bed, Bath, ChevronDown, ChevronUp } from "lucide-react";

type FloorPlan = {
  name: string;
  image: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
};

export default function FloorPlanAndUnits() {
   const params = useParams();
  const id = params?.id ? Number(params.id) : null;  

  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number>(0); // Initially expand first item

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        // Replace with actual API endpoint
        const response = await fetch(`http://localhost:5000/api/properties/${id}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();

        // Map API data to FloorPlan format
        if (data) {
          const floorPlanData: FloorPlan[] = [
            {
              name: data.floorPlanName,
              image: data.floorPlanImage,
              area: data.floorPlanArea,
              bedrooms: data.floorPlanBedrooms,
              bathrooms: data.floorPlanBathrooms,
            },
          ];
          setFloorPlans(floorPlanData);
        }
      } catch (err) {
        setError("Error fetching floor plans.");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Loading floor plans...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (floorPlans.length === 0)
    return <p className="text-center text-gray-600">No floor plans available.</p>;

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? -1 : id); // Collapse if already expanded, otherwise expand
  };

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
