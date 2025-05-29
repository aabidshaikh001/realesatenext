"use client"

import { useParams } from "next/navigation"

import useSWR from "swr"

interface PropertyData {
  latitude: number
  longitude: number
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function constructMapUrl(latitude: number, longitude: number): string {
  return `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`
}

export default function MapComponent() {
  const { id } = useParams()

  const { data, error, isLoading } = useSWR<PropertyData>(
    `http://localhost:5000/api/properties/${id}`,
    fetcher
  )

  if (error) {
    console.error("Failed to fetch map data:", error)
  }

  const mapUrl =
    data?.latitude && data?.longitude
      ? constructMapUrl(data.latitude, data.longitude)
      : null

  return (
      <div className="space-y-4 px-4 bg-white rounded-lg shadow-lg p-6">
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
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="Property location map"
          />
        </div>
      )}
      </div>
  )
}
