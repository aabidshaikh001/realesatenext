"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HardHat, Hammer, Ruler, ChevronRight } from "lucide-react"
import Image from "next/image"

const constructionServices = [
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100">
      <div className="relative h-[200px]">
        <Image src="/bgheader.png" alt="Construction Hero" layout="fill" objectFit="cover" className="brightness-75" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white text-center">Building Your Future</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-6 sm:p-12">
        <nav className="text-sm text-red-800 mb-6">
          <a href="/" className="hover:underline">
            Home
          </a>{" "}
          / <span className="text-red-600">Construction</span>
        </nav>

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
              
            >
              <service.icon className="text-red-600 w-12 h-12 mb-4" />
              <h2 className="text-2xl font-semibold text-red-900 mb-4">{service.title}</h2>
              <p className="text-red-800">{service.description}</p>
              
            </motion.div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-red-900 text-center">Request a Quote</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-red-800 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                placeholder="Your Full Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-red-800 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                placeholder="Your Email Address"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-lg font-medium text-red-800 mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                placeholder="Your Phone Number"
              />
            </div>
            <div>
              <label htmlFor="service" className="block text-lg font-medium text-red-800 mb-2">
                Service
              </label>
              <select
                id="service"
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
              >
                <option>Select a service</option>
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
                rows={4}
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                placeholder="Tell us about your project"
              ></textarea>
            </div>
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
              >
                Get Quote
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

