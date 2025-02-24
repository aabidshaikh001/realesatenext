"use client"; // Indicate this is a client-side component

import { useParams } from "next/navigation"; // Hook for dynamic route parameters
import { useState, useEffect } from "react"; // React hooks for API fetching
import { motion } from "framer-motion"; // Animation library
import Image from "next/image"; // Next.js optimized image handling


// Define TypeScript interface for developer data
interface Properites {
  developerName: string;
  developerDescription: string;
  developerAwards: string[];
  developerImage: string;
}

export default function AboutDeveloper() {
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;
  
  const [developer, setDeveloper] = useState<Properites | null>(null); // Store developer data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track errors
  useEffect(() => {
    async function fetchDeveloper() {
      try {
        const response = await fetch(`http://localhost:5000/api/properties/${id}`); // API endpoint
        if (!response.ok) throw new Error("Developer not found");

        const data = await response.json();

        // Parse stringified arrays to actual arrays
        if (data.developerAwards) {
          data.developerAwards = JSON.parse(data.developerAwards); // Parse developerAwards
        }
        // You can add more parsing for other fields like amenities if needed

        console.log(data); // Log to check the structure of the data

        setDeveloper(data);
      } catch (err) {
        setError("Failed to load developer details.");
      } finally {
        setLoading(false);
      }
    }

    fetchDeveloper();
  }, [id]); // Fetch data when `id` changes

   // Show loading state
   if (loading) {
    return <p className="text-center text-gray-500">Loading developer details...</p>;
  }

  // Show error state
  if (error || !developer) {
    return <p className="text-center text-red-500">{error || "Developer not found."}</p>;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // End animation state
      transition={{ duration: 0.5 }} // Animation duration
      className="section bg-white rounded-lg shadow-lg max-w-6xl mx-auto p-4 space-y-8"
    >
      <h2 className="text-2xl font-bold mb-4">About Developer</h2>
      <div className="flex flex-col md:flex-row items-center md:items-start">
        {/* Developer Image */}
        <div className="md:w-1/3 mb-4 md:mb-0 md:pr-4">
          <Image
            src={developer.developerImage} // Dynamic image source
            alt={`${developer.developerName} Logo`} // Alt text for image
            width={200} // Width of the image
            height={200} // Height of the image
            className="rounded-lg" // Styling class for rounded corners
          />
        </div>

        {/* Developer Info */}
        <div className="md:w-2/3">
          <h3 className="text-xl font-semibold mb-2">{developer.developerName}</h3>
          <p className="text-gray-600 mb-4">{developer.developerDescription}</p>
{/* Display awards if available */}
<h4 className="text-lg font-semibold mt-4">Awards & Recognitions:</h4>
<ul className="list-disc list-inside text-gray-600">
  {Array.isArray(developer?.developerAwards) && developer.developerAwards.length > 0 ? (
    developer.developerAwards.map((award, index) => (
      <li key={index}>{award}</li>
    ))
  ) : (
    <li>No awards available.</li>
  )}
</ul>


        </div>
      </div>
    </motion.section>
  );
}
