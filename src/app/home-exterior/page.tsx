'use client'
import { useState } from "react"
import { motion } from "framer-motion"
import { FaHome, FaTree  } from "react-icons/fa";
import { FaRulerCombined } from "react-icons/fa6";
import { IoIosHammer } from "react-icons/io";

import Image from "next/image"

const exteriorServices = [
  {
    icon: FaHome,
    title: "Architectural Design",
    description: "Crafting unique and functional home exteriors tailored to your vision.",
  },
  {
    icon: FaRulerCombined,
    title: "Landscaping Solutions",
    description: "Transforming outdoor spaces with professional landscaping services.",
  },
  {
    icon: IoIosHammer ,
    title: "Exterior Renovation",
    description: "Enhancing curb appeal with expert renovations and upgrades."
  },
  {
    icon: FaTree ,
    title: "Sustainable Greenery",
    description: "Incorporating eco-friendly designs and sustainable outdoor elements."
  }
]

export default function HomeExteriorPage() {
    const [hoveredService, setHoveredService] = useState<number | null>(null)
    const [usePersonalNumber, setUsePersonalNumber] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [whatsappNumber, setWhatsappNumber] = useState("");
  
    const handleCheckboxChange = () => {
      setUsePersonalNumber(!usePersonalNumber);
      if (!usePersonalNumber) {
        setWhatsappNumber(phoneNumber);
      } else {
        setWhatsappNumber("");
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100">
      <div className="relative h-[300px]">
        <Image
          src="/bgheader.png"
          alt="Exterior Design Hero"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl sm:text-7xl font-bold text-white text-center drop-shadow-lg">Enhance Your Home’s Exterior</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-8 sm:p-14">
        <nav className="text-sm text-red-800 mb-6">
          <a href="/" className="hover:underline">
            Home
          </a>{" "}
          / <span className="text-red-600 font-semibold">Exterior Design</span>
        </nav>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-center text-red-900 mb-16 max-w-3xl mx-auto"
        >
          Transform your home's exterior with our expert services, designed to elevate curb appeal and functionality while integrating sustainable elements.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {exteriorServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center"
            >
              <service.icon className="text-red-600 w-14 h-14 mb-4 mx-auto" />
              <h2 className="text-2xl font-semibold text-red-900 mb-4">{service.title}</h2>
              <p className="text-red-800 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white p-10 rounded-lg shadow-xl">
          <h2 className="text-4xl font-bold mb-8 text-red-900 text-center">Request a Consultation</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-red-800 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-4 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
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
                className="w-full p-4 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                placeholder="Your Email Address"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-lg font-medium text-red-800 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-4 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                placeholder="Your Phone Number"
              />
            </div>
            <div>
              <label htmlFor="whatsapp" className="block text-lg font-medium text-red-800 mb-2">
                WhatsApp Number
              </label>
              <input
                type="text"
                id="whatsapp"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full p-4 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                placeholder="Your WhatsApp Number"
                disabled={usePersonalNumber}
              />
            </div>
            <div className="md:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="usePersonalNumber"
                checked={usePersonalNumber}
                onChange={handleCheckboxChange}
                className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="usePersonalNumber" className="text-lg font-medium text-red-800">
                Use personal number for WhatsApp
              </label>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-lg font-medium text-red-800 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full p-4 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                placeholder="Tell us about your project"
              ></textarea>
            </div>
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-4 px-10 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
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