"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Building,
  Calendar,
  MapPin,
  Home,
  DollarSign,
  Ruler,
  CheckCircle,
  FileText,
  Star,
  ArrowLeft,
  ImageIcon,
  Users,
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"

interface ProjectData {
  projectId: number
  builderId: number
  projectName: string
  projectDescription: string
  projectDetails: string
  location: string
  launchDate: string
  completionDate: string
  reraNumber: string
  priceRange: string
  areaRange: string
  status: string
  amenities: string
  coverImage: string
  galleryImages: string
}

export default function AboutProjectPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [project, setProject] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>("")

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    async function fetchProjectDetails() {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:5000/api/aboutproject/${id}`)

        if (!response.ok) throw new Error("Project not found")

        const responseData = await response.json()
        const projectData = responseData.data
        setProject(projectData)
        setSelectedImage(projectData.coverImage)
      } catch (err) {
        console.error("Error fetching project details:", err)
        setError("Failed to load project details.")
      } finally {
        setLoading(false)
      }
    }

    fetchProjectDetails()
  }, [id])

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
const parseJsonField = (field: string) => {
  try {
    return field ? JSON.parse(field) : []
  } catch {
    return field ? field.split(",").map((item) => item.trim()) : []
  }
}


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
     <div></div>
    )
  }

  const galleryImages = parseJsonField(project.galleryImages);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-black">Project Details</h1>
          <div></div>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          {/* Hero Section */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white border-red-200 shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                <CardTitle className="flex items-center text-3xl font-bold">
                  <Building className="h-8 w-8 mr-3" />
                  {project.projectName}
                </CardTitle>
                <p className="text-red-100 text-lg mt-2">{project.projectDescription}</p>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Image Gallery */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white border-red-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-black">
                  <ImageIcon className="h-5 w-5 mr-2 text-red-600" />
                  Project Gallery
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Main Image */}
                <motion.div
                  className="w-full h-96 relative rounded-lg overflow-hidden border-2 border-red-100"
                  whileHover={{ scale: 1.01 }}
                >
                  <Image
                    src={selectedImage || "/placeholder.svg?height=400&width=800"}
                    alt={project.projectName}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Thumbnail Gallery */}
                {galleryImages.length > 0 && (
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative h-20 rounded cursor-pointer border-2 ${
                        selectedImage === project.coverImage ? "border-red-500" : "border-red-200"
                      }`}
                      onClick={() => setSelectedImage(project.coverImage)}
                    >
                      <Image
                        src={project.coverImage || "/placeholder.svg"}
                        alt="Cover"
                        fill
                        className="object-cover rounded"
                      />
                    </motion.div>
                    {galleryImages.map((image: string, index: number) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative h-20 rounded cursor-pointer border-2 ${
                          selectedImage === image ? "border-red-500" : "border-red-200"
                        }`}
                        onClick={() => setSelectedImage(image)}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Gallery ${index + 1}`}
                          fill
                          className="object-cover rounded"
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Project Information Grid */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Launch Date */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <Card className="bg-white border-red-200 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <Calendar className="h-6 w-6 text-red-600 mr-3" />
                      <h3 className="font-semibold text-black">Launch Date</h3>
                    </div>
                    <p className="text-gray-700 text-lg">{formatDate(project.launchDate)}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Completion Date */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <Card className="bg-white border-red-200 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="h-6 w-6 text-red-600 mr-3" />
                      <h3 className="font-semibold text-black">Completion Date</h3>
                    </div>
                    <p className="text-gray-700 text-lg">{formatDate(project.completionDate)}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Status */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <Card className="bg-white border-red-200 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <Star className="h-6 w-6 text-red-600 mr-3" />
                      <h3 className="font-semibold text-black">Status</h3>
                    </div>
                    <Badge className="bg-red-600 text-white text-lg px-3 py-1">{project.status}</Badge>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Price Range */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <Card className="bg-white border-red-200 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <DollarSign className="h-6 w-6 text-red-600 mr-3" />
                      <h3 className="font-semibold text-black">Price Range</h3>
                    </div>
                    <p className="text-gray-700 text-lg font-medium">{project.priceRange || "N/A"}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Area Range */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <Card className="bg-white border-red-200 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <Ruler className="h-6 w-6 text-red-600 mr-3" />
                      <h3 className="font-semibold text-black">Area Range</h3>
                    </div>
                    <p className="text-gray-700 text-lg font-medium">{project.areaRange || "N/A"}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* RERA Number */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <Card className="bg-white border-red-200 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <FileText className="h-6 w-6 text-red-600 mr-3" />
                      <h3 className="font-semibold text-black">RERA Number</h3>
                    </div>
                    <p className="text-gray-700 text-lg">{project.reraNumber || "N/A"}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div variants={itemVariants}>
            <Card className="bg-black text-white border-red-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 text-red-400 mr-3" />
                  <h3 className="font-semibold text-xl">Location</h3>
                </div>
                <p className="text-gray-200 text-lg">{project.location}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Project Details */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white border-red-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-black">
                  <Home className="h-5 w-5 mr-2 text-red-600" />
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">{project.projectDetails}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Amenities */}
          {project.amenities && (
            <motion.div variants={itemVariants}>
              <Card className="bg-white border-red-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl text-black">
                    <Users className="h-5 w-5 mr-2 text-red-600" />
                    Amenities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {parseJsonField(project.amenities).map((amenity: string, index: number) => (
                      <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Badge
                          variant="outline"
                          className="border-red-300 text-red-700 hover:bg-red-50 text-sm py-2 px-3 w-full justify-center"
                        >
                          {amenity}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
