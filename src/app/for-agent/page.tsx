"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Users, BarChart, Briefcase, Send, Award, TrendingUp, Clock, DollarSign, Target, ChevronDown, ChevronUp } from "lucide-react"
import { FaStar } from "react-icons/fa6"
 import { toast } from 'sonner';
import "react-toastify/dist/ReactToastify.css"

interface Stat {
  icon: string
  number: string
  label: string
}

interface EmpowerCareerItem {
  icon: string
  title: string
  description: string
}

interface ProcessStep {
  number: string
  title: string
  description: string
}

interface Testimonial {
  quote: string
  name: string
  title: string
  image: string
}

interface Benefit {
  icon: string
  title: string
  description: string
}

interface Faq {
  question: string
  answer: string
}

interface SellForAgentData {
  stats: Stat[]
  empowerCareer: EmpowerCareerItem[]
  processSteps: ProcessStep[]
  testimonials: Testimonial[]
  benefits: Benefit[]
  faqs: Faq[]
}

interface ApiResponse {
  success: boolean
  data: {
    id: number
    sellPageName: string
    sellPageData: SellForAgentData
  }[]
}

const SellForAgentPage = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)
  const [pageData, setPageData] = useState<SellForAgentData>({
    stats: [],
    empowerCareer: [],
    processSteps: [],
    testimonials: [],
    benefits: [],
    faqs: [],
  })

  const fetchData = async (): Promise<SellForAgentData> => {
    const response = await fetch("https://api.realestatecompany.co.in/api/sellpages")
    if (!response.ok) throw new Error("Network response was not ok")

    const data: ApiResponse = await response.json()
    const SellForAgent = data.data.find((item) => item.sellPageName === "Sell For Agent")
    if (SellForAgent) {
      return SellForAgent.sellPageData
    }
    throw new Error("Sell For Agent data not found")
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData()
        setPageData(data)
      } catch (error) {
        toast.error("Error loading data")
      }
    }

    loadData()
  }, [])

  const toggleFaq = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index)
  }

  // Function to render icon based on string
  const renderIcon = (iconName: string, size = 24) => {
    switch (iconName) {
      case "CheckCircle":
        return <CheckCircle size={size} />;
      case "Users":
        return <Users size={size} />;
      case "BarChart":
        return <BarChart size={size} />;
      case "Briefcase":
        return <Briefcase size={size} />;
      case "Send":
        return <Send size={size} />;
      case "Award":
        return <Award size={size} />;
      case "TrendingUp":
        return <TrendingUp size={size} />;
      case "Clock":
        return <Clock size={size} />;
      case "DollarSign":
        return <DollarSign size={size} />;
      case "Target":
        return <Target size={size} />;
      default:
        return <CheckCircle size={size} />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <motion.div
        className="relative h-[550px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image src="/bgheader.png" alt="Sell For Agent Hero" fill className="object-cover brightness-50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            className="text-5xl font-extrabold text-white drop-shadow-md mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Sell Property(For Agents)
          </motion.h1>
          <motion.p
            className="text-xl text-white max-w-3xl mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Boost your real estate career with our comprehensive agent support program.
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
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pageData.stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="flex items-center p-6 bg-white rounded-lg shadow-lg"
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-red-600 mr-4">
                {renderIcon(stat.icon, 32)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </motion.div>
          ))}
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
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Empower Your Real Estate Career</h2>
            <p className="text-lg text-gray-600 mb-6">
              As a real estate agent, your success depends on your ability to close deals efficiently. Our Sell For
              Agent program provides the tools, resources, and support you need to excel in your career.
            </p>

            {/* Feature Cards Section */}
            <div className="grid md:grid-cols-2 gap-8">
              {pageData.empowerCareer.map((feature, index) => (
                <FeatureCard 
                  key={index} 
                  icon={renderIcon(feature.icon)} 
                  title={feature.title} 
                  description={feature.description} 
                />
              ))}
            </div>

            <p className="mt-8 text-lg text-gray-600">
              Our platform is built to enhance your productivity and expand your reach in the real estate market. We
              provide cutting-edge technology, comprehensive market data, and a supportive community to help you grow
              your business.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Whether you're a seasoned professional or just starting your real estate career, our Sell For Agent
              program offers the resources and support you need to take your success to the next level.
            </p>
          </motion.div>

          {/* Custom Form Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <AgentRegistrationForm />
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How Our Agent Program Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our streamlined process makes it easy for you to join our network and start benefiting from our
              comprehensive agent support system.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pageData.processSteps.map((process, index) => (
              <ProcessCard
                key={index}
                number={process.number}
                title={process.title}
                description={process.description}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Agents Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from real estate professionals who have transformed their business with our agent program.
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

      {/* Additional Benefits Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Additional Benefits</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our agent program goes beyond the basics to provide you with everything you need to succeed.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageData.benefits.map((benefit, index) => (
              <BenefitCard 
                key={index} 
                icon={renderIcon(benefit.icon)} 
                title={benefit.title} 
                description={benefit.description} 
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our agent program.
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
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Take Your Real Estate Career to the Next Level?
            </h2>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Join thousands of successful agents who have transformed their business with our comprehensive support
              program.
            </p>
            <Link href="#get-started" passHref>
              <motion.button
                className="bg-white text-red-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Feature Card Component
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
      <div className="text-red-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

// Process Card Component
interface ProcessCardProps {
  number: string
  title: string
  description: string
}

const ProcessCard: React.FC<ProcessCardProps> = ({ number, title, description }) => (
  <motion.div
    className="bg-white p-8 rounded-lg shadow-md text-center relative"
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
      {number}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
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
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className="text-yellow-400 w-5 h-5 mx-1" />
      ))}
    </div>
    <p className="text-gray-700 italic mb-6">"{quote}"</p>
    <div className="flex items-center">
      <div className="relative w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
        {image ? (
          <Image src={image} alt={name} layout="fill" objectFit="cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <Users className="w-6 h-6" />
          </div>
        )}
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">{name}</h4>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  </motion.div>
)

// Benefit Card Component
interface BenefitCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <div className="flex items-center mb-4">
      <div className="text-red-600">
        {icon}
      </div>
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

const AgentRegistrationForm = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    yearsExperience: "",
    brokerage: "",
    specialization: "",
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
      const response = await fetch("https://api.realestatecompany.co.in/api/foragent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Thank you for your interest! Our team will contact you shortly to discuss our agent program.")
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          licenseNumber: "",
          yearsExperience: "",
          brokerage: "",
          specialization: "",
          message: "",
        })
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || "Failed to submit your registration. Please try again.")
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
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Join Our Agent Program</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
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
          <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Real Estate License Number
          </label>
          <input
            type="text"
            id="licenseNumber"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            placeholder="Your License Number"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700 mb-1">
              Years of Experience
            </label>
            <select
              id="yearsExperience"
              name="yearsExperience"
              value={formData.yearsExperience}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
              required
            >
              <option value="">Select</option>
              <option value="Less than 1 year">Less than 1 year</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5-10 years">5-10 years</option>
              <option value="10+ years">10+ years</option>
            </select>
          </div>

          <div>
            <label htmlFor="brokerage" className="block text-sm font-medium text-gray-700 mb-1">
              Current Brokerage
            </label>
            <input
              type="text"
              id="brokerage"
              name="brokerage"
              value={formData.brokerage}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
              placeholder="Brokerage Name"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
            Specialization
          </label>
          <select
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            required
          >
            <option value="">Select Your Specialization</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Luxury">Luxury</option>
            <option value="Investment">Investment</option>
            <option value="New Construction">New Construction</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Tell Us About Yourself
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            placeholder="Share your goals, achievements, and what you're looking for in our agent program"
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
              Join Our Network <Send className="ml-2 h-4 w-4" />
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

export default SellForAgentPage