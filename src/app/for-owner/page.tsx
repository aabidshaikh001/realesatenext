"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  DollarSign,
  Users,
  Send,
  Home,
  Clock,
  Camera,
  FileText,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Percent,
  Shield,
} from "lucide-react"
import { FaStar } from "react-icons/fa6"
 import { toast } from 'sonner';
import "react-toastify/dist/ReactToastify.css"

// TypeScript Interfaces
interface StatCardData {
  icon: string
  number: string
  label: string
}

interface FeatureCardData {
  icon: string
  title: string
  description: string
}

interface ProcessCardData {
  number: string
  title: string
  description: string
  icon: string
}

interface TestimonialCardData {
  quote: string
  name: string
  property: string
  image: string
}

interface ServiceCardData {
  icon: string
  title: string
  description: string
}

interface FAQItemData {
  question: string
  answer: string
}

interface PageData {
  stats: StatCardData[]
  whyChooseUs: {
    title: string
    features: FeatureCardData[]
    description1: string
    description2: string
  }
  howItWorks: {
    title: string
    description: string
    steps: ProcessCardData[]
  }
  testimonials: {
    title: string
    description: string
    items: TestimonialCardData[]
  }
  services: {
    title: string
    description: string
    items: ServiceCardData[]
  }
  faq: {
    title: string
    description: string
    items: FAQItemData[]
  }
}

interface ApiResponse {
  success: boolean
  data: {
    id: number
    sellPageName: string  // Changed from pageName to sellPageName
    sellPageData: PageData  // Changed from pageData to sellPageData
  }[]
}

