"use client"
import { useRouter } from "next/navigation"
import type React from "react"

import { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa"
import SearchHeader from "./searchbarheader"
import useSWR from "swr"

// Fixed fetcher function with JSON.parse for images
const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) throw new Error("Failed to fetch properties")
  const data = await response.json()

  return data.map((property: any) => ({
    ...property,
    images: JSON.parse(property.images), // Parse the stringified array
  }))
}

interface Property {
  id: number
  title: string
  price: string
  pricePerSqft: string
  images: string[]
  location: string
  carpetArea: string
  status: string
  propertyType: string
  bedrooms: string
  postedBy: string
  propertyFor: "rent" | "buy"
}

export default function PropertyGrid() {
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState<"rent" | "buy">("buy")
  const [isSticky, setIsSticky] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedPropertyImages, setSelectedPropertyImages] = useState<string[]>([])
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null)

  // SWR data fetching with the fixed fetcher
  const {
    data: properties = [],
    error,
    isLoading,
  } = useSWR("https://api.realestatecompany.co.in/api/properties", fetcher)

  // Filter properties by tab selection
  const filteredProperties = useMemo(
    () => properties.filter((property: Property) => property.propertyFor === currentTab),
    [currentTab, properties],
  )

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const openModal = (images: string[]) => {
    setSelectedPropertyImages(images)
    setCurrentImageIndex(0)
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev >= selectedPropertyImages.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev <= 0 ? selectedPropertyImages.length - 1 : prev - 1))
  }

  const openContactModal = (propertyId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedPropertyId(propertyId)
    setIsContactModalOpen(true)
  }

  const closeContactModal = () => {
    setIsContactModalOpen(false)
    setSelectedPropertyId(null)
  }

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const contactData = {
      propertyId: selectedPropertyId,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch("https://api.realestatecompany.co.in/api/propertylead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      })

      if (response.ok) {
        alert("Your message has been sent successfully!")
        closeContactModal()
      } else {
        alert("Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error("Error sending contact request:", error)
      alert("An error occurred. Please try again later.")
    }
  }

  if (isLoading) return <p className="text-center mt-10 px-4">Loading properties...</p>
  if (error) return <p className="text-center text-red-600">Error: {error.message}</p>

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

      <div className="mt-4 sm:mt-5 grid grid-cols-1 gap-4 sm:gap-6 px-4 sm:px-6">
        {filteredProperties.length === 0 ? (
          <p className="text-center mt-10 px-4">No properties found matching your filters.</p>
        ) : (
          filteredProperties.map((property: Property, index: number) => (
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
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/properties/${property.id}`)
                  }}
                  className="text-lg font-semibold text-red-700 cursor-pointer hover:underline"
                >
                  {property.title}
                </button>
                <p className="text-gray-600 text-sm mb-1">{property.location}</p>

                <div className="flex flex-wrap items-center gap-2 text-sm mt-2">
                  <div className="bg-gray-100 px-2 py-1 rounded text-xs">
                    <strong>CARPET AREA:</strong> {property.carpetArea}
                  </div>
                  <div className="bg-gray-100 px-2 py-1 rounded text-xs">
                    <strong>STATUS:</strong> {property.status}
                  </div>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="bg-blue-50 p-4 flex flex-col items-center justify-center rounded-lg mt-4 sm:mt-0 sm:ml-4">
                <p className="text-lg font-bold text-gray-900">{property.price}</p>
                <p className="text-gray-500 text-xs">{property.pricePerSqft} per/sq</p>
                <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/properties/${property.id}`)
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded w-full text-sm"
                  >
                    View Details
                  </button>
                  <button
                    onClick={(e) => openContactModal(property.id, e)}
                    className="bg-green-600 text-white px-4 py-2 rounded w-full text-sm"
                  >
                    Contact Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          {/* Modal Container */}
          <div className="relative w-full max-w-4xl h-[80vh] flex flex-col">
            {/* Close Button */}
            <button onClick={closeModal} className="absolute -top-10 right-0 text-white hover:text-red-400 z-50">
              <FaTimes className="text-3xl" />
            </button>

            {/* Main Image Content */}
            <div className="relative flex-1 bg-gray-900 rounded-t-lg overflow-hidden">
              <Image
                src={selectedPropertyImages[currentImageIndex] || "/placeholder.svg"}
                alt={`Property image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-red-600 z-10"
            >
              <FaArrowLeft className="text-xl" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-red-600 z-10"
            >
              <FaArrowRight className="text-xl" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {selectedPropertyImages.length}
            </div>

            {/* Thumbnail Strip */}
            {selectedPropertyImages.length > 1 && (
              <div className="bg-gray-800 p-2 rounded-b-lg flex gap-2 overflow-x-auto">
                {selectedPropertyImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-16 h-16 relative border-2 ${currentImageIndex === idx ? "border-red-500" : "border-transparent"} rounded`}
                  >
                    <Image src={img || "/placeholder.svg"} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button onClick={closeContactModal} className="absolute top-4 right-4 text-gray-500 hover:text-red-600">
              <FaTimes className="text-xl" />
            </button>

            <h2 className="text-2xl font-bold mb-4">Contact About Property</h2>
            <p className="text-gray-600 mb-4">Property ID: {selectedPropertyId}</p>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="I'm interested in this property..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
