"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useParams } from "next/navigation";
import Link from "next/link"
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
  FaEnvelope,
  FaLinkedin,
  FaTwitter,

} from "react-icons/fa"

interface BusinessAssociate {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  description: string;
  icon: JSX.Element;
  email: string;
  linkedin: string;
  twitter: string;
  expertise: string[];
  education: { degree: string; institution: string; year: number }[];
  languages: string[];
  awards: { name: string; year: number; issuer: string }[];
  rating: number;
  testimonials: { text: string; author: string }[];
  projects: { name: string; year: number; description: string }[];
  publications: { title: string; year: number; publisher: string }[];
}

const BusinessAssociatePage = () => {
    const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview")
   const [businessAssociates, setBusinessAssociates] = useState<BusinessAssociate[]>([])
    
   const safeParseArray = (value: any) => {
    try {
      if (typeof value === "string") {
        const parsedValue = JSON.parse(value);
        return Array.isArray(parsedValue) ? parsedValue : [parsedValue]; // Ensure it's an array
      }
      return Array.isArray(value) ? value : [value]; // Handle non-string cases
    } catch (error) {
      console.error("JSON Parsing Error:", error, value);
      return []; // Return an empty array to prevent crashes
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
    async function fetchBusinessAssociates() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://realestateapi-x9de.onrender.com"
        const response = await fetch(`${apiUrl}/api/business-associates`)
        if (!response.ok) throw new Error("Business Associates not found");

        const data = await response.json();

        const businessAssociatesWithParsedData = data.map((associate: any) => ({
          ...associate,
          expertise: safeParseArray(associate.expertise), // Ensure array
          education: safeParseArray(associate.education), // Ensure array
          languages: safeParseArray(associate.languages), // Ensure array
          awards: safeParseArray(associate.awards), // Ensure array
          testimonials: safeParseArray(associate.testimonials), // Ensure array
          projects: safeParseArray(associate.projects), // Ensure array
          publications: safeParseArray(associate.publications), // Ensure array
        }));

        setBusinessAssociates(businessAssociatesWithParsedData);
      } catch (err) {
        console.error("Fetching error:", err);
      }
    }

    fetchBusinessAssociates();
  }, [])
  const associate = businessAssociates.find((a) => a.id === Number(id));
  if (!associate) {
    return <div>Associate not found</div>
  }

  const tabContent: Record<string, JSX.Element> =  {
    overview: (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <p className="text-lg text-gray-700 mb-6">{associate.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Areas of Expertise</h3>
            <ul className="list-disc list-inside">
              {associate.expertise.map((item, index) => (
                <li key={index} className="text-gray-600 mb-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Education</h3>
            {associate.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <p className="font-medium">{edu.degree}</p>
                <p className="text-gray-600">
                  {edu.institution}, {edu.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    ),
    experience: (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h3 className="text-xl font-semibold mb-4">Notable Projects</h3>
        {associate.projects.map((project, index) => (
          <div key={index} className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2">{project.name}</h4>
            <p className="text-gray-600 mb-2">{project.year}</p>
            <p className="text-gray-700">{project.description}</p>
          </div>
        ))}
      </motion.div>
    ),
    publications: (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h3 className="text-xl font-semibold mb-4">Publications</h3>
        {associate.publications.map((pub, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-lg font-medium">{pub.title}</h4>
            <p className="text-gray-600">
              {pub.publisher}, {pub.year}
            </p>
          </div>
        ))}
      </motion.div>
    ),
    testimonials: (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h3 className="text-xl font-semibold mb-4">Client Testimonials</h3>
        {associate.testimonials.map((testimonial, index) => (
          <div key={index} className="mb-6 bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 italic mb-2">"{testimonial.text}"</p>
            <p className="text-gray-600">- {testimonial.author}</p>
          </div>
        ))}
      </motion.div>
    ),
  }

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
        <source src="/7581172-hd_1920_1080_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>       <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
  <motion.h1
    className="text-5xl font-extrabold text-white"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    {associate.name}
  </motion.h1>
  <motion.h2
    className="text-xl font-semibold text-gray-300 mt-2"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
  >
    {associate.role}
  </motion.h2>
</div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white shadow-xl rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Image
                className="h-48 w-full object-cover md:w-48"
                src={associate.image || "/placeholder.svg"}
                alt={associate.name}
                width={200}
                height={200}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-red-500 font-semibold">{associate.role}</div>
              <p className="mt-2 text-gray-500">{associate.company}</p>
              <div className="mt-4 flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="font-semibold">{associate.rating.toFixed(1)}</span>
                <span className="text-gray-500 ml-2">({associate.projects.length} projects)</span>
              </div>
              <div className="mt-4 flex space-x-4">
                <a href={`mailto:${associate.email}`} className="text-gray-600 hover:text-red-600">
                  <FaEnvelope className="inline-block mr-2" />
                  Email
                </a>
                <a
                  href={`${associate.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600"
                >
                  <FaLinkedin className="inline-block mr-2" />
                  LinkedIn
                </a>
                <a
                  href={`${associate.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600"
                >
                  <FaTwitter className="inline-block mr-2" />
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {["overview", "experience", "publications", "testimonials"].map((tab) => (
                <button
                  key={tab}
                  className={`${
                    activeTab === tab
                      ? "border-red-500 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-8">
            <AnimatePresence mode="wait">{tabContent[activeTab]}</AnimatePresence>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/BusinessAssociate"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
          >
            Back to All Associates
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BusinessAssociatePage

