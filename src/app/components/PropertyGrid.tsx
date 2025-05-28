"use client"
import { useRouter } from "next/navigation"
import type React from "react"
import { useEffect, useState, useMemo, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa"
import SearchHeader from "./searchbarheader"
import useSWR from "swr"
import { FaPlus, FaMinus, FaExpand, FaDownload, FaInfo } from "react-icons/fa"

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
  PropertyId: number
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

  const [zoomLevel, setZoomLevel] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showInfo, setShowInfo] = useState(true)
  const [imagePositions, setImagePositions] = useState({ x: 0, y: 0 })
  const [imageLoading, setImageLoading] = useState(true)
  const modalRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)

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
    setZoomLevel(1)
    setImagePositions({ x: 0, y: 0 })
    setImageLoading(true)
    setShowInfo(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setZoomLevel(1)
    setImagePositions({ x: 0, y: 0 })
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev >= selectedPropertyImages.length - 1 ? 0 : prev + 1))
    setZoomLevel(1)
    setImagePositions({ x: 0, y: 0 })
    setImageLoading(true)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev <= 0 ? selectedPropertyImages.length - 1 : prev - 1))
    setZoomLevel(1)
    setImagePositions({ x: 0, y: 0 })
    setImageLoading(true)
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

  // Zoom functionality
  const handleZoom = useCallback((direction: "in" | "out") => {
    setZoomLevel((prev) => {
      if (direction === "in" && prev < 3) {
        return prev + 0.5
      } else if (direction === "out" && prev > 1) {
        return prev - 0.5
      }
      return prev
    })
  }, [])

  // Fullscreen functionality
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  // Handle image drag
  const handleImageDrag = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (zoomLevel <= 1) return

      const container = imageContainerRef.current
      if (!container) return

      const startX = e.clientX
      const startY = e.clientY
      const startPositionX = imagePositions.x
      const startPositionY = imagePositions.y

      const handleMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - startX
        const dy = e.clientY - startY

        setImagePositions({
          x: startPositionX + dx,
          y: startPositionY + dy,
        })
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    },
    [zoomLevel, imagePositions],
  )

  // Handle image touch drag for mobile
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (zoomLevel <= 1) return

      const touch = e.touches[0]
      const startX = touch.clientX
      const startY = touch.clientY
      const startPositionX = imagePositions.x
      const startPositionY = imagePositions.y

      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0]
        const dx = touch.clientX - startX
        const dy = touch.clientY - startY

        setImagePositions({
          x: startPositionX + dx,
          y: startPositionY + dy,
        })
      }

      const handleTouchEnd = () => {
        document.removeEventListener("touchmove", handleTouchMove)
        document.removeEventListener("touchend", handleTouchEnd)
      }

      document.addEventListener("touchmove", handleTouchMove)
      document.addEventListener("touchend", handleTouchEnd)
    },
    [zoomLevel, imagePositions],
  )

  // Handle keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevImage()
      } else if (e.key === "ArrowRight") {
        nextImage()
      } else if (e.key === "Escape") {
        closeModal()
      } else if (e.key === "+" || e.key === "=") {
        handleZoom("in")
      } else if (e.key === "-" || e.key === "_") {
        handleZoom("out")
      } else if (e.key === "f") {
        toggleFullscreen()
      } else if (e.key === "i") {
        setShowInfo(!showInfo)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isModalOpen, prevImage, nextImage, closeModal, handleZoom, toggleFullscreen, showInfo])

  // Download current image
  const downloadImage = useCallback(async () => {
    if (!selectedPropertyImages[currentImageIndex]) return

    try {
      const response = await fetch(selectedPropertyImages[currentImageIndex])
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = `property-image-${currentImageIndex + 1}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading image:", error)
    }
  }, [selectedPropertyImages, currentImageIndex])

  // Reset image loading state when image loads
  const handleImageLoad = useCallback(() => {
    setImageLoading(false)
  }, [])

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
              key={property.PropertyId}
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
                    router.push(`/properties/${property.PropertyId}`)
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
                      router.push(`/properties/${property.PropertyId}`)
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded w-full text-sm"
                  >
                    View Details
                  </button>
                  <button
                    onClick={(e) => openContactModal(property.PropertyId, e)}
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
        <div className="fixed inset-0 bg-black z-50 overflow-hidden" ref={modalRef}>
          <div className="relative h-full w-full flex flex-col">
            {/* Toolbar */}
            <div
              className={`absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4 flex justify-between items-center transition-opacity duration-300 ${showInfo ? "opacity-100" : "opacity-0"}`}
            >
              <div className="flex items-center gap-2">
                <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {selectedPropertyImages.length}
                </div>
                <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm hidden md:flex">{zoomLevel}x</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="rounded-full bg-black/50 text-white p-2 hover:bg-black/70 hidden md:flex"
                  onClick={() => handleZoom("out")}
                  disabled={zoomLevel <= 1}
                >
                  <FaMinus className="h-4 w-4" />
                </button>

                <button
                  className="rounded-full bg-black/50 text-white p-2 hover:bg-black/70 hidden md:flex"
                  onClick={() => handleZoom("in")}
                  disabled={zoomLevel >= 3}
                >
                  <FaPlus className="h-4 w-4" />
                </button>

                <button
                  className="rounded-full bg-black/50 text-white p-2 hover:bg-black/70 hidden md:flex"
                  onClick={toggleFullscreen}
                >
                  <FaExpand className="h-4 w-4" />
                </button>

                <button className="rounded-full bg-black/50 text-white p-2 hover:bg-black/70" onClick={downloadImage}>
                  <FaDownload className="h-4 w-4" />
                </button>

                <button
                  className="rounded-full bg-black/50 text-white p-2 hover:bg-black/70"
                  onClick={() => setShowInfo(!showInfo)}
                >
                  <FaInfo className="h-4 w-4" />
                </button>

                <button className="rounded-full bg-black/50 text-white p-2 hover:bg-black/70" onClick={closeModal}>
                  <FaTimes className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Main image view */}
            <div
              className="relative flex-1 flex items-center justify-center overflow-hidden"
              ref={imageContainerRef}
              onMouseDown={handleImageDrag}
              onTouchStart={handleTouchStart}
              onClick={() => setShowInfo(!showInfo)}
            >
              <div
                className="relative h-full w-full"
                style={{
                  cursor: zoomLevel > 1 ? "grab" : "default",
                }}
              >
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `scale(${zoomLevel}) translate(${imagePositions.x}px, ${imagePositions.y}px)`,
                    transition: zoomLevel === 1 ? "transform 0.3s ease" : "none",
                  }}
                >
                  <Image
                    src={selectedPropertyImages[currentImageIndex] || "/placeholder.svg"}
                    alt={`Property image ${currentImageIndex + 1}`}
                    width={1200}
                    height={800}
                    className="max-h-full max-w-full object-contain"
                    priority
                    onLoad={handleImageLoad}
                    style={{
                      opacity: imageLoading ? 0 : 1,
                      transition: "opacity 0.3s ease",
                    }}
                  />
                </div>
              </div>

              {/* Navigation arrows - only show when not zoomed */}
              {zoomLevel === 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition transform hover:scale-110"
                  >
                    <FaArrowLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition transform hover:scale-110"
                  >
                    <FaArrowRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div
              className={`h-24 bg-black/90 p-2 overflow-x-auto transition-opacity duration-300 ${showInfo ? "opacity-100" : "opacity-0"}`}
            >
              <div className="flex gap-2 h-full">
                {selectedPropertyImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index)
                      setZoomLevel(1)
                      setImagePositions({ x: 0, y: 0 })
                      setImageLoading(true)
                    }}
                    className={`relative h-full aspect-square flex-shrink-0 rounded-md overflow-hidden transition transform ${
                      index === currentImageIndex
                        ? "ring-2 ring-red-600 ring-offset-2 ring-offset-black scale-105"
                        : "opacity-70 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile controls overlay - only visible on small screens when info is shown */}
            <div
              className={`md:hidden absolute bottom-28 left-0 right-0 flex justify-center gap-4 transition-opacity duration-300 ${showInfo ? "opacity-100" : "opacity-0"}`}
            >
              <button
                className="rounded-full bg-black/50 text-white p-2 hover:bg-black/70"
                onClick={() => handleZoom("out")}
                disabled={zoomLevel <= 1}
              >
                <FaMinus className="h-4 w-4" />
              </button>
              <button
                className="rounded-full bg-black/50 text-white p-2 hover:bg-black/70"
                onClick={() => handleZoom("in")}
                disabled={zoomLevel >= 3}
              >
                <FaPlus className="h-4 w-4" />
              </button>
            </div>

            {/* Help text - only visible on desktop */}
            <div
              className={`hidden md:block absolute bottom-28 left-4 text-xs text-white/70 transition-opacity duration-300 ${showInfo ? "opacity-100" : "opacity-0"}`}
            >
              <p>Keyboard: Arrow keys to navigate • +/- to zoom • F for fullscreen • I to toggle info</p>
              <p>Mouse: Drag to pan when zoomed • Click to toggle controls</p>
            </div>
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
