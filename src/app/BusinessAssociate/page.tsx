"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  FaUserTie,
  FaLandmark,
  FaHome,
  FaCity,
  FaWarehouse,
  FaMoneyBillWave,
  FaHandHoldingUsd,
  FaHandshake,
  FaUsers,
  FaChartLine,
  FaMapMarkedAlt,
  FaClipboardList,
  FaRegChartBar,
  FaBalanceScale,
  FaFileInvoiceDollar,
  FaClipboardCheck,
  FaPhoneSquare,
  FaLaptop,
  FaUserShield,
  FaHardHat,
  FaBullhorn,
  FaBusinessTime,
  FaFileContract,
  FaSearchDollar,
  FaCalendarCheck,
  FaSitemap,
  FaTruckMoving,
  FaRegBuilding,
  FaKey,
  FaDraftingCompass,
  FaLayerGroup,
  FaGlobeAmericas,
  FaToolbox,
  FaFilter,
  FaStar,
  FaSearch,
  FaGlobe,
} from "react-icons/fa"

interface BusinessAssociate {
  id: number
  name: string
  role: string
  company: string
  description: string
  expertise: string[]
  rating: number
  projects: string[]
  image?: string
  icon: React.ReactNode
}
interface PartnerCard {
  id: number
  title: string
  description: string
  iconType: string
}

interface PartnerSection {
  id: number
  title: string
  description: string
  cards: PartnerCard[]
}

