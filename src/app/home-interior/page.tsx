"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Paintbrush, Sofa, Lamp, ChevronRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Image from "next/image"
 import { toast } from 'sonner';
import "react-toastify/dist/ReactToastify.css"
import Link from "next/link"

interface ServiceCard {
  icon: string
  title: string
  description: string
}

interface DesignProcessStep {
  step: number
  title: string
  description: string
}

interface Testimonial {
  name: string
  location: string
  avatar: string
  review: string
  rating: number
}

interface Guarantee {
  title: string
  points: string[]
}

interface HomeInteriorData {
  description: string
  cards: ServiceCard[]
  ourDesignProcess: DesignProcessStep[]
  clientTestimonial: Testimonial
  ourGuarantee: Guarantee
}

interface ApiResponse {
  success: boolean
  data: {
    id: number
    serviceName: string
    serviceData: HomeInteriorData
  }[]
}

const getIconComponent = (iconName: string): LucideIcon => {
  switch (iconName) {
    case "Paintbrush":
      return Paintbrush
    case "Sofa":
      return Sofa
    case "Lamp":
      return Lamp
    default:
      return Paintbrush // Default fallback
  }
}

export default function HomeInteriorPage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [homeInteriorData, setHomeInteriorData] = useState<HomeInteriorData | null>(null)
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
        const response = await fetch("http://localhost:5000/api/services")
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const data: ApiResponse = await response.json()
        
        // Find the Home Interior service in the data array
        const homeInteriorService = data.data.find(service => service.serviceName === "Home Interior")
        
        if (homeInteriorService) {
          setHomeInteriorData(homeInteriorService.serviceData)
          // Set the default service to the first card if available
          if (homeInteriorService.serviceData.cards?.length > 0) {
            setFormData(prev => ({
              ...prev,
              service: homeInteriorService.serviceData.cards[0].title
            }))
          }
        } else {
          throw new Error("Home Interior service not found")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load service data. Please try again later.")
      }
    }

    fetchData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/home-interiors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Thank you for your inquiry! Our interior design team will contact you shortly.")
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: homeInteriorData?.cards[0]?.title || "",
          message: "",
        })
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || "Failed to submit your request. Please try again.")
      }
    } catch (error) {
      toast.error("Network error. Please check your connection and try again.")
      console.error("Error submitting form:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!homeInteriorData) {
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
        <Image src="/bgheader.png" alt="Interior Design Hero" fill className="object-cover brightness-75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white text-center">Home Interior</h1>
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
          {homeInteriorData.description}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {homeInteriorData.cards.map((service, index) => {
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
          <h2 className="text-3xl font-bold mb-6 text-red-900 text-center">Request a Consultation</h2>
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
                {homeInteriorData.cards.map((service, index) => (
                  <option key={index} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-lg font-medium text-red-800 mb-2">
                Message
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
                {loading ? "Submitting..." : "Get Started"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg" id="LearnMore">
          <h2 className="text-3xl font-bold mb-6 text-red-900 text-center">Our Design Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeInteriorData.ourDesignProcess.map((process, index) => (
              <div key={index} className="text-center">
                <div className="bg-red-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-red-600">{process.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-red-900 mb-2">{process.title}</h3>
                <p className="text-red-800">{process.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-red-900">Client Testimonial</h3>
            <p className="text-red-800 italic mb-4">"{homeInteriorData.clientTestimonial.review}"</p>
            <p className="text-red-600 font-medium">
              — {homeInteriorData.clientTestimonial.name}, {homeInteriorData.clientTestimonial.location}
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-red-900">{homeInteriorData.ourGuarantee.title}</h3>
            <ul className="space-y-2 text-red-800">
              {homeInteriorData.ourGuarantee.points.map((point, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-red-600 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}