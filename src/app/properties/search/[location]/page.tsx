"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const properties = [
  // Buy Properties
  {
    id: 1,
    title: "Luxury Penthouse",
    price: "₹2.50 Cr",
    location: "Jaipur",
    type: "Flat",
    status: "Ready to move",
    propertyFor: "buy",
    image: "https://wallpapercat.com/w/full/6/8/e/743660-3840x2160-desktop-4k-house-wallpaper-photo.jpg",
    bedrooms: 3,
    bathrooms: 2.5,
    area: "2,500 sqft",
  },
  {
    id: 2,
    title: "Beachfront Villa",
    price: "₹3.80 Cr",
    location: "Kota",
    type: "Residential Plot",
    status: "New Projects",
    propertyFor: "buy",
    image: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyaminmellish-186077.jpg&fm=jpg",
    bedrooms: 4,
    bathrooms: 3,
    area: "3,500 sqft",
  },
  {
    id: 3,
    title: "Modern Mansion",
    price: "₹12.00 Cr",
    location: "Jodhpur",
    type: "Mansion",
    status: "Premium",
    propertyFor: "buy",
    image: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyaminmellish-186077.jpg&fm=jpg",
    bedrooms: 6,
    bathrooms: 5,
    area: "7,000 sqft",
  },
  {
    id: 4,
    title: "Family House",
    price: "₹5.50 Cr",
    location: "Pushkar",
    type: "House",
    status: "Budget",
    propertyFor: "buy",
    image: "https://wallpapers.com/images/featured/beautiful-house-x1yu28g8twzle26l.jpg",
    bedrooms: 5,
    bathrooms: 4,
    area: "4,000 sqft",
  },
  {
    id: 5,
    title: "Commercial Space",
    price: "₹10.00 Cr",
    location: "Ajmer",
    type: "Commercial Space",
    status: "Elite",
    propertyFor: "buy",
    image: "https://wallpapercat.com/w/full/6/8/e/743660-3840x2160-desktop-4k-house-wallpaper-photo.jpg",
    bedrooms: 0,
    bathrooms: 2,
    area: "5,500 sqft",
  },
  {
    id: 6,
    title: "Commercial Plot",
    price: "₹15.00 Cr",
    location: "Indore",
    type: "Commercial Plot",
    status: "Rental Income",
    propertyFor: "buy",
    image: "https://wallpapercat.com/w/full/6/8/e/743660-3840x2160-desktop-4k-house-wallpaper-photo.jpg",
    bedrooms: 0,
    bathrooms: 0,
    area: "10,000 sqft",
  },
  {
    id: 7,
    title: "Modern Office",
    price: "₹8.00 Cr",
    location: "Udaipur",
    type: "Office",
    status: "Under Construction",
    propertyFor: "buy",
    image: "https://wallpapercat.com/w/full/6/8/e/743660-3840x2160-desktop-4k-house-wallpaper-photo.jpg",
    bedrooms: 0,
    bathrooms: 3,
    area: "6,000 sqft",
  },

  // Rent Properties
  {
    id: 8,
    title: "City Apartment",
    price: "₹50,000/month",
    location: "Jaipur",
    type: "Flat",
    status: "Full-Furnished",
    propertyFor: "rent",
    image: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyaminmellish-186077.jpg&fm=jpg",
    bedrooms: 2,
    bathrooms: 1.5,
    area: "1,200 sqft",
  },
  {
    id: 9,
    title: "Luxury Villa",
    price: "₹1.20 Lakh/month",
    location: "Udaipur",
    type: "Villa",
    status: "Semi-Furnished",
    propertyFor: "rent",
    image: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyaminmellish-186077.jpg&fm=jpg",
    bedrooms: 4,
    bathrooms: 3,
    area: "3,500 sqft",
  },
  {
    id: 10,
    title: "Shared House",
    price: "₹30,000/month",
    location: "Pushkar",
    type: "House",
    status: "Un-Furnished",
    propertyFor: "rent",
    image: "https://wallpapers.com/images/featured/beautiful-house-x1yu28g8twzle26l.jpg",
    bedrooms: 3,
    bathrooms: 2,
    area: "1,800 sqft",
  },
  {
    id: 11,
    title: "PG for Boys",
    price: "₹10,000/month",
    location: "Ajmer",
    type: "PG",
    status: "Immediate Available",
    propertyFor: "rent",
    image: "https://wallpapers.com/images/featured/beautiful-house-x1yu28g8twzle26l.jpg",
    bedrooms: 1,
    bathrooms: 1,
    area: "300 sqft",
  },
  {
    id: 12,
    title: "Hostel - Girls",
    price: "₹8,000/month",
    location: "Indore",
    type: "Hostel - Girls",
    status: "Bachelor Friendly",
    propertyFor: "rent",
    image: "https://wallpapers.com/images/featured/beautiful-house-x1yu28g8twzle26l.jpg",
    bedrooms: 1,
    bathrooms: 1,
    area: "250 sqft",
  },
  {
    id: 13,
    title: "Hostel - Boys",
    price: "₹7,000/month",
    location: "Kota",
    type: "Hostel - Boys",
    status: "Couple Friendly",
    propertyFor: "rent",
    image: "https://wallpapers.com/images/featured/beautiful-house-x1yu28g8twzle26l.jpg",
    bedrooms: 1,
    bathrooms: 1,
    area: "300 sqft",
  },
  {
    id: 14,
    title: "Co-Working Space",
    price: "₹20,000/month",
    location: "Hyderabad",
    type: "Co-working Space",
    status: "Immediate Available",
    propertyFor: "rent",
    image: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyaminmellish-186077.jpg&fm=jpg",
    bedrooms: 0,
    bathrooms: 2,
    area: "2,000 sqft",
  },
  {
    id: 15,
    title: "Office Space",
    price: "₹1.50 Lakh/month",
    location: "Jaipur",
    type: "Office Space",
    status: "Available",
    propertyFor: "rent",
    image: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyaminmellish-186077.jpg&fm=jpg",
    bedrooms: 0,
    bathrooms: 3,
    area: "3,000 sqft",
  },
];

