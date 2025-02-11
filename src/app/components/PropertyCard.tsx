'use client';

import Image from "next/image";
import { motion } from "framer-motion";

interface PropertyCardProps {
  title: string;
  price: string;
  image: string;
  location: string;
  carpetArea: string;
  status: string;
  floor: string;
}

export default function PropertyCard({ title, price, image, location, carpetArea, status, floor }: PropertyCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-lg shadow-lg overflow-hidden border flex">
      {/* Left Image Section */}
      <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden">
        <Image src={image || "/placeholder.svg"} alt={title} layout="fill" objectFit="cover" className="rounded-l-lg" />
        <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">12+ Photos</div>
      </div>

      {/* Property Details Section */}
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold mb-1 text-blue-700 cursor-pointer hover:underline">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">{location}</p>
        
        {/* Property Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-700 bg-gray-100 p-2 rounded-md">
          <div className="flex flex-col">
            <span className="font-bold">CARPET AREA</span>
            <p>{carpetArea} sqft</p>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">STATUS</span>
            <p>{status}</p>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">FLOOR</span>
            <p>{floor}</p>
          </div>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="bg-blue-50 p-4 flex flex-col items-center justify-center rounded-r-lg min-w-[120px]">
        <p className="text-lg font-bold text-gray-900">{price}</p>
        <p className="text-gray-500 text-xs">₹5,000 per sqft</p>
        <button className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl transition duration-300">
          View Details
        </button>
      </div>
    </motion.div>
  );
}
