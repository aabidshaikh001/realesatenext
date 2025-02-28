"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { FaBriefcase, FaMapMarkerAlt, FaSearch, FaRocket, FaChartLine, FaUsers  } from "react-icons/fa"
import { Skeleton } from "@/components/ui/skeleton";
interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
}

const CareersPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("All")
  const [jobListings, setJobListings] = useState<Job[]>([]);
  const [visibleJobs, setVisibleJobs] = useState(6);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobListings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job listings:", error);
        setLoading(false);
      });
  }, []);


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
 {/* Description Section */}
 <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Work With Us</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-12">
              We're building a workplace where innovative minds thrive and ambitious ideas come to life. Our team is
              passionate about creating solutions that matter, in an environment that values diversity, collaboration,
              and personal growth. Join us and be part of something extraordinary.
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
                  borderColor: "rgba(252, 165, 165, 0.5)", // red-300 with opacity
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
                  <FaUsers className="w-8 h-8 text-red-600" />
                </motion.div>
                <motion.h3
                  className="text-xl font-bold text-gray-900 mb-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Collaborative Culture
                </motion.h3>
                <p className="text-gray-600">
                  Work alongside talented professionals in a supportive environment where every voice matters and
                  teamwork drives innovation.
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
                  delay: 1, // Offset animation for visual variety
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
                    delay: 0.5, // Offset animation
                  }}
                >
                  <FaRocket className="w-8 h-8 text-red-600" />
                </motion.div>
                <motion.h3
                  className="text-xl font-bold text-gray-900 mb-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Impactful Work
                </motion.h3>
                <p className="text-gray-600">
                  Contribute to projects that solve real-world challenges and make a meaningful difference in people's
                  lives.
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
                  delay: 2, // Offset animation for visual variety
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
                    delay: 1, // Offset animation
                  }}
                >
                  <FaChartLine className="w-8 h-8 text-red-600" />
                </motion.div>
                <motion.h3
                  className="text-xl font-bold text-gray-900 mb-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Growth Opportunities
                </motion.h3>
                <p className="text-gray-600">
                  Develop your skills and advance your career with continuous learning, mentorship, and clear paths for
                  progression.
                </p>
              </div>
            </motion.div>
          </motion.div>
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

        <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}>
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-40 bg-gray-300 rounded-md" />
              ))
            : filteredJobs.slice(0, visibleJobs).map((job) => (
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

        {filteredJobs.length > visibleJobs && (
          <div className="text-center mt-6">
            <button
              onClick={() => setVisibleJobs((prev) => prev + 3)}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              View More
            </button>
          </div>
        )}
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

