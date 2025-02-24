"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react"; // Import hooks for API fetching
import { motion } from "framer-motion";

// Define the structure of the fetched data
interface ProjectData {
  projectName: string;
  projectDescription: string;
  projectDetails: string;
}

export default function AboutProject() {
  const params = useParams();
  const id = params.id as string; // Get the project ID from URL params

  const [project, setProject] = useState<ProjectData | null>(null); // Store project data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch project data from API
  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`http://localhost:5000/api/properties/${id}`); // Replace with your API endpoint
        if (!response.ok) throw new Error("Project data not found");

        const data = await response.json();
        setProject(data); // Store the fetched data in the state
      } catch (err) {
        setError("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]); // Refetch data if `id` changes

  // Show loading state while data is being fetched
  if (loading) {
    return <p className="text-center text-gray-500">Loading project details...</p>;
  }

  // Show error message if data can't be fetched or project is not found
  if (error || !project) {
    return <p className="text-center text-red-500">{error || "Project not found."}</p>;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section bg-white rounded-lg shadow-lg max-w-6xl mx-auto p-4 space-y-8"
    >
      <h2 className="text-2xl font-bold mb-4">About Project - {project.projectName}</h2>
      <p className="text-gray-600 mb-4">{project.projectDescription}</p>
      <p className="text-gray-600">{project.projectDetails}</p>
    </motion.section>
  );
}
