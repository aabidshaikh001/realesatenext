"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

type ServiceType = {
  title: string
  description: string
  image: string
  link: string
}

export default function OurServices() {
  const [services, setServices] = useState<ServiceType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/homepage")

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        const servicesSection = data.find((item: any) => item.homeComponentName === "services")

        if (servicesSection && Array.isArray(servicesSection.homeComponenData)) {
          setServices(servicesSection.homeComponenData)
        } else {
          setError(true)
        }
      } catch (error) {
        console.error("Error fetching services:", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with decorative elements */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-red-50 rounded-full opacity-70 blur-xl"></div>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium mb-3"
          >
            WHAT WE OFFER
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative z-10"
          >
            Our Services
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="h-1 bg-red-500 mx-auto mb-6"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Discover our comprehensive range of real estate services designed to meet your property needs
          </motion.p>
        </div>

        {/* Loading State - Skeleton Loader */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden h-[420px] animate-pulse">
                <div className="bg-gray-200 h-52 w-full"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6 mb-6"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/3 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Services</h3>
            <p className="text-gray-600 mb-6">
              We're having trouble fetching the service information. Please try again later.
            </p>
            <button
              onClick={() => {
                setLoading(true)
                setError(false)
              }}
              className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* Services Grid */}
        {!loading && !error && services.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.a
              href={service.link}
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-100 hover:shadow-xl"
              >
                {/* Service Image with overlay */}
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-8">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 line-clamp-3">{service.description}</p>

                  {/* Learn More Button */}
                  <a
                    href={service.link}
                    className="inline-flex items-center text-red-600 font-medium hover:text-red-700 transition-all duration-300 group-hover:font-semibold"
                  >
                    <span className="mr-2">View Details</span>
                    <motion.span whileHover={{ x: 5 }} className="inline-flex">
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </a>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && services.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Services Available</h3>
            <p className="text-gray-600">We're currently updating our service offerings. Please check back soon.</p>
          </div>
        )}
      </div>
    </section>
  )
}
