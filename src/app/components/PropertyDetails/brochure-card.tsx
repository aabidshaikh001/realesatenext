"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText } from "lucide-react"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useParams } from "next/navigation"
export function BrochureCard() {
 const params = useParams()

  const id = params.id as string
  const [brochure, setBrochure] = useState<{ title: string; logo: string; pdfLink: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBrochure = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:5000/api/brochure/${id}`)

        if (!response.ok) throw new Error("Failed to fetch brochure")
        const data = await response.json()
        setBrochure(data)
        setError(null)
      } catch (error) {
        console.error("Error fetching brochure:", error)
        setError("Unable to load brochure. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchBrochure()
  }, [id])

  if (error) {
    return (
      <div className="">
      
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-3 px-4">
        <h2 className="text-xl font-bold">View Official Brochure</h2>
        <Card className="border border-red-100">
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[180px] gap-4">
            <Skeleton className="h-10 w-20 bg-red-100" />
            <Skeleton className="h-6 w-3/4 bg-red-100" />
            <Skeleton className="h-10 w-40 rounded-full bg-red-100" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
   <div className="space-y-4 px-4 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-red-600">View Official Brochure</h2>
      <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }} className="relative overflow-hidden rounded-xl">
        <Card className="bg-gradient-to-br from-black to-red-900 text-white cursor-pointer overflow-hidden border-0 shadow-lg">
          <CardContent className="p-8 flex flex-col items-center justify-center min-h-[220px] relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"></div>
              <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-white/5"></div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4">
              <FileText className="w-6 h-6 text-red-400/50" />
            </div>
            <div className="absolute bottom-4 left-4 text-xs text-red-400/50">PDF</div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="bg-white p-3 rounded-lg mb-6 shadow-md">
                <Image
                  src={brochure?.logo || "/placeholder.svg"}
                  alt="Builder Logo"
                  width={100}
                  height={50}
                  className="object-contain"
                />
              </div>

              <h3 className="text-xl font-semibold text-center mb-6 text-white">{brochure?.title}</h3>

              <motion.a
                href={brochure?.pdfLink || "#"}
                download={brochure?.title ? `${brochure.title}.pdf` : "brochure.pdf"}
                className="group flex items-center bg-white text-red-900 rounded-full px-6 py-3 text-sm font-medium cursor-pointer shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                Download Brochure
              </motion.a>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <p className="text-xs text-gray-500 text-center">
        Download the official brochure to get complete details about this property
      </p>
    </div>
  )
}
