"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Umbrella, FileText, ChevronRight, Loader2 } from "lucide-react"
import Image from "next/image"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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
  // Form state
  const [formData, setFormData] = useState<{
    name: string
    phone: string
    email: string
    propertyType: string
    message: string
  }>({
    name: "",
    phone: "",
    email: "",
    propertyType: "",
    message: "",
  })

  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form validation state
  const [errors, setErrors] = useState<{
    name?: string
    phone?: string
    email?: string
    propertyType?: string
    message?: string
  }>({})

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))

    // Clear error when user types
    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: {
      name?: string
      phone?: string
      email?: string
      propertyType?: string
      message?: string
    } = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.propertyType || formData.propertyType === "Select property type") {
      newErrors.propertyType = "Please select a property type"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("https://realestateapi-x9de.onrender.com/api/home-insurances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      const data = await response.json()

      // Show success message
      toast.success("Your quote request has been submitted successfully! We will contact you shortly.")

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        propertyType: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("There was an error submitting your request. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 mt-10 lg:mt-0">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="relative h-[200px]">
             <Image
               src="/bgheader.png"
               alt="Home Loan Hero"
               fill
               className="object-cover brightness-75"
             />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Page Title */}
          <h1 className="text-4xl sm:text-6xl font-bold text-white text-center drop-shadow-lg">Home Insurance</h1>
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
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              whileHover={{ y: -5 }}
            >
              <insurance.icon className="text-red-600 w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h2 className="text-2xl font-semibold text-red-900 mb-4">{insurance.title}</h2>
              <p className="text-red-800">{insurance.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-red-900 text-center">Get a Quote</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-red-800 mb-2">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.name ? "border-red-500" : "border-red-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300`}
                placeholder="Your Full Name"
              />
              {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-lg font-medium text-red-800 mb-2">
                Phone <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.phone ? "border-red-500" : "border-red-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300`}
                placeholder="Your Phone Number"
              />
              {errors.phone && <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium text-red-800 mb-2">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.email ? "border-red-500" : "border-red-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300`}
                placeholder="Your Email Address"
              />
              {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="propertyType" className="block text-lg font-medium text-red-800 mb-2">
                Property Type <span className="text-red-600">*</span>
              </label>
              <select
                id="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.propertyType ? "border-red-500" : "border-red-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300`}
              >
                <option>Select property type</option>
                <option value="single-family">Single Family Home</option>
                <option value="condo">Condominium</option>
                <option value="townhouse">Townhouse</option>
                <option value="multi-family">Multi-Family Home</option>
                <option value="mobile-home">Mobile Home</option>
                <option value="rental">Rental Property</option>
              </select>
              {errors.propertyType && <p className="mt-1 text-red-500 text-sm">{errors.propertyType}</p>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-lg font-medium text-red-800 mb-2">
                Additional Information
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                placeholder="Tell us more about your insurance needs (property size, value, special items to insure, etc.)"
              ></textarea>
            </div>

            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Processing...
                  </>
                ) : (
                  "Get Free Quote"
                )}
              </button>
              <p className="text-sm text-red-700 mt-4">
                * Required fields. By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </div>
          </form>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-red-900 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-red-800 mb-2">What does home insurance typically cover?</h3>
              <p className="text-red-700">
                Standard home insurance policies typically cover your dwelling, personal property, liability protection,
                and additional living expenses if you're temporarily displaced.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-red-800 mb-2">How much home insurance do I need?</h3>
              <p className="text-red-700">
                You should have enough coverage to rebuild your home and replace your belongings. Our agents can help
                you determine the right amount based on your specific situation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-red-800 mb-2">Are natural disasters covered?</h3>
              <p className="text-red-700">
                Most standard policies cover certain natural disasters, but others like floods and earthquakes typically
                require separate policies. We can help you understand what's covered.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-red-800 mb-2">How can I lower my premium?</h3>
              <p className="text-red-700">
                You may qualify for discounts by bundling policies, installing security systems, raising your
                deductible, or making home improvements. Contact us to learn about available discounts.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 mb-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-red-900 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center text-red-700 font-bold text-xl">
                  JD
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Priya Tiwari</h3>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-red-700 italic">
                "The claims process was incredibly smooth. After a storm damaged our roof, they handled everything
                efficiently and we had repairs completed within weeks."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center text-red-700 font-bold text-xl">
                  JS
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Sakib Shaikh</h3>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-red-700 italic">
                "I saved over ₹30000 a year by switching to their home insurance. The agent took the time to explain all
                my coverage options and found me the best deal."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center text-red-700 font-bold text-xl">
                  RJ
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Rahul Mishra</h3>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-red-700 italic">
                "Their customer service is exceptional. Any time I've had questions about my policy, they've been quick
                to respond and always helpful. Highly recommend!"
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

