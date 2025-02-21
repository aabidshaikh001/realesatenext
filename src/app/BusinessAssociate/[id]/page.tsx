"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useParams } from "next/navigation";
import Link from "next/link"
import {
  FaBriefcase,
  FaBuilding,
  FaUserTie,
  FaChartLine,
  FaHandshake,
  FaGlobe,
  FaEnvelope,
  FaLinkedin,
  FaTwitter,
  FaStar,
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
    email: "john.doe@abccorp.com",
    linkedin: "johndoe",
    twitter: "johndoe",
    expertise: ["Mergers & Acquisitions", "Corporate Strategy", "Financial Planning"],
    education: [
      { degree: "MBA", institution: "Harvard Business School", year: 2005 },
      { degree: "BSc in Economics", institution: "London School of Economics", year: 2000 },
    ],
    languages: ["English", "Mandarin", "Spanish"],
    awards: [
      { name: "Financial Advisor of the Year", year: 2019, issuer: "Finance Monthly" },
      { name: "Top 40 Under 40", year: 2015, issuer: "Fortune Magazine" },
    ],
    rating: 4.9,
    testimonials: [
      { text: "John's strategic insights were instrumental in our successful merger.", author: "CEO, Tech Giant Inc." },
      {
        text: "His financial acumen and attention to detail are unparalleled.",
        author: "CFO, Global Innovations Ltd.",
      },
    ],
    projects: [
      { name: "Tech Giant Merger", year: 2020, description: "Led the $5B merger between two leading tech companies" },
      {
        name: "Global Expansion Strategy",
        year: 2018,
        description: "Developed a 5-year expansion plan for a Fortune 500 company",
      },
    ],
    publications: [
      { title: "The Future of Corporate Finance", year: 2021, publisher: "Harvard Business Review" },
      { title: "Navigating Cross-Border M&As", year: 2019, publisher: "Journal of International Business Studies" },
    ],
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
    email: "jane.smith@xyzfinance.com",
    linkedin: "janesmith",
    twitter: "janesmith",
    expertise: ["Wealth Management", "Investment Planning", "Risk Management"],
    education: [
      { degree: "CFA", institution: "CFA Institute", year: 2010 },
      { degree: "MBA", institution: "Wharton School", year: 2008 },
    ],
    languages: ["English", "French"],
    awards: [],
    rating: 4.7,
    testimonials: [
      {
        text: "Jane's expertise in portfolio diversification helped us achieve significant returns.",
        author: "Client, High Net Worth Individual",
      },
      { text: "Her personalized approach and attention to detail are exceptional.", author: "Client, Family Office" },
    ],
    projects: [],
    publications: [],
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
    email: "michael.johnson@globalproperties.com",
    linkedin: "michaeljohnson",
    twitter: "michaeljohnson",
    expertise: ["Real Estate Investment", "Property Valuation", "Market Analysis"],
    education: [
      { degree: "Master of Real Estate", institution: "NYU Schack Institute", year: 2015 },
      { degree: "BS in Finance", institution: "University of California, Berkeley", year: 2013 },
    ],
    languages: ["English"],
    awards: [],
    rating: 4.5,
    testimonials: [
      {
        text: "Michael's market insights were invaluable in our recent property acquisition.",
        author: "CEO, Real Estate Development Firm",
      },
      { text: "His professionalism and dedication are truly commendable.", author: "Client, Private Investor" },
    ],
    projects: [],
    publications: [],
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
    email: "emily.chen@worldtradepartners.com",
    linkedin: "emilychen",
    twitter: "emilychen",
    expertise: ["International Business", "Global Trade", "Cross-Cultural Communication"],
    education: [
      { degree: "PhD in International Relations", institution: "Columbia University", year: 2018 },
      { degree: "MA in International Business", institution: "University of Oxford", year: 2015 },
    ],
    languages: ["English", "Chinese", "French", "Spanish"],
    awards: [],
    rating: 4.8,
    testimonials: [
      {
        text: "Emily's expertise in navigating international markets was crucial to our success.",
        author: "CEO, Multinational Corporation",
      },
      { text: "Her understanding of cross-cultural nuances is exceptional.", author: "Client, Global Business Leader" },
    ],
    projects: [],
    publications: [],
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
    email: "david.brown@legaleagle.com",
    linkedin: "davidbrown",
    twitter: "davidbrown",
    expertise: ["Corporate Law", "Intellectual Property", "Regulatory Compliance"],
    education: [
      { degree: "JD", institution: "Yale Law School", year: 2012 },
      { degree: "BA in Political Science", institution: "Stanford University", year: 2009 },
    ],
    languages: ["English"],
    awards: [],
    rating: 4.6,
    testimonials: [
      {
        text: "David's legal expertise and guidance were invaluable in our recent acquisition.",
        author: "CEO, Private Equity Firm",
      },
      { text: "His attention to detail and thoroughness are unmatched.", author: "Client, Fortune 500 Company" },
    ],
    projects: [],
    publications: [],
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
    email: "sarah.thompson@innovate.com",
    linkedin: "sarahthompson",
    twitter: "sarahthompson",
    expertise: ["Business Development", "Strategic Partnerships", "Sales Management"],
    education: [
      { degree: "MBA", institution: "INSEAD", year: 2010 },
      { degree: "BSc in Marketing", institution: "University of British Columbia", year: 2008 },
    ],
    languages: ["English", "German"],
    awards: [],
    rating: 4.9,
    testimonials: [
      {
        text: "Sarah's business development skills have significantly increased our revenue.",
        author: "CEO, Tech Startup",
      },
      { text: "Her ability to build strong relationships is exceptional.", author: "Client, Small Business Owner" },
    ],
    projects: [],
    publications: [],
  },
]

const BusinessAssociatePage = () => {
    const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview")
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
                  href={`https://www.linkedin.com/in/${associate.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600"
                >
                  <FaLinkedin className="inline-block mr-2" />
                  LinkedIn
                </a>
                <a
                  href={`https://twitter.com/${associate.twitter}`}
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