const SellForOwnerPage = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)
  const [pageData, setPageData] = useState<PageData>({
    stats: [],
    whyChooseUs: {
      title: "",
      features: [],
      description1: "",
      description2: ""
    },
    howItWorks: {
      title: "",
      description: "",
      steps: []
    },
    testimonials: {
      title: "",
      description: "",
      items: []
    },
    services: {
      title: "",
      description: "",
      items: []
    },
    faq: {
      title: "",
      description: "",
      items: []
    }
  })

  const fetchData = async (): Promise<PageData> => {
    const response = await fetch("https://api.realestatecompany.co.in/api/sellpages")
    if (!response.ok) throw new Error("Network response was not ok")

    const data: ApiResponse = await response.json()
    const ownerPage = data.data.find((item) => item.sellPageName === "Sell For Owner")
    if (ownerPage) {
      return ownerPage.sellPageData
    }
    throw new Error("Sell For Owner data not found")
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData()
        setPageData(data)
      } catch (error) {
        toast.error("Error loading data")
        console.error("Error loading data:", error)
      }
    }

    loadData()
  }, [])

  const toggleFaq = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index)
  }

  // Function to render icon based on string
  const renderIcon = (iconName: string, size = 24, className = "") => {
    const iconProps = { size, className: `text-red-600 ${className}` }
    switch (iconName) {
      case "ArrowRight":
        return <ArrowRight {...iconProps} />
      case "CheckCircle":
        return <CheckCircle {...iconProps} />
      case "DollarSign":
        return <DollarSign {...iconProps} />
      case "Users":
        return <Users {...iconProps} />
      case "Send":
        return <Send {...iconProps} />
      case "Home":
        return <Home {...iconProps} />
      case "Clock":
        return <Clock {...iconProps} />
      case "Camera":
        return <Camera {...iconProps} />
      case "FileText":
        return <FileText {...iconProps} />
      case "MessageSquare":
        return <MessageSquare {...iconProps} />
      case "TrendingUp":
        return <TrendingUp {...iconProps} />
      case "Percent":
        return <Percent {...iconProps} />
      case "Shield":
        return <Shield {...iconProps} />
      case "FaStar":
        return <FaStar className={`text-red-600 ${className}`} size={size} />
      default:
        return <CheckCircle {...iconProps} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      

      {/* Hero Section */}
      <motion.div
        className="relative h-[550px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image src="/bgheader.png" alt="Sell For Owner Hero" fill className="object-cover brightness-50" />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center max-w-4xl px-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-white mb-6">Sell Property(For Owner)</h1>
            <p className="text-xl text-white mb-8">
              Maximize the value of your property with our expert selling services
            </p>
            <Link href="#get-started" passHref>
              <motion.button
                className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="bg-white py-12 shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {pageData.stats.map((stat, index) => (
              <StatCard 
                key={index} 
                icon={renderIcon(stat.icon, 32)} 
                number={stat.number} 
                label={stat.label} 
              />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16" id="get-started">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            className="lg:col-span-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">{pageData.whyChooseUs.title}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {pageData.whyChooseUs.features.map((feature, index) => (
                <FeatureCard 
                  key={index} 
                  icon={renderIcon(feature.icon, 32)} 
                  title={feature.title} 
                  description={feature.description} 
                />
              ))}
            </div>
            <p className="mt-8 text-lg text-gray-600">{pageData.whyChooseUs.description1}</p>
            <p className="mt-4 text-lg text-gray-600">{pageData.whyChooseUs.description2}</p>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <PropertyOwnerForm />
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{pageData.howItWorks.title}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{pageData.howItWorks.description}</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {pageData.howItWorks.steps.map((step, index) => (
              <ProcessCard
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
                icon={renderIcon(step.icon, 24, "text-white")}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{pageData.testimonials.title}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{pageData.testimonials.description}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pageData.testimonials.items.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </div>

      {/* Additional Services Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{pageData.services.title}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{pageData.services.description}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageData.services.items.map((service, index) => (
              <ServiceCard 
                key={index} 
                icon={renderIcon(service.icon, 32)} 
                title={service.title} 
                description={service.description} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{pageData.faq.title}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{pageData.faq.description}</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {pageData.faq.items.map((faq, index) => (
              <FAQItem
                key={index}
                {...faq}
                index={index}
                activeQuestion={activeQuestion}
                setActiveQuestion={setActiveQuestion}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-red-600 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Sell Your Property?</h2>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Take the first step toward a successful sale. Our experts are ready to help you maximize your property's
              value.
            </p>
            <Link href="#get-started" passHref>
              <motion.button
                className="bg-white text-red-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Component Definitions (keep these the same as in your original code)
const StatCard: React.FC<{ icon: React.ReactNode; number: string; label: string }> = ({ icon, number, label }) => (
  <motion.div className="text-center p-6" whileHover={{ y: -5, transition: { duration: 0.2 } }}>
    <div className="flex justify-center mb-3">{icon}</div>
    <h3 className="text-3xl font-bold text-gray-800 mb-1">{number}</h3>
    <p className="text-gray-600">{label}</p>
  </motion.div>
)

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <motion.div className="bg-white p-6 rounded-lg shadow-md" whileHover={{ y: -5, transition: { duration: 0.2 } }}>
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

const ProcessCard: React.FC<{ number: string; title: string; description: string; icon: React.ReactNode }> = ({ number, title, description, icon }) => (
  <motion.div
    className="bg-white p-8 rounded-lg shadow-md text-center relative"
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
    <div className="absolute top-4 left-4 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-sm font-bold text-red-600">
      {number}
    </div>
  </motion.div>
)

const TestimonialCard: React.FC<{ quote: string; name: string; property: string; image: string }> = ({ quote, name, property, image }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-600"
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <div className="flex justify-center mb-4">
      <FaStar className="text-yellow-400 w-6 h-6" />
      <FaStar className="text-yellow-400 w-6 h-6" />
      <FaStar className="text-yellow-400 w-6 h-6" />
      <FaStar className="text-yellow-400 w-6 h-6" />
      <FaStar className="text-yellow-400 w-6 h-6" />
    </div>
    <p className="text-gray-700 italic mb-6">"{quote}"</p>
    <div className="flex items-center">
      <Image src={image || "/placeholder.svg"} alt={name} width={50} height={50} className="rounded-full mr-4" />
      <div>
        <h4 className="font-semibold text-gray-800">{name}</h4>
        <p className="text-sm text-gray-600">{property}</p>
      </div>
    </div>
  </motion.div>
)

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-lg font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm">{description}</p>
  </motion.div>
)

interface FAQItemProps {
  question: string
  answer: string
  index: number
  activeQuestion: number | null
  setActiveQuestion: (index: number | null) => void
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, index, activeQuestion, setActiveQuestion }) => (
  <div className="border-b border-gray-200 py-4">
    <button
      className="flex justify-between items-center w-full text-left font-semibold text-gray-800"
      onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
    >
      <span>{question}</span>
      {activeQuestion === index ? (
        <ChevronUp className="w-5 h-5 text-red-600" />
      ) : (
        <ChevronDown className="w-5 h-5 text-red-600" />
      )}
    </button>
    {activeQuestion === index && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-2 text-gray-600"
      >
        {answer}
      </motion.div>
    )}
  </div>
)

const PropertyOwnerForm = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    propertyLocation: "",
    expectedPrice: "",
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
      const response = await fetch("https://api.realestatecompany.co.in/api/forowner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Thank you for your interest! Our team will contact you shortly.")
        setFormData({
          name: "",
          email: "",
          phone: "",
          propertyType: "",
          propertyLocation: "",
          expectedPrice: "",
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
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Show Interest</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            placeholder="Your Full Name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            placeholder="Your Email Address"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            placeholder="Your Phone Number"
            required
          />
        </div>

        <div>
          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <select
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            required
          >
            <option value="">Select Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Land">Land</option>
            <option value="Commercial">Commercial Property</option>
          </select>
        </div>

        <div>
          <label htmlFor="propertyLocation" className="block text-sm font-medium text-gray-700 mb-1">
            Property Location
          </label>
          <input
            type="text"
            id="propertyLocation"
            name="propertyLocation"
            value={formData.propertyLocation}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            placeholder="City, Area or Address"
            required
          />
        </div>

        <div>
          <label htmlFor="expectedPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Expected Price (Optional)
          </label>
          <input
            type="text"
            id="expectedPrice"
            name="expectedPrice"
            value={formData.expectedPrice}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            placeholder="Your Expected Price"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Details
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            placeholder="Tell us more about your property"
            required
          ></textarea>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? (
            "Submitting..."
          ) : (
            <>
              Submit <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </motion.button>

        <p className="text-xs text-gray-500 text-center mt-4">
          By submitting this form, you agree to our privacy policy and terms of service.
        </p>
      </form>
    </div>
  )
}

export default SellForOwnerPage