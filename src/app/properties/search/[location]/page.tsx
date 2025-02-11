"use client";

import { useParams, useSearchParams  } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

// Sample property data
const properties = [
    {
      id: 1,
      title: "Luxury Penthouse",
      price: "₹2.50 Cr",
      location: "Jaipur",
      type: "Flat/Apartment",
      status: "Ready to Move",
      postedBy: "Owner",
      budget: "high",
      propertyFor: "rent",
      image: "/placeholder.svg",
      bedrooms: 3,
      bathrooms: 2.5,
      area: "2,500 sqft",
    },
    {
      id: 2,
      title: "Beachfront Villa",
      price: "₹3.80 Cr",
      location: "Malibu",
      type: "Independent House/Villa",
      status: "Under Construction",
      postedBy: "Agent",
      budget: "high",
      propertyFor: "buy",
      image: "/placeholder.svg",
      bedrooms: 4,
      bathrooms: 3,
      area: "3,500 sqft",
    },
    {
      id: 3,
      title: "City Apartment (For Rent)",
      price: "₹50,000/month",
      location: "Jaipur",
      type: "Flat/Apartment",
      status: "Available",
      postedBy: "Builder",
      budget: "medium",
      propertyFor: "rent",
      image: "/placeholder.svg",
      bedrooms: 2,
      bathrooms: 1.5,
      area: "1,200 sqft",
    },
    {
      id: 3,
      title: "City Apartment (For Rent)",
      price: "₹50,000/month",
      location: "Kota",
      type: "Flat/Apartment",
      status: "Available",
      postedBy: "Builder",
      budget: "medium",
      propertyFor: "rent",
      image: "/placeholder.svg",
      bedrooms: 2,
      bathrooms: 1.5,
      area: "1,200 sqft",
    },
  ];
  
export default function SearchResults() {
    const params = useParams();
  const searchParams = useSearchParams();

  console.log("Params object:", params); // Debugging line
  const locationParam = params?.location; // Extract location safely

  // Ensure location is always a string
  const location = Array.isArray(locationParam)
    ? decodeURIComponent(locationParam[0]).toLowerCase().trim()
    : decodeURIComponent(locationParam || "").toLowerCase().trim();  

   // Extract filters from URL query
   const selectedPropertyTypes = searchParams.get("propertyTypes") 
     ? searchParams.get("propertyTypes")!.split(",") 
     : [];
  const selectedBudget = searchParams.get("budget");
  const selectedStatus = searchParams.get("constructionStatus");
  const selectedPostedBy = searchParams.get("postedBy");
  const selectedPropertyFor = searchParams.get("propertyFor"); // "buy" or "rent"

  // 🔹 Filter properties based on user-selected filters
  const filteredProperties = properties.filter((property) => {
    const propertyLocation = property.location.toLowerCase().trim(); // Normalize stored location
    
 // 🔹 Normalize and clean the user's search input
 const searchWords = location.split(" ").map(word => word.trim()); // Split by space for partial matches

 // 🔹 Check if any word from the search input is in the property location
 const matchesLocation = searchWords.some(word => propertyLocation.includes(word));    const matchesType = selectedPropertyTypes.length === 0 || selectedPropertyTypes.includes(property.type);
    const matchesBudget = !selectedBudget || property.budget === selectedBudget;
    const matchesStatus = !selectedStatus || property.status === selectedStatus;
    const matchesPostedBy = !selectedPostedBy || property.postedBy === selectedPostedBy;
    const matchesPropertyFor = !selectedPropertyFor || property.propertyFor === selectedPropertyFor;

    return matchesLocation && matchesType && matchesBudget && matchesStatus && matchesPostedBy && matchesPropertyFor;
  });
  

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 p-6"
    >
      <h2 className="text-3xl font-bold mb-6">Search Result: <span className="text-blue-600 text-2xl">"{location}"</span></h2>

      {filteredProperties.length === 0 ? (
        <p className="text-gray-600 text-lg">No properties found in "{location}". Try a different location.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-4"
            >
              <img src={property.image} alt={property.title} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-gray-600">{property.location}</p>
              <p className="text-lg font-bold text-red-600">{property.price}</p>
              <p className="text-gray-500 text-sm">
                {property.bedrooms} Beds • {property.bathrooms} Baths • {property.area}
              </p>
              <Link
                href={`/properties/${property.id}`}
                className="mt-2 inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
}