interface ApiResponse {
  success: boolean
  message: string
  data: PartnerSection
}
const BusinessAssociatePage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [businessAssociates, setBusinessAssociates] = useState<BusinessAssociate[]>([])
  const [partnerSection, setPartnerSection] = useState<PartnerSection | null>(null)
    // Define static icons for partner section cards
    const getIconComponent = (iconType: string) => {
      const iconMap: Record<string, React.ReactNode> = {
        FaHandshake: <FaHandshake className="w-8 h-8 text-red-600" />,
        FaChartLine: <FaChartLine className="w-8 h-8 text-red-600" />,
        FaGlobe: <FaGlobe className="w-8 h-8 text-red-600" />,
        FaUserTie: <FaUserTie className="w-8 h-8 text-red-600" />,
        FaMoneyBillWave: <FaMoneyBillWave className="w-8 h-8 text-red-600" />,
        FaUsers: <FaUsers className="w-8 h-8 text-red-600" />,
        // Add more mappings as needed
      }
      
      return iconMap[iconType] || <FaHandshake className="w-8 h-8 text-red-600" />
    }
  // Define a safe parse function for arrays
  const safeParseArray = (value: any) => {
    try {
      if (typeof value === "string") {
        const parsedValue = JSON.parse(value)
        return Array.isArray(parsedValue) ? parsedValue : [parsedValue]
      }
      return Array.isArray(value) ? value : [value]
    } catch (error) {
      console.error("JSON Parsing Error:", error, value)
      return []
    }
  }
  // Function to get icon based on role - defined outside of render to avoid hooks issues
  const getIconByRole = (role: string) => {
    const lowerRole = role.toLowerCase()

    // C-Suite Roles (Full Forms)
    if (lowerRole.includes("ceo") || lowerRole.includes("chief executive officer")) return <FaUserTie />
    if (lowerRole.includes("coo") || lowerRole.includes("chief operating officer")) return <FaUserTie />
    if (lowerRole.includes("cfo") || lowerRole.includes("chief financial officer")) return <FaMoneyBillWave />
    if (lowerRole.includes("cmo") || lowerRole.includes("chief marketing officer")) return <FaBullhorn />
    if (lowerRole.includes("cdo") || lowerRole.includes("chief development officer")) return <FaRegBuilding />
    if (lowerRole.includes("cto") || lowerRole.includes("chief technology officer")) return <FaLaptop />
    if (lowerRole.includes("cso") || lowerRole.includes("chief strategy officer")) return <FaChartLine />
    if (lowerRole.includes("cio") || lowerRole.includes("chief investment officer")) return <FaHandHoldingUsd />
    if (lowerRole.includes("cco") || lowerRole.includes("chief compliance officer")) return <FaUserShield />
    if (lowerRole.includes("cro") || lowerRole.includes("chief revenue officer")) return <FaMoneyBillWave />
    if (lowerRole.includes("cho") || lowerRole.includes("chief human resources officer")) return <FaUsers />

    // Real Estate-Specific Roles
    if (lowerRole.includes("real estate agent") || lowerRole.includes("property agent")) return <FaHome />
    if (lowerRole.includes("real estate consultant") || lowerRole.includes("property consultant")) return <FaLandmark />
    if (lowerRole.includes("real estate manager") || lowerRole.includes("property manager")) return <FaClipboardList />
    if (lowerRole.includes("real estate investor") || lowerRole.includes("property investor"))
      return <FaMoneyBillWave />
    if (lowerRole.includes("real estate developer") || lowerRole.includes("property developer"))
      return <FaDraftingCompass />
    if (lowerRole.includes("broker") || lowerRole.includes("realtor")) return <FaHandshake />
    if (lowerRole.includes("sales manager") || lowerRole.includes("business development")) return <FaBusinessTime />
    if (lowerRole.includes("marketing manager")) return <FaBullhorn />
    if (lowerRole.includes("leasing manager") || lowerRole.includes("lease consultant")) return <FaClipboardCheck />
    if (lowerRole.includes("legal advisor") || lowerRole.includes("compliance officer")) return <FaBalanceScale />
    if (lowerRole.includes("property analyst") || lowerRole.includes("market analyst")) return <FaRegChartBar />
    if (lowerRole.includes("urban planner") || lowerRole.includes("land planner")) return <FaSitemap />
    if (lowerRole.includes("mortgage specialist") || lowerRole.includes("loan officer")) return <FaFileInvoiceDollar />
    if (lowerRole.includes("architect") || lowerRole.includes("interior designer")) return <FaLayerGroup />
    if (lowerRole.includes("construction manager") || lowerRole.includes("project manager")) return <FaHardHat />
    if (lowerRole.includes("surveyor") || lowerRole.includes("land surveyor")) return <FaMapMarkedAlt />
    if (lowerRole.includes("customer service") || lowerRole.includes("client relations")) return <FaPhoneSquare />
    if (lowerRole.includes("warehouse manager")) return <FaWarehouse />
    if (lowerRole.includes("logistics manager")) return <FaTruckMoving />
    if (lowerRole.includes("valuation expert") || lowerRole.includes("appraiser")) return <FaSearchDollar />
    if (lowerRole.includes("facility manager") || lowerRole.includes("building manager")) return <FaRegBuilding />
    if (lowerRole.includes("investment advisor")) return <FaHandHoldingUsd />
    if (lowerRole.includes("title officer") || lowerRole.includes("escrow officer")) return <FaFileContract />
    if (lowerRole.includes("closing coordinator")) return <FaCalendarCheck />
    if (lowerRole.includes("security officer") || lowerRole.includes("safety manager")) return <FaUserShield />
    if (lowerRole.includes("property maintenance")) return <FaToolbox />
    if (lowerRole.includes("international real estate")) return <FaGlobeAmericas />
    if (lowerRole.includes("luxury real estate specialist")) return <FaKey />
    if (lowerRole.includes("commercial real estate")) return <FaCity />
    if (lowerRole.includes("residential real estate")) return <FaHome />

    // Default for any other roles
    return <FaUserTie />
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.realestatecompany.co.in/"
        
        const [associatesResponse, partnerResponse] = await Promise.all([
          fetch(`${apiUrl}/api/business-associates`),
          fetch(`https://api.realestatecompany.co.in/api/partner-section`)
        ])
  
        // Process business associates
        if (associatesResponse.ok) {
          const associatesData = await associatesResponse.json()
          setBusinessAssociates(associatesData.map((associate: any) => ({
            ...associate,
            expertise: safeParseArray(associate.expertise),
          })))
        }
  
        // Process partner section
        if (partnerResponse.ok) {
          const partnerData: ApiResponse = await partnerResponse.json()
          if (partnerData.success && partnerData.data) {
            setPartnerSection(partnerData.data)
          } else {
            setDefaultPartnerSection()
          }
        } else {
          setDefaultPartnerSection()
        }
      } catch (err) {
        console.error("Fetching error:", err)
        setDefaultPartnerSection()
      }
    }
  
    // Helper function for default data
    const setDefaultPartnerSection = () => {
      setPartnerSection({
        id: 0,
        title: "Why Partner With Our Associates",
        description: "Our business associates bring together decades of experience...",
        cards: [
          {
            id: 1,
            title: "Expert Guidance",
            description: "Access to seasoned professionals...",
            iconType: "FaHandshake"
          },
          {
            id: 2,
            title: "Proven Results",
            description: "Our associates have successfully...",
            iconType: "FaChartLine"
          },
          {
            id: 3,
            title: "Global Network",
            description: "Benefit from our extensive...",
            iconType: "FaGlobe"
          }
        ]
      })
    }
  
    fetchData()
  }, [])
  
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
      if (sortBy === "projects") {
        const projectsA = JSON.parse(String(a.projects) || "[]").length;
        const projectsB = JSON.parse(String(b.projects) || "[]").length;
        return projectsB - projectsA;
      }
      

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
       
      {/* Partner Section with API Content and Static Icons */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {partnerSection?.title || "Why Partner With Our Associates"}
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-12">
              {partnerSection?.description || "Our business associates bring together decades of experience..."}
            </p>
          </motion.div>

          {/* Three Cards */}
          <motion.div
            className="grid gap-8 md:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {partnerSection?.cards?.map((card, index) => (
  <motion.div
    key={card.id} // Use the actual ID from API
    className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 text-center cursor-pointer"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <motion.div
      className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-100/50 via-white/50 to-red-100/50"
      style={{ backgroundSize: "200% 100%" }}
      animate={{ backgroundPosition: ["0%", "100%"] }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        delay: index,
      }}
    />
    <motion.div
      className="absolute inset-0 rounded-xl border-2 border-red-100"
      whileHover={{
        borderColor: "rgba(252, 165, 165, 0.5)",
        boxShadow: "0 8px 30px rgba(252, 165, 165, 0.2)",
      }}
      transition={{ duration: 0.2 }}
    />
    <div className="relative z-10">
      <motion.div
        className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-red-100 rounded-full"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        {getIconComponent(card.iconType)}
      </motion.div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
      <p className="text-gray-600">{card.description}</p>
    </div>
  </motion.div>
))} </motion.div>
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
                    className="rounded-full shadow-md"  
                  />
                  <div>
                    <h3 className="text-2xl font-semibold mb-1">{associate.name}</h3>
                    <p className="text-gray-600 flex items-center gap-2">
                    {getIconByRole(associate.role)}
                    <span>{associate.role}</span>
                  </p>
                    <p className="text-sm text-gray-500">{associate.company}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{associate.description}</p>
                <div className="mb-4">
                <h4 className="font-semibold mb-2">Areas of Expertise:</h4>
<ul className="list-disc list-inside">
  {associate.expertise.slice(0, 3).map((item, index) => (
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
                    <span className="text-sm text-gray-500 ml-2">
  ({Array.isArray(JSON.parse(String(associate.projects) || "[]")) 
    ? JSON.parse(String(associate.projects) || "[]").length 
    : 0} projects)
</span>



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

