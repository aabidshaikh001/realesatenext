"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useAnimation, type PanInfo } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"

interface City {
  id: number
  name: string
  properties: number
  image_url: string
  created_at: string
  updated_at: string
}

interface ApiResponse {
  success: boolean
  data: City[]
}

export default function ExploreCities() {
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  // Calculate visible slides based on screen width
  const [slidesPerView, setSlidesPerView] = useState(4)

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1)
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2)
      } else if (window.innerWidth < 1280) {
        setSlidesPerView(3)
      } else {
        setSlidesPerView(4)
      }
    }

    updateSlidesPerView()
    window.addEventListener("resize", updateSlidesPerView)

    return () => window.removeEventListener("resize", updateSlidesPerView)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        handleNext()
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [currentIndex, isDragging, cities.length])

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/explorecities")
        if (!response.ok) {
          throw new Error("Failed to fetch cities")
        }
        const data: ApiResponse = await response.json()

        if (data.success && data.data) {
          setCities(data.data)
        } else {
          throw new Error("Invalid data format received")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchCities()
  }, [])

  const handleNext = () => {
    if (cities.length <= slidesPerView) return

    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex === cities.length - slidesPerView ? 0 : prevIndex + 1))
  }

  const handlePrev = () => {
    if (cities.length <= slidesPerView) return

    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cities.length - slidesPerView : prevIndex - 1))
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    const threshold = 50

    if (info.offset.x < -threshold) {
      handleNext()
    } else if (info.offset.x > threshold) {
      handlePrev()
    }
  }

  // Get visible cities based on current index and slides per view
  const getVisibleCities = () => {
    if (cities.length <= slidesPerView) {
      return cities
    }

    const visibleCities = []
    for (let i = 0; i < slidesPerView; i++) {
      const index = (currentIndex + i) % cities.length
      visibleCities.push(cities[index])
    }
    return visibleCities
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-800 mb-3"
            >
              Explore Cities
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 w-20 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-4"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-gray-600"
            >
              Loading our premium locations...
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="animate-pulse"
              >
                <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl shadow-lg"></div>
                <div className="h-6 bg-gray-200 rounded-full w-3/4 mx-auto mt-6"></div>
                <div className="h-4 bg-gray-200 rounded-full w-1/2 mx-auto mt-3"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">Explore Cities</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-4" />
            <p className="text-lg text-red-500 font-medium">Error: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (cities.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">Explore Cities</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-4" />
            <p className="text-lg text-gray-600">No cities available at the moment</p>
          </div>
        </div>
      </section>
    )
  }

  const visibleCities = getVisibleCities()

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading with animated underline */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-800 mb-3"
          >
            Explore Cities
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 w-20 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-600"
          >
            Discover Our Premium Locations
          </motion.p>
        </div>

        {/* Custom Framer Motion Carousel */}
        <div className="relative overflow-hidden py-8" ref={carouselRef}>
          <motion.div
            className="flex gap-6"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
          >
            <AnimatePresence initial={false} custom={direction}>
              {visibleCities.map((city, index) => (
                <motion.div
                  key={`${city.id}-${index}`}
                  custom={direction}
                  initial={{
                    opacity: 0,
                    x: direction > 0 ? 100 : -100,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                      duration: 0.5,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    x: direction > 0 ? -100 : 100,
                    scale: 0.9,
                    transition: { duration: 0.4 },
                  }}
                  className="group cursor-pointer flex-shrink-0"
                  style={{ width: `calc(100% / ${slidesPerView})` }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.03,
                      y: -5,
                    }}
                    className="relative bg-[#FFF8E1] rounded-lg overflow-hidden transition-all duration-300 h-full"
                    style={{
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {/* City Image with Hover Effect */}
                    <motion.div
                      className="relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src={city.image_url || "/placeholder.svg"}
                        alt={city.name}
                        width={400}
                        height={250}
                        className="w-full h-80 object-cover transition-all duration-300"
                      />
                    </motion.div>

                    {/* Property Count Badge */}
                    {/* City Name Card - Updated positioning */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-[#FFF8E1]/90 backdrop-blur-sm text-center py-3 px-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <h3 className="text-2xl font-bold text-gray-900 tracking-wide">{city.name}</h3>
                      {city.properties !== undefined && (
                        <div className="absolute top-0 right-0 transform translate-x-0 -translate-y-full bg-white text-red-600 px-3 py-1 rounded-tl-xl rounded-br-xl text-sm font-medium shadow-sm flex items-center gap-1 m-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {city.properties} {city.properties === 1 ? "Property" : "Properties"}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Enhanced Navigation Buttons */}
          <motion.button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-gray-800 z-10 border border-gray-100"
            whileHover={{
              scale: 1.1,
              backgroundColor: "#fff",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handlePrev}
          >
            <ChevronLeft className="h-5 w-5 text-red-600" />
          </motion.button>

          <motion.button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-gray-800 z-10 border border-gray-100"
            whileHover={{
              scale: 1.1,
              backgroundColor: "#fff",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleNext}
          >
            <ChevronRight className="h-5 w-5 text-red-600" />
          </motion.button>

          {/* Enhanced Pagination Indicators */}
          <div className="flex justify-center mt-16 gap-2">
            {cities.length > slidesPerView &&
              Array.from({ length: cities.length - slidesPerView + 1 }).map((_, index) => (
                <motion.button
                  key={index}
                  className="relative"
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === index ? "w-8 bg-gradient-to-r from-red-500 to-orange-500" : "w-2 bg-gray-300"
                    }`}
                    animate={{
                      width: currentIndex === index ? 32 : 8,
                      backgroundColor: currentIndex === index ? "#ef4444" : "#d1d5db",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  {currentIndex === index && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-red-500/30"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    />
                  )}
                </motion.button>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
