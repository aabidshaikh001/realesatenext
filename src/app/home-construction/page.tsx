"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  HardHat,
  Hammer,
  Ruler,
  ChevronRight,
  CheckCircle,
  UserCheck,
  ThumbsUp,
  LucideIcon,
} from "lucide-react"
import Image from "next/image"
 import { toast } from 'sonner';
import "react-toastify/dist/ReactToastify.css"
import Link from "next/link"

interface ApiResponse {
  success: boolean
  data: {
    id: number
    serviceName: string
    serviceData: HomeConstructionData
  }[]
}

interface HomeConstructionData {
  description: string
  card: {
    icon: string
    title: string
    description: string
  }[]
  whyChooseUs: {
    icon: string
    title: string
    description: string
  }[]
}

const getIconComponent = (iconName: string): LucideIcon => {
  switch (iconName) {
    case "HardHat":
      return HardHat
    case "Hammer":
      return Hammer
    case "Ruler":
      return Ruler
    case "CheckCircle":
      return CheckCircle
    case "UserCheck":
      return UserCheck
    case "ThumbsUp":
      return ThumbsUp
    default:
      return HardHat // Default fallback
  }
}

export default function HomeConstructionPage() {
  const [homeConstructionData, setHomeConstructionData] = useState<HomeConstructionData>({
    description: "",
    card: [],
    whyChooseUs: [],
  })
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.realestatecompany.co.in/api/services")
        if (!response.ok) throw new Error("Network response was not ok")

        const data: ApiResponse = await response.json()
        const homeConstruction = data.data.find((item) => item.serviceName === "Home Construction")
        if (homeConstruction) {
          setHomeConstructionData(homeConstruction.serviceData)
        } else {
          toast.error("Home Construction service not found")
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch service data")
      }
    }

    fetchData()
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("https://api.realestatecompany.co.in/api/home-constructions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Thank you for your inquiry! We'll contact you shortly with a quote.")
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "",
          message: "",
        })
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || "Failed to submit your request.")
      }
    } catch (error) {
      toast.error("Network error. Please try again later.")
    } finally {
      setLoading(false)
    }
  }
  if (!homeConstructionData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-red-800">Loading services...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 mt-10 lg:mt-0">
      
      <div className="relative h-[200px]">
        <Image src="/bgheader.png" alt="Construction Hero" fill className="object-cover brightness-75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Page Title */}
          <h1 className="text-4xl sm:text-6xl font-bold text-white text-center">Home Construction</h1>
          <nav className="flex items-center text-white text-sm mt-2">
            <a href="/" className="hover:underline opacity-90">
              Home
            </a>
            <ChevronRight className="w-4 h-4 mx-2 opacity-90" />
            <span className="opacity-90">Services</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 sm:p-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-center text-red-800 mb-16 max-w-3xl mx-auto"
        >
          {homeConstructionData.description}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {homeConstructionData.card.map((service, index) => {
            const IconComponent = getIconComponent(service.icon)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <IconComponent className="text-red-600 w-12 h-12 mb-4" />
                <h2 className="text-2xl font-semibold text-red-900 mb-4">{service.title}</h2>
                <p className="text-red-800">{service.description}</p>
                {hoveredService === index && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                    <Link href="#LearnMore">
                      <button className="text-red-600 font-medium hover:text-red-800 transition-colors">
                        Learn more →
                      </button>
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-red-900 text-center">Request a Quote</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-red-800 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                placeholder="Your Full Name"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-lg font-medium text-red-800 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                placeholder="Your Phone Number"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-red-800 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                placeholder="Your Email Address"
                required
              />
            </div>

            <div>
              <label htmlFor="service" className="block text-lg font-medium text-red-800 mb-2">
                Service Required
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                required
              >
                <option value="">Select a service</option>
                {homeConstructionData.card.map((service, index) => (
                  <option key={index} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-lg font-medium text-red-800 mb-2">
                Project Details
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                placeholder="Tell us about your project"
                required
              ></textarea>
            </div>
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Get Quote"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg" id="LearnMore">
          <h2 className="text-3xl font-bold mb-6 text-red-900 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeConstructionData.whyChooseUs.map((item, index) => {
              const IconComponent = getIconComponent(item.icon)
              return (
                <div key={index} className="text-center">
                  <div className="bg-red-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-red-900 mb-2">{item.title}</h3>
                  <p className="text-red-800">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
