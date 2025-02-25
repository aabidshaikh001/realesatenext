"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Droplet,
  Dumbbell,
  Building,
  ShieldCheck,
  ParkingSquare,
  Home,
  Dog,
  Sun,
  Key,
  Coffee,
  Mountain,
  TreePine,
  Snowflake,
  BatteryCharging,
} from "lucide-react";

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

// Mapping of amenity names to their respective icons
const iconMapping: Record<string, React.ReactNode> = {
  "Swimming Pool": <Droplet className="h-5 w-5 text-red-500 mr-2" />,
  "Gym": <Dumbbell className="h-5 w-5 text-red-500 mr-2" />,
  "Parking": <ParkingSquare className="h-5 w-5 text-red-500 mr-2" />,
  "Rooftop Terrace": <Building className="h-5 w-5 text-red-500 mr-2" />,
  "24/7 Security": <ShieldCheck className="h-5 w-5 text-red-500 mr-2" />,
  "Smart Home Technology": <Home className="h-5 w-5 text-red-500 mr-2" />,
  "Pet-Friendly": <Dog className="h-5 w-5 text-red-500 mr-2" />,
  "Private Beach Access": <Sun className="h-5 w-5 text-red-500 mr-2" />,
  "Luxury Spa": <Coffee className="h-5 w-5 text-red-500 mr-2" />,
  "Club House": <Building className="h-5 w-5 text-red-500 mr-2" />,
  "24/7 Concierge": <Key className="h-5 w-5 text-red-500 mr-2" />,
  "Mountain View Balcony": <Mountain className="h-5 w-5 text-red-500 mr-2" />,
  "Hiking Trails": <TreePine className="h-5 w-5 text-red-500 mr-2" />,
  "Eco-Friendly Architecture": <Building className="h-5 w-5 text-red-500 mr-2" />,
  "Solar Power": <BatteryCharging className="h-5 w-5 text-red-500 mr-2" />,
  "Winter Sports Facilities": <Snowflake className="h-5 w-5 text-red-500 mr-2" />,
  "Free WiFi": <FaWifi className="h-5 w-5 text-red-500 mr-2" />,
  "Shopping Mall": <FaShoppingCart className="h-5 w-5 text-red-500 mr-2" />,
  "Car Rental": <FaCar className="h-5 w-5 text-red-500 mr-2" />,
  "Bike Rental": <FaBicycle className="h-5 w-5 text-red-500 mr-2" />,
  "Public Transport Nearby": <FaBus className="h-5 w-5 text-red-500 mr-2" />,
  "Subway Access": <FaSubway className="h-5 w-5 text-red-500 mr-2" />,
  "Train Station Nearby": <FaTrain className="h-5 w-5 text-red-500 mr-2" />,
  "Airport Access": <FaPlane className="h-5 w-5 text-red-500 mr-2" />,
  "Cruise Terminal": <FaShip className="h-5 w-5 text-red-500 mr-2" />,
  "Taxi Service": <FaTaxi className="h-5 w-5 text-red-500 mr-2" />,
  "Fire Safety": <FaFireExtinguisher className="h-5 w-5 text-red-500 mr-2" />,
  "First Aid Service": <FaFirstAid className="h-5 w-5 text-red-500 mr-2" />,
  "Drinking Water Supply": <FaHandHoldingWater className="h-5 w-5 text-red-500 mr-2" />,
  "EV Charging Station": <FaChargingStation className="h-5 w-5 text-red-500 mr-2" />,
  "Energy Saving Lights": <FaLightbulb className="h-5 w-5 text-red-500 mr-2" />,
  "Safe Neighborhood": <FaUserShield className="h-5 w-5 text-red-500 mr-2" />,
  "Power Backup": <FaBolt className="h-5 w-5 text-red-500 mr-2" />,
  "Beachfront Property": <FaUmbrellaBeach className="h-5 w-5 text-red-500 mr-2" />,
  "Library": <FaBookOpen className="h-5 w-5 text-red-500 mr-2" />,
  "Movie Theater": <FaFilm className="h-5 w-5 text-red-500 mr-2" />,
  "Gaming Zone": <FaGamepad className="h-5 w-5 text-red-500 mr-2" />,
  "Music Lounge": <FaMusic className="h-5 w-5 text-red-500 mr-2" />,
  "Art Gallery": <FaPaintBrush className="h-5 w-5 text-red-500 mr-2" />,
  "Tech Hub": <FaLaptopCode className="h-5 w-5 text-red-500 mr-2" />,
  "Fast Food Court": <FaPizzaSlice className="h-5 w-5 text-red-500 mr-2" />,
  "Brewery": <FaBeer className="h-5 w-5 text-red-500 mr-2" />,
  "Cocktail Bar": <FaCocktail className="h-5 w-5 text-red-500 mr-2" />,
  "Football Field": <FaFootballBall className="h-5 w-5 text-red-500 mr-2" />,
  "Basketball Court": <FaBasketballBall className="h-5 w-5 text-red-500 mr-2" />,
  "Tennis Court": <FaTableTennis className="h-5 w-5 text-red-500 mr-2" />,
  "Eco Park": <FaLeaf className="h-5 w-5 text-red-500 mr-2" />,
};
export default function Amenities() {
  const params = useParams();
  const id = params.id as string;
  const [amenities, setAmenities] = useState<{ name: string; icon: React.ReactNode }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAmenities() {
      try {
        const response = await fetch(`https://realestateapi-x9de.onrender.com/api/properties/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch amenities.");
        }
        const data = await response.json();

        // Log the fetched data to see its structure
        console.log("Fetched data:", data);

        // Parse the amenitiesName string into an array
        const fixDoubleEncodedJSON = (value: any) => 
          typeof value === "string" ? JSON.parse(JSON.parse(value)) : value;
        
        const amenitiesArray = fixDoubleEncodedJSON(data.amenitiesName);
        

        // Ensure the parsed data is an array
        if (Array.isArray(amenitiesArray)) {
          // Map over the amenities and set both name and icon
          const amenitiesWithIcons = amenitiesArray.map((name) => {
            return {
              name,
              icon: iconMapping[name] || <span>No icon available</span>, // Provide a fallback if no icon is found
            };
          });

          setAmenities(amenitiesWithIcons); // Set the state with the array of objects
        } else {
          throw new Error("Parsed data is not an array.");
        }
      } catch (error) {
        setError("Could not fetch amenities. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchAmenities();
  }, [id]);

  // Fallback if loading or error occurred
  if (loading) {
    return <div>Loading amenities...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section bg-white rounded-lg shadow-lg max-w-6xl mx-auto p-4 space-y-8 lg:mt-44"
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
