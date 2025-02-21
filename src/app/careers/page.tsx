"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { FaBriefcase, FaMapMarkerAlt, FaSearch } from "react-icons/fa"

const jobListings = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
  },
  { id: 2, title: "Product Manager", department: "Product", location: "New York, NY", type: "Full-time" },
  { id: 3, title: "UX Designer", department: "Design", location: "Remote", type: "Contract" },
  { id: 4, title: "Data Scientist", department: "Data", location: "Seattle, WA", type: "Full-time" },
  { id: 5, title: "Marketing Specialist", department: "Marketing", location: "Los Angeles, CA", type: "Part-time" },
  { id: 6, title: "Customer Support Representative", department: "Support", location: "Remote", type: "Full-time" },
]

const CareersPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("All")

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === "All" || job.department === filterDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative h-[70vh]">
     
        <video
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/carrer.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <motion.h1
            className="text-5xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Join Our Team
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover exciting opportunities and be part of our mission to innovate and make a difference.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="w-full md:w-auto">
            <select
              className="w-full md:w-auto pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
              <option value="Design">Design</option>
              <option value="Data">Data</option>
              <option value="Marketing">Marketing</option>
              <option value="Support">Support</option>
            </select>
          </div>
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link href={`/careers/${job.id}`}>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaBriefcase className="mr-2" />
                    <span>{job.department}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{job.type}</span>
                    <span className="text-red-600 font-medium hover:underline">Learn More →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No job listings found. Please try a different search or filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CareersPage

