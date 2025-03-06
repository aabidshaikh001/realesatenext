"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Paintbrush, Sofa, Lamp, ChevronRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Image from "next/image"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Link from "next/link"

const interiorServices: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Paintbrush,
    title: "Color Consultation",
    description: "Expert advice on choosing the perfect color palette for your home.",
  },
  {
    icon: Sofa,
    title: "Furniture Selection",
    description: "Curated furniture choices that match your style and space.",
  },
  {
    icon: Lamp,
    title: "Lighting Design",
    description: "Create the perfect ambiance with our lighting solutions.",
  },
]

export default function HomeInteriorPage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Color Consultation", // Default value
    message: "",
  })

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
      const response = await fetch("https://realestateapi-x9de.onrender.com/api/home-interiors", {
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
          service: "Color Consultation",
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 mt-10 lg:mt-0">
      <ToastContainer />
      <div className="relative h-[200px]">
        <Image
          src="/bgheader.png"
          alt="Interior Design Hero"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Page Title */}
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
          Elevate your home with our expert interior design services. We bring your vision to life, creating spaces that
          inspire and delight.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {interiorServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <service.icon className="text-red-600 w-12 h-12 mb-4" />
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
          ))}
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
                {interiorServices.map((service, index) => (
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
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-red-900 mb-2">Consultation</h3>
              <p className="text-red-800">
                We begin with a thorough consultation to understand your style preferences, needs, and budget.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-red-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-red-900 mb-2">Design Concept</h3>
              <p className="text-red-800">
                Our designers create a comprehensive design concept tailored to your space and vision.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-red-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-red-900 mb-2">Implementation</h3>
              <p className="text-red-800">
                We handle the entire implementation process, from sourcing materials to final styling touches.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-red-900">Client Testimonial</h3>
            <p className="text-red-800 italic mb-4">
              "The interior design team transformed our living space beyond our expectations. Their attention to detail
              and understanding of our style made all the difference. We couldn't be happier with the results!"
            </p>
            <p className="text-red-600 font-medium">— Sarah & Rajesh Sharma</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg" >
            <h3 className="text-2xl font-bold mb-4 text-red-900">Our Guarantee</h3>
            <ul className="space-y-2 text-red-800">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-red-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Personalized design solutions tailored to your needs
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-red-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Transparent pricing with no hidden costs
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-red-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Satisfaction guarantee on all our design services
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

