"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Shield, Umbrella, FileText, ChevronRight, Loader2 } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Image from "next/image"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface ApiResponse {
  success: boolean
  data: {
    id: number
    serviceName: string
    serviceData: HomeInsuranceData
  }[]
}

interface HomeInsuranceData {
  description: string
  insuranceTypes: {
    icon: string
    title: string
    description: string
  }[]
  faqs: {
    question: string
    answer: string
  }[]
  testimonials: {
    name: string
    review: string
    rating: number
  }[]
  cards?: {
    title: string
  }[]
}

const getIconComponent = (iconName: string): LucideIcon => {
  switch (iconName) {
    case "Shield":
      return Shield
    case "Umbrella":
      return Umbrella
    case "FileText":
      return FileText
    default:
      return Shield
  }
}

export default function HomeInsurancePage() {
  const [homeInsuranceData, setHomeInsuranceData] = useState<HomeInsuranceData>({
    description: "",
    insuranceTypes: [],
    faqs: [],
    testimonials: [],
    cards: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "",
    message: "",
    service: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{
    name?: string
    phone?: string
    email?: string
    propertyType?: string
    message?: string
  }>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/services")
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const data: ApiResponse = await response.json()

        const homeInsuranceService = data.data.find(service => service.serviceName === "Home Insurance")

        if (homeInsuranceService) {
          setHomeInsuranceData(homeInsuranceService.serviceData)

          if (homeInsuranceService.serviceData.cards?.length) {
            setFormData(prev => ({
              ...prev,
              service: homeInsuranceService.serviceData.cards![0].title,
            }))
          }
        } else {
          throw new Error("Home Insurance service not found")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load service data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }))
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [id]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors: typeof errors = {}
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("http://localhost:5000/api/home-insurances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      toast.success("Your quote request has been submitted successfully! We will contact you shortly.")
      setFormData({
        name: "",
        phone: "",
        email: "",
        propertyType: "",
        message: "",
        service: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("There was an error submitting your request. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-red-600" />
      </div>
    )
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
        <Image src="/bgheader.png" alt="Home Loan Hero" fill className="object-cover brightness-75" />
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
          {homeInsuranceData.description}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {homeInsuranceData.insuranceTypes.map((insurance, index) => {
            const IconComponent = getIconComponent(insurance.icon)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                whileHover={{ y: -5 }}
              >
                <IconComponent className="text-red-600 w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h2 className="text-2xl font-semibold text-red-900 mb-4">{insurance.title}</h2>
                <p className="text-red-800">{insurance.description}</p>
              </motion.div>
            )
          })}
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
                className={`w-full p-3 border ${
                  errors.name ? "border-red-500" : "border-red-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300`}
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
                className={`w-full p-3 border ${
                  errors.phone ? "border-red-500" : "border-red-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300`}
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
                className={`w-full p-3 border ${
                  errors.email ? "border-red-500" : "border-red-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300`}
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
                className={`w-full p-3 border ${
                  errors.propertyType ? "border-red-500" : "border-red-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300`}
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
            {homeInsuranceData.faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-red-800 mb-2">{faq.question}</h3>
                <p className="text-red-700">{faq.answer}</p>
              </div>
            ))}
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
            {homeInsuranceData.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center text-red-700 font-bold text-xl">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
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
                <p className="text-red-700 italic">"{testimonial.review}"</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
