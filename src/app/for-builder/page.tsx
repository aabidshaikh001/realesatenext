"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  CheckCircle,
  DollarSign,
  Users,
  BarChart,
  Send,
  Award,
  TrendingUp,
  Clock,
  Target,
  Building,
  Home,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Layers,
} from "lucide-react"
import { FaStar } from "react-icons/fa6"
 import { toast } from 'sonner';
import "react-toastify/dist/ReactToastify.css"

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

interface ProcessStepData {
  number: string
  title: string
  description: string
  icon: string
}

interface TestimonialData {
  quote: string
  name: string
  title: string
  image: string
}

interface ServiceData {
  icon: string
  title: string
  description: string
}

interface FaqData {
  question: string
  answer: string
}

interface PageData {
  statCards: StatCardData[]
  whyChooseUs: FeatureCardData[]
  ourProcess: ProcessStepData[]
  testimonials: TestimonialData[]
  services: ServiceData[]
  faqs: FaqData[]
}

interface ApiResponse {
  success: boolean
  data: {
    id: number
    sellPageName: string
    sellPageData: PageData
  }[]
}

const SellForBuilderPage = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)
  const [pageData, setPageData] = useState<PageData>({
    statCards: [],
    whyChooseUs: [],
    ourProcess: [],
    testimonials: [],
    services: [],
    faqs: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async (): Promise<PageData> => {
    try {
      const response = await fetch("http://localhost:5000/api/sellpages")
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ApiResponse = await response.json()
      
      if (!data.success) {
        throw new Error("API response was not successful")
      }

      const builderPage = data.data.find((item) => item.sellPageName === "Sell For Builder")
      if (!builderPage) {
        throw new Error("Sell For Builder data not found in response")
      }

      return builderPage.sellPageData
    } catch (error) {
      console.error("Error fetching data:", error)
      throw new Error("Failed to fetch page data. Please try again later.")
    }
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchData()
        setPageData(data)
      } catch (err) {
        const message = err instanceof Error ? err.message : "An unknown error occurred"
        setError(message)
        toast.error(message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Function to render icon based on string
  const renderIcon = (iconName: string, size = 24, className = "") => {
    const iconProps = { size, className: `text-red-600 ${className}` }
    switch (iconName) {
      case "CheckCircle":
      case "check-circle":
        return <CheckCircle {...iconProps} />
      case "DollarSign":
      case "dollar-sign":
        return <DollarSign {...iconProps} />
      case "Users":
      case "users":
        return <Users {...iconProps} />
      case "BarChart":
      case "bar-chart":
        return <BarChart {...iconProps} />
      case "Send":
        return <Send {...iconProps} />
      case "Award":
        return <Award {...iconProps} />
      case "TrendingUp":
      case "trending-up":
        return <TrendingUp {...iconProps} />
      case "Clock":
      case "clock":
        return <Clock {...iconProps} />
      case "Target":
      case "target":
        return <Target {...iconProps} />
      case "Building":
      case "building":
        return <Building {...iconProps} />
      case "Home":
      case "home":
        return <Home {...iconProps} />
      case "Briefcase":
      case "briefcase":
        return <Briefcase {...iconProps} />
      case "Layers":
      case "layers":
        return <Layers {...iconProps} />
      case "star":
      case "Star":
        return <FaStar className={`text-red-600 ${className}`} size={size} />
      default:
        return <CheckCircle {...iconProps} />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading page data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
    <div></div>
    )
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
        <Image src="/bgheader.png" alt="Sell For Builder Hero" fill className="object-cover brightness-50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            className="text-5xl font-extrabold text-white drop-shadow-md mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Sell Property(For Builder)
          </motion.h1>
          <motion.p
            className="text-xl text-white max-w-3xl mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Expert solutions for builders to maximize sales, target the right buyers, and close deals efficiently.
          </motion.p>
          <Link href="#get-started" passHref>
            <motion.button
              className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-red-600/90 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </Link>
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
            {pageData.statCards.map((stat, index) => (
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

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-16" id="get-started">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            className="lg:col-span-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Our Builder Sales Solutions?</h2>
            <p className="text-lg text-gray-600 mb-6">
              Our proven strategies help builders streamline sales, reach serious buyers, and close deals efficiently.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {pageData.whyChooseUs.map((feature, index) => (
                <FeatureCard 
                  key={index} 
                  icon={renderIcon(feature.icon, 40)} 
                  title={feature.title} 
                  description={feature.description} 
                />
              ))}
            </div>

            <p className="mt-8 text-lg text-gray-600">
              Our team helps builders implement seamless sales strategies to drive results and minimize delays.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Let us handle the complexities while you focus on creating exceptional properties.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <BuilderSalesForm />
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We've developed a streamlined approach to help builders sell properties quickly and at optimal prices.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {pageData.ourProcess.map((process, index) => (
              <ProcessCard
                key={index}
                number={process.number}
                title={process.title}
                description={process.description}
                icon={renderIcon(process.icon, 24, "text-white")}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Builders Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from builders who have partnered with us to accelerate their sales.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pageData.testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
                image={testimonial.image}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Additional Services Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Comprehensive Builder Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Beyond sales, we offer a range of services to support builders throughout the development lifecycle.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageData.services.map((service, index) => (
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
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Common questions from builders about our sales solutions.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {pageData.faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
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
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Accelerate Your Project Sales?</h2>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Partner with the experts in new construction sales to maximize your project's potential.
            </p>
            <Link href="#get-started" passHref>
              <motion.button
                className="bg-white text-red-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request a Consultation
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
  


interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-600 hover:shadow-lg transition-shadow"
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

// Stat Card Component
interface StatCardProps {
  icon: React.ReactNode
  number: string
  label: string
}

const StatCard: React.FC<StatCardProps> = ({ icon, number, label }) => (
  <motion.div className="text-center p-6" whileHover={{ y: -5, transition: { duration: 0.2 } }}>
    <div className="flex justify-center mb-3">{icon}</div>
    <h3 className="text-3xl font-bold text-gray-800 mb-1">{number}</h3>
    <p className="text-gray-600">{label}</p>
  </motion.div>
)

// Process Card Component
interface ProcessCardProps {
  number: string
  title: string
  description: string
  icon: React.ReactNode
}

const ProcessCard: React.FC<ProcessCardProps> = ({ number, title, description, icon }) => (
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

// Testimonial Card Component
interface TestimonialCardProps {
  quote: string
  name: string
  title: string
  image: string
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title, image }) => (
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
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  </motion.div>
)

// Service Card Component
interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
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

// FAQ Item Component
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

const BuilderSalesForm = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    projectType: "",
    projectLocation: "",
    numberOfUnits: "",
    priceRange: "",
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
      const response = await fetch("http://localhost:5000/api/forbuilder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Thank you for your interest! Our team will contact you shortly to discuss your project.")
        setFormData({
          companyName: "",
          contactPerson: "",
          email: "",
          phone: "",
          projectType: "",
          projectLocation: "",
          numberOfUnits: "",
          priceRange: "",
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
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Request Our Services</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
            Company/Builder Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            placeholder="Your Company Name"
            required
          />
        </div>

        <div>
          <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
            Contact Person
          </label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            placeholder="Your Name"
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
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
            Project Type
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            required
          >
            <option value="">Select Project Type</option>
            <option value="Residential Apartments">Residential Apartments</option>
            <option value="Villas">Villas</option>
            <option value="Townhouses">Townhouses</option>
            <option value="Commercial">Commercial</option>
            <option value="Mixed Use">Mixed Use</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="projectLocation" className="block text-sm font-medium text-gray-700 mb-1">
            Project Location
          </label>
          <input
            type="text"
            id="projectLocation"
            name="projectLocation"
            value={formData.projectLocation}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            placeholder="City, Area or Address"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="numberOfUnits" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Units
            </label>
            <input
              type="number"
              id="numberOfUnits"
              name="numberOfUnits"
              value={formData.numberOfUnits}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
              placeholder="Total Units"
              required
            />
          </div>

          <div>
            <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
              Price Range
            </label>
            <input
              type="text"
              id="priceRange"
              name="priceRange"
              value={formData.priceRange}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
              placeholder="e.g. $500K-$1M"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Project Details
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            placeholder="Tell us more about your project and sales requirements"
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
              Submit Request <Send className="ml-2 h-4 w-4" />
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

export default SellForBuilderPage
