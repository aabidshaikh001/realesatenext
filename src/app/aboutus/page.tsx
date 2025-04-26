"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  FaUsers,
  FaLightbulb,
  FaHandshake,
  FaCog,
  FaChartLine,
  FaRocket,
  FaGlobe,
  FaAward,
  FaStar,
} from "react-icons/fa"
import { Skeleton } from "@/components/ui/skeleton"
import type { JSX } from "react"

interface IconBoxData {
  heading: string
  description: string
  boxes: IconBox[]
}

interface IconBox {
  icon: string
  title: string
  description: string
}

const iconMap: Record<string, JSX.Element> = {
  FaUsers: <FaUsers className="w-8 h-8 text-red-600" />,
  FaLightbulb: <FaLightbulb className="w-8 h-8 text-red-600" />,
  FaHandshake: <FaHandshake className="w-8 h-8 text-red-600" />,
  FaCog: <FaCog className="w-8 h-8 text-red-600" />,
  FaChartLine: <FaChartLine className="w-8 h-8 text-red-600" />,
  FaRocket: <FaRocket className="w-8 h-8 text-red-600" />,
  FaGlobe: <FaGlobe className="w-8 h-8 text-red-600" />,
  FaAward: <FaAward className="w-8 h-8 text-red-600" />,
  FaStar: <FaStar className="w-8 h-8 text-red-600" />,
}

const AboutUsPage = () => {
  const [loading, setLoading] = useState(true)
  const [coreValues, setCoreValues] = useState<any[]>([])
  const [whyChooseUs, setWhyChooseUs] = useState<{
    heading: string
    description: string
    boxes: IconBox[]
  }>({
    heading: "",
    description: "",
    boxes: [],
  })
  const [growthMetrics, setGrowthMetrics] = useState<{
    title: string
    metrics: { label: string; value: number }[]
  }>({
    title: "",
    metrics: [],
  })
  const [ourStory, setOurStory] = useState<{
    title: string
    paragraphs: string[]
  }>({
    title: "",
    paragraphs: [],
  })
  const [spinnerValue, setSpinnerValue] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.realestatecompany.co.in/api/aboutus")
        const result = await response.json()
  
        const rawData = result.data
  
        // Parse CoreValues (stringified array)
        const parsedCoreValues = JSON.parse(rawData.CoreValues || "[]")
        setCoreValues(parsedCoreValues)
  
        // Parse WhyChooseUs (stringified object)
        const parsedWhyChooseUs = JSON.parse(rawData.WhyChooseUs || "{}")
        setWhyChooseUs(parsedWhyChooseUs)
  
        // Parse GrowthMetrics (stringified object)
        const parsedGrowthMetrics = JSON.parse(rawData.GrowthMetrics || "{}")
        setGrowthMetrics(parsedGrowthMetrics)
  
        // Parse OurStory (stringified object)
        const parsedOurStory = JSON.parse(rawData.OurStory || "{}")
        setOurStory(parsedOurStory)
  
        setLoading(false)
      } catch (error) {
        console.error("Error fetching and parsing about us data:", error)
        setLoading(false)
      }
    }
  
    fetchData()
  
    const interval = setInterval(() => {
      setSpinnerValue((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 50)
  
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Video Header Section */}
      <div className="relative h-[70vh]">
        <video className="absolute inset-0 w-full h-full object-cover brightness-50" autoPlay loop muted playsInline>
          <source src="/7868294-uhd_3840_2160_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <motion.h1
            className="text-5xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About TREC
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We're on a mission to transform industries through innovation and excellence
          </motion.p>
        </div>
      </div>

      {/* Core Values Section - 3 Bullet Boxes */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Core Values</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              These principles guide everything we do and define who we are as a company
            </p>
          </motion.div>

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
            {loading
              ? // Loading skeletons
                Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-64 rounded-xl" />)
              : // Actual content
                coreValues.map((value, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 text-center shadow-md"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-red-100 rounded-full">
                      {iconMap[value.icon] || <FaLightbulb className="w-8 h-8 text-red-600" />}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <ul className="text-left text-gray-600 space-y-2">
                    {value.bullets.map((bullet: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-red-600 mr-2">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
          </motion.div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{whyChooseUs.heading}</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-12">{whyChooseUs.description}</p>
          </motion.div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-32 rounded-xl" />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
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
              {whyChooseUs.boxes.map((box, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="bg-red-100 rounded-full p-3">{iconMap[box.icon]}</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{box.title}</h3>
                      <p className="text-gray-600">{box.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Growth Journey Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{growthMetrics.title || "Our Growth Journey"}</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Tracking our progress as we continue to expand and evolve
            </p>
          </motion.div>

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-40 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {growthMetrics.metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="relative mx-auto w-32 h-32 mb-4">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-red-600"
                        strokeWidth="10"
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 - (251.2 * metric.value) / 100}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{metric.value}%</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold">{metric.label}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Our Story Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <Skeleton className="h-96 rounded-xl" />
          ) : (
            <motion.div
              className="bg-white rounded-xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{ourStory.title}</h2>
              {ourStory.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-gray-700 leading-relaxed ${index < ourStory.paragraphs.length - 1 ? "mb-4" : ""}`}
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
export default AboutUsPage
