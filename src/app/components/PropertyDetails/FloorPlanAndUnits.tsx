"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Bed, Bath, ChevronDown, ChevronUp } from "lucide-react";

interface FloorPlan {
  id: number;
  propertyId: string;
  name: string;
  image: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
}

export default function FloorPlanAndUnits() {
  const params = useParams();
  const propertyId = params?.id as string; // Get the TREC-prop00002-002 ID from URL
  
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchFloorPlans = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `http://localhost:5000/api/floorplan/${propertyId}`
        );

        if (!response.ok) {
          throw new Error(`Failed to load floor plans (${response.status})`);
        }

        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }

        setFloorPlans(data);
        
        // Auto-expand first floor plan if available
        if (data.length > 0) {
          setExpandedId(data[0].id);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to load floor plans");
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchFloorPlans();
    } else {
      setError("Property ID not found");
      setLoading(false);
    }
  }, [propertyId]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Loading floor plans...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading floor plans</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (floorPlans.length === 0) {
    return (
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">No floor plans available</h3>
            <p className="text-sm text-blue-700 mt-1">This property doesn't have any floor plans yet.</p>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Available Floor Plans</h2>
      
      <div className="space-y-4">
        {floorPlans.map((plan) => (
          <div key={plan.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <button
              onClick={() => toggleExpand(plan.id)}
              className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
              aria-expanded={expandedId === plan.id}
            >
              <div className="text-left space-y-1">
                <h3 className="font-medium text-gray-900">{plan.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    {plan.bedrooms} {plan.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    {plan.bathrooms} {plan.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
                  </span>
                  <span>{plan.area}</span>
                </div>
              </div>
              
              {expandedId === plan.id ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            <AnimatePresence>
              {expandedId === plan.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 border-t">
                    <div className="relative aspect-video bg-gray-100 rounded-md overflow-hidden">
                      <Image
                        src={plan.image}
                        alt={`Floor plan for ${plan.name}`}
                        fill
                        className="object-contain"
                        quality={90}
                        priority={expandedId === plan.id}
                      />
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">Bedrooms</p>
                        <p className="font-medium">{plan.bedrooms}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">Bathrooms</p>
                        <p className="font-medium">{plan.bathrooms}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">Area</p>
                        <p className="font-medium">{plan.area}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}