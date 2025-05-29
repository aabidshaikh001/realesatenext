"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiChevronDown, FiChevronUp, FiSearch, FiMessageCircle, FiBookOpen } from "react-icons/fi"
import { ChevronRight, HelpCircle, PhoneCall, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  category: string
  items: FAQItem[]
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<number>(0)
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)
  const [faqData, setFaqData] = useState<FAQCategory[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/faq");
        if (!response.ok) {
          throw new Error("Failed to fetch FAQ data");
        }
        const data = await response.json();
        setFaqData(data.faqData); // Adjust this according to your data structure
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchFAQData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (error) {
    return (
    <div></div>
    )
  }

  if (faqData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600">No FAQ data available</div>
      </div>
    )
  }

  return (
    <div>
      {/* Header Section */}
      <div className="relative w-full overflow-hidden mt-14 lg:mt-0">
        {/* Background Image */}
        <div className="relative h-[200px]">
          <Image src="/bgheader.png" alt="Legal assistance background" fill className="object-cover brightness-75" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl sm:text-6xl font-black text-center text-white mb-4">Frequently Asked Questions?</h1>

          <nav className="flex items-center text-white text-sm mt-2">
            <Link href="/" className="hover:underline opacity-90">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-90" />
            <span className="opacity-90">Help</span>
          </nav>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How Can We Help You?</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-12">
              We've compiled answers to the most common questions to help you quickly find the information you need. If
              you can't find what you're looking for, our support team is always ready to assist you through multiple
              channels.
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
            {/* Card 1 */}
            <motion.div
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
                style={{
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["0%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-red-100"
                whileHover={{
                  borderColor: "rgba(252, 165, 165, 0.5)",
                  boxShadow: "0 8px 30px rgba(252, 165, 165, 0.2)",
                }}
                transition={{
                  duration: 0.2,
                }}
              />
              <div className="relative z-10">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-red-100 rounded-full"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <FiSearch className="w-8 h-8 text-red-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Answers</h3>
                <p className="text-gray-600">
                  Browse our comprehensive FAQ categories to find instant answers to your most pressing questions.
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
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
                style={{
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["0%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: 1,
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-red-100"
                whileHover={{
                  borderColor: "rgba(252, 165, 165, 0.5)",
                  boxShadow: "0 8px 30px rgba(252, 165, 165, 0.2)",
                }}
                transition={{
                  duration: 0.2,
                }}
              />
              <div className="relative z-10">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-red-100 rounded-full"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <FiMessageCircle className="w-8 h-8 text-red-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
                <p className="text-gray-600">
                  Our dedicated support team is available around the clock to assist you with any questions or issues.
                </p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
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
                style={{
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["0%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: 2,
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-red-100"
                whileHover={{
                  borderColor: "rgba(252, 165, 165, 0.5)",
                  boxShadow: "0 8px 30px rgba(252, 165, 165, 0.2)",
                }}
                transition={{
                  duration: 0.2,
                }}
              />
              <div className="relative z-10">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-red-100 rounded-full"
                  animate={{
                    scale: [1, 1.05, 1],
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <FiBookOpen className="w-8 h-8 text-red-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Knowledge Base</h3>
                <p className="text-gray-600">
                  Access our extensive library of guides, tutorials, and resources to help you get the most out of our
                  services.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Options */}
          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center gap-2 text-gray-700">
              <PhoneCall className="w-5 h-5 text-red-600" />
              <span>+91 96949 67000</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Mail className="w-5 h-5 text-red-600" />
              <span>info@realestatecompany.co.in</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <HelpCircle className="w-5 h-5 text-red-600" />
              <span>Live Chat Available</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-10 mt-10 p-6 sm:p-12">
        <div className="w-full lg:w-1/3">
          <ul className="space-y-4">
            {faqData.map((section, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`cursor-pointer p-4 rounded-lg font-medium shadow-sm transition-all duration-300 ${
                  activeCategory === index ? "bg-red-100 border-l-4 border-red-600 font-semibold" : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveCategory(index)}
              >
                {index + 1}. {section.category}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">{faqData[activeCategory].category}</h2>
            <div className="space-y-6">
              {faqData[activeCategory].items.map((item, idx) => (
                <div key={idx} className="border-b pb-4">
                  <button
                    className="w-full text-left text-lg font-semibold flex justify-between items-center"
                    onClick={() => setActiveQuestion(activeQuestion === idx ? null : idx)}
                  >
                    {item.question}
                    {activeQuestion === idx ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {activeQuestion === idx && (
                    <motion.p
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 text-gray-700"
                    >
                      {item.answer}
                    </motion.p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

