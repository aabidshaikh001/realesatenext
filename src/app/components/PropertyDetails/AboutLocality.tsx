"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as Icons from "react-icons/fa";

interface LocalityData {
  localityDescription: string;
  localityFeatureName: string[];
  localityFeatureDistance: string[];
}

// Icon mapping with type safety
const FEATURE_ICONS: Record<string, keyof typeof Icons> = {
  "School": "FaSchool",
  "Hospital": "FaHospital",
  "Metro": "FaSubway",
  "Park": "FaTree",
  "Parking": "FaCar",
  "Restaurants": "FaConciergeBell",
  "Gym": "FaDumbbell",
  "Shopping Mall": "FaShoppingCart",
  "Public Transport": "FaBus",
  "University": "FaUniversity",
  "Office": "FaBuilding",
  "Workplace": "FaBriefcase",
  "Hotel": "FaHotel",
  "Apartment": "FaBed",
  "Tourist Spot": "FaCamera",
  "Cafe": "FaCoffee",
  "Fire Station": "FaFireExtinguisher",
  "Gas Station": "FaGasPump",
  "Internet": "FaGlobe",
  "Industry": "FaIndustry",
  "Landmark": "FaLandmark",
  "Electricity": "FaLightbulb",
  "Monument": "FaMonument",
  "Motorbike Parking": "FaMotorcycle",
  "Airport": "FaPlane",
  "Port": "FaShip",
  "Train Station": "FaTrain",
  "Logistics": "FaTruck",
  "Restaurant": "FaUtensils",
  "Water Supply": "FaWater",
  "Wine Bar": "FaWineGlass",
  "Wind Energy": "FaWind",
  "WiFi": "FaWifi",
  "Electric Charging": "FaPlug",
  "Medical Clinic": "FaClinicMedical",
  "Pet Friendly": "FaDog",
  "Religious Place": "FaChurch",
  "Home": "FaHome",
  "Security": "FaKey",
  "Doctor's Office": "FaUserMd",
  "Community Center": "FaHandshake",
  "Court": "FaGavel",
  "Retail Store": "FaShoppingBag",
  "Marketplace": "FaStore",
  "Restroom": "FaToilet",
  "Community": "FaUsers",
  "Spiritual Center": "FaVihara",
  "Warehouse": "FaWarehouse",
  "Accessibility": "FaWheelchair",
  "Banking": "FaFileInvoice"
};

// Default color mapping for icons
const ICON_COLORS: Record<string, string> = {
  "FaSchool": "text-red-500",
  "FaHospital": "text-red-500",
  "FaSubway": "text-blue-500",
  "FaTree": "text-green-500",
  "FaCar": "text-gray-800",
  // Add more specific colors as needed
  "default": "text-gray-700"
};

export default function AboutLocality() {
  const params = useParams();
  const id = params?.id as string;

  const [locality, setLocality] = useState<LocalityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const safeParseArray = (value: any): string[] => {
    try {
      if (typeof value === "string") {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [parsed];
      }
      return Array.isArray(value) ? value : [value];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.realestatecompany.co.in/api/aboutlocality/${id}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        
        const data = await res.json();
        
        setLocality({
          localityDescription: data.localityDescription || "No description available",
          localityFeatureName: safeParseArray(data.localityFeatureName),
          localityFeatureDistance: safeParseArray(data.localityFeatureDistance)
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const getFeatureIcon = (featureName: string) => {
    const iconName = FEATURE_ICONS[featureName] || "FaMapMarked";
    const IconComponent = Icons[iconName];
    const colorClass = ICON_COLORS[iconName] || ICON_COLORS.default;
    
    return IconComponent ? (
      <IconComponent className={`mr-2 ${colorClass}`} />
    ) : null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icons.FaExclamationCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!locality) {
    return (
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-sm text-blue-700">No locality data available</p>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg max-w-6xl mx-auto p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">About Locality</h2>
      
      <p className="text-gray-600 mb-6">
        {locality.localityDescription}
      </p>

      <h3 className="text-xl font-semibold mb-4">Nearby Amenities</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {locality.localityFeatureName.map((feature, index) => (
          <motion.div
            key={`${feature}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {getFeatureIcon(feature)}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">{feature}</p>
            </div>
            <span className="text-gray-600 whitespace-nowrap ml-2">
              {locality.localityFeatureDistance[index] || "N/A"}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}