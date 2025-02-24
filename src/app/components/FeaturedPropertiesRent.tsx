"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const properties = [
  {
    id: 1,
    title: "Aditya Villa",
    price: "\u20B950,000 / month",
    image: "https://media.istockphoto.com/id/483773209/photo/new-cozy-cottage.jpg?b=1&s=612x612&w=0&k=20&c=rssdUJmafDvwS7drFg6Cr9j4Yuvbx4OUkkFUJWdKwos=",
    location: "Jagatpura, Jaipur",
    bhk: "3 BHK Villa",
    marketedBy: "Shubham Group",
    companyLogo: "https://sai-infratech.com/wp-content/uploads/2019/10/Sai-InfraTech-Logo.png",
    propertyFor: "rent",  // Added field
    featured: true,       // Added field
  },
  {
    id: 2,
    title: "Ruheen Shree",
    price: "\u20B930,000 / month",
    image: "https://st2.depositphotos.com/4489556/8875/i/950/depositphotos_88751000-stock-photo-suburban-house-with-double-garage.jpg",
    location: "Jagatpura, Jaipur",
    bhk: "3 BHK Flat",
    marketedBy: "Ruheen Developers",
    companyLogo: "https://sai-infratech.com/wp-content/uploads/2019/10/Sai-InfraTech-Logo.png",
    propertyFor: "rent",  // Added field
    featured: true,       // Added field
  },
  {
    id: 3,
    title: "Luxury Heights",
    price: "\u20B970,000 / month",
    image: "https://st2.depositphotos.com/1015412/8130/i/950/depositphotos_81300946-stock-photo-open-garage-door-in-suburban.jpg",
    location: "Mumbai, India",
    bhk: "4 BHK Penthouse",
    marketedBy: "Luxury Developers",
    companyLogo: "https://sai-infratech.com/wp-content/uploads/2019/10/Sai-InfraTech-Logo.png",
    propertyFor: "rent",  // Added field
    featured: true,       // Added field
  },
  {
    id: 4,
    title: "Luxury Heights",
    price: "\u20B970,000 / month",
    image: "https://st2.depositphotos.com/1015412/8130/i/950/depositphotos_81300946-stock-photo-open-garage-door-in-suburban.jpg",
    location: "Mumbai, India",
    bhk: "4 BHK Penthouse",
    marketedBy: "Luxury Developers",
    companyLogo: "https://sai-infratech.com/wp-content/uploads/2019/10/Sai-InfraTech-Logo.png",
    propertyFor: "rent",  // Added field  
    featured: true,       // Added field
  },
  {
    id: 5,
    title: "Luxury Heights",
    price: "\u20B970,000 / month",
    image: "https://st2.depositphotos.com/1015412/8130/i/950/depositphotos_81300946-stock-photo-open-garage-door-in-suburban.jpg",
    location: "Mumbai, India",
    bhk: "4 BHK Penthouse",
    marketedBy: "Luxury Developers",
    companyLogo: "https://sai-infratech.com/wp-content/uploads/2019/10/Sai-InfraTech-Logo.png",
    propertyFor: "rent",  // Added field
    featured: false,       // Added field
  },
];
// Filter properties for rent and featured
const filteredProperties = properties.filter(property => property.propertyFor === "rent" && property.featured);
export default function FeaturedPropertiesRent() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-black mb-6"
        >
          Featured Properties for Rent
        </motion.h2>

        <div className="relative">
          <div
            className="flex space-x-6 overflow-x-auto overflow-y-hidden no-scrollbar scrollbar-hide"
            ref={scrollRef}
          >
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md min-w-[320px] transform hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={property.image}
                  alt={property.title}
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <Image
                      src={property.companyLogo}
                      alt={property.marketedBy}
                      width={40}
                      height={40}
                      className="w-10 h-10 mr-3 rounded-full"
                    />
                    <p className="text-sm text-gray-600">{property.marketedBy}</p>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
                  <p className="text-gray-600 text-sm">{property.location}</p>
                  <p className="text-gray-700 text-sm font-medium mt-1">{property.bhk}</p>
                  <p className="text-red-600 font-semibold mt-2">{property.price}</p>
                  <Link href={`/properties/${property.id}`} passHref prefetch={true} >
      <button
        className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full text-sm transition-all duration-300"
      >
        View Details
      </button>
    </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {filteredProperties.length > 2 && (
            <>
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full"
              >
                <FaArrowLeft className="text-gray-700" />
              </button>
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full"
              >
                <FaArrowRight className="text-gray-700" />
              </button>
            </>
          )}
        </div>

        {/* View All Properties Button */}
        <motion.div
          className="text-right mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/properties" passHref prefetch={true}>
            <button className="bg-red-600 text-white hover:bg-red-700 font-semibold text-sm px-4 py-2 rounded-full transition-all duration-300">
              View All Properties &rarr;
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
