"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ProjectDetail {
  projectDetailLabel: string[] | string;
  projectDetailValue: string[] | string;
}

export default function ProjectDetails() {
  const params = useParams();
  const id = params.id as string;
  const [projectDetails, setProjectDetails] = useState<ProjectDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/properties/${id}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch project details`);
        }
        const data = await response.json();
        
        // Parse stringified arrays
        const parsedData: ProjectDetail = {
          projectDetailLabel: JSON.parse(data.projectDetailLabel),
          projectDetailValue: JSON.parse(data.projectDetailValue),
        };
    
        console.log("Parsed Data:", parsedData);
        setProjectDetails(parsedData);
      } catch (error) {
        console.error("Error fetching project details:", error);
        setError("Failed to load project details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    

    fetchProjectDetails();
  }, [id]);

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="text-center text-gray-500"
      >
        Loading...
      </motion.div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!projectDetails) {
    return <div className="text-center text-gray-500">No project details found.</div>;
  }

  // Helper function to normalize data as arrays
  const ensureArray = (value: string | string[]): string[] => (Array.isArray(value) ? value : [value]);

  const labels = ensureArray(projectDetails?.projectDetailLabel || []);
  const values = ensureArray(projectDetails?.projectDetailValue || []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg max-w-6xl mx-auto p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 text-center">Project Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {labels.length > 0 ? (
          labels.map((label, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex justify-between p-2 border-b"
            >
              <span className="font-semibold text-gray-800">{label}</span>
              <span className="text-gray-600">{values[index] || "N/A"}</span>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-2">No details available.</div>
        )}
      </div>
    </motion.section>
  );
}
