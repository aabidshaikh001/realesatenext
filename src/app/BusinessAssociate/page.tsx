"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  FaBriefcase,
  FaBuilding,
  FaUserTie,
  FaChartLine,
  FaHandshake,
  FaGlobe,
  FaSearch,
  FaStar,
  FaFilter,
} from "react-icons/fa"

const businessAssociates = [
  {
    id: 1,
    name: "John Doe",
    role: "Senior Partner",
    company: "ABC Corp",
    image: "/placeholder.svg?height=400&width=400",
    description:
      "John has over 15 years of experience in corporate finance and business strategy. He specializes in mergers and acquisitions, helping companies grow through strategic partnerships.",
    icon: <FaBriefcase className="text-primary w-6 h-6" />,
    expertise: ["Mergers & Acquisitions", "Corporate Strategy", "Financial Planning"],
    rating: 4.9,
    projects: 150,
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Investment Advisor",
    company: "XYZ Finance",
    image: "/placeholder.svg?height=400&width=400",
    description:
      "Jane specializes in wealth management and investment planning for high-net-worth clients. Her expertise includes portfolio diversification and risk management strategies.",
    icon: <FaChartLine className="text-primary w-6 h-6" />,
    expertise: ["Wealth Management", "Risk Assessment", "Portfolio Optimization"],
    rating: 4.8,
    projects: 120,
  },
  {
    id: 3,
    name: "Michael Johnson",
    role: "Real Estate Consultant",
    company: "Global Properties",
    image: "/placeholder.svg?height=400&width=400",
    description:
      "Michael helps businesses and individuals find premium real estate investments. He has a keen eye for emerging market trends and property valuation.",
    icon: <FaBuilding className="text-primary w-6 h-6" />,
    expertise: ["Commercial Real Estate", "Property Valuation", "Market Analysis"],
    rating: 4.7,
    projects: 200,
  },
  {
    id: 4,
    name: "Emily Chen",
    role: "International Business Strategist",
    company: "World Trade Partners",
    image: "/placeholder.svg?height=400&width=400",
    description:
      "Emily specializes in helping companies expand into international markets. She has extensive experience in cross-cultural business practices and global trade regulations.",
    icon: <FaGlobe className="text-primary w-6 h-6" />,
    expertise: ["Global Expansion", "Cross-cultural Management", "International Trade"],
    rating: 4.9,
    projects: 80,
  },
  {
    id: 5,
    name: "David Brown",
    role: "Corporate Lawyer",
    company: "LegalEagle LLP",
    image: "/placeholder.svg?height=400&width=400",
    description:
      "David is an experienced corporate lawyer who advises on complex business transactions, intellectual property rights, and regulatory compliance.",
    icon: <FaUserTie className="text-primary w-6 h-6" />,
    expertise: ["Corporate Law", "Intellectual Property", "Regulatory Compliance"],
    rating: 4.8,
    projects: 300,
  },
  {
    id: 6,
    name: "Sarah Thompson",
    role: "Business Development Manager",
    company: "Innovate Inc.",
    image: "/placeholder.svg?height=400&width=400",
    description:
      "Sarah excels at identifying new business opportunities and fostering strategic partnerships. She has a track record of driving significant revenue growth for her clients.",
    icon: <FaHandshake className="text-primary w-6 h-6" />,
    expertise: ["Strategic Partnerships", "Revenue Growth", "Market Expansion"],
    rating: 4.7,
    projects: 100,
  },
]

const BusinessAssociatePage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredAssociates = businessAssociates
    .filter((associate) => {
      const matchesSearch =
        associate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        associate.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        associate.company.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filter === "all" || associate.role.toLowerCase().includes(filter.toLowerCase())
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "projects") return b.projects - a.projects
      return 0
    })

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const header = document.getElementById("sticky-header")
      if (header) {
        if (scrollPosition > 100) {
          header.classList.add("bg-white", "shadow-md")
        } else {
          header.classList.remove("bg-white", "shadow-md")
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
   <div className="relative h-96">
        <video
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/4431695-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.h1
            className="text-5xl font-extrabold text-white text-center mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Business Associates
          </motion.h1>
          <motion.p
            className="text-xl text-white text-center max-w-2xl px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Connect with our team of experienced professionals who are dedicated to helping your business thrive in
            today's competitive landscape.
          </motion.p>
        </div>
      </div>

      <div id="sticky-header" className="sticky top-0 z-10 transition-all duration-300">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search associates..."
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <FaFilter className="inline-block mr-2" />
                Filter & Sort
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white shadow-md"
          >
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Role</label>
                  <select
                    className="w-full border border-gray-300 rounded-md p-2"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="all">All Roles</option>
                    <option value="partner">Partners</option>
                    <option value="advisor">Advisors</option>
                    <option value="consultant">Consultants</option>
                    <option value="strategist">Strategists</option>
                    <option value="lawyer">Lawyers</option>
                    <option value="manager">Managers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                  <select
                    className="w-full border border-gray-300 rounded-md p-2"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="name">Name</option>
                    <option value="rating">Rating</option>
                    <option value="projects">Number of Projects</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAssociates.map((associate, index) => (
              <motion.div
                key={associate.id}
                className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-600 hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={associate.image || "/placeholder.svg"}
                    alt={associate.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold mb-1">{associate.name}</h3>
                    <p className="text-gray-600 flex items-center gap-2">
                      {associate.icon}
                      <span>{associate.role}</span>
                    </p>
                    <p className="text-sm text-gray-500">{associate.company}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{associate.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Areas of Expertise:</h4>
                  <ul className="list-disc list-inside">
                    {associate.expertise.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-sm font-semibold">{associate.rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500 ml-2">({associate.projects} projects)</span>
                  </div>
                  <Link
                    href={`/BusinessAssociate/${associate.id}`}
                    className="text-red-600 font-semibold inline-flex items-center hover:underline"
                  >
                    View Profile
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default BusinessAssociatePage

