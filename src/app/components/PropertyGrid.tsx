"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SearchHeader from "./searchbarheader";

interface Property {
  id: number;
  title: string;
  price: string;
  pricePerSqft: string;
  images: string[]; // Updated to handle multiple images
  location: string;
  carpetArea: string;
  status: string;
  floor: string;
  owner: string;
  propertyType: string;
  budget: string;
  bedrooms: string;
  postedBy: string;
  type: "rent" | "buy";
}

const properties: Property[] = [
  {
    id: 1,
    title: "Luxury Apartment in Downtown",
    price: "₹25,000/month",
    pricePerSqft: "₹800/sqft",
    images: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", "https://r1imghtlak.mmtcdn.com/ea917996d4d811ec9a190a58a9feac02.webp", "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"],
    location: "Downtown, Jaipur",
    carpetArea: "2000 sqft",
    status: "Available",
    floor: "10th",
    owner: "John Doe",
    propertyType: "Apartment",
    budget: "2000000-3000000",
    bedrooms: "3",
    postedBy: "Agent 1",
    type: "rent",
  },
  {
    id: 2,
    title: "Cozy Cottage in the Suburbs",
    price: "₹80,000/month",
    pricePerSqft: "₹500/sqft",
    images: ["https://r1imghtlak.mmtcdn.com/ea917996d4d811ec9a190a58a9feac02.webp", "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"],
    location: "Suburbs, Jaipur",
    carpetArea: "1500 sqft",
    status: "Available",
    floor: "Ground",
    owner: "Jane Doe",
    propertyType: "House",
    budget: "700000-900000",
    bedrooms: "2",
    postedBy: "Agent 2",
    type: "rent",
  },
  {
    id: 3,
    title: "Luxury Villa for Sale",
    price: "₹2,50,00,000",
    pricePerSqft: "₹1,200/sqft",
    images: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"],
    location: "Mumbai, India",
    carpetArea: "3500 sqft",
    status: "Available",
    floor: "2nd",
    owner: "James Smith",
    propertyType: "Villa",
    budget: "20000000-30000000",
    bedrooms: "4",
    postedBy: "Agent 3",
    type: "buy",
  },
  {
    id: 4,
    title: "Modern Penthouse in City Center",
    price: "₹50,000/month",
    pricePerSqft: "₹1,000/sqft",
    images: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", "https://r1imghtlak.mmtcdn.com/ea917996d4d811ec9a190a58a9feac02.webp"],
    location: "City Center, Jaipur",
    carpetArea: "3000 sqft",
    status: "Available",
    floor: "15th",
    owner: "Michael Johnson",
    propertyType: "Penthouse",
    budget: "4000000-5000000",
    bedrooms: "4",
    postedBy: "Agent 4",
    type: "rent",
  },
  {
    id: 5,
    title: "Affordable Apartment",
    price: "₹15,000/month",
    pricePerSqft: "₹400/sqft",
    images: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"],
    location: "Malviya Nagar, Jaipur",
    carpetArea: "1000 sqft",
    status: "Available",
    floor: "2nd",
    owner: "Sophia Brown",
    propertyType: "Apartment",
    budget: "1000000-2000000",
    bedrooms: "2",
    postedBy: "Agent 5",
    type: "rent",
  },
  {
    id: 6,
    title: "Spacious Independent House",
    price: "₹1,50,00,000",
    pricePerSqft: "₹1,500/sqft",
    images: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"],
    location: "Bani Park, Jaipur",
    carpetArea: "2500 sqft",
    status: "Available",
    floor: "Ground + 1",
    owner: "David Lee",
    propertyType: "House",
    budget: "15000000-20000000",
    bedrooms: "5",
    postedBy: "Agent 6",
    type: "buy",
  },
  {
    id: 7,
    title: "Beachfront Villa",
    price: "₹4,00,00,000",
    pricePerSqft: "₹2,000/sqft",
    images: ["/property14.jpg", "/property15.jpg", "/property16.jpg"],
    location: "Goa, India",
    carpetArea: "4000 sqft",
    status: "Available",
    floor: "Ground",
    owner: "Chris Martin",
    propertyType: "Villa",
    budget: "30000000-50000000",
    bedrooms: "6",
    postedBy: "Agent 7",
    type: "buy",
  },
  {
    id: 8,
    title: "Luxury Studio Apartment",
    price: "₹18,000/month",
    pricePerSqft: "₹600/sqft",
    images: ["/property17.jpg", "/property18.jpg"],
    location: "C-Scheme, Jaipur",
    carpetArea: "800 sqft",
    status: "Available",
    floor: "5th",
    owner: "Olivia Jones",
    propertyType: "Studio Apartment",
    budget: "500000-1000000",
    bedrooms: "1",
    postedBy: "Agent 8",
    type: "rent",
  },
];




