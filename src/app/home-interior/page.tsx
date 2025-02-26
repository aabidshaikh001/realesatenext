"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Paintbrush, Sofa, Lamp, ChevronRight } from "lucide-react"
import Image from "next/image"

const interiorServices = [
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
  { icon: Lamp, title: "Lighting Design", description: "Create the perfect ambiance with our lighting solutions." },
]

export default function HomeInteriorPage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 mt-10 lg:mt-0">
      <div className="relative h-[200px]">
        <Image
          src="/bgheader.png"
          alt="Interior Design Hero"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
       <div className="absolute inset-0 flex flex-col items-center justify-center">
          
          

          {/* Page Title */}
          <h1 className="text-4xl sm:text-6xl font-bold text-white text-center">Home Interior</h1>
          <nav className="flex items-center text-white text-sm mt-2">
            <a href="/" className="hover:underline opacity-90">Home</a>
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
              
            >
              <service.icon className="text-red-600 w-12 h-12 mb-4" />
              <h2 className="text-2xl font-semibold text-red-900 mb-4">{service.title}</h2>
              <p className="text-red-800">{service.description}</p>
             
            </motion.div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-red-900 text-center">Request a Consultation</h2>
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
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-lg font-medium text-red-800 mb-2">
                Message
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
                Get Started
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

