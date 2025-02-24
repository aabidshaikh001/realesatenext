"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import useSWR from "swr"

interface PropertyData {
  latitude: number
  longitude: number
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function constructMapUrl(latitude: number, longitude: number): string {
  return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.9799959312897!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU3JzA0LjYiTiA3NcKwNDQnMzguNyJF!5e0!3m2!1sen!2sin!4v1678375375837!5m2!1sen!2sin`
}

export default function MapComponent() {
  const { id } = useParams()

  const { data, error, isLoading } = useSWR<PropertyData>(`http://localhost:5000/api/properties/${id}`, fetcher)

  if (error) {
    console.error("Failed to fetch map data:", error)
  }

  const mapUrl = data?.latitude && data?.longitude ? constructMapUrl(data.latitude, data.longitude) : null

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section bg-white rounded-lg shadow-lg max-w-6xl mx-auto p-4 space-y-8"
    >
      <h2 className="text-2xl font-bold mb-4">Map</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="text-red-500">Error loading map. Please try again later.</div>
      ) : !mapUrl ? (
        <div className="text-gray-500">No map data available for this property.</div>
      ) : (
        <div className="rounded-lg overflow-hidden">
          <iframe
            src={mapUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="Property location map"
          />
        </div>
      )}
    </motion.section>
  )
}

