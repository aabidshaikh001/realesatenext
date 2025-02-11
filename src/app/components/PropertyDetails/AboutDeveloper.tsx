"use client"; // To indicate this is a client-side component

import { useParams } from "next/navigation"; // Use the `useParams` hook from Next.js for dynamic routes
import { motion } from "framer-motion"; // For animations
import Image from "next/image"; // For optimized image handling

// Define developers' data with IDs as the key
const developersData: Record<string, Developer>= {
  1: {
    name: "LuxeRealty Developers",
    description:
      "LuxeRealty Developers is a renowned name in the luxury real estate market, known for creating exceptional living spaces that blend sophistication, comfort, and innovation. With over 20 years of experience, we have successfully delivered numerous high-end residential projects across major cities.",
    awards:
      "Our commitment to quality, attention to detail, and focus on customer satisfaction have earned us multiple awards and accolades in the industry.",
    image: "https://iqiglobal.com/blog/wp-content/uploads/2020/12/property-developer-FI.jpg",
  },
  2: {
    name: "Skyline Builders",
    description:
      "Skyline Builders has been a pioneer in high-rise residential and commercial developments. With a focus on modern architecture and sustainable design, we bring world-class living experiences to urban centers.",
    awards:
      "Winner of the Best Real Estate Developer Award 2023, Skyline Builders continues to set benchmarks in real estate innovation.",
    image: "https://iqiglobal.com/blog/wp-content/uploads/2020/12/property-developer-FI.jpg",
  },
  3: {
    name: "GreenHorizon Estates",
    description:
      "GreenHorizon Estates specializes in eco-friendly real estate projects that promote green living. Our sustainable developments are designed with energy-efficient solutions, making them the future of housing.",
    awards:
      "Recognized for excellence in sustainable real estate, GreenHorizon Estates has received numerous green certification awards.",
    image: "https://iqiglobal.com/blog/wp-content/uploads/2020/12/property-developer-FI.jpg",
  },
};
// Define TypeScript interface for developer data
interface Developer {
  name: string;
  description: string;
  awards: string;
  image: string;
}
export default function AboutDeveloper() {
  const params = useParams(); // Get dynamic route parameters
  const id = Number(params.id); // Convert `id` from string to number
  const developer = developersData[id] || developersData[1]; // Fallback to developer with ID 1 if `id` is invalid

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
            src={developer.image} // Dynamic image source
            alt={`${developer.name} Logo`} // Alt text for image
            width={200} // Width of the image
            height={200} // Height of the image
            className="rounded-lg" // Styling class for rounded corners
          />
        </div>

        {/* Developer Info */}
        <div className="md:w-2/3">
          <h3 className="text-xl font-semibold mb-2">{developer.name}</h3>
          <p className="text-gray-600 mb-4">{developer.description}</p>
          <p className="text-gray-600">{developer.awards}</p>
        </div>
      </div>
    </motion.section>
  );
}
