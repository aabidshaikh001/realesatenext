"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaCheckCircle } from "react-icons/fa"
import JobApplicationForm from "../../components/JobApplicationForm"

const jobListings = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    description:
      "We are seeking a talented and experienced Senior Software Engineer to join our dynamic team. In this role, you will be responsible for designing, developing, and maintaining high-quality software solutions that drive our business forward.",
    responsibilities: [
      "Lead the development of complex software systems and applications",
      "Collaborate with cross-functional teams to define and implement innovative solutions",
      "Mentor junior developers and provide technical guidance",
      "Participate in code reviews and ensure code quality and best practices",
      "Contribute to the architectural design and technology decisions",
    ],
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "5+ years of experience in software development",
      "Strong proficiency in one or more programming languages (e.g., Java, Python, JavaScript)",
      "Experience with cloud platforms (AWS, Azure, or GCP)",
      "Excellent problem-solving and communication skills",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "401(k) plan with company match",
      "Flexible work hours and remote work options",
      "Professional development opportunities",
    ],
  },
  // Add more job listings here...
]

const JobPostingPage = ({ params }: { params: { id: string } }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const job = jobListings.find((j) => j.id === Number.parseInt(params.id))

  if (!job) {
    return <div>Job not found</div>
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
          <source src="/carrrer1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            className="text-4xl font-bold text-white text-center px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {job.title}
          </motion.h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white shadow-xl rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6">
            <div className="flex flex-wrap items-center justify-between mb-6">
              <div className="flex items-center mb-2 mr-4">
                <FaBriefcase className="text-gray-600 mr-2" />
                <span className="text-gray-800">{job.department}</span>
              </div>
              <div className="flex items-center mb-2 mr-4">
                <FaMapMarkerAlt className="text-gray-600 mr-2" />
                <span className="text-gray-800">{job.location}</span>
              </div>
              <div className="flex items-center mb-2">
                <FaClock className="text-gray-600 mr-2" />
                <span className="text-gray-800">{job.type}</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
              <p className="text-gray-700">{job.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Responsibilities</h2>
              <ul className="list-disc list-inside text-gray-700">
                {job.responsibilities.map((resp, index) => (
                  <li key={index} className="mb-2">
                    {resp}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
              <ul className="list-disc list-inside text-gray-700">
                {job.requirements.map((req, index) => (
                  <li key={index} className="mb-2">
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-red-700 transition-colors duration-300"
              >
                Apply Now
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <Link href="/careers" className="text-red-600 hover:underline">
            ← Back to All Job Listings
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && <JobApplicationForm jobTitle={job.title} onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}

export default JobPostingPage