export default function SearchResults() {
  const params = useParams();
  const searchParams = useSearchParams();

  const locationParam = params?.location || ""; // Ensure it's a string
  const safeLocationParam = Array.isArray(locationParam) ? locationParam[0] : locationParam; // Handle array case
  const decodedLocation = decodeURIComponent(safeLocationParam).toLowerCase().trim(); // Decode and normalize
  const searchWords = decodedLocation.split(" ").filter(word => word.length > 0); // Split by spaces for partial matches
  
  const typeQuery = searchParams.get("type") || ""; // Ensure it's a string
  const statusQuery = searchParams.get("status") || ""; // Ensure it's a string
  const propertyForQuery = searchParams.get("propertyFor") || ""; // Ensure it's a string
  
  // 🔹 Filter properties based on user-selected filters
  const filteredProperties = properties.filter((property) => {
    const propertyLocation = property.location.toLowerCase().trim();
    const propertyType = property.type.toLowerCase().replace(/\s+/g, "-");  // Normalize type
    const propertyStatus = property.status.toLowerCase().replace(/\s+/g, "-");  // Normalize status
    const propertyFor = property.propertyFor.toLowerCase();
  
    // 🔹 Check if any search word is in the property location
    const matchesLocation = searchWords.some((word) => propertyLocation.includes(word));
    
    const matchesType = typeQuery ? propertyType === typeQuery.toLowerCase().trim() : true;
    const matchesStatus = statusQuery ? propertyStatus === statusQuery.toLowerCase().trim() : true;
    const matchesPropertyFor = propertyForQuery ? propertyFor === propertyForQuery.toLowerCase().trim() : true;
  
    return matchesLocation && matchesType && matchesStatus && matchesPropertyFor;
  });
  
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 p-6 py-12 lg:px-2 mt-7 lg:mt-0"
    >
      <h2 className="text-3xl font-bold mb-6">
        Search Results for: <span className="text-blue-600 text-2xl">"{locationParam}"</span>
      </h2>
      {filteredProperties.length === 0 ? (
        <p className="text-gray-600 text-lg">No properties found for "{locationParam}". Try a different search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
