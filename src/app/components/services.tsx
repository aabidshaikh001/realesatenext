"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Loader2 } from "lucide-react"

// Define the service type
type Service = {
  name: string
  description: string
  image: string
  link: string
}

export default function Services() {
  const [servicesMain, setServicesMain] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetch("https://api.realestatecompany.co.in/api/homepage")

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`)
        }

        const data = await res.json()

        const servicesMainData = data.find((item: any) => item.homeComponentName === "servicesmain")

        if (servicesMainData?.homeComponenData) {
          setServicesMain(servicesMainData.homeComponenData)
        }
        setError(false)
      } catch (error) {
        console.error("Failed to fetch services", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-br from-red-50 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-1/2 bg-gradient-to-tl from-blue-50 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium mb-3"
          >
            COMPREHENSIVE SOLUTIONS
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Additional Services
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-6"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Explore our premium range of specialized real estate services tailored to meet your unique property needs
          </motion.p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-12 w-12 text-red-500 animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Loading services...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="max-w-md mx-auto text-center bg-white rounded-xl shadow-md p-8 border border-red-100">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
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
              We're having trouble connecting to our service. Please try again later.
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
          </div>
        )}

        {/* Services Grid */}
        {!loading && !error && servicesMain.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {servicesMain.map((service, index) => (
              <motion.a
              href={service.link}
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100"
              >
                {/* Service Image with overlay */}
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-300">
                    {service.name}
                  </h3>

                  <p className="text-gray-600 mb-6 line-clamp-3">{service.description}</p>

                  <a
                    href={service.link}
                    className="inline-flex items-center text-red-600 font-medium group-hover:font-semibold transition-all duration-300"
                  >
                    <span className="mr-2">View Details</span>
                    <span className="relative">
                      <motion.span
                        className="absolute inset-0"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ originX: 0 }}
                      >
                        <ArrowRight className="h-4 w-4 text-red-700" />
                      </motion.span>
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </a>
                </div>

               
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && servicesMain.length === 0 && (
          <div className="max-w-md mx-auto text-center bg-white rounded-xl shadow-md p-8 border border-gray-100">
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
