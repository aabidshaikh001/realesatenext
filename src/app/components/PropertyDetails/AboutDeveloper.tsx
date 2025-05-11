"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface DeveloperData {
  developerName: string;
  developerDescription: string;
  developerAwards: string[];
  developerImage: string;
}

export default function AboutDeveloper() {
  const params = useParams();
  const propertyId = params?.id as string;

  const [developer, setDeveloper] = useState<DeveloperData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId) return;

    async function fetchDeveloper() {
      try {
        const response = await fetch(`http://localhost:5000/api/aboutdeveloper/${propertyId}`);
        if (!response.ok) throw new Error("Developer not found");

        const data = await response.json();
        setDeveloper(data);
      } catch (err) {
        console.error("Error fetching developer details:", err);
        setError("Failed to load developer details.");
      } finally {
        setLoading(false);
      }
    }

    fetchDeveloper();
  }, [propertyId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading developer details...</p>;
  }

  if (error || !developer) {
    return <p className="text-center text-red-500">{error || "Developer not found."}</p>;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section bg-white rounded-lg shadow-lg max-w-6xl mx-auto p-4 space-y-8"
    >
      <h2 className="text-2xl font-bold mb-4">About Developer</h2>

      <div className="flex flex-col md:flex-row items-center md:items-start">
        {/* Developer Image */}
        <div className="md:w-1/3 mb-4 md:mb-0 md:pr-4">
          <Image
            src={developer.developerImage}
            alt={`${developer.developerName} Logo`}
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>

        {/* Developer Info */}
        <div className="md:w-2/3">
          <h3 className="text-xl font-semibold mb-2">{developer.developerName}</h3>
          <p className="text-gray-600 mb-4">{developer.developerDescription}</p>

          <h4 className="text-lg font-semibold mt-4">Awards & Recognitions:</h4>
          <ul className="list-disc list-inside text-gray-600">
            {developer.developerAwards?.length > 0 ? (
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
