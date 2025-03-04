"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Loader2 } from "lucide-react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Define interfaces for type safety
interface LegalTopic {
  id: number
  title: string
  content: string
}

interface FormData {
  fullName: string
  email: string
  phoneNumber: string
  whatsAppNumber: string
  legaltopic: string
  message: string
}

interface FormErrors {
  name: string
  email: string
  phoneNumber: string
  topic: string
  message: string
}

const legalTopics: LegalTopic[] = [
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
  const [usePhoneForWhatsApp, setUsePhoneForWhatsApp] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    whatsAppNumber: "",
    legaltopic: "",
    message: "",
  })

  // Form validation errors
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    phoneNumber: "",
    topic: "",
    message: "",
  })

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target

    // Type guard to ensure id is a valid key of FormData
    if (id === "fullName" || id === "email" || id === "phoneNumber" || id === "whatsAppNumber" || id === "message") {
      setFormData({
        ...formData,
        [id]: value,
      })

      // Clear error when user types (only for fields that have error states)
      if (id === "fullName" || id === "email" || id === "phoneNumber" || id === "message") {
        setErrors({
          ...errors,
          [id]: "",
        })
      }

      // Update WhatsApp number if checkbox is checked
      if (id === "phoneNumber" && usePhoneForWhatsApp) {
        setFormData((prev) => ({
          ...prev,
          whatsAppNumber: value,
        }))
      }
    }
  }

  // Handle select change
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      legaltopic: e.target.value,
    })

    // Clear error
    setErrors({
      ...errors,
      topic: "",
    })
  }

  // Handle checkbox change
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    setUsePhoneForWhatsApp(isChecked)

    if (isChecked) {
      setFormData((prev) => ({
        ...prev,
        whatsAppNumber: formData.phoneNumber,
      }))
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    let isValid = true
    const newErrors: FormErrors = { ...errors }

    // Validate name
    if (!formData.fullName.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required"
      isValid = false
    }

    // Validate phone
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
      isValid = false
    }

    // Validate topic
    if (!formData.legaltopic || formData.legaltopic === "Select a topic") {
      newErrors.topic = "Please select a topic"
      isValid = false
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("http://localhost:5000/api/legal-assistance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      await response.json()

      // Show success message
      toast.success("Your consultation request has been submitted successfully!")

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        whatsAppNumber: "",
        legaltopic: "",
        message: "",
      })
    } catch (error) {
      console.error("Submission error:", error)
      toast.error("Failed to submit your request. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Container for notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

      {/* Header Section */}
      <div className="relative w-full overflow-hidden mt-12 lg:mt-0">
        {/* Background Image */}
        <div className="relative h-[200px]">
          <Image src="/bgheader.png" alt="Legal assistance background" fill className="object-cover brightness-75" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl sm:text-6xl font-black text-center text-white mb-4">Legal Assistance</h1>

          <nav className="flex items-center text-white text-sm mt-2">
            <Link href="/" className="hover:underline opacity-90">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-90" />
            <span className="opacity-90">Services</span>
          </nav>
        </div>
      </div>

      {/* Main Content with 3-column layout */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Topics List */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Legal Topics</h3>
              <ul className="space-y-3">
                {legalTopics.map((topic, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`cursor-pointer p-3 rounded-lg text-gray-900 font-medium transition-all duration-300 ${
                      activeIndex === index ? "bg-red-100 border-l-4 border-red-600 font-semibold" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    {index + 1}. {topic.title}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Middle Column - Content */}
          <div className="w-full lg:w-2/5">
            <div className="bg-white p-8 rounded-lg shadow-md h-full">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full flex flex-col"
              >
                <h2 className="text-3xl font-bold mb-6 text-gray-900">{legalTopics[activeIndex].title}</h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">{legalTopics[activeIndex].content}</p>

                <div className="mt-auto">
                  <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Why Choose Our Legal Services?</h4>
                    <p className="text-gray-700">
                      With over 20 years of experience in real estate law, our team provides expert guidance tailored to
                      your specific needs. We pride ourselves on clear communication and personalized attention to every
                      client.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column - CTA Form */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Get Legal Assistance</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Your Full Name"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Your Email Address"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${
                      errors.phoneNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Your Phone Number"
                  />
                  {errors.phoneNumber && <p className="mt-1 text-xs text-red-600">{errors.phoneNumber}</p>}
                </div>

                <div className="mt-4">
                  <label htmlFor="whatsAppNumber" className="block text-sm font-medium text-gray-700">
                    WhatsApp Number
                  </label>
                  <div className="flex flex-col space-y-2">
                    <input
                      type="tel"
                      id="whatsAppNumber"
                      value={formData.whatsAppNumber}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="Your WhatsApp Number"
                    />
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="usePhoneForWhatsApp"
                        checked={usePhoneForWhatsApp}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label htmlFor="usePhoneForWhatsApp" className="ml-2 block text-sm text-gray-700">
                        Use phone number for WhatsApp
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
                    Legal Topic <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="topic"
                    value={formData.legaltopic}
                    onChange={handleSelectChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${
                      errors.topic ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option>Select a topic</option>
                    {legalTopics.map((topic) => (
                      <option key={topic.id} value={topic.title}>
                        {topic.title}
                      </option>
                    ))}
                  </select>
                  {errors.topic && <p className="mt-1 text-xs text-red-600">{errors.topic}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="How can we help you?"
                  ></textarea>
                  {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Request Consultation"
                  )}
                </motion.button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Our team will contact you within 24 hours to discuss your legal needs.
                </p>
              </form>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 text-center italic">
                  "Their legal team helped me navigate a complex property dispute with excellent results."
                </p>
                <p className="text-xs text-gray-500 text-center mt-2">— Sarah Johnson, Satisfied Client</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

