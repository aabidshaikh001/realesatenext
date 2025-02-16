"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Umbrella, FileText, ChevronRight } from "lucide-react"
import Image from "next/image"

const insuranceTypes = [
  {
    icon: Shield,
    title: "Property Coverage",
    description: "Protect your home and personal belongings against damage or loss.",
  },
  {
    icon: Umbrella,
    title: "Liability Protection",
    description: "Coverage for accidents that may occur on your property.",
  },
  {
    icon: FileText,
    title: "Additional Living Expenses",
    description: "Financial support if you need to temporarily relocate due to covered damage.",
  },
]

export default function HomeInsurancePage() {
  const [hoveredInsurance, setHoveredInsurance] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100">
      <div className="relative h-[200px]">
        <Image
          src="/bgheader.png"
          alt="Home Insurance Hero"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white text-center">Protect Your Home</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-6 sm:p-12">
        <nav className="text-sm text-red-800 mb-6">
          <a href="/" className="hover:underline">
            Home
          </a>{" "}
          / <span className="text-red-600">Home Insurance</span>
        </nav>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-center text-red-800 mb-16 max-w-3xl mx-auto"
        >
          Safeguard your most valuable asset with our comprehensive home insurance options. Get peace of mind knowing
          you're protected against the unexpected.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {insuranceTypes.map((insurance, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
             
            >
              <insurance.icon className="text-red-600 w-12 h-12 mb-4" />
              <h2 className="text-2xl font-semibold text-red-900 mb-4">{insurance.title}</h2>
              <p className="text-red-800">{insurance.description}</p>
              
            </motion.div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-red-900 text-center">Get a Quote</h2>
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
              <label htmlFor="propertyType" className="block text-lg font-medium text-red-800 mb-2">
                Property Type
              </label>
              <select
                id="propertyType"
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
              >
                <option>Select property type</option>
                <option value="single-family">Single Family Home</option>
                <option value="condo">Condominium</option>
                <option value="townhouse">Townhouse</option>
                <option value="multi-family">Multi-Family Home</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-lg font-medium text-red-800 mb-2">
                Additional Information
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                placeholder="Tell us more about your insurance needs"
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

