"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react"; // Import hooks for API fetching
import { motion } from "framer-motion";
import { 
  FaSchool, FaHospital, FaSubway, FaTree, FaCar, FaConciergeBell, FaDumbbell, FaShoppingCart, FaBus, 
  FaUniversity, FaBuilding, FaBriefcase, FaBed, FaCamera, FaCoffee, FaFireExtinguisher, FaGasPump, FaGlobe, FaHotel, 
  FaIndustry, FaLandmark, FaLightbulb, FaMonument, FaMotorcycle, FaPlane, FaShip, FaTrain, FaTruck, FaUtensils, 
  FaWater, FaWineGlass, FaWind, FaWifi, FaPlug, FaMapMarked, FaClinicMedical, FaDog, FaChurch, FaHome, FaKey, 
  FaUserMd, FaHandshake, FaGavel, FaShoppingBag, FaStore, FaToilet, FaUsers, FaVihara, FaWarehouse, FaWheelchair, FaFileInvoice 
} from "react-icons/fa"; 

// Define a TypeScript interface for the locality data structure
interface LocalityData {
  localityDescription: string;
  localityFeatureName: string[];
  localityFeatureDistance: string[];
}

export default function AboutLocality() {
  const params = useParams();
  const id = Number(params.id); // Convert string ID to number

  const [locality, setLocality] = useState<LocalityData | null>(null); // Store locality data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const safeParseArray = (value: any) => {
    try {
      if (typeof value === "string") {
        const parsedValue = JSON.parse(value);
        return Array.isArray(parsedValue) ? parsedValue : [parsedValue]; // Ensure it's an array
      }
      return Array.isArray(value) ? value : [value]; // Handle non-string cases
    } catch (error) {
      console.error("JSON Parsing Error:", error, value);
      return []; // Return an empty array to prevent crashes
    }
  };
  
  useEffect(() => {
    async function fetchLocalityData() {
      try {
        const response = await fetch(`http://localhost:5000/api/properties/${id}`);
        if (!response.ok) throw new Error("Locality data not found");
  
        const data = await response.json();
  
        const localityWithParsedData = {
          ...data,
          localityFeatureName: safeParseArray(data.localityFeatureName), // Ensure array
          localityFeatureDistance: safeParseArray(data.localityFeatureDistance), // Ensure array
        };
  
        setLocality(localityWithParsedData);
      } catch (err) {
        console.error("Fetching error:", err);
        setError("Failed to load locality details.");
      } finally {
        setLoading(false);
      }
    }
  
    fetchLocalityData();
  }, [id]);
  

  // Show loading state
  if (loading) {
    return <p className="text-center text-gray-500">Loading locality details...</p>;
  }

  // Show error state
  if (error || !locality) {
    return <p className="text-center text-red-500">{error || "Locality not found."}</p>;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section bg-white rounded-lg shadow-lg max-w-6xl mx-auto p-4 space-y-8"
    >
      <h2 className="text-2xl font-bold mb-4">About Locality</h2>
      <p className="text-gray-600 mb-4">{locality.localityDescription}</p>
      <h3 className="text-xl font-semibold mb-2">Nearby Amenities</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {locality.localityFeatureName.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            {/* Conditionally render icons based on feature */}
{
  feature === "School" && <FaSchool className="mr-2 text-red-500" />
}
{
  feature === "Hospital" && <FaHospital className="mr-2 text-red-500" />
}
{
  feature === "Metro" && <FaSubway className="mr-2 text-red-500" />
}
{
  feature === "Park" && <FaTree className="mr-2 text-green-500" />
}
{
  feature === "Parking" && <FaCar className="mr-2 text-gray-800" />
}
{
  feature === "Restaurants" && <FaConciergeBell className="mr-2 text-red-500" />
}
{
  feature === "Gym" && <FaDumbbell className="mr-2 text-red-500" />
}
{
  feature === "Shopping Mall" && <FaShoppingCart className="mr-2 text-red-500" />
}
{
  feature === "Public Transport" && <FaBus className="mr-2 text-red-500" />
}
{
  feature === "University" && <FaUniversity className="mr-2 text-blue-500" />
}
{
  feature === "Office" && <FaBuilding className="mr-2 text-gray-700" />
}
{
  feature === "Workplace" && <FaBriefcase className="mr-2 text-gray-700" />
}
{
  feature === "Hotel" && <FaHotel className="mr-2 text-yellow-500" />
}
{
  feature === "Apartment" && <FaBed className="mr-2 text-gray-700" />
}
{
  feature === "Tourist Spot" && <FaCamera className="mr-2 text-yellow-500" />
}
{
  feature === "Cafe" && <FaCoffee className="mr-2 text-brown-500" />
}
{
  feature === "Fire Station" && <FaFireExtinguisher className="mr-2 text-red-500" />
}
{
  feature === "Gas Station" && <FaGasPump className="mr-2 text-gray-700" />
}
{
  feature === "Internet" && <FaGlobe className="mr-2 text-blue-500" />
}
{
  feature === "Industry" && <FaIndustry className="mr-2 text-gray-800" />
}
{
  feature === "Landmark" && <FaLandmark className="mr-2 text-gray-800" />
}
{
  feature === "Electricity" && <FaLightbulb className="mr-2 text-yellow-500" />
}
{
  feature === "Monument" && <FaMonument className="mr-2 text-gray-700" />
}
{
  feature === "Motorbike Parking" && <FaMotorcycle className="mr-2 text-gray-800" />
}
{
  feature === "Airport" && <FaPlane className="mr-2 text-blue-500" />
}
{
  feature === "Port" && <FaShip className="mr-2 text-blue-500" />
}
{
  feature === "Train Station" && <FaTrain className="mr-2 text-red-500" />
}
{
  feature === "Logistics" && <FaTruck className="mr-2 text-gray-800" />
}
{
  feature === "Restaurant" && <FaUtensils className="mr-2 text-red-500" />
}
{
  feature === "Water Supply" && <FaWater className="mr-2 text-blue-500" />
}
{
  feature === "Wine Bar" && <FaWineGlass className="mr-2 text-red-500" />
}
{
  feature === "Wind Energy" && <FaWind className="mr-2 text-green-500" />
}
{
  feature === "WiFi" && <FaWifi className="mr-2 text-blue-500" />
}
{
  feature === "Electric Charging" && <FaPlug className="mr-2 text-gray-700" />
}
{
  feature === "Medical Clinic" && <FaClinicMedical className="mr-2 text-green-500" />
}
{
  feature === "Pet Friendly" && <FaDog className="mr-2 text-orange-500" />
}
{
  feature === "Religious Place" && <FaChurch className="mr-2 text-gray-700" />
}
{
  feature === "Home" && <FaHome className="mr-2 text-gray-700" />
}
{
  feature === "Security" && <FaKey className="mr-2 text-gray-800" />
}
{
  feature === "Doctor's Office" && <FaUserMd className="mr-2 text-green-500" />
}
{
  feature === "Community Center" && <FaHandshake className="mr-2 text-gray-700" />
}
{
  feature === "Court" && <FaGavel className="mr-2 text-gray-700" />
}
{
  feature === "Retail Store" && <FaShoppingBag className="mr-2 text-gray-700" />
}
{
  feature === "Marketplace" && <FaStore className="mr-2 text-gray-700" />
}
{
  feature === "Restroom" && <FaToilet className="mr-2 text-gray-700" />
}
{
  feature === "Community" && <FaUsers className="mr-2 text-gray-700" />
}
{
  feature === "Spiritual Center" && <FaVihara className="mr-2 text-gray-700" />
}
{
  feature === "Warehouse" && <FaWarehouse className="mr-2 text-gray-700" />
}
{
  feature === "Accessibility" && <FaWheelchair className="mr-2 text-blue-500" />
}
{
  feature === "Banking" && <FaFileInvoice className="mr-2 text-gray-700" />
}

            
            <span className="font-semibold">{feature}</span>
            <span className="text-gray-600">{locality.localityFeatureDistance[index]}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
