"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
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
import { FaStar } from "react-icons/fa6";
import Link from "next/link"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const SellForOwnerPage = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <ToastContainer />
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
            <StatCard icon={<Home className="w-8 h-8 text-red-600" />} number="1,500+" label="Properties Sold" />
            <StatCard
              icon={<DollarSign className="w-8 h-8 text-red-600" />}
              number="98%"
              label="Asking Price Achieved"
            />
            <StatCard icon={<Clock className="w-8 h-8 text-red-600" />} number="45" label="Days Average Selling Time" />
            <StatCard icon={<FaStar className="w-8 h-8 text-red-600" />} number="4.9/5" label="Client Satisfaction" />
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
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Our Sell For Owner Service?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <FeatureCard
                icon={<CheckCircle className="w-8 h-8 text-red-600" />}
                title="Professional Valuation"
                description="Get an accurate assessment of your property's worth in the current market."
              />
              <FeatureCard
                icon={<Users className="w-8 h-8 text-red-600" />}
                title="Wide Buyer Network"
                description="Access our extensive network of qualified potential buyers."
              />
              <FeatureCard
                icon={<DollarSign className="w-8 h-8 text-red-600" />}
                title="Maximize Sale Price"
                description="Our expert negotiation support helps you get the best deal possible."
              />
              <FeatureCard
                icon={<ArrowRight className="w-8 h-8 text-red-600" />}
                title="Streamlined Process"
                description="We guide you through every step, from listing to closing the deal."
              />
            </div>
            <p className="mt-8 text-lg text-gray-600">
              Our team of experienced real estate professionals understands the local market trends and buyer
              preferences. We'll work tirelessly to showcase your property's unique features and attract qualified
              buyers.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              From setting the right price to closing the deal, we're committed to making your property sale a smooth
              and profitable experience. Let us handle the complexities while you focus on your next move.
            </p>
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our simple 4-step process makes selling your property easy and stress-free.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            <ProcessCard
              number="1"
              title="Free Consultation"
              description="We evaluate your property and discuss your selling goals."
              icon={<MessageSquare className="w-6 h-6 text-white" />}
            />
            <ProcessCard
              number="2"
              title="Property Preparation"
              description="We help you prepare your property to maximize its appeal to buyers."
              icon={<Camera className="w-6 h-6 text-white" />}
            />
            <ProcessCard
              number="3"
              title="Strategic Marketing"
              description="We implement targeted marketing to reach qualified buyers."
              icon={<Users className="w-6 h-6 text-white" />}
            />
            <ProcessCard
              number="4"
              title="Closing the Deal"
              description="We handle negotiations and paperwork to finalize the sale."
              icon={<FileText className="w-6 h-6 text-white" />}
            />
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from property owners who successfully sold their properties with our help.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="I was amazed at how quickly they sold my apartment. The valuation was spot on, and they found a buyer within three weeks!"
              name="Sarah Johnson"
              property="2-Bedroom Apartment"
              image="/placeholder.svg?height=100&width=100"
            />
            <TestimonialCard
              quote="Their marketing strategy made all the difference. My house had been listed elsewhere for months with no success. They sold it in just 40 days."
              name="Michael Chen"
              property="Single Family Home"
              image="/placeholder.svg?height=100&width=100"
            />
            <TestimonialCard
              quote="The team guided me through every step of the process. As a first-time seller, their expertise was invaluable and helped me get top dollar for my property."
              name="Emma Rodriguez"
              property="Luxury Condo"
              image="/placeholder.svg?height=100&width=100"
            />
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Comprehensive Seller Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a range of services to ensure your property sells quickly and at the best possible price.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Camera className="w-8 h-8 text-red-600" />}
              title="Professional Photography"
              description="High-quality photos and virtual tours to showcase your property's best features."
            />
            <ServiceCard
              icon={<TrendingUp className="w-8 h-8 text-red-600" />}
              title="Market Analysis"
              description="Detailed analysis of local market trends to optimize your pricing strategy."
            />
            <ServiceCard
              icon={<Home className="w-8 h-8 text-red-600" />}
              title="Home Staging Advice"
              description="Expert recommendations to present your property in the best possible light."
            />
            <ServiceCard
              icon={<FileText className="w-8 h-8 text-red-600" />}
              title="Legal Documentation"
              description="Assistance with all necessary paperwork and legal requirements."
            />
            <ServiceCard
              icon={<Percent className="w-8 h-8 text-red-600" />}
              title="Negotiation Support"
              description="Professional negotiation to secure the best terms and price for your property."
            />
            <ServiceCard
              icon={<Shield className="w-8 h-8 text-red-600" />}
              title="After-Sale Support"
              description="Continued assistance even after the sale is complete to ensure a smooth transition."
            />
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
              Find answers to common questions about selling your property.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <FAQItem
              question="How long will it take to sell my property?"
              answer="The time to sell varies depending on factors like location, property type, condition, and market conditions. On average, our clients' properties sell within 45 days, which is significantly faster than the market average. During your consultation, we can provide a more specific timeline based on your property's characteristics."
              index={0}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
            />
            <FAQItem
              question="What fees do you charge for selling my property?"
              answer="Our fee structure is transparent and competitive. We typically charge a percentage of the final sale price, which is only payable upon successful completion of the sale. The exact percentage depends on the property value and services required. We'll discuss all fees upfront during our initial consultation so there are no surprises."
              index={1}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
            />
            <FAQItem
              question="Do I need to make repairs before selling?"
              answer="Not necessarily. While some repairs can increase your property's value and appeal, we'll help you determine which improvements are worth the investment. During our initial assessment, we'll identify any issues that might significantly impact your sale price and provide recommendations based on your goals and budget."
              index={2}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
            />
            <FAQItem
              question="How do you market my property?"
              answer="We implement a comprehensive marketing strategy tailored to your specific property. This typically includes professional photography, virtual tours, listing on major real estate platforms, social media promotion, email marketing to our buyer database, and targeted advertising. For premium properties, we also organize exclusive viewing events and reach out to our network of investors."
              index={3}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
            />
            <FAQItem
              question="Can I sell my property if I still have a mortgage?"
              answer="Yes, you can sell your property even if you still have a mortgage. The proceeds from the sale will first go toward paying off your remaining mortgage balance, with any leftover amount going to you. If your property value has decreased and you owe more than it's worth, we can discuss options like short sales or bringing cash to closing."
              index={4}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
            />
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

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <motion.div className="bg-white p-6 rounded-lg shadow-md" whileHover={{ y: -5, transition: { duration: 0.2 } }}>
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
  property: string
  image: string
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, property, image }) => (
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
      const response = await fetch("https://realestateapi-x9de.onrender.com/api/forowner", {
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

