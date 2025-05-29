"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Award, Phone, Mail, Globe, MapPin } from "lucide-react"
import { useParams, useRouter } from "next/navigation"


interface BuilderData {
  builderId: number
  name: string
  established: string
  logo: string
  overview: string
  experience: string
  certifications: string
  headOffice: string
  contactEmail: string
  contactPhone: string
  website: string
  socialLinks: string
  status: string
}

interface PropertyData {
  propertyId: string
  projectId: number
  // other property fields
}

interface ProjectData {
  projectId: number
  builderId: number
  // other project fields
}


export default function BuilderDetails() {
    const params = useParams()

  const id = params.id as string
  const [builder, setBuilder] = useState<BuilderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    async function fetchBuilderDetails() {
      try {
        setLoading(true)

        // Step 1: Fetch property data to get projectId
        const propertyResponse = await fetch(`http://localhost:5000/api/properties/${id}`)
        if (!propertyResponse.ok) throw new Error("Property not found")

        const propertyData: PropertyData = await propertyResponse.json()

        if (!propertyData.projectId) {
          setError("No project associated with this property.")
          return
        }

        // Step 2: Fetch project details to get builderId
        const projectResponse = await fetch(`http://localhost:5000/api/aboutproject/${propertyData.projectId}`)
        if (!projectResponse.ok) throw new Error("Project not found")
          
const projectRes = await projectResponse.json()
const projectData: ProjectData = projectRes.data

        if (!projectData.builderId) {
          setError("No builder associated with this project.")
          return
        }

        // Step 3: Fetch builder details using builderId
        const builderResponse = await fetch(`http://localhost:5000/api/builderdetails/${projectData.builderId}`)
        if (!builderResponse.ok) throw new Error("Builder not found")

        const builderData: BuilderData = await builderResponse.json()
        setBuilder(builderData)
      } catch (err) {
        console.error("Error fetching builder details:", err)
        setError("Failed to load builder details.")
      } finally {
        setLoading(false)
      }
    }

    fetchBuilderDetails()
  }, [id])

  const parseJsonField = (field: string) => {
    try {
      return field ? JSON.parse(field) : []
    } catch {
      return field ? field.split(",").map((item) => item.trim()) : []
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !builder) {
    return (
      <div></div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">About Developer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
            {/* Builder Logo */}
            {builder.logo && (
              <div className="flex-shrink-0">
                <Image
                  src={builder.logo || "/placeholder.svg?height=200&width=200"}
                  alt={`${builder.name} Logo`}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </div>
            )}

            {/* Builder Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{builder.name}</h3>
                <p className="text-gray-600">{builder.overview}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Established</h4>
                  <p className="text-gray-600">{builder.established || "N/A"}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Status</h4>
                  <Badge variant={builder.status === "Active" ? "default" : "secondary"}>{builder.status}</Badge>
                </div>
              </div>

              {builder.experience && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Experience</h4>
                  <p className="text-gray-600">{builder.experience}</p>
                </div>
              )}

              {builder.certifications && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    <Award className="inline h-4 w-4 mr-1" />
                    Certifications & Awards
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {parseJsonField(builder.certifications).map((cert: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Contact Information */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Contact Information</h4>

                {builder.headOffice && (
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-1 text-gray-500" />
                    <p className="text-gray-600">{builder.headOffice}</p>
                  </div>
                )}

                {builder.contactEmail && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <a href={`mailto:${builder.contactEmail}`} className="text-blue-600 hover:underline">
                      {builder.contactEmail}
                    </a>
                  </div>
                )}

                {builder.contactPhone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    <a href={`tel:${builder.contactPhone}`} className="text-blue-600 hover:underline">
                      {builder.contactPhone}
                    </a>
                  </div>
                )}

                {builder.website && (
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-gray-500" />
                    <a
                      href={builder.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {builder.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
