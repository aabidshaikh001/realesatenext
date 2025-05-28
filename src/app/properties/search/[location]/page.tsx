"use client";

import { useParams, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { motion } from "framer-motion";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SearchResults() {
  const params = useParams();
  const searchParams = useSearchParams();

  const locationParam = params?.location || "";
  const safeLocationParam = Array.isArray(locationParam) ? locationParam[0] : locationParam;
  const formattedPropertyFor = searchParams.get("listingType") || "";
  const formattedType = searchParams.get("type") || "";
  const formattedStatus = searchParams.get("tag") || "";
  const decodedLocation = decodeURIComponent(safeLocationParam).toLowerCase().trim();
  const searchWords = decodedLocation.split(" ").filter((word) => word.length > 0);

  const typeQuery = searchParams.get("type") || "";
  const statusQuery = searchParams.get("status") || "";
  const propertyForQuery = searchParams.get("propertyFor") || "";

  const { data: properties, isLoading, error } = useSWR(
    "https://api.realestatecompany.co.in/api/properties",
    fetcher
  );

  if (isLoading) {
    return <p className="p-6 text-gray-500">Loading properties...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">Failed to load properties.</p>;
  }

  const filteredProperties = properties?.filter((property: any) => {
    const propertyLocation = property.location?.toLowerCase().trim();
    const propertyType = property.type?.toLowerCase().replace(/\s+/g, "-");
    const propertyStatus = property.status?.toLowerCase().replace(/\s+/g, "-");
    const propertyFor = property.propertyFor?.toLowerCase();

    const matchesLocation = searchWords.some((word) => propertyLocation.includes(word));
    const matchesType = typeQuery ? propertyType === typeQuery.toLowerCase().trim() : true;
    const matchesStatus = statusQuery ? propertyStatus === statusQuery.toLowerCase().trim() : true;
    const matchesPropertyFor = propertyForQuery ? propertyFor === propertyForQuery.toLowerCase().trim() : true;

    return matchesLocation && matchesType && matchesStatus && matchesPropertyFor;
  });
  function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, (txt) => txt[0].toUpperCase() + txt.slice(1));
  }
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 p-6 py-12 lg:px-2 mt-7 lg:mt-0"
    >
      <h2 className="text-3xl font-bold mb-6">
        Search Results for:{" "}
        <span className="text-blue-600 text-2xl">
        {decodedLocation && `Location "${toTitleCase(decodedLocation)}"`}

          {formattedPropertyFor && `,Property For "${formattedPropertyFor}"`}
          {formattedType && `, Property Type "${formattedType}"`}
          {formattedStatus && `, Property Status "${formattedStatus}"`}
        </span>
      </h2>
    
      {filteredProperties.length === 0 ? (
        <p className="text-gray-600 text-lg">
          No properties found for "{locationParam}". Try a different search.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property: any) => (
            <motion.div
              key={property.PropertyId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-4"
            >
              <img
               src={(JSON.parse(property.images)[0] || "/fallback.jpg")}
                alt={property.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-gray-600">{property.location}</p>
              <p className="text-lg font-bold text-red-600">{property.price}</p>
              <p className="text-gray-500 text-sm">
  {property.carpetArea}
</p>

              <Link
                href={`/properties/${property.PropertyId}`}
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
