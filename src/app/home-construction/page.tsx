"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { HardHat, Hammer, Ruler, ChevronRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Image from "next/image"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Link from "next/link"

const constructionServices: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: HardHat,
    title: "New Construction",
    description: "Build your dream home from the ground up with our expert team.",
  },
  {
    icon: Hammer,
    title: "Renovations",
    description: "Transform your existing space with our comprehensive renovation services.",
  },
  {
    icon: Ruler,
    title: "Custom Designs",
    description: "Bring your unique vision to life with our custom design solutions.",
  },
]

export default function HomeConstructionPage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
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
      const response = await fetch("https://realestateapi-x9de.onrender.com/api/home-constructions", {
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
          alt="Construction Hero"
          fill
          className="object-cover brightness-75"
        />
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
          From new constructions to renovations, we bring expertise and quality craftsmanship to every project. Let's
          build something amazing together.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {constructionServices.map((service, index) => (
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
                {constructionServices.map((service, index) => (
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
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-red-900 mb-2">Quality Craftsmanship</h3>
              <p className="text-red-800">
                We take pride in our work and ensure every detail meets our high standards of quality.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-red-900 mb-2">On-Time Delivery</h3>
              <p className="text-red-800">
                We understand the importance of timelines and work diligently to complete projects on schedule.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-red-900 mb-2">Expert Team</h3>
              <p className="text-red-800">
                Our team of experienced professionals brings knowledge and expertise to every project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

