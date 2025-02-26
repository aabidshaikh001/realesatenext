"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

const legalTopics = [
  {
    id: 1,
    title: "Property Contracts",
    content:
      "Our legal team specializes in drafting and reviewing property contracts to ensure all terms are fair and protect your interests. We cover purchase agreements, lease agreements, and more.",
  },
  {
    id: 2,
    title: "Title Searches",
    content:
      "We conduct thorough title searches to verify property ownership and identify any potential liens or encumbrances that could affect your purchase.",
  },
  {
    id: 3,
    title: "Zoning and Land Use",
    content:
      "Our experts can help you navigate complex zoning laws and land use regulations to ensure your property plans comply with local ordinances.",
  },
  {
    id: 4,
    title: "Dispute Resolution",
    content:
      "In case of property disputes, our team offers mediation services and legal representation to protect your rights and interests.",
  },
  {
    id: 5,
    title: "Real Estate Tax Law",
    content:
      "Our tax specialists can guide you through the complexities of real estate taxation, helping you understand your obligations and potential deductions.",
  },
  {
    id: 6,
    title: "Environmental Regulations",
    content:
      "We provide counsel on environmental regulations that may affect your property, including assessments and compliance with local and federal laws.",
  },
]

export default function LegalAssistancePage() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div>
      {/* Header Section */}
      <div className="relative w-full overflow-hidden mt-12 lg:mt-0">
        {/* Background Image */}
        <div className="relative h-[200px]">
          <Image src="/bgheader.png" alt="Legal assistance background" fill className="object-cover brightness-75" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          
          <h1 className="text-4xl sm:text-6xl font-black text-center text-white mb-4">Legal Assistance</h1>
          
          <nav className="flex items-center text-white text-sm mt-2">
            <Link href="/" className="hover:underline opacity-90">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-90" />
            <span className="opacity-90">Services</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
   
      <div className="flex flex-col lg:flex-row gap-10 mt-10 p-6 sm:p-12">
        <div className="w-full lg:w-1/3">
            <ul className="space-y-4">
              {legalTopics.map((topic, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`cursor-pointer p-4 rounded-lg text-gray-900 font-medium shadow-sm transition-all duration-300 ${
                    activeIndex === index ? "bg-red-100 border-l-4 border-red-600 font-semibold" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {index + 1}. {topic.title}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-2/3 bg-white p-8 rounded-lg shadow-md">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-900">{legalTopics[activeIndex].title}</h2>
              <p className="text-gray-700 leading-relaxed text-lg tracking-wide">{legalTopics[activeIndex].content}</p>
            </motion.div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Contact Us for Legal Assistance</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Your Full Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Your Email Address"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-lg font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Your Phone Number"
              />
            </div>
            <div>
              <label htmlFor="topic" className="block text-lg font-medium text-gray-700">
                Legal Topic
              </label>
              <select
                id="topic"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option>Select a topic</option>
                {legalTopics.map((topic) => (
                  <option key={topic.id} value={topic.title}>
                    {topic.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

  )
}

