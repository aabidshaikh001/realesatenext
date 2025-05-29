"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Droplet, Dumbbell, Building, ShieldCheck, ParkingSquare, Home, Dog, Sun, Key, Coffee, Mountain, TreePine, Snowflake, BatteryCharging, AlertCircle } from 'lucide-react';

import {
  FaWifi,
  FaShoppingCart,
  FaCar,
  FaBicycle,
  FaBus,
  FaSubway,
  FaTrain,
  FaPlane,
  FaShip,
  FaTaxi,
  FaFireExtinguisher,
  FaFirstAid,
  FaHandHoldingWater,
  FaChargingStation,
  FaLightbulb,
  FaUserShield,
  FaBolt,
  FaUmbrellaBeach,
  FaBookOpen,
  FaFilm,
  FaGamepad,
  FaMusic,
  FaPaintBrush,
  FaLaptopCode,
  FaPizzaSlice,
  FaBeer,
  FaCocktail,
  FaBasketballBall,
  FaFootballBall,
  FaTableTennis,
  FaLeaf,
} from "react-icons/fa";

// Define the amenity type
interface Amenity {
  id: number;
  label: string;
  icon: string;
}

// Mapping of amenity names to their respective icons
const iconMapping: Record<string, React.ReactNode> = {
  "Swimming Pool": <Droplet className="h-5 w-5 text-red-500" />,
  "Gym": <Dumbbell className="h-5 w-5 text-red-500" />,
  "Parking": <ParkingSquare className="h-5 w-5 text-red-500" />,
  "Rooftop Terrace": <Building className="h-5 w-5 text-red-500" />,
  "24/7 Security": <ShieldCheck className="h-5 w-5 text-red-500" />,
  "Smart Home Technology": <Home className="h-5 w-5 text-red-500" />,
  "Pet-Friendly": <Dog className="h-5 w-5 text-red-500" />,
  "Private Beach Access": <Sun className="h-5 w-5 text-red-500" />,
  "Luxury Spa": <Coffee className="h-5 w-5 text-red-500" />,
  "Club House": <Building className="h-5 w-5 text-red-500" />,
  "24/7 Concierge": <Key className="h-5 w-5 text-red-500" />,
  "Mountain View Balcony": <Mountain className="h-5 w-5 text-red-500" />,
  "Hiking Trails": <TreePine className="h-5 w-5 text-red-500" />,
  "Eco-Friendly Architecture": <Building className="h-5 w-5 text-red-500" />,
  "Solar Power": <BatteryCharging className="h-5 w-5 text-red-500" />,
  "Winter Sports Facilities": <Snowflake className="h-5 w-5 text-red-500" />,
  "Free WiFi": <FaWifi className="h-5 w-5 text-red-500" />,
  "Shopping Mall": <FaShoppingCart className="h-5 w-5 text-red-500" />,
  "Car Rental": <FaCar className="h-5 w-5 text-red-500" />,
  "Bike Rental": <FaBicycle className="h-5 w-5 text-red-500" />,
  "Public Transport Nearby": <FaBus className="h-5 w-5 text-red-500" />,
  "Subway Access": <FaSubway className="h-5 w-5 text-red-500" />,
  "Train Station Nearby": <FaTrain className="h-5 w-5 text-red-500" />,
  "Airport Access": <FaPlane className="h-5 w-5 text-red-500" />,
  "Cruise Terminal": <FaShip className="h-5 w-5 text-red-500" />,
  "Taxi Service": <FaTaxi className="h-5 w-5 text-red-500" />,
  "Fire Safety": <FaFireExtinguisher className="h-5 w-5 text-red-500" />,
  "First Aid Service": <FaFirstAid className="h-5 w-5 text-red-500" />,
  "Drinking Water Supply": <FaHandHoldingWater className="h-5 w-5 text-red-500" />,
  "EV Charging Station": <FaChargingStation className="h-5 w-5 text-red-500" />,
  "Energy Saving Lights": <FaLightbulb className="h-5 w-5 text-red-500" />,
  "Safe Neighborhood": <FaUserShield className="h-5 w-5 text-red-500" />,
  "Power Backup": <FaBolt className="h-5 w-5 text-red-500" />,
  "Beachfront Property": <FaUmbrellaBeach className="h-5 w-5 text-red-500" />,
  "Library": <FaBookOpen className="h-5 w-5 text-red-500" />,
  "Movie Theater": <FaFilm className="h-5 w-5 text-red-500" />,
  "Gaming Zone": <FaGamepad className="h-5 w-5 text-red-500" />,
  "Music Lounge": <FaMusic className="h-5 w-5 text-red-500" />,
  "Art Gallery": <FaPaintBrush className="h-5 w-5 text-red-500" />,
  "Tech Hub": <FaLaptopCode className="h-5 w-5 text-red-500" />,
  "Fast Food Court": <FaPizzaSlice className="h-5 w-5 text-red-500" />,
  "Brewery": <FaBeer className="h-5 w-5 text-red-500" />,
  "Cocktail Bar": <FaCocktail className="h-5 w-5 text-red-500" />,
  "Football Field": <FaFootballBall className="h-5 w-5 text-red-500" />,
  "Basketball Court": <FaBasketballBall className="h-5 w-5 text-red-500" />,
  "Tennis Court": <FaTableTennis className="h-5 w-5 text-red-500" />,
  "Eco Park": <FaLeaf className="h-5 w-5 text-red-500" />,
};

