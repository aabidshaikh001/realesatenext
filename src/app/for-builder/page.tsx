"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
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
  Star,
  MapPin,
  Layers,
} from "lucide-react"
import { FaStar } from "react-icons/fa6";
import Link from "next/link"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const SellForBuilderPage = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <ToastContainer />
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
            <StatCard icon={<Building className="w-8 h-8 text-red-600" />} number="250+" label="Projects Sold" />
            <StatCard icon={<TrendingUp className="w-8 h-8 text-red-600" />} number="$3.8B" label="Sales Volume" />
            <StatCard icon={<Clock className="w-8 h-8 text-red-600" />} number="40%" label="Faster Sell-Out Rate" />
            <StatCard icon={<Users className="w-8 h-8 text-red-600" />} number="10,000+" label="Qualified Buyers" />
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
              <FeatureCard
                icon={<CheckCircle className="w-10 h-10 text-red-600" />}
                title="Market Analysis & Pricing"
                description="Accurate insights to help you price and position your projects strategically."
              />
              <FeatureCard
                icon={<Users className="w-10 h-10 text-red-600" />}
                title="Exclusive Buyer Network"
                description="Connect with high-intent investors and buyers."
              />
              <FeatureCard
                icon={<DollarSign className="w-10 h-10 text-red-600" />}
                title="Maximized Sales Revenue"
                description="Expert strategies to maximize conversions and profit."
              />
              <FeatureCard
                icon={<BarChart className="w-10 h-10 text-red-600" />}
                title="Data-Driven Marketing"
                description="Targeted campaigns to position your properties for success."
              />
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
            <ProcessCard
              number="1"
              title="Consultation"
              description="We analyze your project, target market, and competition to develop a tailored strategy."
              icon={<Briefcase className="w-6 h-6 text-white" />}
            />
            <ProcessCard
              number="2"
              title="Marketing Setup"
              description="Our team creates compelling marketing materials and prepares your properties for showcase."
              icon={<Target className="w-6 h-6 text-white" />}
            />
            <ProcessCard
              number="3"
              title="Buyer Matching"
              description="We connect your properties with our network of qualified buyers and investors."
              icon={<Users className="w-6 h-6 text-white" />}
            />
            <ProcessCard
              number="4"
              title="Sales & Closing"
              description="Our experts handle negotiations and guide the process through to successful closing."
              icon={<DollarSign className="w-6 h-6 text-white" />}
            />
          </div>
        </div>
      </div>

      {/* Case Studies Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See how we've helped builders across the country achieve remarkable sales results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <CaseStudyCard
              title="Luxury Condominiums"
              location="Downtown Metro Area"
              units="120 Units"
              result="Sold out in 6 months (40% faster than market average)"
              image="/placeholder.svg?height=200&width=400"
            />
            <CaseStudyCard
              title="Suburban Townhomes"
              location="Westside Community"
              units="85 Units"
              result="15% above projected revenue, fully sold in 8 months"
              image="/placeholder.svg?height=200&width=400"
            />
            <CaseStudyCard
              title="Mixed-Use Development"
              location="Harbor District"
              units="200+ Residential & Commercial Units"
              result="Pre-sold 70% before construction completion"
              image="/placeholder.svg?height=200&width=400"
            />
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
            <TestimonialCard
              quote="Their market analysis was spot-on, and the sales strategy they implemented helped us sell our townhome development 30% faster than we projected."
              name="Robert Chen"
              title="CEO, Horizon Builders"
              image="/placeholder.svg?height=100&width=100"
            />
            <TestimonialCard
              quote="The quality of buyers they brought to our luxury condo project was impressive. These weren't just leads—they were serious, qualified buyers ready to make decisions."
              name="Maria Gonzalez"
              title="Sales Director, Elite Developments"
              image="/placeholder.svg?height=100&width=100"
            />
            <TestimonialCard
              quote="Their team understood our vision and translated it into marketing materials that truly captured the essence of our project. The results exceeded our expectations."
              name="David Thompson"
              title="Managing Partner, Urban Living Builders"
              image="/placeholder.svg?height=100&width=100"
            />
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
            <ServiceCard
              icon={<Target className="w-8 h-8 text-red-600" />}
              title="Pre-Development Consulting"
              description="Market research and feasibility studies to optimize your project before breaking ground."
            />
            <ServiceCard
              icon={<Layers className="w-8 h-8 text-red-600" />}
              title="Project Positioning"
              description="Strategic positioning to differentiate your development in competitive markets."
            />
            <ServiceCard
              icon={<Home className="w-8 h-8 text-red-600" />}
              title="Model Home Setup"
              description="Expert staging and presentation of model units to maximize buyer interest."
            />
            <ServiceCard
              icon={<BarChart className="w-8 h-8 text-red-600" />}
              title="Digital Marketing"
              description="Comprehensive digital campaigns targeting qualified buyers for your specific project."
            />
            <ServiceCard
              icon={<Users className="w-8 h-8 text-red-600" />}
              title="Sales Team Training"
              description="Training and support for your on-site sales team to improve conversion rates."
            />
            <ServiceCard
              icon={<Award className="w-8 h-8 text-red-600" />}
              title="Post-Sale Support"
              description="Streamlined closing processes and customer satisfaction programs."
            />
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
            <FAQItem
              question="How do your services differ from traditional real estate agencies?"
              answer="Unlike traditional agencies, we specialize exclusively in new construction and development projects. Our team has specific expertise in builder sales strategies, pre-construction marketing, and phased development approaches. We also offer comprehensive services beyond just listing properties, including market analysis, buyer profiling, and sales process optimization."
              index={0}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
            />
            <FAQItem
              question="What types of projects do you work with?"
              answer="We work with a wide range of residential and commercial development projects, including condominiums, townhomes, single-family home communities, mixed-use developments, and master-planned communities. We've successfully partnered with builders on projects ranging from boutique developments of 10-20 units to large-scale communities with 500+ homes."
              index={1}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
            />
            <FAQItem
              question="How do you price your services?"
              answer="Our pricing structure is customized based on the scope, scale, and specific needs of your project. We offer flexible options including percentage-based commissions, flat fee structures, or hybrid models. During our initial consultation, we'll discuss your goals and budget to create a pricing structure that aligns with your project economics."
              index={2}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
            />
            <FAQItem
              question="How long does it typically take to sell out a development?"
              answer="Sell-out timelines vary based on numerous factors including location, product type, price point, and market conditions. However, our clients typically experience 30-40% faster sell-out rates compared to industry averages. During our consultation, we can provide more specific projections based on your project's characteristics and current market analysis."
              index={3}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
            />
            <FAQItem
              question="Do you handle all aspects of the sales process?"
              answer="Yes, we offer end-to-end sales solutions including strategy development, marketing execution, lead generation, buyer qualification, contract negotiation, and closing coordination. We can either supplement your existing sales team or provide a complete sales management solution, depending on your needs."
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

// Case Study Card Component
interface CaseStudyCardProps {
  title: string
  location: string
  units: string
  result: string
  image: string
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ title, location, units, result, image }) => (
  <motion.div
    className="bg-white rounded-lg shadow-md overflow-hidden"
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <div className="relative h-48">
      <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <div className="flex items-center text-gray-600 mb-2">
        <MapPin className="w-4 h-4 mr-1" />
        <span className="text-sm">{location}</span>
      </div>
      <div className="mb-4">
        <span className="text-sm font-semibold bg-red-100 text-red-600 px-2 py-1 rounded-full">{units}</span>
      </div>
      <div className="border-t pt-4">
        <p className="text-gray-700">
          <span className="font-semibold">Result: </span>
          {result}
        </p>
      </div>
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
      const response = await fetch("https://realestateapi-x9de.onrender.com/api/forbuilder", {
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

