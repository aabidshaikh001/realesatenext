"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Home, DollarSign, Calculator, ChevronRight, Check } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Image from "next/image"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Link from "next/link"

const loanTypes: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Home,
    title: "Fixed Rate Mortgage",
    description: "Stable, predictable payments over the life of your loan.",
  },
  {
    icon: DollarSign,
    title: "Adjustable Rate Mortgage",
    description: "Potentially lower initial rates with future adjustments.",
  },
  {
    icon: Calculator,
    title: "FHA Loans",
    description: "Government-backed loans with more flexible requirements.",
  },
]

export default function HomeLoanPage() {
  const [hoveredLoan, setHoveredLoan] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    loanType: "",
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
      const response = await fetch("https://realestateapi-x9de.onrender.com/api/home-loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Thank you for your application! Our loan specialist will contact you shortly.")
        setFormData({
          name: "",
          phone: "",
          email: "",
          loanType: "",
          message: "",
        })
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || "Failed to submit your application. Please try again.")
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
          alt="Home Loan Hero"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Page Title */}
          <h1 className="text-4xl sm:text-6xl font-bold text-white text-center">Home Loan</h1>
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
          Discover flexible home loan options tailored to your needs. Our expert team is here to guide you through the
          process and help you make informed decisions.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {loanTypes.map((loan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              onMouseEnter={() => setHoveredLoan(index)}
              onMouseLeave={() => setHoveredLoan(null)}
            >
              <loan.icon className="text-red-600 w-12 h-12 mb-4" />
              <h2 className="text-2xl font-semibold text-red-900 mb-4">{loan.title}</h2>
              <p className="text-red-800">{loan.description}</p>
              {hoveredLoan === index && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                  <Link href="#home-loan">
                  <button className="text-red-600 font-medium hover:text-red-800 transition-colors">
                    Learn more →
                  </button>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-6 text-red-900 text-center">Apply for a Home Loan</h2>
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
                Mobile Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                placeholder="Your Mobile Number"
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
              <label htmlFor="loanType" className="block text-lg font-medium text-red-800 mb-2">
                Loan Type
              </label>
              <select
                id="loanType"
                name="loanType"
                value={formData.loanType}
                onChange={handleInputChange}
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                required
              >
                <option value="">Select a loan type</option>
                {loanTypes.map((loan, index) => (
                  <option key={index} value={loan.title}>
                    {loan.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-lg font-medium text-red-800 mb-2">
                Additional Information
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                placeholder="Tell us more about your loan requirements"
                required
              ></textarea>
            </div>
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Apply Now"}
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16" id="home-loan">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-red-900">Loan Application Process</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-red-100 rounded-full p-2 mr-4 mt-1">
                  <span className="text-red-600 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-red-900 mb-1">Application Submission</h4>
                  <p className="text-red-800">Complete our simple online application form with your details.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-red-100 rounded-full p-2 mr-4 mt-1">
                  <span className="text-red-600 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-red-900 mb-1">Document Verification</h4>
                  <p className="text-red-800">Our team will verify your documents and assess your eligibility.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-red-100 rounded-full p-2 mr-4 mt-1">
                  <span className="text-red-600 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-red-900 mb-1">Loan Approval</h4>
                  <p className="text-red-800">Receive your loan approval and finalize the terms.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-red-100 rounded-full p-2 mr-4 mt-1">
                  <span className="text-red-600 font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-red-900 mb-1">Disbursement</h4>
                  <p className="text-red-800">Funds are disbursed according to the agreed terms.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-red-900">Why Choose Our Home Loans</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="text-red-600 h-5 w-5 mr-2 mt-1" />
                <span className="text-red-800">Competitive interest rates tailored to your financial situation</span>
              </li>
              <li className="flex items-start">
                <Check className="text-red-600 h-5 w-5 mr-2 mt-1" />
                <span className="text-red-800">Flexible repayment options to suit your budget</span>
              </li>
              <li className="flex items-start">
                <Check className="text-red-600 h-5 w-5 mr-2 mt-1" />
                <span className="text-red-800">Quick approval process with minimal documentation</span>
              </li>
              <li className="flex items-start">
                <Check className="text-red-600 h-5 w-5 mr-2 mt-1" />
                <span className="text-red-800">Dedicated loan officer to guide you through the process</span>
              </li>
              <li className="flex items-start">
                <Check className="text-red-600 h-5 w-5 mr-2 mt-1" />
                <span className="text-red-800">No hidden fees or prepayment penalties</span>
              </li>
              <li className="flex items-start">
                <Check className="text-red-600 h-5 w-5 mr-2 mt-1" />
                <span className="text-red-800">Special rates for first-time homebuyers</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-red-900 text-center">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-red-900 mb-2">What documents do I need to apply?</h4>
              <p className="text-red-800">
                You'll need identification, proof of income, employment verification, and details about the property
                you're interested in purchasing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-red-900 mb-2">How long does the approval process take?</h4>
              <p className="text-red-800">
                Most applications are processed within 3-5 business days, though complex cases may take longer.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-red-900 mb-2">What credit score do I need to qualify?</h4>
              <p className="text-red-800">
                While we consider various factors, a credit score of 620 or higher typically qualifies for most loan
                programs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-red-900 mb-2">Can I pay off my loan early?</h4>
              <p className="text-red-800">
                Yes, we offer flexible repayment options with no prepayment penalties on most of our loan products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