// Custom image icon component with loading and error states
const ImageIcon = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <AlertCircle className="h-5 w-5 text-red-500" />;
  }

  return (
    <div className="relative h-5 w-5 mr-2">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-3 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
        </div>
      )}
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={`h-5 w-5 object-contain ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default function Amenities() {
  const params = useParams();
  const id = params.id as string;
  const [amenities, setAmenities] = useState<{ id: number; label: string; icon: React.ReactNode }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAmenities() {
      try {
        const response = await fetch(`http://localhost:5000/api/amenities/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch amenities.");
        }
  
        const fetchedAmenities = await response.json();
  
        if (Array.isArray(fetchedAmenities)) {
          const amenitiesWithIcons = fetchedAmenities.map((a: Amenity) => ({
            id: a.id,
            label: a.label,
            icon: iconMapping[a.label] || 
                  (a.icon && a.icon.startsWith("http") ? (
                    <ImageIcon src={a.icon || "/placeholder.svg"} alt={a.label} />
                  ) : (
                    <span className="text-xl mr-2 text-red-500">{a.icon || "•"}</span>
                  )),
          }));
          
          setAmenities(amenitiesWithIcons);
        } else {
          throw new Error("Amenities data is not an array.");
        }
      } catch (error) {
        console.error("Error fetching amenities:", error);
        setError("Could not fetch amenities. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  
    fetchAmenities();
  }, [id]);

  // Loading state with skeleton UI
  if (loading) {
    return (
      <section className="bg-white rounded-lg shadow-lg max-w-6xl mx-auto p-4 space-y-8 lg:mt-44">
        <h2 className="text-2xl font-bold mb-4">Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex items-center">
              <div className="h-5 w-5 mr-2 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <div></div>
    );
  }

  // Empty state
  if (amenities.length === 0) {
    return (
      <section className="bg-white rounded-lg shadow-lg max-w-6xl mx-auto p-4 space-y-8 lg:mt-44">
        <h2 className="text-2xl font-bold mb-4">Amenities</h2>
        <p className="text-center text-gray-500">No amenities available for this property.</p>
      </section>
    );
  }

  return (
  <div className="space-y-4 px-4 bg-white rounded-lg shadow-lg p-6 lg:mt-44">
      <h2 className="text-2xl font-bold mb-4">Amenities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {amenities.map((amenity, index) => (
          <motion.div
            key={amenity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            <div className="mr-2 flex-shrink-0">
              {amenity.icon}
            </div>
            <span className="text-sm md:text-base">{amenity.label}</span>
          </motion.div>
        ))}
      </div>
  </div>
  );
}