export default function PropertyGrid() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<"rent" | "buy">("buy");
  const [isSticky, setIsSticky] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPropertyImages, setSelectedPropertyImages] = useState<string[]>([]);
  

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => property.type === currentTab);
  }, [currentTab]);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = (images: string[]) => {
    setSelectedPropertyImages(images);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextImage = () => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedPropertyImages.length);
  const prevImage = () => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedPropertyImages.length) % selectedPropertyImages.length);

  return (
    <div className="pb-16 -mt-12">
      {/* Sticky Search Header */}
      <div className={`transition-all duration-300 ${isSticky ? "fixed top-0 left-0 w-full z-30" : "relative"}`}>
        <SearchHeader />
      </div>

      {/* Tabs for Rent and Buy */}
      <div className="flex justify-center gap-8">
      
        <button
          onClick={() => setCurrentTab("buy")}
          className={`px-4 py-2 font-semibold rounded ${currentTab === "buy" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Properties for Buy
        </button>
        <button
          onClick={() => setCurrentTab("rent")}
          className={`px-4 py-2 font-semibold rounded ${currentTab === "rent" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Properties for Rent
        </button>
      </div>

      {/* Property List */}
      <div className="mt-4 sm:mt-5 grid grid-cols-1 gap-4 sm:gap-6 px-4 sm:px-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)" }}
              className="bg-white rounded-lg shadow-lg border p-4 flex flex-col sm:flex-row transition-all duration-300"
            >
              {/* Image Section */}
              <div
                className="relative w-full sm:w-48 h-48 sm:h-32 flex-shrink-0 overflow-hidden mb-4 sm:mb-0 cursor-pointer"
                onClick={() => openModal(property.images)}
              >
                <Image
                  src={property.images[0] || "/placeholder.svg"}
                  alt={property.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                  {property.images.length}+ Photos
                </div>
              </div>

              {/* Property Details Section */}
              <div className="sm:px-4 flex-grow">
                <button  onClick={(e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    router.push(`/properties/${property.id}`);
                  }} className="text-lg font-semibold text-red-700 cursor-pointer hover:underline">{property.title}</button>
                <p className="text-gray-600 text-sm mb-1">{property.location}</p>
                <p className="text-gray-800 text-sm font-medium">Owner: {property.owner}</p>
                <div className="flex flex-wrap items-center gap-2 text-sm mt-2">
                  <div className="bg-gray-100 px-2 py-1 rounded text-xs">
                    <strong>CARPET AREA:</strong> {property.carpetArea}
                  </div>
                  <div className="bg-gray-100 px-2 py-1 rounded text-xs">
                    <strong>STATUS:</strong> {property.status}
                  </div>
                  <div className="bg-gray-100 px-2 py-1 rounded text-xs">
                    <strong>FLOOR:</strong> {property.floor}
                  </div>
                </div>
              </div>
                {/* Pricing & CTA */}
                <div className="bg-blue-50 p-4 flex flex-col items-center justify-center rounded-lg mt-4 sm:mt-0 sm:ml-4">
                <p className="text-lg font-bold text-gray-900">{property.price}</p>
                <p className="text-gray-500 text-xs">{property.pricePerSqft}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    router.push(`/properties/${property.id}`);
                  }}
                  className="mt-2 bg-red-600 text-white px-4 py-2 rounded w-full sm:w-auto"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center mt-10 px-4">No properties found matching your filters.</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div className="relative w-11/12 max-w-3xl">
            <FaTimes className="absolute top-4 right-4 text-white text-2xl cursor-pointer" onClick={closeModal} />
            <Image
              src={selectedPropertyImages[currentImageIndex]}
              alt="Gallery Image"
              width={800}
              height={600}
              className="rounded-lg"
            />
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer">
              <FaArrowLeft className="text-white text-2xl" onClick={prevImage} />
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer">
              <FaArrowRight className="text-white text-2xl" onClick={nextImage} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
