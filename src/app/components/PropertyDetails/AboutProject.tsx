"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Define the structure of the fetched data
interface ProjectData {
  projectName: string;
  projectDescription: string;
  projectDetails: string;
}

export default function AboutProject() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;

  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const res = await fetch(`https://api.realestatecompany.co.in/api/aboutproject/${id}`);
        if (!res.ok) throw new Error("Project data not found");

        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error("❌ Error fetching project data:", err);
        setError("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading project details...</p>;
  }

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
      <p className="text-gray-600 whitespace-pre-line">{project.projectDetails}</p>
    </motion.section>
  );
}
