"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";


const allSuggestedProperties = [
  {
    id: 1,
    title: "Elegant Townhouse",
    price: "$1,800,000",
    image: "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?cs=srgb&dl=pexels-pixabay-302769.jpg&fm=jpg",
    location: "Brooklyn, NY",
    carpetArea: "2,500 sq ft",
    status: "For Sale",
    floor: "3rd Floor",
  },
  {
    id: 2,
    title: "Waterfront Condo",
    price: "$2,200,000",
    image: "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?cs=srgb&dl=pexels-pixabay-302769.jpg&fm=jpg",
    location: "Miami, FL",
    carpetArea: "1,800 sq ft",
    status: "For Sale",
    floor: "12th Floor",
  },
  {
    id: 3,
    title: "Modern Loft",
    price: "$1,500,000",
    image: "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?cs=srgb&dl=pexels-pixabay-302769.jpg&fm=jpg",
    location: "Chicago, IL",
    carpetArea: "1,600 sq ft",
    status: "For Sale",
    floor: "5th Floor",
  },
  {
    id: 4,
    title: "Luxury Penthouse",
    price: "$3,500,000",
    image: "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?cs=srgb&dl=pexels-pixabay-302769.jpg&fm=jpg",
    location: "Los Angeles, CA",
    carpetArea: "3,200 sq ft",
    status: "For Sale",
    floor: "Penthouse",
  },
  {
    id: 5,
    title: "Historic Brownstone",
    price: "$2,800,000",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfOxroes5Cu2Iq8tjMrEOuLDa07Z2i3Z3Fn_UVuyACL1k2OUjREYrF9EkJ48Nk3LwR7b8&usqp=CAU",
    location: "Boston, MA",
    carpetArea: "3,000 sq ft",
    status: "For Sale",
    floor: "All Floors",
  },
  {
    id: 6,
    title: "Mountain View Cabin",
    price: "$1,200,000",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfOxroes5Cu2Iq8tjMrEOuLDa07Z2i3Z3Fn_UVuyACL1k2OUjREYrF9EkJ48Nk3LwR7b8&usqp=CAU",
    location: "Aspen, CO",
    carpetArea: "1,400 sq ft",
    status: "For Sale",
    floor: "Ground Floor",
  },
  {
    id: 1,
    title: "Elegant Townhouse",
    price: "$1,800,000",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfOxroes5Cu2Iq8tjMrEOuLDa07Z2i3Z3Fn_UVuyACL1k2OUjREYrF9EkJ48Nk3LwR7b8&usqp=CAU",
    location: "Brooklyn, NY",
    carpetArea: "2,500 sq ft",
    status: "For Sale",
    floor: "3rd Floor",
  },
  {
    id: 2,
    title: "Waterfront Condo",
    price: "$2,200,000",
    image: "https://jooinn.com/images/makati-skyscrapers-6.jpg",
    location: "Miami, FL",
    carpetArea: "1,800 sq ft",
    status: "For Sale",
    floor: "12th Floor",
  },
  {
    id: 3,
    title: "Modern Loft",
    price: "$1,500,000",
    image: "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?cs=srgb&dl=pexels-pixabay-302769.jpg&fm=jpg",
    location: "Chicago, IL",
    carpetArea: "1,600 sq ft",
    status: "For Sale",
    floor: "5th Floor",
  },
  {
    id: 4,
    title: "Luxury Penthouse",
    price: "$3,500,000",
    image: "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?cs=srgb&dl=pexels-pixabay-302769.jpg&fm=jpg",
    location: "Los Angeles, CA",
    carpetArea: "3,200 sq ft",
    status: "For Sale",
    floor: "Penthouse",
  },
  {
    id: 5,
    title: "Historic Brownstone",
    price: "$2,800,000",
    image: "https://jooinn.com/images/makati-skyscrapers-6.jpg",
    location: "Boston, MA",
    carpetArea: "3,000 sq ft",
    status: "For Sale",
    floor: "All Floors",
  },
  {
    id: 6,
    title: "Mountain View Cabin",
    price: "$1,200,000",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfOxroes5Cu2Iq8tjMrEOuLDa07Z2i3Z3Fn_UVuyACL1k2OUjREYrF9EkJ48Nk3LwR7b8&usqp=CAU",
    location: "Aspen, CO",
    carpetArea: "1,400 sq ft",
    status: "For Sale",
    floor: "Ground Floor",
  },
];

export default function SuggestedProperties() {
  
  const [visibleProperties, setVisibleProperties] = useState(3);

  const showMoreProperties = () => {
    setVisibleProperties((prevVisible) =>
      Math.min(prevVisible + 3, allSuggestedProperties.length)
    );
  };


  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {allSuggestedProperties.slice(0, visibleProperties).map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
             
            >
                  <Link href={`/properties/${property.id}`}>
              <div className="relative h-48">
                
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">{property.title}</h3>
                <p className="text-gray-500">{property.location}</p>
                <p className="text-gray-700 font-semibold">{property.price}</p>
                <div className="mt-2 text-sm text-gray-600">
                  <p>Carpet Area: {property.carpetArea}</p>
                  <p>Status: {property.status}</p>
                  <p>Floor: {property.floor}</p>
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {visibleProperties < allSuggestedProperties.length && (
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={showMoreProperties}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            View More
          </button>
        </motion.div>
      )}
    </motion.section>
  );
}
