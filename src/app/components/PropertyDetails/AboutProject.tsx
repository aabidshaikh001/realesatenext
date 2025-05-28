"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, Calendar, MapPin, Eye } from 'lucide-react'
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
  galleryImages: string[]
}

interface PropertyData {
  propertyId: string
  projectId: number
}

interface ProjectDetailsProps {
  onBuilderIdChange?: (builderId: number) => void
}

export default function ProjectDetails({ onBuilderIdChange }: ProjectDetailsProps) {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [project, setProject] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    async function fetchProjectDetails() {
      try {
        setLoading(true)

        // Step 1: Fetch property data to get projectId
        const propertyResponse = await fetch(`https://api.realestatecompany.co.in/api/properties/${id}`)

        if (!propertyResponse.ok) throw new Error("Property not found")

        const propertyResponse_data = await propertyResponse.json()
        const propertyData: PropertyData = propertyResponse_data.data || propertyResponse_data

        if (!propertyData.projectId) {
          setError("No project associated with this property.")
          return
        }

        // Step 2: Fetch project details using projectId
        const projectResponse = await fetch(`https://api.realestatecompany.co.in/api/aboutproject/${propertyData.projectId}`)
        if (!projectResponse.ok) throw new Error("Project not found")

        const projectResponse_data = await projectResponse.json()
        setProject(projectResponse_data.data)

        // Notify parent component about builderId for builder details
        if (onBuilderIdChange && projectResponse_data.data.builderId) {
          onBuilderIdChange(projectResponse_data.data.builderId)
        }
      } catch (err) {
        console.error("Error fetching project details:", err)
        setError("Failed to load project details.")
      } finally {
        setLoading(false)
      }
    }

    fetchProjectDetails()
  }, [id, onBuilderIdChange])

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

  const handleViewDetails = () => {
    if (project) {
      router.push(`/aboutproject/${project.projectId}`)
    }
  }

  if (loading) {
    return (
      <Card className="bg-white border-red-200">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !project) {
    return (
      <Card className="bg-white border-red-200">
        <CardContent className="p-6">
          <p className="text-center text-red-600">{error || "Project information not available."}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white border-red-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
          <CardTitle className="flex items-center justify-between text-2xl font-bold">
            <div className="flex items-center">
              <Building className="h-6 w-6 mr-2" />
              About Project - {project.projectName}
            </div>
            <Button 
              onClick={handleViewDetails}
              variant="secondary"
              className="bg-white text-red-600 hover:bg-gray-100 border-none"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {project.coverImage && (
            <motion.div 
              className="w-full h-64 relative rounded-lg overflow-hidden border-2 border-red-100"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={project.coverImage || "/placeholder.svg?height=256&width=800"}
                alt={project.projectName}
                fill
                className="object-cover"
              />
            </motion.div>
          )}

          <div>
            <p className="text-gray-700 mb-4">{project.projectDescription}</p>
            <p className="text-gray-600 whitespace-pre-line">{project.projectDetails}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <motion.div 
              className="space-y-2 p-4 bg-red-50 rounded-lg border border-red-100"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-semibold text-black">Launch Date</h4>
              <div className="flex items-center text-gray-700">
                <Calendar className="h-4 w-4 mr-2 text-red-600" />
                {formatDate(project.launchDate)}
              </div>
            </motion.div>

            <motion.div 
              className="space-y-2 p-4 bg-red-50 rounded-lg border border-red-100"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-semibold text-black">Completion Date</h4>
              <div className="flex items-center text-gray-700">
                <Calendar className="h-4 w-4 mr-2 text-red-600" />
                {formatDate(project.completionDate)}
              </div>
            </motion.div>

            <motion.div 
              className="space-y-2 p-4 bg-red-50 rounded-lg border border-red-100"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-semibold text-black">Status</h4>
              <Badge 
                variant={project.status === "Active" ? "default" : "secondary"}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                {project.status}
              </Badge>
            </motion.div>

            <motion.div 
              className="space-y-2 p-4 bg-red-50 rounded-lg border border-red-100"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-semibold text-black">RERA Number</h4>
              <p className="text-gray-700">{project.reraNumber || "N/A"}</p>
            </motion.div>

            <motion.div 
              className="space-y-2 p-4 bg-red-50 rounded-lg border border-red-100"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-semibold text-black">Price Range</h4>
              <p className="text-gray-700 font-medium">{project.priceRange || "N/A"}</p>
            </motion.div>

            <motion.div 
              className="space-y-2 p-4 bg-red-50 rounded-lg border border-red-100"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-semibold text-black">Area Range</h4>
              <p className="text-gray-700 font-medium">{project.areaRange || "N/A"}</p>
            </motion.div>
          </div>

          {project.location && (
            <motion.div 
              className="space-y-2 p-4 bg-black text-white rounded-lg"
              whileHover={{ scale: 1.01 }}
            >
              <h4 className="font-semibold">Location</h4>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-red-400" />
                {project.location}
              </div>
            </motion.div>
          )}

          {project.amenities && (
            <div className="space-y-2">
              <h4 className="font-semibold text-black">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {parseJsonField(project.amenities).map((amenity: string, index: number) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge 
                      variant="outline" 
                      className="border-red-300 text-red-700 hover:bg-red-50"
                    >
                      {amenity}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
